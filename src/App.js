import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom'
import HomeComponent from './component/HomeComponent';
import NavBar from "./component/NavBar";
import RandomComponent from "./component/RandomComponent";
import SearchComponent from "./component/SearchComponent";
import FavoritesComponent from "./component/FavoritesComponent";
import MovieComponent from "./component/MovieComponent";
import CategoryPage from './component/category/CategoryPage';
import ActorPage from './component/actor/ActorPage';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <HashRouter>
          <div>
            <Route path={'/'} render={(props) => <NavBar {...props} />}/>
            <div id={'main-content'}>
              <Switch>
                <Route path={'/home/page/:page'} component={HomeComponent}/>
                <Route path={'/random'} component={RandomComponent}/>
                <Route path={'/search/page/:page'} component={SearchComponent}/>
                <Route path={'/favorites'} component={FavoritesComponent}/>
                <Route path={'/movie/:movieId'} component={MovieComponent}/>
                <Route path={'/category'} component={CategoryPage}/>
                <Route path={'/actor'} component={ActorPage}/>
                <Redirect exact={true} from={'/'} to={'/home'}/>
                <Redirect exact={true} from={'/home'} to={'/home/page'}/>
                <Redirect exact={true} from={'/home/page'} to={'/home/page/1'}/>
              </Switch>
            </div>
          </div>
        </HashRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
