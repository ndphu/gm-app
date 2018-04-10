import React from 'react';
import SearchResultSection from './SearchResultSection';
import MovieListItem from './listitem/MovieListItem';


class MovieSearchResultSection extends SearchResultSection {
  getResultList = () => {
    return this.props.items.map(movie =>
      <MovieListItem key={'movie-list-item-' + movie._id}
                     movie={movie}/>
    );
  }
}

export default MovieSearchResultSection;