import React from 'react';
import {Paper} from 'material-ui';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import {red200} from "material-ui/styles/colors";
import actions from '../../actions/Actions'
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline'
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

const coverWidth = 160;
const coverHeight = 245;

const style = {
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
    cursor: 'pointer',
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
    cursor: 'pointer',
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
    this.state = {
      hovering: false,
    };
    this.handleMovieClick.bind(this);
    this.handleCategoryClick.bind(this);
  }

  handleMovieClick = () => {
    this.props.onClick(actions.movieClick, this.props.movie)
  };

  handleCategoryClick = () => {
    this.props.onClick(actions.categoryClick, this.props.movie.category)
  };

  onMouseEnter = () => {
    this.setState({
      hovering: true
    });
  };

  onMouseLeave = () => {
    this.setState({
      hovering: false
    });
  };

  getTooltip = (m) => {
    return (
      <Tooltip id="tooltip">
        <strong>{m.title}</strong>
      </Tooltip>
    );
  };

  render = () => (
    <Paper style={style.card}
           onMouseEnter={this.onMouseEnter}
           onMouseLeave={this.onMouseLeave}>
      <div className={'cardview-movie-poster'}>
        <img src={this.props.movie.poster}
             alt={this.props.movie.title}
             onClick={this.handleMovieClick}/>
        <div className={['preview-overlay-container', this.state.hovering ? 'show' : ''].join(' ')}>
          <div className={['click-handler']} onClick={this.handleMovieClick}/>
          <FloatingActionButton variant='fab' className={'quick-play'} mini={true}
                                onClick={this.handleQuickPlayClick}>
            <PlayCircleOutline/>
          </FloatingActionButton>
        </div>
      </div>
      <div style={style.details}>
        <OverlayTrigger placement="bottom" overlay={this.getTooltip(this.props.movie)}>
          <a style={style.title} onClick={this.handleMovieClick}>{this.props.movie.title}
            <span style={style.paragraphEnd} className={'paragraph-end'}/>
          </a>
        </OverlayTrigger>
        <a style={style.subTitle} onClick={this.handleCategoryClick}>{this.props.movie.category.title}
          <span style={style.paragraphEnd} className={'paragraph-end'}/>
        </a>
      </div>
      <div style={style.ratesAndViews}>
        <div style={{position: 'relative'}}>
          <span><ActionFavorite color={red200} style={{maxWidth: 16, maxHeight: 16}}/></span>
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