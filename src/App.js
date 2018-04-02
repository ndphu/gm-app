import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Redirect from "react-router-dom/es/Redirect";
import HomePage from "./pages/UserPage";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <Switch>
            <Route path='/gm/user' component={HomePage}/>
            <Redirect path='/' to='/gm/user'/>
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
