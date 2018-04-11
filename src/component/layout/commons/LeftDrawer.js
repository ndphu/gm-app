import {ListItem} from 'material-ui';
import {List} from 'material-ui';
import Drawer from 'material-ui/Drawer';
import {typography} from 'material-ui/styles';
import {blue600, white} from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';

const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 22,
    color: typography.textFullWhite,
    fontWeight: typography.fontWeightLight,
    backgroundColor: blue600,
    paddingLeft: 40,
    paddingTop: 12,
    height: 56,
  },
  menuItem: {
    color: white,
    fontSize: 14
  },
  avatar: {
    div: {
      padding: '15px 0 20px 15px',
      height: 45
    },
    icon: {
      float: 'left',
      display: 'block',
      marginRight: 15,
      boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
    },
    span: {
      paddingTop: 12,
      display: 'block',
      color: 'white',
      fontWeight: 300,
      textShadow: '1px 1px #444'
    }
  }
};

function getListItem(menu, index) {
  let childItems = [];
  let containerElement = <div/>;
  
  if (menu.children && menu.children.length > 0) {
    menu.children.forEach((childMenu, idx) => {
      childItems.push(getListItem(childMenu, idx));
    });
  } else {
    containerElement = <Link to={menu.link}/>;
  }
  return <ListItem
    key={index}
    style={styles.menuItem}
    primaryText={menu.text}
    leftIcon={menu.icon}
    containerElement={containerElement}
    nestedItems={childItems}
    initiallyOpen={true}
    primaryTogglesNestedList={true}
  />;
}

const LeftDrawer = (props) => {
  let {navDrawerOpen} = props;
  
  return (
    <Drawer
      docked={true}
      open={navDrawerOpen}>
      <div style={styles.logo}>
        Good Movies
      </div>
      <div>
        <List>
          {props.menus && props.menus.map((menu, index) => getListItem(menu, index))}
        </List>
      </div>
    </Drawer>
  );
};

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array,
  username: PropTypes.string,
};

export default LeftDrawer;
