import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import HomeComponent from './component/HomeComponent';
import NavBar from "./component/NavBar";
import RandomComponent from "./component/RandomComponent";
import SearchComponent from "./component/SearchComponent";
import FavoritesComponent from "./component/FavoritesComponent";
import MovieComponent from "./component/MovieComponent";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <div>
            <Route path={'/'} render={(props) => <NavBar {...props} />}/>
            <div style={{paddingTop: 70}}>
              <Switch>
                <Route path={'/gm/home'} component={HomeComponent}/>
                <Route path={'/gm/random'} component={RandomComponent}/>
                <Route path={'/gm/search'} component={SearchComponent}/>
                <Route path={'/gm/favorites'} component={FavoritesComponent}/>
                <Route path={'/gm/movie/:movieId'} component={MovieComponent}/>
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
