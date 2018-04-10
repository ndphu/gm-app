import api from '../client/Api'

class SearchService {
  
  search = (query, page, size) => {
    return api.get(`/search/q/${query}?page=${page}&size=${size}`);
  };
}

const searchService = new SearchService();

export default searchService;