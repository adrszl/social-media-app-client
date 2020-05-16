import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// REDUX
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

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

const token = localStorage.FBIdToken;

if(token) {
  const decodedToken = jwtDecode(token);

  if(decodedToken.exp * 100 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login';
    authenticated = false;
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
              </Switch>
            </div>
          </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
