import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// COMPONENTS
import Navbar from './components/Navbar';

// PAGES
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

// MATERIAL UI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#546e7a',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
