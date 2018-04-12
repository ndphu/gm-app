import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue600, grey100, grey200, grey900} from 'material-ui/styles/colors';

const themeDefault = getMuiTheme({
  palette: {
    primaryColor: blue600,
  },
  appBar: {
    height: 57,
    color: blue600
  },
  drawer: {
    width: 260,
    color: grey200,
  },
  raisedButton: {
    primaryColor: blue600,
  },
  textField: {
    focusColor: blue600,
  }
});


export default themeDefault;