import React from 'react';
import categoryService from '../../service/GenreService';
import {loader} from '../commons/GlobalLoaderBar';
import MovieGridComponent from '../commons/MovieGridComponent';
import PagingComponent from '../commons/PagingComponent';
import SectionHeader from '../commons/SectionHeader';

class CategoryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      pageSize: 60,
      category: {},
      paging: {},
    };
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
      items: []
    });
    const category = categoryService.getCategoryByKey(categoryKey);
    categoryService.getMoviesByCategory(category, page, this.state.pageSize).then(resp => {
        const items = resp.items;
        this.setState({
          category: resp.category,
          items: items.docs,
          paging: {
            number: items.page,
            size: items.limit,
            totalPages: items.pages,
            totalElements: items.total
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
        <MovieGridComponent items={this.state.items}
                            onItemClick={this.handleItemClick}/>
      </div>
      {this.state.items.length > 0 && (
        <PagingComponent paging={this.state.paging}
                         onPageClick={this.paginationPageClick}/>
      )}
    </div>
  )
}

export default CategoryComponent;