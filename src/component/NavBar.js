import React from "react";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Drawer, MenuItem as MaterialUIMenuItem, TextField} from "material-ui";
import categoryService from '../service/CategoryService';
import {Route} from 'react-router-dom';


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.onQuickSearchKeyPress.bind(this);
    this.state = {
      open: false,
      categories: categoryService.getCategories(),
      currentCategory: {},
    };
    this.onMenuItemClick.bind(this);
  }

  onQuickSearchKeyPress = (e) => {
    e.target.setAttribute('maxlength', 32);
    const query = e.target.value.trim();
    if (e.key === 'Enter' && query) {
      this.props.history.push(`/search/page/1?q=${query}`)
    }
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
        this.setState({
          categories: categories,
          currentCategory: categoryService.getCategoryByKey(this.props.match.params.categoryKey),
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
      const currentCategory = this.state.categories.filter(cat => cat.key === catKey)[0];
      return currentCategory.title
    }
    return '';
  };

  getCurrentCategoryKey = () => {
    return this.props.location.pathname.split('/category/')[1].split('/')[0];
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
          <Route path={'/home'} render={() => <Navbar.Brand>Trang Chủ</Navbar.Brand>}/>
          <Route path={'/movie'} render={() => <Navbar.Brand>Xem Phim</Navbar.Brand>}/>
          <Route path={'/search'} render={() => <Navbar.Brand>Tìm Kiếm</Navbar.Brand>}/>
          <Route path={'/actor'} render={() => <Navbar.Brand>Diễn Viên</Navbar.Brand>}/>
          <Route path={'/serie'} render={() => <Navbar.Brand>Phim Bộ</Navbar.Brand>}/>
          <Route path={'/category/:categoryKey/page/:page'} render={() => {
            const catKey = this.getCurrentCategoryKey();
            const current = this.state.categories.filter(cat => cat.key === catKey)[0];
            if (current) {
              return (<Navbar.Brand>{current.title}</Navbar.Brand>)
            }
            return <div/>
          }}/>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/home'}>
              <NavItem eventKey={1}>Trang Chủ</NavItem>
            </LinkContainer>
            <LinkContainer to={'/serie'}>
              <NavItem eventKey={2}>Phim Bộ</NavItem>
            </LinkContainer>
            <NavItem eventKey={5} onClick={this.handleToggle}>Chọn Thể Loại</NavItem>
          </Nav>
          <Navbar.Form pullRight>
            <TextField className={'text-field-quick-search'} style={{maxHeight: 34}}
                       underlineStyle={{borderColor: '#008080'}}
                       underlineFocusStyle={{borderColor: '#008080'}}
                       hintText='Quick Search' onKeyPress={(e) => {
              this.onQuickSearchKeyPress(e)
            }}/>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default NavBar;