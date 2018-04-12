import {TextField} from 'material-ui';
import React from 'react';
import {loader} from '../component/commons/GlobalLoaderBar';
import RemoteSearchListItem from '../component/commons/listitem/RemoteSearchListItem';
import SearchBox from '../component/commons/SearchBox';
import searchService from '../service/SearchService';
import PageBase from './PageBase';

const styles = {
  searchBox: {
    marginBottom: 16
  }
};

class FilmRequestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: []
    };
  }
  
  onSearchSubmit = (query) => {
    this.performRemoteSearch(query);
  };
  
  onSearchItemClick = (item) => {
    loader.start();
    
    requestService.request(atob(item.link)).then((resp) => {
      console.log(resp)
      }
    );
  };
  
  performRemoteSearch = (query) => {
    loader.start();
    
    searchService.remoteSearch(query).then(result => {
      this.setState({
        result: result
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
          <SearchBox onSearchSubmit={this.onSearchSubmit}/>
          <div style={{marginTop: 16}}>
            {items}
          </div>
        </div>
      </PageBase>
    );
  };
  
}

export default FilmRequestPage;