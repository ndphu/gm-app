import api from '../client/Api'

class ItemService {
  getById = (id) => {
    const _this = this;
    return new Promise((resolve, reject) => {
      Promise.all([_this.getItemById(id), _this.getItemEpisodes(id)])
        .then(result => {
          const item = result[0];
          const episodes = result[1];
          if (item.type === 'MOVIE') {
            this.checkMovieItem(episodes, item, resolve, reject);
          } else if (item.type === 'SERIE') {
            if (episodes.length === 0) {
              this.reload(item).then(item => {
                this.getItemEpisodes(item._id).then(episodes => {
                  if (episodes.length === 0) {
                    // still no episodes, return error
                    reject({err: 'serie has no episode'});
                  } else {
                    this.checkFirstEpisode(item, episodes, resolve, reject);
                  }
                }).catch(reject);
              });
            } else {
              this.checkFirstEpisode(item, episodes, resolve, reject);
            }
          }
        }).catch(err => {
        reject(err);
      })
    });
  };

  checkFirstEpisode(item, episodes, resolve, reject) {
    if (!episodes[0].videoSource) {
      this.crawEpisode(episodes[0]).then(episode => {
        episodes[0] = episode;
        resolve({
          item: item,
          episodes: episodes,
          episode: episode,
        });
      }).catch(reject);
    } else {
      resolve({
        item: item,
        episodes: episodes,
        episode: episodes[0],
      });
    }
  }

  checkMovieItem(episodes, item, resolve, reject) {
    if (episodes.length === 0) {
      this.reload(item).then(item => {
        this.getItemEpisodes(item._id).then(episodes => {
          resolve({
            item: item,
            episodes: episodes,
            episode: episodes[0],
          });
        }).catch(reject);
      });
    } else if (!episodes[0].videoSource) {
      this.crawEpisode(episodes[0]).then(episode => {
        resolve({
          item: item,
          episodes: episodes,
          episode: episode,
        })
      });
    } else {
      resolve({
        item: item,
        episodes: episodes,
        episode: episodes[0],
      });
    }
  }

  getItemById = (id) => {
    return api.get(`/item/${id}`);
  };

  getItemEpisodes = (id) => {
    return api.get(`/item/${id}/episodes`);
  };

  reload = (item) => {
    return api.get(`/item/${item._id}/reload`);
  };

  crawEpisode = (episode) => {
    return api.get(`/episode/${episode._id}/reload`);
  };
  
  reloadEpisodeList = (item) => {
    return api.get(`/item/${item._id}/reloadEpisodeList`);
  };
}

const itemService = new ItemService();

export default itemService;