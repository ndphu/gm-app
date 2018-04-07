import React from "react";
import {Pagination} from "react-bootstrap";


class PagingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paging: null,
    }
  }

  componentDidMount = () => {
    this.updateState(this.props.paging)
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.paging.page !== this.props.paging.page) {
      this.updateState(nextProps.paging)
    }
  };

  updateState = (paging) => {
    this.setState({
      paging: paging,
      prevPrev: paging.number-1,
      prev: paging.number,
      next: paging.number + 2,
      nextNext: paging.number+ 3,
    });
  };

  getPageItem = (page) => {
    return <Pagination.Item onClick={() => this.props.onPageClick(page)}>{page}</Pagination.Item>;
  };

  render = () => {
    return (
      <div className={'paging-container'}>
        {this.state.paging && (
          <Pagination>
            {!this.state.paging.first && (
              <Pagination.First onClick={() => this.props.onPageClick(1)}/>)}
            {!this.state.paging.first && (
              <Pagination.Prev onClick={() => this.props.onPageClick(this.state.paging.number)}/>)}
            {this.state.prevPrev >= 1 && (this.getPageItem(this.state.prevPrev))}
            {this.state.prev >= 1 && (this.getPageItem(this.state.prev))}
            {this.state.paging.totalPages > 1 && <Pagination.Item active>{this.state.paging.number + 1}</Pagination.Item>}
            {this.state.next <= this.state.paging.totalPages && (this.getPageItem(this.state.next))}
            {this.state.nextNext <= this.state.paging.totalPages && (this.getPageItem(this.state.nextNext))}
            {!this.state.paging.last && (
              <Pagination.Next onClick={() => this.props.onPageClick(this.state.paging.number + 2)}/>)}
            {!this.state.paging.last && (
              <Pagination.Last onClick={() => this.props.onPageClick(this.state.paging.totalPages)}/>)}
          </Pagination>
        )}
      </div>
    )
  }
  ;
}

export default PagingComponent;