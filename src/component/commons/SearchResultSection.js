import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui';

class SearchResultSection extends React.Component {
  getResultList = () => {
    return this.props.items.map(item =>
      <div key={'search-item-key-' + item._id}>
        <a onClick={() => this.props.onItemClick(item)} className={'link'}>
          {item.title}
        </a>
      </div>
    );
  };

  render = () => (
    <Card expandable={true} initiallyExpanded={true}>
      <CardHeader
        title={this.props.header}
        subtitle={this.props.items.length + ' kết quả'}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        {this.getResultList()}
      </CardText>
    </Card>
  )
}

export default SearchResultSection;