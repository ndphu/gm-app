import React from 'react';
import {Divider} from 'material-ui';
import navigatorService from '../../../service/NavigatorService';
import categoryService from '../../../service/CategoryService';

class MovieListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
    };
  }

  render = () => (
    <div className={'list-item-movie-container'}>
      <img src={this.props.movie.poster}
           alt={this.props.movie.title}
           onClick={() => {
             navigatorService.goToMovie(this.props.movie)
           }}/>
      <div>
        <a className={'list-item-movie-title'}
           onClick={() => {
             navigatorService.goToMovie(this.props.movie)
           }}>
          {this.props.movie.title}
        </a>
        <span className={'list-item-movie-category'}>{this.props.movie.categories.map((category, idx) =>
          <a key={'list-item-movie-category-' + this.props.movie._id + '-' + category}
             onClick={() =>
               navigatorService.goToCategory(categoryService.getCategoryByTitle(category))}>
            {category + (idx < this.props.movie.categories.length - 1 ? ',' : '')}
          </a>
        )}</span>
      </div>
      <Divider/>
    </div>
  )
}

export default MovieListItem;