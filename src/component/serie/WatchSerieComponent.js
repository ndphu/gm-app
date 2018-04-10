import React from 'react';
import serieService from '../../service/SerieService';
import {Divider, List, ListItem, Paper, RaisedButton} from 'material-ui';
import {loader} from '../commons/GlobalLoaderBar';
import "../../../node_modules/video-react/dist/video-react.css";
import {BigPlayButton, Player} from 'video-react';

class WatchSerieComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serie: null,
      episode: null,
    };
    this.handleActorClick.bind(this);
    this.downloadVideo.bind(this);
    this.goBack.bind(this);
    this.handleCategoryClick.bind(this);
    this.onEpisodeClick.bind(this);
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
    serieService.getSerieById(this.props.match.params.serieId).then(response => {
      window.scrollTo(0, 0);
      this.setState({
        serie: response.serie,
        episodes: response.episodes,
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

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.episode || !this.state.episode || this.state.episode.order !== prevState.episode.order) {
      this.refs.player.load();
      this.refs.player.play();
    }
  }

  onEpisodeClick = (episode) => {
    if (!this.state.episode || this.state.episode.order !== episode.order) {
      this.setState({
        episode: episode,
      });
      this.refs.player.load();
    }
  };

  render = () => (
    <div className={['page-container']}>
      {this.state.serie &&
      <Paper zDepth={1} rounded={false} id={'movie-paper-container'}>
        <Player ref="player"
          playsInline={true}
          fluid={true}
          preload={'auto'}
          poster={this.state.serie.bigPoster}
          src={this.state.episode ? this.state.episode.videoSource : ""}>
          <BigPlayButton position="center"/>
        </Player>
        <a ref={node => this.downloadNode = node} href={this.state.serie.videoSource} target={'_blank'} download
           hidden>download</a>
        <h2 id={'movie-title'}>{this.state.episode ? this.state.episode.title : this.state.serie.title}</h2>
        <div className={['watch-episode-episode-list']}>
          <List>
            {this.state.episodes.map(e => {
              return (
                <ListItem
                  onClick={() => {
                    this.onEpisodeClick(e)
                  }}
                  key={'episode-' + e.order}
                  primaryText={e.title}
                  secondaryText={e.subTitle}
                />
              );
            })}
          </List>
        </div>
        <div id={'movie-button-container'}>
          <RaisedButton label="Download" onClick={this.downloadVideo}/>
          <RaisedButton label="Trở Về" onClick={this.goBack}/>
        </div>
        <div id={'movie-content'}>
          {this.state.serie.content}
        </div>
        <Divider className={'movie-divider'}/>
        <div id={'movie-content'} className={['grid-wrapper-2-cols']}>
          <div>
            <h4>Diễn Viên</h4>
            {this.state.serie.actors.map((a, i) => (
              <span key={'film-details-actor-' + a.key}>
                <a onClick={() => this.handleActorClick(a)}
                   style={{color: '#0645AD'}}>{a.title}</a>
                {i !== this.state.serie.actors.length - 1 ? ', ' : ''}
                </span>
            ))}
          </div>
          <div>
            <h4>Thể Loại</h4>
            {this.state.serie.categories.map((c, i) => (
              <span key={'film-details-category-' + c.key}>
                <a onClick={() => this.handleCategoryClick(c)}
                   style={{color: '#0645AD'}}>{c.title}</a>
                {i !== this.state.serie.categories.length - 1 ? ', ' : ''}
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

export default WatchSerieComponent;