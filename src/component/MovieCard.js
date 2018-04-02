import React from 'react';
import {Paper} from 'material-ui';

const coverWidth = 170;
const coverHeight = 230;

const style = {
  cover: {
    maxWidth: coverWidth,
    minWidth: coverWidth,
    maxHeight: coverHeight,
    minHeight: coverHeight,
  },
  titleContainer: {
    padding: 16,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    color: 'rgba(0,0,0,0.87)',
  },
  subTitle: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.54)',
    display: 'block',
  },
  body: {
    padding: 16,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.87)',
    display: 'inline-block',
    maxHeight: 32,
    height: 32,
    minHeight: 32,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  container: {
    display: 'flex',
    marginTop: 8,
    marginBottom: 8,
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
      <div>
        <div style={style.titleContainer}>
          <span style={style.title}>{this.props.movie.title}</span>
          <span style={style.subTitle}>{this.props.movie.releaseDate}</span>
        </div>
        <span style={style.body}>{this.props.movie.content}</span>
      </div>
    </Paper>
  )
}

export default MovieCard;