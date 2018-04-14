import React from 'react';
import {loader} from '../component/commons/GlobalLoaderBar';
import RemoteSearchListItem from '../component/commons/listitem/RemoteSearchListItem';
import SearchBox from '../component/commons/SearchBox';
import searchService from '../service/SearchService';
import PageBase from './PageBase';
import requestService from '../service/RequestService';
import {Paper} from 'material-ui';
import navigatorService from '../service/NavigatorService';

const styles = {
  searchBox: {
    marginBottom: 16
  }
};

class FilmRequestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
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
    if (newQuery && newQuery !== this.state.query) {
      this.performRemoteSearch(newQuery);
    }
  };

  onSearchItemClick = (item) => {
    loader.start();
    requestService.request(item.link, item.poster).then((resp) => {
        loader.finish();
        navigatorService.goToItem(resp);
      }
    );
  };

  performRemoteSearch = (query) => {
    loader.start();
    searchService.remoteSearch(query).then(result => {
      this.setState({
        result: result,
        query: query,
      });
      loader.finish();
    });
  };

  getSearchResultItems = () => {
    return this.state.result.map((item, idx, array) => (
      <RemoteSearchListItem
        item={item}
        isLast={idx === array.length - 1}
        onItemClick={this.onSearchItemClick}
        key={`remote-search-result-${idx}`}
      />
    ))
  };

  render = () => {
    const items = this.getSearchResultItems();

    return (
      <PageBase title="Tìm Phim">
        <div>
          <SearchBox onSearchSubmit={this.onSearchSubmit}
                     query={this.state.query}/>
          <Paper style={{marginTop: 16}}>
            {items}
          </Paper>
        </div>
      </PageBase>
    );
  };

}

export default FilmRequestPage;