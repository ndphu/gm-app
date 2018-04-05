import React from 'react';
import appStyle from '../style/Style';
import movieService from '../service/MovieService';
import {Col, Grid, PageHeader, Row, Well} from 'react-bootstrap';
import {Chip, Menu, MenuItem, Paper} from 'material-ui';

class WatchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
    this.handleActorClick.bind(this);
    this.handleCategoryClick.bind(this);
  }

  handleCountryClick = () => {

  };

  handleCategoryClick = (c) => {
    this.props.history.push(`/category/${c.key}/page/1`)
  };

  handleActorClick = (a) => {
    this.props.history.push(`/actor/${a.key}/page/1`)
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
        <Row id={'movie-component-paper-row'}>
          <Col>
            <PageHeader style={appStyle.headline}>{this.state.movie.title}</PageHeader>
            <div style={appStyle.videoPlayerWrapper}>
              <video style={appStyle.videoPlayer} controls>
                <source src={this.state.movie.videoSource}/>
              </video>
            </div>
            <div style={{padding: 16}}>
              <h4>Nội dung:</h4>
              <Well bsSize="small">{this.state.movie.content}</Well>
              <h4>Diễn Viên:</h4>
              <Menu style={{display: 'inline-block'}}>
                {this.state.movie.actors.map(a => (
                  <MenuItem key={'film-details-actor-' + a.key}
                            onClick={() => this.handleActorClick(a)}
                            primaryText={a.title}
                            style={{color: '#0645AD'}}/>
                ))}
              </Menu>
              <h4>Thể Loại:</h4>
              <Menu style={{display: 'inline-block'}}>
                {this.state.movie.categories.map(c => (
                  <MenuItem key={'film-details-category-' + c.key}
                            onClick={() => this.handleCategoryClick(c)}
                            primaryText={c.title}
                            style={{color: '#0645AD'}}/>
                ))}
              </Menu>
            </div>
          </Col>
        </Row>
      </Grid>
      }
    </div>
  )
}

export default WatchComponent;