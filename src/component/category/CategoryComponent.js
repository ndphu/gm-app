import React from 'react';
import categoryService from '../../service/CategoryService';
import {loader} from '../commons/GlobalLoaderBar';
import MovieGridComponent from '../commons/MovieGridComponent';
import PagingComponent from '../commons/PagingComponent';
import SectionHeader from '../commons/SectionHeader';

class CategoryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      pageSize: 60,
      category: {},
      paging: {},
    };
    this.handleItemClick.bind(this);
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
    loader.start();
    this.setState({
      movies: []
    });
    const category = categoryService.getCategoryByKey(categoryKey);
    categoryService.getMoviesByCategory(category, page, this.state.pageSize).then(resp => {
        const movies = resp.movies;
        this.setState({
          category: resp.category,
          movies: movies.docs,
          paging: {
            number: movies.page,
            size: movies.limit,
            totalPages: movies.pages,
            totalElements: movies.total
          },
        });
        loader.finish();
      }
    )
  };
  
  paginationPageClick = (page) => {
    this.props.history.push(`/category/${this.props.match.params.categoryKey}/page/${page}`);
  };
  
  render = () => (
    <div id={'category-page-content-grid'}>
      <SectionHeader category={this.state.category}/>
      <div className={'section-content'}>
        <MovieGridComponent movies={this.state.movies}
                            onItemClick={this.handleItemClick}/>
      </div>
      {this.state.movies.length > 0 && (
        <PagingComponent paging={this.state.paging}
                         onPageClick={this.paginationPageClick}/>
      )}
    </div>
  )
}

export default CategoryComponent;