import React from 'react';
import navigatorService from '../service/NavigatorService';
import searchService from '../service/SearchService';
import {loader} from '../component/commons/GlobalLoaderBar';
import PageBase from './PageBase';
import MovieGridComponent from '../component/commons/MovieGridComponent';
import SectionHeader from '../component/commons/SectionHeader';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notFound: false,
    };
  }

  componentDidMount = () => {
    const query = this.props.match.params.query;
    if (query) {
      this.performSearch(query);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const nextQuery = nextProps.match.params.query;
    if (nextQuery && nextQuery !== this.state.query) {
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
    <PageBase
      title={<span>Kết quả tìm kiếm bởi từ khóa <span style={{color: 'crimson'}}>{this.state.query}</span></span>}>
      {this.state.notFound && (
        <div className={['search-not-found-message']}>
          <h4>Không tìm thấy phim liên quan đến <span>{this.state.query}</span>. Vui lòng thử với từ khóa khác.</h4>
        </div>
      )}
      {this.state.result && (
        <div>
          {this.state.result.serie && this.state.result.serie.docs.length > 0 &&
          <div>
            <SectionHeader onClick={this.handleSectionHeaderClick} title={'Phim Bộ'}/>
            <div className={'section-content'}>
              <MovieGridComponent items={this.state.result.serie.docs}
                                  onItemClick={this.handleItemClick}/>
            </div>
          </div>
          }
          {this.state.result.movie && this.state.result.movie.docs.length > 0 &&
          <div>
            <SectionHeader onClick={this.handleSectionHeaderClick} title={'Phim Lẻ'}/>
            <div className={'section-content'}>
              <MovieGridComponent items={this.state.result.movie.docs}
                                  onItemClick={this.handleItemClick}/>
            </div>
          </div>
          }
          {this.state.result.actor && this.state.result.actor.docs.length > 0 &&
          <div>
            <SectionHeader onClick={this.handleSectionHeaderClick} title={'Diễn Viên'}/>
            <div style={{marginLeft: 16}}>
              {this.state.result.actor.docs.map((actor) => (
                <a key={`search-result-actor-${actor._id}`}
                   onClick={() => {
                     navigatorService.goToActor(actor);
                   }}
                   style={{display: 'block', cursor: 'pointer', fontSize: 16, margin: 4}}
                >
                  {actor.title}
                </a>
              ))
              }
            </div>
          </div>
          }
        </div>
      )}

    </PageBase>
  )
}

export default SearchPage;