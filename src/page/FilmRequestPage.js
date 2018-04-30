import React from 'react';
import {loader} from '../component/commons/GlobalLoaderBar';
import SearchBox from '../component/commons/SearchBox';
import searchService from '../service/SearchService';
import PageBase from './PageBase';
import requestService from '../service/RequestService';
import navigatorService from '../service/NavigatorService';
import SearchResultCard from '../component/commons/SearchResultCard';
import {RadioButton, RadioButtonGroup} from 'material-ui';

class FilmRequestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      source: "0",
    };
  }

  onSearchSubmit = (query) => {
    navigatorService.goToFilmRequest(query);
  };

  componentDidMount = () => {
    const query = this.props.match.params.query;
    console.log('Component did mount with query = ' + query);
    if (query && query !== this.state.query) {
      this.performRemoteSearch(query);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const newQuery = nextProps.match.params.query;
    if (newQuery && newQuery !== this.props.match.params.query) {
      this.performRemoteSearch(newQuery);
    }
  };

  onSearchItemClick = (item) => {
    if (item.itemId) {
      navigatorService.goToItem({_id: item.itemId});
    } else {
      loader.start();
      requestService.request(item.link, item.poster).then((resp) => {
          loader.finish();
          this.state.result.filter(i => i.link === resp.source).forEach(item => {
            item.itemId = resp._id;
          });
          this.setState({
              result: this.state.result
            }
          );
        }
      );
    }
  };

  performRemoteSearch = (query) => {
    loader.start();
    searchService.remoteSearch(query, this.state.source).then(result => {
      this.setState({
        result: result,
        query: query,
      });
      loader.finish();
    });
  };

  getSearchResultItems = () => {
    return this.state.result.map((item) => (
      <SearchResultCard
        key={`search-item-${item.link}`}
        item={item}
        onClick={this.onSearchItemClick}
      />
    ))
  };

  onSourceChange = (event, value) => {
    this.setState({
      source: value,
    })
  };

  render = () => {
    const items = this.getSearchResultItems();

    return (
      <PageBase title='Thêm Phim Mới'>
        <div>
          <SearchBox onSearchSubmit={this.onSearchSubmit}
                     query={this.state.query}
                     searchHint={'Tìm theo tên phim'}/>
          <RadioButtonGroup defaultSelected="0"
                            style={{marginTop: 16}}
                            name={'request-from-source'}
                            onChange={this.onSourceChange}>
            <RadioButton
              value="0"
              label="VungTV"
              style={{marginBottom: 16}}
              labelStyle={{fontWeight: 400}}
            />
            <RadioButton
              value="1"
              label="BanhTV"
              style={{marginBottom: 16}}
              labelStyle={{fontWeight: 400}}
            />
          </RadioButtonGroup>
          <div style={{marginTop: 32}}>
            <div className={'grid-wrapper'}>
              {items}
            </div>
          </div>
        </div>
      </PageBase>
    );
  };

}

export default FilmRequestPage;