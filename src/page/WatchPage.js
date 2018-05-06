import {Divider, RaisedButton} from 'material-ui';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import {blue300} from 'material-ui/styles/colors';
import React from 'react';
import {BigPlayButton, Player} from 'video-react';
import '../../node_modules/video-react/dist/video-react.css';
import {loader} from '../component/commons/GlobalLoaderBar';
import genreService from '../service/GenreService';
import itemService from '../service/ItemService';
import navigatorService from '../service/NavigatorService';
import apiConfig from '../config/Config';
import {convertToKey} from '../utils/StringUtils';
import PageBase from './PageBase';

let SelectableList = makeSelectable(List);

class WatchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      videoError: false,
      showCastButton: false,
    };
    this.onEpisodeClick.bind(this);
    this.handleGenreClick.bind(this);
    this.handleActorClick.bind(this);
    this.handleReloadEpisodeList.bind(this);
    this.onCastClick.bind(this);
  }
  
  componentDidMount = () => {
    this.getItem(this.props.match.params.itemId);
  };
  
  componentDidUpdate(prevProps, prevState) {
    const prevSource = prevState.episode ? prevState.episode.videoSource : '';
    const currentSource = this.state.episode ? this.state.episode.videoSource : '';
    if (prevSource !== currentSource && this.refs.player) {
      this.refs.player.load();
      this.refs.player.play();
      this.setState({
        showCastButton: true
      });
    }
  }
  
  componentWillUnmount = () => {
    if (this.refs.player) {
      this.refs.player.pause();
    }
  };
  
  handleGenreClick = (genre) => {
    navigatorService.goToCategory(genreService.getGenreByTitle(genre));
  };
  
  handleActorClick = (actor) => {
    navigatorService.goToActor({key: convertToKey(actor)});
  };
  
  getItem = (itemId) => {
    loader.start();
    Promise.all([itemService.getItemById(itemId), itemService.getItemEpisodes(itemId)]).then(result => {
      let item = result[0];
      let episodes = result[1];
      let firstEpisode = (episodes && episodes.length) ? episodes[0] : null;
      let videoError = !firstEpisode || !firstEpisode.videoSource;
      this.setState({
        item: item,
        episodes: episodes,
        episode: (episodes && episodes.length) ? episodes[0] : null,
      });
      loader.finish();
      if (videoError) {
        this.onVideoError();
      }
    });
  };
  
  onVideoEnded = () => {
    if (this.state.item && this.state.item.type === 'SERIE') {
      if (this.state.episode && this.state.episode.order < this.state.episodes.length) {
        this.changeEpisode(this.state.episodes[this.state.episode.order + 1]);
      }
    }
  };
  
  getVideoSource = () => {
    return this.state.episode ? this.state.episode.videoSource : '';
  };

  getSrt = () => {
    return this.state.episode ? this.state.episode.srt : null;
  };
  
  onEpisodeClick = (episode) => {
    this.changeEpisode(episode);
  };
  
  changeEpisode(episode) {
    if (!this.state.episode || this.state.episode.order !== episode.order) {
      if (!episode.videoSource) {
        if (this.refs.player) {
          this.refs.player.pause();
        }
        loader.start();
        itemService.crawEpisode(episode).then(episode => {
          this.setCurrentEpisode(episode);
          loader.finish();
        });
      } else {
        this.setCurrentEpisode(episode);
      }
    }
  }

  onCastClick = () => {
    let chromeCastRequest = window.getChromeCastRequest(this.getVideoSource(), this.getSrt());
    window.getChromeCastSession().then((session) => {
      session.loadMedia(chromeCastRequest);
      if (this.refs.player) {
        this.refs.player.pause();
      }
    });
  };
  
  onVideoError = () => {
    this.setState({
      videoError: true
    });
    if (this.loading) return;
    
    if (this.state.episode) {
      this.loading = true;
      itemService.crawEpisode(this.state.episode).then(episode => {
        this.loading = false;
        this.setState({
          videoError: false,
        });
        this.setCurrentEpisode(episode);
      });
    } else {
      if (!this.state.episodes || this.state.episodes.length === 0) {
        this.loading = true;
        itemService.reload(this.state.item).then(item => {
          itemService.getItemEpisodes(item._id).then(episodes => {
            this.loading = false;
            if (episodes.length === 0) {
            
            } else {
              this.setState({
                episodes: episodes,
                episode: episodes[0],
                videoError: false,
              });
            }
          });
        });
      } else {
        this.loading = true;
        itemService.reloadEpisodeList(this.state.item).then(episodes => {
            this.loading = false;
            if (episodes.length === 0) {
            
            } else {
              this.setState({
                episodes: episodes,
                episode: episodes[0],
                videoError: false,
              });
            }
          }
        );
      }
    }
  };
  
  handleReloadEpisodeList = () => {
    loader.start();
    itemService.reloadEpisodeList(this.state.item).then(episodes => {
      this.setState({
        episodes: episodes,
      });
      loader.finish();
    });
  };
  
  setCurrentEpisode(episode) {
    const newEpisodes = this.state.episodes.slice();
    newEpisodes[episode.order] = episode;
    this.setState({
      episode: episode,
      episodes: newEpisodes,
    });
  }
  
  render = () => {
    const episodeItems = [];
    if (this.state.episodes) {
      this.state.episodes.forEach((e) => {
        episodeItems.push(
          <ListItem
            value={e.order}
            initiallyOpen={true}
            hoverColor={blue300}
            key={`list-item-episode-${e._id}`}
            primaryText={e.title}
            onClick={() => {
              this.onEpisodeClick(e);
            }}
          />)
      });
    }
    
    return (
      <PageBase>
        {this.state.item &&
        <div>
          <h2 style={{fontWeight: 400,}}>{this.state.item.title}</h2>
          <h4 style={{fontWeight: 400,}}>{this.state.item.subTitle}</h4>
          {this.state.videoError ?
            <h4 style={{color: 'crimson', paddingTop: 16, paddingBottom: 16}}>Đang tải video... Đợi chút nha...</h4> :
            <div style={{height: 16}}/>}
          {!this.state.videoError && this.state.showCastButton && (
            <RaisedButton label={'Cast To Device'} style={{marginTop: 16, marginBottom: 16}} onClick={this.onCastClick}/>
          )
          }
          <Player
            ref={'player'}
            playsInline={true}
            preload={'auto'}
            poster={this.state.item.bigPoster}
            onError={this.onVideoError}
            onEnded={this.onVideoEnded}
            src={this.getVideoSource()}>
            <BigPlayButton position="center"/>
          </Player>
          {
            this.state.item.type === 'SERIE'
            && this.state.episodes
            && this.state.episodes.length > 0
            &&
            <SelectableList
              value={this.state.episode ? this.state.episode.order : -1}
            >
              {episodeItems}
            </SelectableList>
          }
          {
            this.state.item.type === 'SERIE' &&
            <RaisedButton label={'Cập Nhật Phần Mới'}
                          primary={true}
                          onClick={this.handleReloadEpisodeList}/>
          }
          <div id={'movie-content'}>
            {this.state.item.content}
          </div>
          <Divider className={'movie-divider'}/>
          <div id={'movie-content'} className={['grid-wrapper-2-cols']}>
            <div>
              <h4>Diễn Viên</h4>
              {this.state.item.actors.map((a, i) => (
                <span key={'film-details-actor-' + a}>
                <a onClick={() => this.handleActorClick(a)}
                   style={{color: '#0645AD'}}>{a}</a>
                  {i !== this.state.item.actors.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
            <div>
              <h4>Thể Loại</h4>
              {this.state.item.genres.map((genre, i, arr) => (
                <span key={'film-details-genre-' + genre}>
                <a onClick={() => this.handleGenreClick(genre)}
                   style={{color: '#0645AD'}}>{genre}</a>
                  {i < arr.length - 1 ? ', ' : ''}
                </span>
              ))
              }
            </div>
          </div>
        </div>
        }
      </PageBase>);
  }
}

export default WatchPage;