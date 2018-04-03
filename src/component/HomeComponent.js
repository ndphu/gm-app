import React from 'react';
import movieService from '../service/MovieService';
import MovieCard from './MovieCard';
import {Button, Col, Grid, Pagination, Row} from 'react-bootstrap';
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
      {/*<RaisedButton label="Next" primary={true}*/}
      {/*style={{margin: 16}}*/}
      {/*onClick={this.nextPageClick}/>*/}
      <Grid>
        <Row>
            <Pagination>
              <Pagination.First/>
              <Pagination.Prev/>
              <Pagination.Item active={this.state.page === 1}>{1}</Pagination.Item>
              {this.state.page > 4 && (<Pagination.Ellipsis/>)}
              {this.state.page > 2 && (<Pagination.Item>{this.state.page - 2}</Pagination.Item>)}

              <Pagination.Item>{this.state.page - 1}</Pagination.Item>
              <Pagination.Item active>{this.state.page}</Pagination.Item>
              <Pagination.Item>{this.state.page + 1}</Pagination.Item>
              <Pagination.Item>{this.state.page + 2}</Pagination.Item>
              <Pagination.Ellipsis/>
              <Pagination.Item>{15}</Pagination.Item>
              <Pagination.Next/>
              <Pagination.Last/>
            </Pagination>
        </Row>
      </Grid>

    </div>
  )

}

export default HomeComponent;