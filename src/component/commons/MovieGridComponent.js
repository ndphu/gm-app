import React from "react";
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
    <div className={'grid-wrapper'}>
      {this.state.movies.map((m) => (
        <MovieCard
          key={`movie-item-${m._id}`}
          movie={m}
          onClick={this.props.onItemClick}
        />
      ))}
    </div>
  )
}

export default MovieGridComponent;