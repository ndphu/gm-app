import React from 'react';
import serieService from '../../service/SerieService';
import MovieGridComponent from '../commons/MovieGridComponent';
import PagingComponent from '../commons/PagingComponent';
import {loader} from '../commons/GlobalLoaderBar';

class SeriesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      pageSize: 60,
      notFound: false,
    };
    this.handleItemClick.bind(this);
    this.paginationPageClick.bind(this);
    this.retrieveSeries.bind(this);
  }
  
  componentDidMount = () => {
    this.retrieveSeries(this.props.match.params.q, this.props.match.params.page - 1);
  };
  
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.match.params.page !== this.props.match.params.page
      || nextProps.match.params.q !== this.props.match.params.q) {
      this.retrieveSeries(nextProps.match.params.q, nextProps.match.params.page - 1);
    }
  };
  
  retrieveSeries = (q, page) => {
    loader.start();
    this.setState({
      series: [],
      notFound: false,
    });
    serieService.searchSeries(q, page, this.state.pageSize).then(paginated => {
        this.setState({
          series: paginated.content,
          paging: {
            number: paginated.number,
            size: paginated.size,
            totalPages: paginated.totalPages,
            totalElements: paginated.totalElements,
            last: paginated.last,
            first: paginated.first,
          },
          query: q,
          notFound: paginated.content.length === 0,
        });
        loader.finish();
      }
    )
  };
  
  paginationPageClick = (page) => {
    this.props.history.push(`/serie/q/${this.props.match.q}/page/:${page}`);
  };
  
  render = () => (
    <div>
      <MovieGridComponent movies={this.state.series} onItemClick={this.handleItemClick}/>
      {this.state.series.length > 0 && (
        <PagingComponent paging={this.state.paging}
                         onPageClick={this.paginationPageClick}/>
      )}
      {this.state.notFound && (
        <div className={['search-not-found-message']}>
          <h4>Không tìm thấy phim liên quan đến <span>{this.state.query}</span>. Vui lòng thử với từ khóa khác.</h4>
        </div>
      )}
    </div>
  )
  
}

export default SeriesComponent;