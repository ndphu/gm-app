import api from '../client/Api'

class SearchService {
  
  search = (query, page, size) => {
    return api.get(`/search/q/${query}?page=${page}&size=${size}`);
  };
  
  remoteSearch(query, source) {
    return api.get(`/search/remote/q/${query}?source=${source ? source : 0}`);
  }
}

const searchService = new SearchService();

export default searchService;