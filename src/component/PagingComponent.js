import React from "react";
import {Pagination} from "react-bootstrap";


class PagingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
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
    const page = paging.page;
    this.setState({
      page: page,
      prev10: page - 10,
      prevPrev: page - 2,
      prev: page - 1,
      next: page + 1,
      nextNext: page + 2,
      next10: page + 10,
      totalItem: paging.totalItem,
      totalPage: paging.totalPage,
    });
  };

  render = () => (
    <Pagination>
      {this.state.prevPrev > 1 &&
      <Pagination.First onClick={() => this.props.onPageClick(1)}/>}
      {this.state.page > 1 &&
      <Pagination.Prev onClick={() => this.props.onPageClick(this.state.page - 1)}/>}
      {this.state.prev10 >= 1 &&
      <Pagination.Item onClick={() => this.props.onPageClick(this.state.prev10)}>{this.state.prev10}</Pagination.Item>}
      {this.state.prevPrev >= 1 &&
      <Pagination.Item onClick={() => this.props.onPageClick(this.state.prevPrev)}>{this.state.prevPrev}</Pagination.Item>}
      {this.state.prev >= 1 &&
      <Pagination.Item onClick={() => this.props.onPageClick(this.state.prev) }>{this.state.prev}</Pagination.Item>}
      <Pagination.Item active>{this.state.page}</Pagination.Item>
      {this.state.next <= this.state.totalPage &&
      <Pagination.Item onClick={() => this.props.onPageClick(this.state.next)}>{this.state.next}</Pagination.Item>}
      {this.state.nextNext <= this.state.totalPage &&
      <Pagination.Item onClick={() => this.props.onPageClick(this.state.nextNext)}>{this.state.nextNext}</Pagination.Item>}
      {this.state.next10 <= this.state.totalPage &&
      <Pagination.Item onClick={() => this.props.onPageClick(this.state.next10)}>{this.state.next10}</Pagination.Item>}
      {this.state.page < this.state.totalPage &&
      <Pagination.Next onClick={() => this.props.onPageClick(this.state.page + 1)}/>}
      {this.state.page < this.state.totalPage &&
      <Pagination.Last onClick={() => this.props.onPageClick(this.state.totalPage)}/>}
    </Pagination>
  );
}

export default PagingComponent;