import React from 'react';
import {Paper} from 'material-ui';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import {red200} from "material-ui/styles/colors";

const coverWidth = 160;
const coverHeight = 245;

const style = {
  cover: {
    maxWidth: coverWidth,
    minWidth: coverWidth,
    maxHeight: coverHeight,
    minHeight: coverHeight,
  },
  card: {
    display: 'inline-block',
    position: 'relative',
    width: coverWidth,
    height: coverHeight + 85,
    textAlign: 'left',
    verticalAlign: 'top',
    whiteSpace: 'normal',
    maxWidth: coverWidth,
  },
  details: {
    paddingTop: 7,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    display: 'block',
    textAlign: 'left',
    whiteSpace: 'normal',
  },
  title: {
    fontSize: 16,
    color: '#616161',
    display: 'block',
    maxHeight: 36,
    minHeight: 18,
    //lineHeight: 18,
    fontWeight: 300,
    overflow: 'hidden',
    position: 'relative',
    whiteSpace: 'nowrap',
  },
  subTitle: {
    fontSize: 13,
    color: '#616161',
    display: 'block',
    maxHeight: 36,
    minHeight: 18,
    fontWeight: 300,
    overflow: 'hidden',
    position: 'relative',
    whiteSpace: 'nowrap',
  },
  ratesAndViews: {
    fontSize: 13,
    color: '#616161',
    display: 'block',
    position: 'absolute',
    bottom: 9,
    maxHeight: 38,
    padding: '0 10px',
    width: '100%',
  },
  paragraphEnd: {}
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
    <Paper style={style.card} onClick={this.handleMovieClick}>
      <img style={style.cover} src={this.props.movie.poster} alt={this.props.movie.title}/>
      <div style={style.details}>
        <a style={style.title} onClick={this.handleMovieClick} href={'#'}>{this.props.movie.title}
          <span style={style.paragraphEnd} className={'paragraph-end'}></span>
        </a>
        <a style={style.subTitle} onClick={this.handleMovieClick} href={'#'}>{this.props.movie.category.title}
          <span style={style.paragraphEnd} className={'paragraph-end'}></span>
        </a>
      </div>
      <div style={style.ratesAndViews}>
        <div style={{position: 'relative'}}>
          <span><ActionFavorite color={red200}  style={{maxWidth: 16, maxHeight: 16}}/></span>
          <span style={{
            position: 'absolute',
            left: 20,
            display: 'inline-block'
          }}>{this.props.movie.likes}</span>
          <span style={{
            position: 'absolute',
            right: 0,
            display: 'inline-block'
          }}>{this.props.movie.views + ' views'}</span>
        </div>
      </div>
    </Paper>
  )
}

export default MovieCard;