import React from 'react';
import movieService from '../service/MovieService';
import MovieCard from './MovieCard';
import {Button, Col, Grid, Row} from 'react-bootstrap';
import {FlatButton, RaisedButton} from 'material-ui';

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      page: 1,
      pageSize: 24,
    };
    this.handleMovieClick.bind(this);
    this.nextPageClick.bind(this);
    this.retrieveMovies.bind(this);
  }

  nextPageClick = () => {
    this.state.page++;
    this.retrieveMovies();
  };

  componentDidMount = () => {
    this.retrieveMovies();
  };

  retrieveMovies = () => {
    movieService.getMovies(this.state.page, this.state.pageSize).then(paginated =>
        this.setState({ movies: [...this.state.movies, ...paginated.items] })
      //this.setState({movies: paginated.items})
    )
  };

  handleMovieClick = (m) => {
    console.log(m);
    this.props.history.push(`/gm/user/watch/${m.id}`)
  };

  render = () => (
    <div>
      <Grid>
        <Row className="show-grid">
          {this.state.movies.map((m) => (
            <Col xs={6} sm={4} md={3} lg={2} key={`movie-item-${m.id}`}>
              <MovieCard
                         movie={m}
                         onClick={this.handleMovieClick}/>
            </Col>
          ))}
        </Row>
        <Row>
          <RaisedButton label="Next" primary={true}
                        style={{margin: 16}}
          onClick={this.nextPageClick}/>
        </Row>
      </Grid>
    </div>
  )

}

export default HomeComponent;