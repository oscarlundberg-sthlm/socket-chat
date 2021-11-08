import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import FormBar from '../Components/Forms/FormBar';
import ChatBubble from '../Components/Chat/ChatBubble';

const socket = io('', { autoConnect: false });

function Chat({ history }) {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({});
  const [currentUser, setCurrentUser] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const socketCleanUp = () => {
    socket.disconnect();
    setSocketConnected(false);
  };

  useEffect(() => {
    if (!sessionStorage.getItem('name')) {
      history.push('/');
    } else {
      setCurrentUser(sessionStorage.getItem('name'));
    }
  }, []);

  useEffect(() => {
    if (currentUser.length > 0) {
      socket.connect();
      socket.on('connect', () => {
        console.log('socket connected');
        setSocketConnected(true);
      });
      socket.on('chat message', (msg) => {
        setNewMessage(msg);
      });
      socket.on('connect_error', (error) => {
        console.error('socket connect error...', error);
        setErrMsg('No connection, currently trying to reconnect...');
        setSocketConnected(false);
      });
    }
    return () => socketCleanUp();
  }, [currentUser]);

  useEffect(() => {
    setMessages([...messages, newMessage]);
  }, [newMessage]);

  useEffect(() => {
    socket.emit('username', { currentUser });
  }, [socketConnected]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (socketConnected && inputValue) {
      socket.emit('chat message', {
        userName: currentUser,
        message: inputValue,
      });
      setInputValue('');
    }
  };

  return (
    <ChatContainer>
      { socketConnected ? null
        : <IssueMessage>{errMsg}</IssueMessage>}
      <MsgsContainer>
        {
          messages.map((msg, i, array) => (
            <ChatBubble
              key={msg.msgId > -1 ? msg.msgId : -1}
              fromArrMap={{ msg, i, array }}
              currentUser={currentUser}
            />
          ))
        }
      </MsgsContainer>
      <SendMsgBar>
        <FormBar
          usage="chat"
          liftHandleSubmit={handleSubmit}
          liftHandleInputChange={handleInputChange}
          inputValue={inputValue}
          socketConnected={socketConnected}
        />
      </SendMsgBar>
    </ChatContainer>
  );
}

export default Chat;

Chat.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const IssueMessage = styled.div`
  width: 100%;
  text-align: center;
  background-color: ${({ theme }) => theme.warning};
`;
const MsgsContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
`;
const SendMsgBar = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 2px 10px 10px 10px;
`;
