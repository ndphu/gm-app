import React from 'react';
import movieService from '../service/MovieService'
import MovieGridComponent from "./commons/MovieGridComponent";
import queryString from '../utils/query-string';
import {Col, Grid, Row} from "react-bootstrap";
import PagingComponent from "./PagingComponent";

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      movies: [],
      pageSize: 24,
    }
  }

  componentDidMount = () => {
    this.performSearch(this.props.match.params.page - 1, queryString.parse(this.props.location.search).q);
  };

  componentWillReceiveProps = (nextProps) => {
    const nextQuery = queryString.parse(nextProps.location.search).q;
    const nextPage = nextProps.match.params.page;
    if (nextQuery !== this.state.query || nextPage !== this.props.match.params.page) {
      this.performSearch(nextPage - 1, nextQuery);
    }
  };

  performSearch = (page, query) => {
    this.setState({
      movies: []
    });
    movieService.searchByTitle(query, page, this.state.pageSize).then(paginated =>
      this.setState({
        query: query,
        movies: paginated.content,
        paging: {
          number: paginated.number,
          size: paginated.size,
          totalPages: paginated.totalPages,
          totalElements: paginated.totalElements,
          last: paginated.last,
          first: paginated.first,
        },
      })
    )
  };

  handleMovieClick = (m) => {
    this.props.history.push(`/movie/${m.id}`)
  };

  paginationPageClick = (p) => {
    this.props.history.push(`/search/page/${p}?q=${this.state.query}`)
  };

  render = () => (
    <div>
      <MovieGridComponent movies={this.state.movies} onItemClick={this.handleMovieClick}/>
      {this.state.movies.length > 0 && (
        <Grid>
          <Row id={'pagination-container'}>
            <PagingComponent paging={this.state.paging}
                             onPageClick={this.paginationPageClick}/>
          </Row>
        </Grid>
      )}
      {this.state.movies.length === 0 && (
        <Grid>
          <Row>
            <Col>
              <h2>Loading...</h2>
            </Col>
          </Row>
        </Grid>
      )}
    </div>
  )
}

export default SearchComponent;