import React from "react";
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Drawer, TextField, MenuItem as MaterialUIMenuItem} from "material-ui";
import {grey200, grey300} from "material-ui/styles/colors";
import categoryService from '../service/CategoryService';


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.onQuickSearchKeyPress.bind(this);
    this.state = {
      open: false,
      categories: [],
      currentCategory: {},
    };
    this.onMenuItemClick.bind(this);
  }

  onQuickSearchKeyPress = (e) => {
    const query = e.target.value.trim();
    if (e.key === 'Enter' && query) {
      this.props.history.push(`/search/page/1?q=${query}`)
    }
  };

  componentDidMount = () => {
    this.retrieveCategories();
  };

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  onMenuItemClick = (category) => {
    if (category.key !== this.props.match.params.categoryKey) {
      this.props.history.push(`/category/${category.key}/page/1`)
    }
    this.setState({
      open: false,
      currentCategory: category,
    });
  };

  retrieveCategories = () => {
    if (this.state.categories.length === 0) {
      categoryService.getCategories().then(categories => {
        categories.content.sort(function (c1, c2) {
          if (c1.key < c2.key) {
            return -1;
          } else if (c1.key > c2.key) {
            return 1;
          } else {
            return 0;
          }
        });
        this.setState({
          categories: categories.content,
          currentCategory: categories.content.filter(cat => cat.key === this.props.match.params.categoryKey)[0],
        });
      });
    }
  };

  getCategoryText = () => {
    if (this.props.location.pathname.startsWith('/home')) {
      return 'Home';
    } else if (this.state.currentCategory && this.state.currentCategory.title) {
      return this.state.currentCategory.title;
    } else if (this.props.location.pathname.startsWith('/category') && this.state.categories.length > 0) {
      const catKey = this.props.location.pathname.split('/category/')[1].split('/')[0];
      console.log(catKey);
      const currentCategory = this.state.categories.filter(cat => cat.key === catKey)[0];
      console.log(currentCategory);
      return currentCategory.title
    }
    return '';
  };

  render = () => (
    <div>
      <Drawer
        docked={false}
        width={220}
        open={this.state.open}
        onRequestChange={(open) => this.setState({open})}>
        {this.state.categories.map(category => {
          return <MaterialUIMenuItem key={category.key} primaryText={category.title}
                                     onClick={() => this.onMenuItemClick(category)}/>
        })}
      </Drawer>
      <Navbar collapseOnSelect fixedTop id={'navbar-material'}>
        <Navbar.Header>
          <Navbar.Brand>{this.getCategoryText()}</Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/home'}>
              <NavItem eventKey={1}>Trang Chủ</NavItem>
            </LinkContainer>
            <NavItem eventKey={5} onClick={this.handleToggle}>Chọn Thể Loại</NavItem>
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
    </div>
  )
}

export default NavBar;