import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import globalStyles from './styles';

const PageBase = (props) => {
  
  const {title, navigation, wrapPaper} = props;
  
  return (
    <div>
      {navigation && <span style={globalStyles.navigation}>{navigation}</span>}
      {wrapPaper &&
      <Paper style={globalStyles.paper}>
        <h3 style={globalStyles.title}>{title}</h3>
        
        <Divider/>
        {props.children}
        
        <div style={globalStyles.clear}/>
      
      </Paper>
      }
      {!wrapPaper &&
      <div>
        <h3 style={globalStyles.title}>{title}</h3>
        {props.children}
        <div style={globalStyles.clear}/>
      </div>
      }
    </div>
  );
};

PageBase.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.string,
  children: PropTypes.element,
  wrapPaper: PropTypes.bool,
};

export default PageBase;
