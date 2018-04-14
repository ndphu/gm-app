import React from 'react';
import {Paper} from 'material-ui';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import {blue600, green500} from "material-ui/styles/colors";
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline'
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';

const coverWidth = 160;
const coverHeight = 245;

const style = {
  card: {
    display: 'inline-block',
    position: 'relative',
    width: coverWidth,
    height: coverHeight + 85,
    textAlign: 'left',
    verticalAlign: 'top',
    whiteSpace: 'normal',
    maxWidth: coverWidth,
  },
  details: {
    paddingTop: 7,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    display: 'block',
    textAlign: 'left',
    whiteSpace: 'normal',
  },
  title: {
    fontSize: 16,
    color: '#616161',
    display: 'block',
    maxHeight: 36,
    minHeight: 18,
    //lineHeight: 18,
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative',
    whiteSpace: 'nowrap',
  },
  subTitle: {
    fontSize: 13,
    color: '#616161',
    display: 'block',
    maxHeight: 36,
    minHeight: 18,
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative',
    whiteSpace: 'nowrap',
  },
  ratesAndViews: {
    fontSize: 13,
    color: '#616161',
    display: 'block',
    position: 'absolute',
    bottom: 9,
    maxHeight: 38,
    padding: '0 10px',
    width: '100%',
  },
  paragraphEnd: {}
};

class SearchResultCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
    };
    this.handleItemClick.bind(this);
  }

  handleItemClick = () => {
    this.props.onClick(this.props.item);
  };

  onMouseEnter = () => {
    this.setState({
      hovering: true
    });
  };

  onMouseLeave = () => {
    this.setState({
      hovering: false
    });
  };

  getTooltip = (mesg) => {
    return (
      <Tooltip id="tooltip">
        <strong>{mesg}</strong>
      </Tooltip>
    );
  };

  render = () => (
    <Paper style={style.card}
           onMouseEnter={this.onMouseEnter}
           onMouseLeave={this.onMouseLeave}>
      <div className={'cardview-movie-poster'}>
        <img src={this.props.item.poster}
             alt={this.props.item.title}
             onClick={this.handleItemClick}/>
        <div className={['preview-overlay-container', this.state.hovering ? 'show' : ''].join(' ')}>
          <div className={['click-handler']} onClick={this.handleItemClick}/>
          <FloatingActionButton variant='fab' className={'quick-play'} mini={true}
                                onClick={this.handleQuickPlayClick}>
            <PlayCircleOutline/>
          </FloatingActionButton>
        </div>
      </div>
      <div style={style.details}>
        <OverlayTrigger placement="bottom" overlay={this.getTooltip(this.props.item.title)}>
          <a style={style.title} onClick={this.handleItemClick}>{this.props.item.title}
            <span style={style.paragraphEnd} className={'paragraph-end'}/>
          </a>
        </OverlayTrigger>
        <OverlayTrigger placement="bottom" overlay={this.getTooltip(this.props.item.subTitle)}>
          <a style={style.subTitle} onClick={this.handleItemClick}>{this.props.item.subTitle}
            <span style={style.paragraphEnd} className={'paragraph-end'}/>
          </a>
        </OverlayTrigger>
      </div>
      <div style={style.ratesAndViews}>
        <div style={{position: 'relative'}} onClick={() => {
          if (!this.props.item.itemId) {
            this.props.onClick(this.props.item);
          }
        }}>
          {this.props.item.itemId ?
            (<span><ActionCheckCircle color={green500} style={{maxWidth: 16, maxHeight: 16}}/></span>) :
            (<span><AddIcon color={blue600} style={{maxWidth: 16, maxHeight: 16}}/></span>)}
          <a style={{
            position: 'absolute',
            left: 22,
            cursor: this.props.item.itemId ? '' : 'pointer',
            bottom: 4,
            color: this.props.item.itemId ? green500 : blue600,
            display: 'inline-block'
          }}>{this.props.item.itemId ? 'Added' : 'Add Item'}</a>
        </div>
      </div>
    </Paper>
  )
}

export default SearchResultCard;