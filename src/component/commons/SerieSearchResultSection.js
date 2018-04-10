import React from 'react';
import SearchResultSection from './SearchResultSection';
import SerieListItem from './listitem/SerieListItem';


class SerieSearchResultSection extends SearchResultSection {
  getResultList = () => {
    return this.props.items.map(serie =>
      <SerieListItem key={'serie-list-item-' + serie._id}
                     serie={serie}/>
    );
  }
}

export default SerieSearchResultSection;