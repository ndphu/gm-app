import React from 'react';
import AppBar from 'material-ui/AppBar';
import appStyle from '../style/Style';
import {List, ListItem} from "material-ui/List";
// icons
import HomeIcon from 'material-ui/svg-icons/action/home';
import SearchIcon from 'material-ui/svg-icons/action/search';
import Favorite from 'material-ui/svg-icons/action/favorite';
//play circle filled
import Route from "react-router-dom/es/Route";
import HomeComponent from "../component/HomeComponent";
import SearchComponent from '../component/SearchComponent';
import WatchComponent from '../component/WatchComponent';

class UserPage extends React.Component {
  render = () => (
    <div>
      <div style={appStyle.appBar}>
        <AppBar title={'User HomePage'}/>
      </div>
      <div style={appStyle.navBar}>
        <List>
          <ListItem
            leftIcon={<HomeIcon/>}
            primaryText="Home"
            onClick={() => {
              this.props.history.replace('/gm/user/home')
            }}/>
          <ListItem
            leftIcon={<SearchIcon/>}
            primaryText="Search"
            onClick={() => {
              this.props.history.replace('/gm/user/search')
            }}/>
          <ListItem
            leftIcon={<Favorite/>}
            primaryText="Favorite"
            onClick={() => {
              this.props.history.replace('/gm/user/favorite')
            }}/>
        </List>
      </div>
      <div style={appStyle.content}>
        <Route path={'/gm/user/home'} component={HomeComponent}/>
        <Route path={'/gm/user/search'} component={SearchComponent}/>
        <Route path={'/gm/user/watch'} component={WatchComponent}/>
      </div>
    </div>
  );
}

export default UserPage;