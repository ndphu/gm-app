import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, {Component} from 'react';
import {HashRouter, Route} from 'react-router-dom'
import AppLayout from './component/layout/AppLayout';
import AppRoutes from './AppRoutes';
import categoryService from './service/GenreService';
import navigatorService from './service/NavigatorService';
require('./utils/StringUtils');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    }
  }
  
  componentDidMount = () => {
    categoryService.fetchGenres().then(resp => {
      categoryService.setGenres(resp.docs);
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
          <HashRouter>
            <Route path={'/'} render={(props) => {
              navigatorService.setLocation(props.location);
              navigatorService.setHistory(props.history);
              return <AppLayout children={<AppRoutes/>}/>
            }}/>
          </HashRouter>}
      </div>
    );
  }
}

export default App;
