import React from 'react';


class SectionHeader extends React.Component {
  render = () => (
    <div className={'section-header-container'}>
      {this.props.onClick ?
        <a onClick={this.props.onClick}>
          {this.props.title}
        </a>
        :
        (<span>
          {this.props.title}
        </span>)}

    </div>
  )
}

export default SectionHeader;