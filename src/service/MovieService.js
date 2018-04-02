import api from '../client/Api'
class MovieService {

  currentMovie;

  getMovies = (page, size) => {
    return api.get(`/paginated?page=${page}&size=${size}`)
  };

  getMovie = (movieId) => {
    return api.get(`/movie/${movieId}`)
  };

  setCurrentMovie = (m) => {
    localStorage.setItem('currentMovie', JSON.stringify(m));
  };

  getCurrentMovie = () => JSON.parse(localStorage.getItem('currentMovie'));
}

const movieService = new MovieService();

export default movieService;