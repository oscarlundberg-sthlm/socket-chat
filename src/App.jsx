import React from 'react';
import {
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Chat from './Pages/Chat';
import Login from './Pages/Login';

function App() {
  const location = useLocation();
  const history = useHistory();
  const themes = {
    light: {
      base: '#FFFFFF',
      black: '#101010',
      lightGray: '#C1C1C1',
      grayedOut: '#6A6A6A',
      periphery: '#E9E9EB',
      accent: '#0179FB',
      warning: '#FFC007',
    },
  };

  // Using regular variable, because we only have one theme at the moment
  // and unused setState throws an error in Airbnb lint.
  const currentTheme = 'light';
  // const [currentTheme, setCurrentTheme] = useState('light');

  return (
    <ThemeProvider theme={{ ...themes[currentTheme], location }}>
      <AppStyle>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/chat">
            <Chat history={history} />
          </Route>
        </Switch>
      </AppStyle>
    </ThemeProvider>
  );
}

export default App;

const AppStyle = styled.div`
  background-color: ${(props) => (
    props.theme.location.pathname === '/'
      ? props.theme.periphery
      : props.theme.base
  )};
  height: 100vh;
  width: 100%;
  max-width: 900px;
  overflow-x: hidden;
  overflow-y: hidden;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
