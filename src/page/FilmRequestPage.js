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
      query: '',
    };
  }

  onSearchSubmit = (query) => {
    navigatorService.goToFilmRequest(query);
  };

  componentDidMount = () => {
    this.setState({
      query: this.props.match.params.query,
    });
  };

  componentWillReceiveProps = (nextProps) => {
    let newQuery = nextProps.match.params.query;
    if (newQuery !== this.state.query) {
      this.performRemoteSearch(newQuery);
    }
  };

  onSearchItemClick = (item) => {
    loader.start();

    requestService.request(item.link).then((resp) => {
        console.log(resp);
        loader.finish();
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
      <PageBase title="Yêu Cầu Phim">
        <div>
          <SearchBox onSearchSubmit={this.onSearchSubmit}
                     query={this.state.query}/>
          {/*<div style={{marginTop: 16}}>*/}
          {/*{items}*/}
          {/*</div>*/}
          <Paper style={{marginTop: 16}}>
            {items}
          </Paper>
        </div>
      </PageBase>
    );
  };

}

export default FilmRequestPage;