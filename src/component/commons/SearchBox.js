import {Paper, TextField} from 'material-ui';
import React from 'react';

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
      this.props.onSearchSubmit(query);
    }
  };

  render = () => {
    return (
        <Paper style={{padding: 4}}>
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
    );
  }
}

export default SearchBox;