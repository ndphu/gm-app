import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom'
import HomeComponent from './component/home/HomeComponent';
import MovieComponent from "./component/movie/MovieComponent";
import CategoryPage from './component/category/CategoryPage';
import ActorPage from './component/actor/ActorPage';
import SearchPage from './component/search/SearchPage';
import SeriePage from './component/serie/SeriePage';
import WatchSerieComponent from './component/serie/WatchSerieComponent';
import navigatorService from './service/NavigatorService';

import categoryService from './service/CategoryService';
import SearchBox from './component/commons/SearchBox';
import {AppBar} from 'material-ui';
import {blueGrey500} from 'material-ui/styles/colors';
import AppDrawer from './component/commons/AppDrawer';

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
        drawerOpen: false,
      });
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
                return <div/>
              }}/>
              <div id={'drawer-container'}>
                <AppDrawer
                  categories={categoryService.getCategories()}
                  open={this.state.drawerOpen}/>
              </div>
              <div id={'navbar-container'}>
                <AppBar style={{backgroundColor: blueGrey500}}
                        onLeftIconButtonClick={() => {
                          this.setState({drawerOpen: true});
                        }}/>
                <div id={'navbar-search-box'}><SearchBox/></div>
              </div>
              <div id={'main-content'}>
                <Switch>
                  <Route path={'/home'} component={HomeComponent}/>
                  <Route path={'/category'} component={CategoryPage}/>
                  <Route path={'/actor'} component={ActorPage}/>
                  <Route path={'/serie'} component={SeriePage}/>
                  <Route path={'/search/q/:query'} component={SearchPage}/>
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
