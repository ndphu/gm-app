import React from 'react';
import movieService from '../../service/MovieService';
import {Grid, Row} from 'react-bootstrap';
import MovieGridComponent from "../MovieGridComponent";
import PagingComponent from "../PagingComponent";

class CategoryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      pageSize: 24,
      categories: [],
    };
    this.handleMovieClick.bind(this);
    this.paginationPageClick.bind(this);
    this.retrieveMovies.bind(this);
  }

  componentDidMount = () => {
    this.retrieveMovies(this.props.match.params.categoryKey, this.props.match.params.page);
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.match.params.page !== this.props.match.params.page
      || nextProps.match.params.categoryKey !== this.props.match.params.categoryKey) {
      this.retrieveMovies(nextProps.match.params.categoryKey, nextProps.match.params.page);
    }
  };

  retrieveMovies = (categoryKey, page) => {
    this.setState({
      movies: []
    });
    movieService.getMoviesByCategory(categoryKey, page, this.state.pageSize).then(paginated =>
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
    this.props.history.push(`/category/${this.props.match.params.categoryKey}/page/${page}`);
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

export default CategoryComponent;