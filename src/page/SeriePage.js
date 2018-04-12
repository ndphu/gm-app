import React from 'react';
import {Route} from 'react-router-dom';
import SeriesComponent from '../component/serie/SerieComponent';
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
    <div className={['search-page-container']}>
      <div className={['search-box-container']}>
        <Paper style={{width: 720, maxWidth: 720, paddingLeft: 16, paddingRight: 16}}>
          <TextField fullWidth={true}
                     style={{fontSize: 14}}
                     hintText='Tìm kiếm theo tên'
                     onKeyPress={this.onSearchKeyPress}
                     underlineStyle={{display: 'none'}}
                     underlineFocusStyle={{display: 'none'}}/>
        </Paper>
      </div>
      <div className={['search-result-container']}>
        <div className={['serie-search-result-grid']}>
          <Route path={'/serie/q/:q/page/:page'} component={SeriesComponent}/>
        </div>
      </div>
    </div>
  )
}

export default SeriePage;