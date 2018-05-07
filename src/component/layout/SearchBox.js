import PropTypes from 'prop-types';
import React from 'react';
import TextField from 'material-ui/TextField';
import {white, blue500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import navigatorService from '../../service/NavigatorService';

const styles = {
  iconButton: {
    float: 'left',
    marginTop: 5
  },
  textField: {
    color: white,
    backgroundColor: blue500,
    borderRadius: 2,
    maxHeight: 34,
    minHeight: 34,
    padding: 4,
    width: '100%',
    marginTop: 11,
  },
  inputStyle: {
    color: white,
    paddingLeft: 5,
  },
  hintStyle: {
    height: 16,
    paddingLeft: 5,
    color: white
  },
  containerStyle: {
    lineHeight: 0,
    marginRight: 58,
  }
};

class SearchBox extends React.Component {
  onSearchKeyPress = (e) => {
    e.target.setAttribute('maxlength', 128);
    const query = e.target.value.trim();
    if (e.key === 'Enter' && query) {
      navigatorService.goToSearch(query);
    }
  };

  render = () => {
    return (
      <div style={styles.containerStyle}>
        <IconButton style={styles.iconButton}>
          <Search color={white}/>
        </IconButton>
        <TextField
          onKeyPress={this.onSearchKeyPress}
          hintText={this.props.searchHint}
          underlineShow={false}
          style={styles.textField}
          inputStyle={styles.inputStyle}
          hintStyle={styles.hintStyle}
        />
      </div>
    );
  }
}


SearchBox.propTypes = {
  searchHint: PropTypes.string,
  onSearchSubmit: PropTypes.func,
};



export default SearchBox;
