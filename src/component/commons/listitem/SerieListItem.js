import React from 'react';
import {Divider} from 'material-ui';
import navigatorService from '../../../service/NavigatorService';
import categoryService from '../../../service/CategoryService';

class SerieListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
    };
  }

  render = () => (
    <div className={'list-item-movie-container'}>
      <img src={this.props.serie.poster}
           alt={this.props.serie.title}
           onClick={() => {
             navigatorService.goToSerie(this.props.serie)
           }}/>
      <div>
        <a className={'list-item-movie-title'}
           onClick={() => {
             navigatorService.goToSerie(this.props.serie)
           }}>
          {this.props.serie.title}
        </a>
        <span className={'list-item-movie-category'}>{this.props.serie.categories.map((category, idx) =>
          <a key={'list-item-movie-serie-category-' + this.props.serie._id + '-' + category}
             onClick={() =>
               navigatorService.goToCategory(categoryService.getCategoryByTitle(category))}>
            {category + (idx < this.props.serie.categories.length - 1 ? ',' : '')}
          </a>
        )}</span>
      </div>
      <Divider/>
    </div>
  )
}

export default SerieListItem;