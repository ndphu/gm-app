import React from 'react';
import movieService from '../service/MovieService';
import {Grid, Row} from 'react-bootstrap';
import MovieGridComponent from "./MovieGridComponent";
import PagingComponent from "./PagingComponent";

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      pageSize: 24,
    };
    this.handleMovieClick.bind(this);
    this.paginationPageClick.bind(this);
    this.retrieveMovies.bind(this);
  }

  componentDidMount = () => {
    this.retrieveMovies(this.props.match.params.page);
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.match.params.page !== this.props.match.params.page) {
      this.retrieveMovies(nextProps.match.params.page);
    }
  };

  retrieveMovies = (page) => {
    this.setState({
      movies: []
    });
    movieService.getMovies(page, this.state.pageSize).then(paginated =>
      this.setState({
        movies: paginated.items,
        paging: paginated.paging,
      })
    )
  };

  handleMovieClick = (m) => {
    this.props.history.push(`/movie/${m.id}`)
  };

  paginationPageClick = (page) => {
    this.props.history.push(`/home/page/${page}`);
  };

  render = () => (
    <div>
      <MovieGridComponent movies={this.state.movies} onItemClick={this.handleMovieClick}/>
      <Grid>
        <Row id={'pagination-container'}>
          {this.state.movies.length > 0 && (
            <PagingComponent paging={this.state.paging}
              onPageClick={this.paginationPageClick}/>
          )}
        </Row>
      </Grid>
    </div>
  )

}

export default HomeComponent;