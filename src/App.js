import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, {Component} from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom'
import ActorPage from './page/ActorPage';
import CategoryPage from './page/CategoryPage';
import HomeComponent from './page/HomePage';
import AppLayout from './component/layout/AppLayout';
import MovieComponent from './component/movie/MovieComponent';
import SearchPage from './page/SearchPage';
import SeriePage from './page/SeriePage';
import WatchSerieComponent from './component/serie/WatchSerieComponent';
import AppRoutes from './routes';
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
              navigatorService.setLocation(props.location);
              navigatorService.setHistory(props.history);
              return <AppLayout children={<AppRoutes/>}/>
            }}/>
          </HashRouter>
        </MuiThemeProvider>}
      </div>
    );
  }
}

export default App;
