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
    this.setState({paging: paging})
  };

  render = () => (
    <div>
      {this.state.paging && (
        <Pagination>
          {!this.state.paging.first && (
            <Pagination.First onClick={() => this.props.onPageClick(1)}/>)}
          {!this.state.paging.first && (
            <Pagination.Prev onClick={() => this.props.onPageClick(this.state.paging.number)}/>)}
          <Pagination.Item active>{this.state.paging.number + 1}</Pagination.Item>
          {!this.state.paging.last && (
            <Pagination.Next onClick={() => this.props.onPageClick(this.state.paging.number + 2)}/>)}
          {!this.state.paging.last && (
            <Pagination.Last onClick={() => this.props.onPageClick(this.state.paging.totalPages)}/>)}
        </Pagination>
      )}
    </div>
  );
}

export default PagingComponent;