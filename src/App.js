import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

// COMPONENTS
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute'

// PAGES
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

// MATERIAL UI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import './App.css';
import themeFile from './util/theme';

const theme = createMuiTheme(themeFile);

let authenticated;

const token = localStorage.FBIdToken;

if(token) {
  const decodedToken = jwtDecode(token);

  if(decodedToken.exp * 100 < Date.now()) {
    console.log('not authenticated');
    window.location.href = '/login';
    authenticated = false;
  } else {
    console.log('authenticated');
    authenticated = true;
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/login" component={login} authenticated={authenticated} />
              <AuthRoute exact path="/signup" component={signup} authenticated={authenticated} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
