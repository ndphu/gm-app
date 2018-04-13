class NavigatorService {
  setHistory(history) {
    this.history = history;
  }
  
  goToMovie = (movie) => {
    this.history.push(`/watch/${movie._id}`)
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

  goToSearch(query) {
    this.history.push(`/search/q/${query}`);

  }

  goToHome() {
    this.history.push(`/home`);
  }

  setLocation(location) {
    this.location = location;
  }

  getHistory() {
    return this.history;
  }

  getLocation() {
    return this.location;
  }
  
  goToFilmRequest(query) {
    if (query) {
      this.history.push(`/filmRequest/q/${query}`)
    } else {
      this.history.push(`/filmRequest`)
    }
  }
}

const navigatorService = new NavigatorService();

export default navigatorService;