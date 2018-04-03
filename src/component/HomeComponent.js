import React from 'react';
import movieService from '../service/MovieService';
import MovieCard from './MovieCard';
import {Button, Col, Grid, Row} from 'react-bootstrap';
import {FlatButton, RaisedButton} from 'material-ui';
import MovieGridComponent from "./MovieGridComponent";

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      page: 1,
      pageSize: 24,
    };
    this.handleMovieClick.bind(this);
    this.nextPageClick.bind(this);
    this.retrieveMovies.bind(this);
  }

  nextPageClick = () => {
    this.state.page++;
    this.retrieveMovies();
  };

  componentDidMount = () => {
    this.retrieveMovies();
  };

  retrieveMovies = () => {
    movieService.getMovies(this.state.page, this.state.pageSize).then(paginated =>
      this.setState({movies: [...this.state.movies, ...paginated.items]})
    )
  };

  handleMovieClick = (m) => {
    this.props.history.push(`/gm/movie/${m.id}`)
  };

  render = () => (
    <div>
      <MovieGridComponent movies={this.state.movies} onItemClick={this.handleMovieClick}/>
      <RaisedButton label="Next" primary={true}
                    style={{margin: 16}}
                    onClick={this.nextPageClick}/>
    </div>
  )

}

export default HomeComponent;