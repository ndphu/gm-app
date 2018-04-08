import React from 'react';
import {Route} from 'react-router-dom';
import SeriesComponent from './SerieComponent';
import {Paper, TextField} from 'material-ui';

class SeriePage extends React.Component {

  onSearchKeyPress = (e) => {
    e.target.setAttribute('maxlength', 32);
    const query = e.target.value.trim();
    if (e.key === 'Enter' && query) {
      this.props.history.push(`/serie/q/${query}/page/1`)
    }
  };

  render = () => (
    <div className={['page-container']}>
      <Paper className={['search-box-container']}>
        <TextField className={'search-box'}
                   hintText='Search series by name'
                   onKeyPress={this.onSearchKeyPress}
                   underlineStyle={{borderColor: '#008080'}}
                   underlineFocusStyle={{borderColor: '#008080'}}/>
      </Paper>
      <div className={['serie-search-result-container']}>
        <Route path={'/serie/q/:q/page/:page'} component={SeriesComponent}/>
      </div>
    </div>
  )
}

export default SeriePage;