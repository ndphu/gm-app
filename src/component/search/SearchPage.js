import {Paper} from 'material-ui';
import {TextField} from 'material-ui';
import React from 'react';
import navigatorService from '../../service/NavigatorService';
import searchService from '../../service/SearchService';
import SearchResultSection from '../commons/SearchResultSection';


class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSearchKeyPress.bind(this);
  }
  
  onSearchKeyPress = (e) => {
    e.target.setAttribute('maxlength', 128);
    const query = e.target.value.trim();
    if (e.key === 'Enter' && query) {
      this.performSearch(query);
    }
  };
  
  performSearch = (query) => {
    searchService.search(query, 1, 25).then(resp => {
      this.setState({
        result: resp,
      })
    });
  };
  
  render = () => (
    <div className={['search-page-container']}>
      <div className={['search-box-container']}>
        <Paper style={{width: 720, maxWidth: 720, paddingLeft: 16, paddingRight: 16}}>
          <TextField fullWidth={true}
                     style={{fontSize: 14}}
                     hintText='Tìm kiếm theo tên phim, diễn viên...'
                     onKeyPress={this.onSearchKeyPress}
                     underlineStyle={{display: 'none'}}
                     underlineFocusStyle={{display: 'none'}}/>
        </Paper>
      </div>
      {this.state.result && (
        <div>
          {this.state.result.actor &&
          <div className={['search-result-container']}>
            {this.state.result.actor.docs.length > 0 &&
            <SearchResultSection items={this.state.result.actor.docs}
                                 header={'Actors'}
              onItemClick={(actor) => navigatorService.goToActor(actor)}/>
            }
          </div>
          }
          {this.state.result.serie &&
          <div className={['search-result-container']}>
            {this.state.result.serie.docs.length > 0 &&
            <SearchResultSection items={this.state.result.serie.docs}
                                 header={'Series'}
                                 onItemClick={(serie) => navigatorService.goToSerie(serie)}/>
            }
          </div>
          }
          {this.state.result.movie &&
          <div className={['search-result-container']}>
            {this.state.result.movie.docs.length > 0 &&
            <SearchResultSection items={this.state.result.movie.docs}
                                 header={'Movies'}
                                 onItemClick={(movie) => navigatorService.goToMovie(movie)}/>
            }
          </div>
          }
        </div>
      )
      
      }
    </div>
  )
}

export default SearchPage;