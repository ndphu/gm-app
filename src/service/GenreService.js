import api from '../client/Api'

class GenreService {
  getCategoryByKey = (key) => {
    return this.genres.filter(category => category.key === key)[0];
  };

  fetchGenres = () => {
    if (!this.genres) {
      return api.get('/genre');
    } else {
      return Promise.resolve({docs: this.genres});
    }
  };

  getGenres = () => {
    return this.genres;
  };

  setGenres = (genres) => {
    this.genres = genres;
  };

  getMoviesByCategory = (genre, page, size) => {
    return api.get(`/genre/${genre._id}/items?page=${page}&size=${size}`);
  };

  getGenreByTitle = (title) => {
    return this.genres.filter(genre => genre.title === title)[0];
  }
}

const genreService = new GenreService();

export default genreService;