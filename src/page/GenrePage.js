import React from 'react';
import {loader} from '../component/commons/GlobalLoaderBar';
import MovieGridComponent from '../component/commons/MovieGridComponent';
import PagingComponent from '../component/commons/PagingComponent';
import genreSerivce from '../service/GenreService';
import PageBase from './PageBase';

class GenrePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      pageSize: 60,
      genre: {},
      paging: {},
    };
    this.paginationPageClick.bind(this);
    this.retrieveMovies.bind(this);
  }
  
  componentDidMount = () => {
    this.retrieveMovies(this.props.match.params.genreKey, this.props.match.params.page);
  };
  
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.match.params.page !== this.props.match.params.page
      || nextProps.match.params.genreKey !== this.props.match.params.genreKey) {
      this.retrieveMovies(nextProps.match.params.genreKey, nextProps.match.params.page);
    }
  };
  
  retrieveMovies = (genreKey, page) => {
    loader.start();
    this.setState({
      items: []
    });
    const genre = genreSerivce.getGenreByKey(genreKey);
    genreSerivce.getGenreItems(genre, page, this.state.pageSize).then(resp => {
        const items = resp.items;
        this.setState({
          genre: resp.genre,
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
    this.props.history.push(`/genre/${this.props.match.params.genreKey}/page/${page}`);
  };
  
  render = () => (
    <PageBase title={this.state.genre ? this.state.genre.title : ''}>
      <div>
        <MovieGridComponent items={this.state.items}
                            onItemClick={this.handleItemClick}/>
        {this.state.items.length > 0 && (
          <PagingComponent paging={this.state.paging}
                           onPageClick={this.paginationPageClick}/>
        )}
      </div>
    </PageBase>
  )
}

export default GenrePage;