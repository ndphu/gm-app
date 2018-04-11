import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import PropTypes from 'prop-types';
import React from 'react';
import categoryService from '../../../service/CategoryService';
import Header from '../commons/Header';
import LeftDrawer from '../commons/LeftDrawer';
import ThemeDefault from '../theme-default';
import Web from 'material-ui/svg-icons/av/web';
import ActionHome from 'material-ui/svg-icons/action/home';

class AppLayout extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: this.props.width >= LARGE
    };
  }
  
  componentDidMount = () => {
    this.setState(
      {
        menus: [
          {text: 'Trang Chủ', icon: <ActionHome/>, link: '/home'},
          {
            text: 'Thể Loại', icon: <Web/>, children: categoryService.getCategories().map(category => ({
              text: category.title,
              icon: <Web/>,
              link: '/category/' + category.key + '/page/1'
            }))
          },
        ]
      });
  };
  
  
  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  }
  
  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }
  
  render() {
    let {navDrawerOpen} = this.state;
    const paddingLeftDrawerOpen = ThemeDefault.drawer.width + 6;
    
    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      }
    };
    
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <Header styles={styles.header}
                  handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>
          <LeftDrawer navDrawerOpen={navDrawerOpen}
                      menus={this.state.menus}/>
          
          <div style={styles.container}>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

AppLayout.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number
};

export default withWidth()(AppLayout);
