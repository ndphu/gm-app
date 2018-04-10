import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom'
import HomeComponent from './component/home/HomeComponent';
import NavBar from "./component/NavBar";
import SearchComponent from "./component/search/SearchComponent";
import MovieComponent from "./component/movie/MovieComponent";
import CategoryPage from './component/category/CategoryPage';
import ActorPage from './component/actor/ActorPage';
import SearchPage from './component/search/SearchPage';
import SeriePage from './component/serie/SeriePage';
import WatchSerieComponent from './component/serie/WatchSerieComponent';
import navigatorService from './service/NavigatorService';

import categoryService from './service/CategoryService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    }
  }

  componentDidMount = () => {
    categoryService.fetchCategory().then(resp => {
      categoryService.setCategories(resp.docs);
      let loadScreen = document.getElementById('load-screen');
      loadScreen.style.display = 'none';
      loadScreen.style.visibility = 'hidden';
      this.setState({
        ready: true,
      })
    });

  };

  render() {
    return (
      <div>
        {this.state.ready &&
        <MuiThemeProvider>
          <HashRouter>
            <div>
              <Route path={'/'} render={(props) => {
                navigatorService.setHistory(props.history);
                return <NavBar {...props} />}}/>
              <div id={'nano-bar-indicator'}/>
              <div id={'main-content'}>
                <Switch>
                  <Route path={'/home'} component={HomeComponent}/>
                  <Route path={'/search/page/:page'} component={SearchComponent}/>
                  <Route path={'/category'} component={CategoryPage}/>
                  <Route path={'/actor'} component={ActorPage}/>
                  <Route path={'/serie'} component={SeriePage}/>
                  <Route path={'/search'} component={SearchPage}/>
                  <Route path={'/watch/serie/:serieId'} component={WatchSerieComponent}/>
                  <Route path={'/watch/movie/:movieId'} component={MovieComponent}/>
                  <Redirect exact={true} from={'/'} to={'/home'}/>
                </Switch>
              </div>
            </div>
          </HashRouter>
        </MuiThemeProvider>}
      </div>
    );
  }
}

export default App;
