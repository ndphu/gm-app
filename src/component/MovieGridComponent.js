import React from "react";
import {Col, Grid, Row} from "react-bootstrap";
import MovieCard from "./MovieCard";


class MovieGridComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({movies: nextProps.movies});
  };

  render = () => (
    <Grid>
      <Row>
        {this.state.movies.map((m) => (
          <Col xs={6} sm={4} md={3} lg={2} key={`movie-item-${m.id}`}>
            <MovieCard
              movie={m}
              onClick={() => this.props.onItemClick(m)}/>
          </Col>
        ))}
      </Row>
    </Grid>
  )
}

export default MovieGridComponent;