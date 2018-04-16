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
import {convertToKey} from '../utils/StringUtils';
import PageBase from './PageBase';

let SelectableList = makeSelectable(List);

class WatchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      videoError: false,
    };
    this.onEpisodeClick.bind(this);
    this.handleGenreClick.bind(this);
    this.handleActorClick.bind(this);
    this.handleReloadEpisodeList.bind(this);
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
    itemService.getById(itemId).then((result) => {
      this.setState(result);
      loader.finish();
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
  
  onVideoError = () => {
    loader.start();
    itemService.crawEpisode(this.state.episode).then(episode => {
      this.setCurrentEpisode(episode);
      loader.finish();
    })
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
          <div style={{height: 16}}/>
          {this.state.videoError &&
          <h4 style={{color: 'crimson', padding: 16}}>Không tìm thấy file video.<br/>Sử dụng chức năng Tải Lại có thể
            khắc
            phục vấn đề.<br/>Quá trình tải lại có thể mất vài phút.</h4>}
          {this.state.videoError &&
          <RaisedButton primary={true}
                        label="Tải Lại"
                        onClick={this.reloadVideo}
                        style={{marginLeft: 16}}/>}
          {!this.state.videoError &&
          <Player
            ref={'player'}
            playsInline={true}
            preload={'auto'}
            poster={this.state.item.bigPoster}
            onError={this.onVideoError}
            onEnded={this.onVideoEnded}
            src={this.getVideoSource()}>
            <BigPlayButton position="center"/>
          </Player>}
          {
            this.state.item.type === 'SERIE' && this.state.episodes.length > 0 &&
            <SelectableList
              value={this.state.episode.order}
              
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