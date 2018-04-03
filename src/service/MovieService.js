import api from '../client/Api'
class MovieService {

  currentMovie;

  getMovies = (page, size) => {
    return api.get(`/paginated?page=${page}&size=${size}`)
  };

  getMovie = (movieId) => {
    return api.get(`/movie/${movieId}`)
  };

  search = (q, page, size) => {
    return api.get(`/search?q=${q}&page=${page}&size=${size}`)
  };

  setCurrentMovie = (m) => {
    localStorage.setItem('currentMovie', JSON.stringify(m));
  };

  getCurrentMovie = () => JSON.parse(localStorage.getItem('currentMovie'));
}

const movieService = new MovieService();

export default movieService;