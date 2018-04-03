import React from 'react';
import movieService from '../service/MovieService';
import MovieCard from './MovieCard';
import {Button, Col, Grid, Pagination, Row} from 'react-bootstrap';
import {FlatButton, RaisedButton} from 'material-ui';
import MovieGridComponent from "./MovieGridComponent";

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      page: 1,
      pageSize: 24,
      totalItem: 0,
      totalPage: 0,

    };
    this.handleMovieClick.bind(this);
    this.paginationFirstClick.bind(this);
    this.paginationLastClick.bind(this);
    this.paginationNextClick.bind(this);
    this.paginationPrevClick.bind(this);
    this.paginationPageClick.bind(this);
    this.retrieveMovies.bind(this);
  }

  componentDidMount = () => {
    this.retrieveMovies(1);
  };

  retrieveMovies = (page) => {
    this.setState({
      movies: []
    });
    movieService.getMovies(page, this.state.pageSize).then(paginated =>
      this.setState({
        //movies: [...this.state.movies, ...paginated.items],
        movies: paginated.items,
        page: page,
        prev10: page - 10,
        prevPrev: page - 2,
        prev: page - 1,
        next: page + 1,
        nextNext: page + 2,
        next10: page + 10,
        totalItem: paginated.totalItem,
        totalPage: paginated.totalPage,
      })
    )
  };

  handleMovieClick = (m) => {
    this.props.history.push(`/gm/movie/${m.id}`)
  };

  paginationFirstClick = () => {
    this.retrieveMovies(1);
  };

  paginationLastClick = () => {
    this.retrieveMovies(this.state.totalPage);
  };

  paginationPageClick = (page) => {
    this.retrieveMovies(page);
  };

  paginationPrevClick = () => {
    if (this.state.page > 1) {
      this.retrieveMovies(this.state.page - 1);
    }
  };

  paginationNextClick = () => {
    if (this.state.page < 15) {
      this.retrieveMovies(this.state.page + 1);
    }
    ;
  };

  render = () => (
    <div>
      <MovieGridComponent movies={this.state.movies} onItemClick={this.handleMovieClick}/>
      {/*<RaisedButton label="Next" primary={true}*/}
      {/*style={{margin: 16}}*/}
      {/*onClick={this.nextPageClick}/>*/}
      <Grid>
        <Row id={'pagination-container'}>
          {/*{this.state.movies.length > 0 && (*/}
          {/*<div>*/}
          {/*{this.state.prevPrev > 1 &&*/}
          {/*<FlatButton style={{maxWith:32}} onClick={this.paginationFirstClick} label={'First'}/>}*/}
          {/*{this.state.page > 1 &&*/}
          {/*<FlatButton onClick={this.paginationPrevClick} label={'<'}/>}*/}
          {/*{this.state.prev10 >= 1 &&*/}
          {/*<FlatButton label={this.state.prev10} onClick={() => {*/}
          {/*this.paginationPageClick(this.state.prev10)*/}
          {/*}}/>}*/}
          {/*{this.state.prevPrev >= 1 &&*/}
          {/*<FlatButton label={this.state.prevPrev} onClick={() => {*/}
          {/*this.paginationPageClick(this.state.prevPrev)*/}
          {/*}}/>}*/}
          {/*{this.state.prev >= 1 &&*/}
          {/*<FlatButton label={this.state.prev} onClick={() => {*/}
          {/*this.paginationPageClick(this.state.prev)*/}
          {/*}}/>}*/}
          {/*<FlatButton primary={true} label={this.state.page}/>*/}
          {/*{this.state.next <= this.state.totalPage &&*/}
          {/*<FlatButton label={this.state.next} onClick={() => {*/}
          {/*this.paginationPageClick(this.state.next)*/}
          {/*}}/>}*/}
          {/*{this.state.nextNext <= this.state.totalPage &&*/}
          {/*<FlatButton label={this.state.nextNext} onClick={() => {*/}
          {/*this.paginationPageClick(this.state.nextNext)*/}
          {/*}}/>}*/}
          {/*{this.state.next10 <= this.state.totalPage &&*/}
          {/*<FlatButton label={this.state.next10} onClick={() => {*/}
          {/*this.paginationPageClick(this.state.next10)*/}
          {/*}}/>}*/}
          {/*{this.state.page < this.state.totalPage &&*/}
          {/*<FlatButton label={'>'} onClick={this.paginationNextClick}/>}*/}
          {/*{this.state.page < this.state.totalPage &&*/}
          {/*<FlatButton label={'Last'} onClick={this.paginationLastClick}/>}*/}
          {/*</div>*/}
          {/*)}*/}
          {this.state.movies.length > 0 &&
          <Pagination>
            {this.state.prevPrev > 1 &&
            <Pagination.First onClick={this.paginationFirstClick}/>}
            {this.state.page > 1 &&
            <Pagination.Prev onClick={this.paginationPrevClick}/>}
            {this.state.prev10 >= 1 &&
            <Pagination.Item onClick={() => {
              this.paginationPageClick(this.state.prev10)
            }}>{this.state.prev10}</Pagination.Item>}
            {this.state.prevPrev >= 1 &&
            <Pagination.Item onClick={() => {
              this.paginationPageClick(this.state.prevPrev)
            }}>{this.state.prevPrev}</Pagination.Item>}
            {this.state.prev >= 1 &&
            <Pagination.Item onClick={() => {
              this.paginationPageClick(this.state.prev)
            }}>{this.state.prev}</Pagination.Item>}
            <Pagination.Item active>{this.state.page}</Pagination.Item>
            {this.state.next <= this.state.totalPage &&
            <Pagination.Item onClick={() => {
              this.paginationPageClick(this.state.next)
            }}>{this.state.next}</Pagination.Item>}
            {this.state.nextNext <= this.state.totalPage &&
            <Pagination.Item onClick={() => {
              this.paginationPageClick(this.state.nextNext)
            }}>{this.state.nextNext}</Pagination.Item>}
            {this.state.next10 <= this.state.totalPage &&
            <Pagination.Item onClick={() => {
              this.paginationPageClick(this.state.next10)
            }}>{this.state.next10}</Pagination.Item>}
            {this.state.page < this.state.totalPage &&
            <Pagination.Next onClick={this.paginationNextClick}/>}
            {this.state.page < this.state.totalPage &&
            <Pagination.Last onClick={this.paginationLastClick}/>}
          </Pagination>
          }
        </Row>
      </Grid>

    </div>
  )

}

export default HomeComponent;