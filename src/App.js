import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, {Component} from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom'
import ActorPage from './component/actor/ActorPage';
import CategoryPage from './component/category/CategoryPage';
import HomeComponent from './component/home/HomeComponent';
import AppLayout from './component/layout/containers/AppLayout';
import MovieComponent from './component/movie/MovieComponent';
import SearchPage from './component/search/SearchPage';
import SeriePage from './component/serie/SeriePage';
import WatchSerieComponent from './component/serie/WatchSerieComponent';
import categoryService from './service/CategoryService';
import navigatorService from './service/NavigatorService';

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
      });
    });
  };
  
  render() {
    return (
      <div>
        {this.state.ready &&
        <MuiThemeProvider>
          <HashRouter>
            <Route path={'/'} render={(props) => {
              navigatorService.setHistory(props.history);
              return <AppLayout children={
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
              }/>
            }}/>
          </HashRouter>
        </MuiThemeProvider>}
      </div>
    );
  }
}

export default App;
