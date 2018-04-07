import React from 'react';
import movieService from '../../service/MovieService';
import MovieGridComponent from "../commons/MovieGridComponent";
import actions from '../../actions/Actions';
import PagingComponent from '../commons/PagingComponent';
import {loader} from '../commons/GlobalLoaderBar';

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      pageSize: 60,
    };
    this.handleItemClick.bind(this);
    this.paginationPageClick.bind(this);
    this.retrieveMovies.bind(this);
  }

  componentDidMount = () => {
    this.retrieveMovies(this.props.match.params.page - 1);
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.match.params.page !== this.props.match.params.page) {
      this.retrieveMovies(nextProps.match.params.page - 1);
    }
  };

  retrieveMovies = (page) => {
    loader.start();

    this.setState({
      movies: []
    });
    movieService.getMovies(page, this.state.pageSize).then(paginated => {
      loader.finish();
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
      })}
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
    this.props.history.push(`/home/page/${page}`);
  };

  render = () => (
    <div>
      <MovieGridComponent movies={this.state.movies}
                          onItemClick={this.handleItemClick}/>
      {this.state.movies.length > 0 && (
        <PagingComponent paging={this.state.paging}
                         onPageClick={this.paginationPageClick}/>
      )}
    </div>
  )

}

export default HomeComponent;