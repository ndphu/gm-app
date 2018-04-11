import React from 'react';
import TextField from 'material-ui/TextField';
import {white, blue500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';

const SearchBox = () => {
  
  const styles = {
    iconButton: {
      float: 'left',
      marginTop: 5
    },
    textField: {
      color: white,
      backgroundColor: blue500,
      borderRadius: 2,
      height: 35,
      marginTop: 11,
      padding: 4,
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
    }
  };
  
  return (
    <div style={styles.containerStyle}>
      <IconButton style={styles.iconButton} >
        <Search color={white} />
      </IconButton>
      <TextField
        hintText="Search..."
        underlineShow={false}
        fullWidth={true}
        style={styles.textField}
        inputStyle={styles.inputStyle}
        hintStyle={styles.hintStyle}
      />
    </div>
  );
};

export default SearchBox;
