import api from '../client/Api'
class HomeService {
  getHome = () => {
    return api.get('/home');
  }
}

const homeService = new HomeService();

export default homeService;