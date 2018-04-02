import React from 'react';
// icons
//play circle filled
import Route from "react-router-dom/es/Route";
import HomeComponent from "../component/HomeComponent";
import SearchComponent from '../component/SearchComponent';
import WatchComponent from '../component/WatchComponent';
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';

class UserPage extends React.Component {
  render = () => (
    <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href='/gm/user/home'>Movies</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/gm/user/random">
                Random
              </NavItem>
              <NavItem eventKey={2} href="/gm/user/search">
                Search
              </NavItem>
              <NavItem eventKey={3} href="/gm/user/favorites">
                Favorites
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavDropdown eventKey={4} title="More" id="basic-nav-dropdown">
                <MenuItem eventKey={4.1}>Action</MenuItem>
                <MenuItem eventKey={4.2}>Another action</MenuItem>
                <MenuItem eventKey={4.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={4.5}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route path={'/gm/#/user/home'} component={HomeComponent}/>
        <Route path={'/gm/#/user/search'} component={SearchComponent}/>
        <Route path={'/gm/#/user/watch/:movieId'} component={WatchComponent}/>
    </div>
  );
}

export default UserPage;