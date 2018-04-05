import React from "react";
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
import {Link} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import {TextField} from "material-ui";
import {grey200, grey300} from "material-ui/styles/colors";


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.onQuickSearchKeyPress.bind(this);
  }

  onQuickSearchKeyPress = (e) => {
    const query = e.target.value.trim();
    if (e.key === 'Enter' && query) {
      //console.log(this.props)
      this.props.history.push(`/search/page/1?q=${query}`)
    }
  };

  render = () => (
    <Navbar inverse collapseOnSelect fixedTop id={'navbar-material'}>
      <Navbar.Header>
        <Link to={'/home/page/1'}>
          <Navbar.Brand>Movies</Navbar.Brand>
        </Link>
        <Navbar.Toggle/>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer to={'/home'}>
            <NavItem eventKey={1}>Home</NavItem>
          </LinkContainer>
          <LinkContainer to={'/category'}>
            <NavItem eventKey={5}>Categories</NavItem>
          </LinkContainer>
          <LinkContainer to={'/favorites'}>
            <NavItem eventKey={3}>Favorites</NavItem>
          </LinkContainer>
        </Nav>
        <Navbar.Form pullRight>
          <TextField className={'text-field-quick-search'} style={{maxHeight: 34}}
                     underlineStyle={{borderColor: grey300}}
                     underlineFocusStyle={{borderColor: grey200}}
                     hintText='Quick Search' onKeyPress={(e) => {
            this.onQuickSearchKeyPress(e)
          }}/>
        </Navbar.Form>
        <Nav pullRight>
          <NavDropdown eventKey={4} title="More" id="basic-nav-dropdown">
            <MenuItem eventKey={4.1}>Profile</MenuItem>
            <MenuItem eventKey={4.2}>History</MenuItem>
            <MenuItem eventKey={4.3}>Preferences</MenuItem>
            <MenuItem divider/>
            <MenuItem eventKey={4.5}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar;