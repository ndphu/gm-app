import api from '../client/Api';

class RequestService {
  request = (link, poster) => {
    return api.post('/request', {url: btoa(link), poster: btoa(poster)});
  }
}

const requestService = new RequestService();

export default requestService;