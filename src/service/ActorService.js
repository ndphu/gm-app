import api from '../client/Api'

class ActorService {
  getActors = () => {
    return api.get(`/actor`)
  };
  
  getActorByKey = (key) => {
    return api.get(`/actor/byKey/${key}`);
  };
  
  getItemsByActor = (actor, page, size) => {
    return api.get(`/actor/byKey/${actor.key}/items?page=${page}&size=${size}`);
  };
}

const actorService = new ActorService();

export default actorService;