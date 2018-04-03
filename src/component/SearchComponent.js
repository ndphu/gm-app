import React from 'react';
import movieService from '../service/MovieService'
import MovieGridComponent from "./MovieGridComponent";
import queryString from '../utils/query-string';

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      movies: [],
      page: 1,
      pageSize: 100,
    }
  }

  componentDidMount = () => {
    this.state.query = queryString.parse(this.props.location.search).q;
    this.performSearch();
  };

  componentWillReceiveProps = (nextProps) => {
    const nextQuery = queryString.parse(nextProps.location.search).q;
    if (nextQuery !== this.state.query) {
      this.state.query = nextQuery;
      this.performSearch();
    }
  };

  performSearch() {
    console.log(this.state.query);
    movieService.search(this.state.query, this.state.page, this.state.pageSize).then(paginated =>
      this.setState({movies: paginated.items})
    )
  }

  handleItemClick = (m) => {
    this.props.history.push(`/gm/movie/${m.id}`)
  };

  render = () => (
    <div>
      <MovieGridComponent movies={this.state.movies}
                          onItemClick={this.handleItemClick}/>
    </div>
  )
}

export default SearchComponent;