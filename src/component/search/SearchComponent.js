import React from 'react';
import movieService from '../../service/MovieService'
import MovieGridComponent from "../commons/MovieGridComponent";
import queryString from '../../utils/query-string';
import PagingComponent from "../commons/PagingComponent";
import actions from '../../actions/Actions';
import {loader} from '../commons/GlobalLoaderBar';

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      movies: [],
      pageSize: 60,
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
    loader.start();
    this.setState({
      movies: []
    });
    movieService.searchByTitle(query, page, this.state.pageSize).then(paginated => {
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
        });
        loader.finish();
      }
    )
  };

  handleItemClick = (action, data) => {
    switch (action) {
      case actions.movieClick:
        this.props.history.push(`/movie/${data.id}`);
        break;
      case actions.categoryClick:
        this.props.history.push(`/category/${data.key}/page/1`);
        break;
    }
  };

  paginationPageClick = (p) => {
    this.props.history.push(`/search/page/${p}?q=${this.state.query}`)
  };

  render = () => (
    <div>
      <MovieGridComponent movies={this.state.movies} onItemClick={this.handleItemClick}/>
      {this.state.movies.length > 0 && (
        <PagingComponent paging={this.state.paging}
                         onPageClick={this.paginationPageClick}/>
      )}
    </div>
  )
}

export default SearchComponent;