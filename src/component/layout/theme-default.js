import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue600, blue900, grey900} from 'material-ui/styles/colors';

const themeDefault = getMuiTheme({
  palette: {
    primaryColor: blue900,
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
  textField: {
    focusColor: blue600,
  }
});


export default themeDefault;