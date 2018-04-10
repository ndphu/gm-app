import React from 'react';


class SectionHeader extends React.Component {
  render = () => (
    <div className={'section-header-container'}>
      {this.props.onClick ? (
          <a onClick={() => this.props.onClick(this.props.category)}>
            {this.props.category.title}
          </a>
        ) :
        (<span>
          {this.props.category.title}
        </span>)}
    
    </div>
  )
}

export default SectionHeader;