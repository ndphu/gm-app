import React from 'react';
import movieService from '../service/MovieService';
import appStyle from "../style/Style";
import MovieCard from './MovieCard';

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      page: 0,
      pageSize: 12,
    }
    this.handleMovieClick.bind(this);
  }

  componentDidMount = () => {
    movieService.getMovies(this.state.page, this.state.pageSize).then(paginated =>
      this.setState({movies: paginated.content})
    )
  };

  handleMovieClick = (m) => {
    movieService.setCurrentMovie(m);
    this.props.history.push('/gm/user/watch')
  };

  render = () => (
    <div style={appStyle.content}>
      <h2 style={appStyle.headline}>Home</h2>
      <div
        style={appStyle.movieGrid}>
        {this.state.movies.map((m) => (
          <MovieCard key={`movie-item-${m.id}`}
                     movie={m}
                     onClick={this.handleMovieClick}/>
        ))}
      </div>
    </div>
  )

}

export default HomeComponent;