import React from 'react';

class SearchResultSection extends React.Component {
  constructor(props) {
    super(props);
  }
  
  
  render = () => (
    <div className={'search-result-section-container'}>
      <div className={'search-result-section-header'}>{this.props.header}</div>
      {this.props.items.map(item =>
        <div key={'search-item-key-' + item._id}>
          <a onClick={() => this.props.onItemClick(item)}>
            {item.title}
          </a>
        </div>
      )}
    </div>
  )
}

export default SearchResultSection;