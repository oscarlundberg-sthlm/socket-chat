import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import FormBar from '../Components/Forms/FormBar';

function Login() {
  const [inputValue, setInputValue] = useState('');
  const history = useHistory();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem('name', inputValue);
    history.push('/chat');
  };

  return (
    <ReturnDiv>
      <FormBar
        usage="login"
        liftHandleSubmit={handleSubmit}
        liftHandleInputChange={handleInputChange}
        inputValue={inputValue}
      />
    </ReturnDiv>
  );
}

export default Login;

const ReturnDiv = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
`;
