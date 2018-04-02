import React from 'react';
import {Paper} from 'material-ui';

const coverWidth = 164;
const coverHeight = 224;

const style = {
  cover: {
    margin: 8,
    maxWidth: coverWidth,
    minWidth: coverWidth,
    maxHeight: coverHeight,
    minHeight: coverHeight,
  },
  titleContainer: {
    padding: 8,
    overflow: 'hidden',
    maxHeight: 56,
    height: 56,
    minHeight: 56,
    textOverflow: 'ellipsis',
  },
  title: {
    fontSize: 18 ,
    display: 'inline-block',
    color: 'rgba(0,0,0,0.87)',
  },
  container: {
    marginTop: 8,
    marginBottom: 8,
    maxWidth: coverWidth + 16,
    minWidth: coverWidth + 16,
    maxHeight: coverHeight + 90,
    minHeight: coverHeight + 90,
    align: 'center',
    cursor: 'pointer',
  }
};

class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleMovieClick.bind(this);
  }

  handleMovieClick = () => {
    this.props.onClick(this.props.movie)
  };

  render = () => (
    <Paper style={style.container} onClick={this.handleMovieClick}>
      <img style={style.cover} src={this.props.movie.poster}/>
      <div style={style.titleContainer}>
        <span style={style.title}>{this.props.movie.title}</span>
      </div>
    </Paper>
  )
}

export default MovieCard;