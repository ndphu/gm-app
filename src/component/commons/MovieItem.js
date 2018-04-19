import {Paper} from 'material-ui';
import React from 'react';


class MovieItem extends React.Component {
  render = () => {
    const item = this.props.item;
    return (
      <Paper className={'c-movie-item-container'}>
        <img className={'c-movie-item-cover'} src={item.poster}/>
        <p className={'c-movie-item-title'}>{item.title}</p>
        <p className={'c-movie-item-subtitle'}>{item.subTitle}</p>
      </Paper>
    )
  }
}

export default MovieItem;