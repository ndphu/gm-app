import api from '../client/Api';

class RequestService {
  request = (link) => {
    const data = btoa(link);
    return api.post('/request', {url: data});
  }
}

const requestService = new RequestService();

export default requestService;