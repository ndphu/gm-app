import {Paper} from 'material-ui';
import React from 'react';


class MovieItem extends React.Component {
  render = () => {
    const item = this.props.item;
    return (
      <Paper className={'c-movie-item-container'}>
        <img className={'c-movie-item-poster'} src={item.poster}/>
        <span className={'c-movie-item-title'}>{item.title}</span>
        <span className={'c-movie-item-subtitle'}>{item.subTitle}</span>
      </Paper>
    )
  }
}

export default MovieItem;