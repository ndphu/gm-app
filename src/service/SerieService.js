import api from '../client/Api'
class SerieService {
  getSeries = (page, size) => {
    return api.get(`/serie?page=${page}&size=${size}`)
  };

  searchSeries = (query, page, size) => {
    return api.get(`/search/serie/byTitle?query=${query}&page=${page}&size=${size}`)
  };

  getSerieById = (id) => api.get(`/serie/${id}`)
}

const serieService = new SerieService();

export default serieService;