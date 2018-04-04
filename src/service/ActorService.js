import api from '../client/Api'
class ActorService {
  getActors = () => {
    return api.get(`/actor`)
  };
}

const actorService = new ActorService();

export default actorService;