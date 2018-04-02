import React from 'react';
import appStyle from '../style/Style';
import movieService from '../service/MovieService';


class WatchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    }
  }

  componentDidMount = () => {
    console.log(movieService.getCurrentMovie());
    if (movieService.getCurrentMovie()) {
      this.setState({
        movie: movieService.getCurrentMovie()
      })
    }
  };

  render = () => (
    <div>
      {this.state.movie &&
      <div>
        <h2 style={appStyle.headline}>{this.state.movie.title}</h2>
        <div style={appStyle.videoPlayerWrapper}>
          <video style={appStyle.videoPlayer} controls autoPlay={true}>
            <source src={this.state.movie.videoSource}/>
          </video>
        </div>
      </div>
      }
    </div>
  )
}

export default WatchComponent;