import React from 'react';
import navigatorService from '../../service/NavigatorService';
import searchService from '../../service/SearchService';
import SearchResultSection from '../commons/SearchResultSection';
import {loader} from '../commons/GlobalLoaderBar';
import MovieSearchResultSection from '../commons/MovieSearchResultSection'
import SerieSearchResultSection from '../commons/SerieSearchResultSection';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notFound: false,
    };
  }

  componentDidMount = () => {
    if (!this.state.query) {
      this.performSearch(this.props.match.params.query);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const nextQuery = nextProps.match.params.query;
    if (nextQuery !== this.state.query) {
      this.performSearch(nextQuery);
    }
  };

  performSearch = (query) => {
    loader.start();
    searchService.search(query, 1, 25).then(resp => {
      this.setState({
        result: resp,
        query: query,
        notFound: resp.actor.docs.length === 0
        && resp.serie.docs.length === 0
        && resp.movie.docs.length === 0
      });
      loader.finish();
    });
  };

  render = () => (
    <div className={['search-page-container']}>
      {this.state.notFound && (
        <div className={['search-not-found-message']}>
          <h4>Không tìm thấy phim liên quan đến <span>{this.state.query}</span>. Vui lòng thử với từ khóa khác.</h4>
        </div>
      )}
      {!this.state.notFound && (
        <div className={['search-not-found-message']}>
          <h4>Kết quả tìm kiếm của <span>{this.state.query}</span>.</h4>
        </div>
      )}
      {this.state.result && (
        <div>
          {this.state.result.serie &&
          <div className={['search-result-container']}>
            {this.state.result.serie.docs.length > 0 &&
            <SerieSearchResultSection items={this.state.result.serie.docs}
                                 header={'Phim Bộ'}
                                 onItemClick={(serie) => navigatorService.goToSerie(serie)}/>
            }
          </div>
          }
          {this.state.result.movie &&
          <div className={['search-result-container']}>
            {this.state.result.movie.docs.length > 0 &&
            <MovieSearchResultSection items={this.state.result.movie.docs}
                                 header={'Phim Lẻ'}
                                 onItemClick={(movie) => navigatorService.goToMovie(movie)}/>
            }
          </div>
          }
          {this.state.result.actor &&
          <div className={['search-result-container']}>
            {this.state.result.actor.docs.length > 0 &&
            <SearchResultSection items={this.state.result.actor.docs}
                                 header={'Diễn Viên'}
                                 onItemClick={(actor) => navigatorService.goToActor(actor)}/>
            }
          </div>
          }
        </div>
      )}

    </div>
  )
}

export default SearchPage;