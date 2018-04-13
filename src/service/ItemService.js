import api from '../client/Api'

class ItemService {
  getById = (id) => {
    // return api.get(`/item/${id}`).then(item => {
    //   api.get(`/item/${id}/episodes`).then
    // });
    const _this = this;
    return new Promise((resolve, reject) => {
      Promise.all([_this.getItemById(id), _this.getItemEpisodes(id)])
        .then(result => {
          resolve(result);
        }).catch(err => {
        reject(err);
      })
    });
  };

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

  crawMovie = (item) => {
    return api.get(`/item/${item._id}/reload`);
  };
}

const itemService = new ItemService();

export default itemService;