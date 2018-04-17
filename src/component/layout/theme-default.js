import {blue800} from 'material-ui/styles/colors';
import {blue500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue600, blue900, grey900} from 'material-ui/styles/colors';

const themeDefault = getMuiTheme({
  palette: {
    primaryColor: blue900,
    primaryColor: blue800,
    primary3Color: blue500,
    accent3Color: blue600,
  },
  appBar: {
    height: 57,
    color: blue900
  },
  drawer: {
    width: 265,
    color: grey900,
  },
  raisedButton: {
    primaryColor: blue900,
  },
  listItem: {
    backgroundColor: blue600,
  },
  textField: {
    focusColor: blue600,
  },
  menuItem: {
    selectedTextColor: blue600,
  }
});


export default themeDefault;