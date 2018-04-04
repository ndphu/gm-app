import React from 'react';
import movieService from '../service/MovieService'
import MovieGridComponent from "./MovieGridComponent";
import queryString from '../utils/query-string';
import {Grid, Row} from "react-bootstrap";
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
    this.performSearch(this.props.match.params.page, queryString.parse(this.props.location.search).q);
  };

  componentWillReceiveProps = (nextProps) => {
    const nextQuery = queryString.parse(nextProps.location.search).q;
    const nextPage = nextProps.match.params.page;
    if (nextQuery !== this.state.query || nextPage !== this.props.match.params.page) {
      this.performSearch(nextPage, nextQuery);
    }
  };

  performSearch = (page, query) => {
    this.setState({
      movies: []
    });
    movieService.search(query, page, this.state.pageSize).then(paginated =>
      this.setState({
        movies: paginated.items,
        paging: paginated.paging,
        query: query
      })
    )
  };

  handleItemClick = (m) => {
    this.props.history.push(`/gm/movie/${m.id}`)
  };

  paginationPageClick = (p) => {
    this.props.history.push(`/gm/search/page/${p}?q=${this.state.query}`)
  };

  render = () => (
    <div>
      <MovieGridComponent movies={this.state.movies}
                          onItemClick={this.handleItemClick}/>
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

export default SearchComponent;