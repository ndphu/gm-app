import {Paper, TextField} from 'material-ui';
import React from 'react';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.query
    };
    this.onSearchKeyPress.bind(this);
  }

  componentDidMount = () => {
    this.setState({
      query: this.props.query,
    })
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.query !== this.state.query) {
      console.log('set');
      this.setState({
        query: nextProps.query,
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
    console.log(this.state.query);
    return (
        <Paper style={{padding: 4}}>
          <TextField
            fullWidth={true}
            defaultValue={this.props.query}
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