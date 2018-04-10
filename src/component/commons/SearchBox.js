import React from 'react';
import {Paper, TextField} from 'material-ui';
import navigatorService from '../../service/NavigatorService';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: ''
    };
    this.onSearchKeyPress.bind(this);
  }

  componentDidMount = () => {
    this.setState({
      defaultValue: this.props.defaultValue,
    })
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.defaultValue !== this.state.defaultValue) {
      this.setState({
        defaultValue: nextProps.defaultValue,
      });
    }
  };

  onSearchKeyPress = (e) => {
    e.target.setAttribute('maxlength', 128);
    const query = e.target.value.trim();
    if (e.key === 'Enter' && query) {
      navigatorService.goToSearch(query);
    }
  };

  render = () => {
    return (
      <div className={['search-box-container']}>
        <Paper>
          <TextField
            fullWidth={true}
            defaultValue={this.state.defaultValue ? this.state.defaultValue : ''}
            style={{
              fontSize: 14,
              paddingLeft: 12,
              paddingRight: 12,
              marginTop: -4,
              marginBottom: -4,
            }}
            hintText='Tìm kiếm theo tên phim, diễn viên...'
            onKeyPress={this.onSearchKeyPress}
            underlineStyle={{display: 'none'}}
            underlineFocusStyle={{display: 'none'}}/>
        </Paper>
      </div>
    );
  }
}

export default SearchBox;