import React from 'react';
import movieService from '../../service/MovieService';
import MovieGridComponent from "../commons/MovieGridComponent";
import actions from '../../actions/Actions';
import PagingComponent from '../commons/PagingComponent';
import {loader} from '../commons/GlobalLoaderBar';

class CategoryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      pageSize: 60,
      paging: {},
      categories: [],
    };
    this.handleItemClick.bind(this);
    this.paginationPageClick.bind(this);
    this.retrieveMovies.bind(this);
  }

  componentDidMount = () => {
    this.retrieveMovies(this.props.match.params.categoryKey, this.props.match.params.page - 1);
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.match.params.page !== this.props.match.params.page
      || nextProps.match.params.categoryKey !== this.props.match.params.categoryKey) {
      this.retrieveMovies(nextProps.match.params.categoryKey, nextProps.match.params.page - 1);
    }
  };

  retrieveMovies = (categoryKey, page) => {
    loader.start();
    this.setState({
      movies: []
    });
    movieService.getMoviesByCategory(categoryKey, page, this.state.pageSize).then(paginated => {
        this.setState({
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
      default:
        break;
    }
  };

  paginationPageClick = (page) => {
    this.props.history.push(`/category/${this.props.match.params.categoryKey}/page/${page}`);
  };

  render = () => (
    <div id={'category-page-content-grid'}>
      <MovieGridComponent movies={this.state.movies}
                          onItemClick={this.handleItemClick}/>
      {this.state.movies.length > 0 && (
        <PagingComponent paging={this.state.paging}
                         onPageClick={this.paginationPageClick}/>
      )}
    </div>
  )
}

export default CategoryComponent;