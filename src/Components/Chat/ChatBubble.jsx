import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function ChatBubble({ fromArrMap, currentUser }) {
  const [yourBubble, setYourBubble] = useState();
  const [showBubble, setShowBubble] = useState();
  const [showName, setShowName] = useState();
  const [showSpeechAppendix, setShowSpeechAppendix] = useState();
  const bubbleRef = useRef(null);

  const { msg, i, array } = fromArrMap;

  useEffect(() => {
    if (!msg.message) {
      setShowBubble(false);
    } else {
      setShowBubble(true);
    }

    if (msg.userName === currentUser) {
      setYourBubble(true);
    } else {
      setYourBubble(false);
    }

    // show name when message sender changes
    if (i === 0) {
      setShowName(true);
    } else if (msg.userName !== array[i - 1].userName) {
      setShowName(true);
    } else {
      setShowName(false);
    }

    // show a speech bubble "appendix" before message sender changes
    if (i === array.length - 1) {
      setShowSpeechAppendix(true);
    } else if (array.length === 1) {
      setShowSpeechAppendix(true);
    } else if (msg.userName !== array[i + 1].userName) {
      setShowSpeechAppendix(true);
    } else {
      setShowSpeechAppendix(false);
    }
  }, [msg, i, array, currentUser]);

  useEffect(() => {
    // auto scroll to latest message
    if (i === array.length - 1) {
      bubbleRef.current.scrollIntoView();
    }
  }, [i, array, bubbleRef.current]);

  return (
    <ReturnDiv ref={bubbleRef} yourBubble={yourBubble}>
      { showName
        ? (
          <UserName yourBubble={yourBubble}>
            {msg.userName}
          </UserName>
        )
        : null }
      { showBubble
        ? (
          <BubbleContainer yourBubble={yourBubble}>
            <Bubble yourBubble={yourBubble}>
              {msg.message}
            </Bubble>
            <Circle1
              yourBubble={yourBubble}
              showSpeechAppendix={showSpeechAppendix}
            />
            <Circle2
              yourBubble={yourBubble}
              showSpeechAppendix={showSpeechAppendix}
            />
          </BubbleContainer>
        )
        : null }
    </ReturnDiv>
  );
}

ChatBubble.propTypes = {
  fromArrMap: PropTypes.shape({
    msg: PropTypes.instanceOf(Object),
    i: PropTypes.number,
    array: PropTypes.instanceOf(Array),
  }).isRequired,
  currentUser: PropTypes.string.isRequired,
};

export default ChatBubble;

const ReturnDiv = styled.div`
  align-self: ${({ yourBubble }) => (yourBubble ? 'flex-end' : 'flex-start')};
  margin: 1px 0;
  width: fit-content;
  max-width: 43%;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
`;
const UserName = styled.p`
  align-self: ${({ yourBubble }) => (yourBubble ? 'flex-end' : 'flex-start')};
  margin: 2px 10px;
  padding: 0;
  font-size: 0.8em;
`;
const BubbleContainer = styled.div`
  align-self: ${({ yourBubble }) => (yourBubble ? 'flex-end' : 'flex-start')};
  position: relative;
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 100%;
`;
const Bubble = styled.div`
  align-self: ${({ yourBubble }) => (yourBubble ? 'flex-end' : 'flex-start')};
  background-color: ${({ yourBubble, theme }) => (yourBubble ? theme.accent : theme.periphery)};
  color: ${({ yourBubble, theme }) => (yourBubble ? theme.base : theme.black)};
  border-radius: 1em;
  width: fit-content;
  max-width: 100%;
  padding: 10px;
`;
const Circle1 = styled.div`
  display: ${({ showSpeechAppendix }) => (
    showSpeechAppendix ? 'block' : 'none'
  )};
  background-color: ${({ yourBubble, theme }) => (
    yourBubble ? theme.accent : theme.periphery
  )};
  --size: 40px;
  --posLR: calc(-1 * var(--size) / 1.6);
  --borderRad: calc(var(--size) / 2);
  width: var(--size);
  height: calc(var(--size) / 2);
  border-radius: 0 0 var(--borderRad) var(--borderRad);
  position: absolute;
  z-index: -2;
  bottom: 0;
  right: ${({ yourBubble }) => (yourBubble ? 'var(--posLR)' : 'none')};
  left: ${({ yourBubble }) => (yourBubble ? 'none' : 'var(--posLR)')};
`;
const Circle2 = styled.div`
  display: ${({ showSpeechAppendix }) => (
    showSpeechAppendix ? 'block' : 'none'
  )};
  background-color: ${({ theme }) => theme.base};
  --size: 20px;
  --posLR: calc(-1 * var(--size));
  width: var(--size);
  height: calc(var(--size) * 1.5);
  border-radius: 0 0 var(--size) var(--size);
  position: absolute;
  z-index: -1;
  bottom: 0;
  right: ${({ yourBubble }) => (yourBubble ? 'var(--posLR)' : 'none')};
  left: ${({ yourBubble }) => (yourBubble ? 'none' : 'var(--posLR)')};
`;
