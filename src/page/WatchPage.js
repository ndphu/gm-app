import React from 'react';
import PageBase from './PageBase';
import itemService from '../service/ItemService';
import {loader} from '../component/commons/GlobalLoaderBar';
import {Divider, List, ListItem, Paper, RaisedButton} from 'material-ui';
import {BigPlayButton, Player} from 'video-react';


class WatchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null
    };
  }

  componentDidMount = () => {
    this.getItem(this.props.match.params.itemId);
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.episode || !this.state.episode || this.state.episode.order !== prevState.episode.order) {
      if (this.refs.player) {
        this.refs.player.load();
        this.refs.player.play();
      }
    }
  }

  getItem = (itemId) => {
    loader.start();
    itemService.getById(itemId).then((result) => {
      const item = result[0];
      const episodes = result[1];
      const episode =  episodes.length === 0 ? null : episodes[0];
      this.setState({
        item: item,
        episodes: episodes,
        episode: episode,
      });
      loader.finish();
      if (item.type === 'MOVIE') {
        if (episode) {
          if (!episode.videoSource) {
            loader.start();
            itemService.crawEpisode(episode).then(episode => {
              this.setState({
                episode: episode
              });
              if (this.refs.player) {
                this.refs.player.load();
              }
              loader.finish();
            });
          }
        } else {
          loader.start();
          itemService.crawMovie(item).then(episode => {
            this.setState({
              episodes: [episode],
              episode: episode,
            });
            if (this.refs.player) {
              this.refs.player.load();
              this.refs.player.play();
            }
            loader.finish();
          });
        }
      } else if (item.type === 'SERIE') {
        //this.reloadItem(item);
      }
    });
  };

  getVideoSource = () => {
    const notFound = '/not_found';
    const item = this.state.item;
    const currentEpisode = this.state.currentEpisode;
    if (item) {
      switch (item.type) {
        case 'MOVIE':
          return this.state.episode ? this.state.episode.videoSource : notFound;
        case 'SERIE':
          if (currentEpisode) {
            return currentEpisode.videoSource;
          } else {
            return notFound;
          }
        default: {
          return notFound;
        }
      }
    } else {
      return notFound;
    }
  };

  getPageTitle = () => {
    return this.state.episode ? this.state.episode.title :
      (this.state.item ? this.state.item.title : '')
  };


  render = () => {
    return <PageBase wrapPaper={true}
                     title={this.getPageTitle()}>
      {this.state.item &&
      <div>
        {this.state.videoError &&
        <h4 style={{color: 'crimson', padding: 16}}>Không tìm thấy file video.<br/>Sử dụng chức năng Tải Lại có thể khắc
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
          fluid={true}
          preload={'auto'}
          poster={this.state.item.bigPoster}
          src={this.state.episode ? this.state.episode.videoSource : ''}
          onError={this.onVideoError}>
          <BigPlayButton position="center"/>
        </Player>}
        {this.state.item.type === 'SERIE' &&
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
                <a onClick={() => this.handleCategoryClick(genre)}
                   style={{color: '#0645AD'}}>{genre}</a>
                {i < arr.length - 1 ? ', ' : ''}
                </span>
            ))
            }
          </div>
        </div>
      </div>
      }
    </PageBase>;
  }
}

export default WatchPage;