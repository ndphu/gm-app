import React from 'react';
import appStyle from '../style/Style';
import movieService from '../service/MovieService';
import {Grid, PageHeader, Row, Well} from 'react-bootstrap';
import {Avatar, Chip, Paper} from 'material-ui';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';

class WatchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    }
  }

  handleCountryClick = () => {

  };

  handleCategoryClick = () => {

  };

  handleActorClick = () => {

  };

  handleDirectorClick = () => {

  };

  componentDidMount = () => {
    movieService.getMovie(this.props.match.params.movieId).then(m => {
      this.setState({
        movie: m
      })
    });
  };

  render = () => (
    <div>
      {this.state.movie &&
      <Grid>
        <Row>
          <Paper style={{paddingLeft: 16, paddingRight: 16, paddingBottom: 16, marginBottom: 16}}>
            <PageHeader style={appStyle.headline}>{this.state.movie.title}</PageHeader>
            <div style={appStyle.videoPlayerWrapper}>
              <video style={appStyle.videoPlayer} controls>
                <source src={this.state.movie.videoSource}/>
              </video>
            </div>
            <h4>Nội dung:</h4>
            <Well bsSize="small">{this.state.movie.content}</Well>
            <h4>Đạo diễn:</h4>
            <div>
              {this.state.movie.directors.map(d => (
                <Chip key={'chip-director-' + d}
                      onClick={()=>this.handleDirectorClick}
                      style={{margin: 4}}>
                  {d}
                </Chip>
              ))
              }
            </div>
            <h4>Diễn viên:</h4>
            <div>
              {this.state.movie.actors.map(a => (
                <Chip key={'chip-actor-' + a}
                  onClick={()=>this.handleActorClick}
                  style={{margin: 4}}>
                  {a}
                </Chip>
              ))
              }
            </div>
            <h4>Thể loại:</h4>
            <div>
              {this.state.movie.categories.map(c => (
                <Chip key={'chip-category-' + c}
                      onClick={()=>this.handleCategoryClick}
                      style={{margin: 4}}>
                  {c}
                </Chip>
              ))
              }
            </div>
            <h4>Quốc Gia:</h4>
            <div>
              {this.state.movie.countries.map(c => (
                <Chip key={'chip-country-' + c}
                      onClick={()=>this.handleCountryClick}
                      style={{margin: 4}}>
                  {c}
                </Chip>
              ))
              }
            </div>
          </Paper>
        </Row>
      </Grid>
      }
    </div>
  )
}

export default WatchComponent;