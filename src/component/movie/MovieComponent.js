import React from 'react';
import movieService from '../../service/MovieService';
import {Divider, Paper, RaisedButton} from 'material-ui';
import {loader} from '../commons/GlobalLoaderBar';
import "../../../node_modules/video-react/dist/video-react.css";
import {BigPlayButton, Player} from 'video-react';

class WatchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
    };
    this.handleActorClick.bind(this);
    this.downloadVideo.bind(this);
    this.goBack.bind(this);
    this.handleCategoryClick.bind(this);
  }

  handleCountryClick = () => {

  };

  handleCategoryClick = (c) => {
    this.props.history.push(`/category/${c.key}/page/1`)
  };

  handleActorClick = (a) => {
    this.props.history.push(`/actor/${a.key}/page/1`)
  };

  handleDirectorClick = () => {

  };

  componentDidMount = () => {
    loader.start();
    movieService.getMovie(this.props.match.params.movieId).then(m => {
      window.scrollTo(0, 0);
      this.setState({
        movie: m
      });
      loader.finish();
    });
  };

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  downloadVideo = () => {
    this.downloadNode.click();
  };

  goBack = () => {
    this.props.history.goBack();
  };

  toggleInfo = () => {
    this.setState({showInfo: !this.state.showInfo});
  };

  render = () => (
    <div className={['page-container']}>
      {this.state.movie &&
      <Paper zDepth={1} rounded={false} id={'movie-paper-container'}>
        <Player
          playsInline={true}
          fluid={true}
          preload={'auto'}
          poster={this.state.movie.bigPoster}
          src={this.state.movie.videoSource}>
          <BigPlayButton position="center"/>
        </Player>
        <a ref={node => this.downloadNode = node} href={this.state.movie.videoSource} target={'_blank'} download
           hidden>download</a>
        <h2 id={'movie-title'}>{this.state.movie.title}</h2>
        <div id={'movie-button-container'}>
          <RaisedButton label="Download" onClick={this.downloadVideo}/>
          <RaisedButton label="Trở Về" onClick={this.goBack}/>
        </div>
        <div id={'movie-content'}>
          {this.state.movie.content}
        </div>
        <Divider className={'movie-divider'}/>
        <div id={'movie-content'} className={['grid-wrapper-2-cols']}>
          <div>
            <h4>Diễn Viên</h4>
            {this.state.movie.actorEmbeded.map((a, i) => (
              <span key={'film-details-actor-' + a.key}>
                <a onClick={() => this.handleActorClick(a)}
                   style={{color: '#0645AD'}}>{a.title}</a>
                {i !== this.state.movie.actors.length - 1 ? ', ' : ''}
                </span>
            ))}
          </div>
          <div>
            <h4>Thể Loại</h4>
            {this.state.movie.categoryEmbeded.map((c, i) => (
              <span key={'film-details-category-' + c.key}>
                <a onClick={() => this.handleCategoryClick(c)}
                   style={{color: '#0645AD'}}>{c.title}</a>
                {i !== this.state.movie.categories.length - 1 ? ', ' : ''}
                </span>
            ))
            }
          </div>
        </div>
      </Paper>
      }
    </div>
  )
}

export default WatchComponent;