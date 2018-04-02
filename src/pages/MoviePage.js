import React from 'react';
import {AppBar} from 'material-ui';
import movieService from '../service/MovieService';
import appStyle from '../style/Style';

class MoviePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movieId: props.match.params.movieId
    }
  }

  componentDidMount = () => {
    movieService.getMovie(this.state.movieId).then(m => {
      this.setState({
        movie: m
      })
    });
  };

  render = () => (
    <div>
      {this.state.movie &&
      <div>
        <AppBar title={this.state.movie.title}
        onLeftIconButtonClick={()=>{this.props.history.goBack()}}/>
        <div style={appStyle.videoPlayerWrapper}>
        <video style={appStyle.videoPlayer} controls autoPlay={true}>
          <source src={this.state.movie.source}/>
        </video>
        </div>
      </div>
      }
    </div>
  )
}

export default MoviePage;