import {Divider} from 'material-ui';
import React from 'react';

class RemoteSearchListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
    };
  }
  
  render = () => (
    <div className={'list-item-remote-search-container'}>
      <div className={'item-poster'}
           onClick={() => {this.props.onItemClick(this.props.item)}}
           style={{
             backgroundImage: `url(${this.props.item.poster})`
           }}/>
      <div>
        <a className={'list-item-remote-search-title'}
           onClick={() => {this.props.onItemClick(this.props.item)}}>
          {this.props.item.title}
        </a>
        <span className={'list-item-remote-search-subtitle'}
              onClick={() => {this.props.onItemClick(this.props.item)}}>{this.props.item.subTitle}</span>
      </div>
      {!this.props.isLast && <Divider/>}
    </div>
  )
}

export default RemoteSearchListItem;