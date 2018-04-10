class NavigatorService {
  constructor() {
  
  }
  
  setHistory(history) {
    this.history = history;
  }
  
  goToMovie = (movie) => {
    this.history.push(`/watch/movie/${movie._id}`)
  };
  
  goToCategory = (category, page) => {
    if (!page) {
      page = 1;
    }
    this.history.push(`/category/${category.key}/page/${page}`);
  };
  
  goToSerie = (serie) => {
    this.history.push(`/watch/serie/${serie._id}`)
  };
  
  goToActor(actor) {
    this.history.push(`/actor/${actor.key}/page/1`)
  };
}

const navigatorService = new NavigatorService();

export default navigatorService;