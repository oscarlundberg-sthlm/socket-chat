import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ArrowUpwardRounded } from '@material-ui/icons';

function FormBar({
  usage, liftHandleSubmit, liftHandleInputChange, inputValue, socketConnected,
}) {
  const [placeholder, setPlaceholder] = useState('');
  const textInputEl = useRef(null);

  useEffect(() => {
    switch (usage) {
      case 'login':
        setPlaceholder('Enter your name');
        break;
      case 'chat':
        setPlaceholder('Message');
        break;
      default:
        break;
    }
  }, [usage]);

  useEffect(() => {
    textInputEl.current.focus();
  }, [textInputEl]);

  return (
    <div>
      <Form onSubmit={liftHandleSubmit} inputValue={inputValue} socketConnected={socketConnected}>
        <input
          type="text"
          value={inputValue}
          onChange={liftHandleInputChange}
          placeholder={placeholder}
          ref={textInputEl}
        />
        <button type="submit">
          <ArrowUpwardRounded />
        </button>
      </Form>
    </div>
  );
}

FormBar.defaultProps = {
  liftHandleSubmit: (e) => {
    e.preventDefault();
    return null;
  },
  liftHandleInputChange: () => null,
  socketConnected: false,
};

FormBar.propTypes = {
  usage: PropTypes.string.isRequired,
  liftHandleSubmit: PropTypes.func,
  liftHandleInputChange: PropTypes.func,
  inputValue: PropTypes.string.isRequired,
  socketConnected: PropTypes.bool,
};

export default FormBar;

const Form = styled.form`
  display: flex;
  width: 100%;
  background-color: ${(props) => props.theme.base};
  border: 1px solid ${(props) => props.theme.lightGray};
  border-radius: 1em;
  box-sizing: border-box;
  input[type="text" i] {
    flex-grow: 1;
    padding: 0;
    padding-left: 1em;
    box-sizing: border-box;
    border: none;
    background-color: transparent;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
  }
  input:focus {
    outline: none;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ socketConnected, inputValue, theme }) => (
    socketConnected && inputValue.length > 0
      ? theme.accent : theme.grayedOut
  )};
    color: ${(props) => props.theme.base};
    border: none;
    padding: 0;
    margin: 2px;
    height: 2em;
    width: 2em;
    border-radius: 50%;
    cursor: pointer;
  }
`;
