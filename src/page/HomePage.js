import React from 'react';
import actions from '../actions/Actions';
import homeService from '../service/HomeService'
import {loader} from '../component/commons/GlobalLoaderBar';
import MovieGridComponent from '../component/commons/MovieGridComponent';
import SectionHeader from '../component/commons/SectionHeader';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
    };
    this.handleItemClick.bind(this);
    this.handleSectionHeaderClick.bind(this);
    this.paginationPageClick.bind(this);
  }
  
  componentDidMount = () => {
    this.retrieveHome();
  };
  
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.match.params.page !== this.props.match.params.page) {
      this.retrieveHome();
    }
  };
  
  retrieveHome = () => {
    loader.start();
    
    this.setState({
      sections: []
    });
    homeService.getHome().then(sections => {
        loader.finish();
        this.setState({
          sections: sections,
        })
      }
    )
  };
  
  handleItemClick = (action, data) => {
    switch (action) {
      case actions.movieClick:
        this.props.history.push(`/movie/${data.id}`);
        break;
      case actions.categoryClick:
        this.props.history.push(`/category/${data.key}/page/1`);
        break;
      default:
        break;
    }
  };
  
  handleSectionHeaderClick = (category) => {
    this.props.history.push(`/category/${category.key}/page/1`);
  };
  
  paginationPageClick = (page) => {
    this.props.history.push(`/home/page/${page}`);
  };
  
  render = () => (
    <div>
      {this.state.sections.map(section => (
        <div className={'section-container'} key={'home-section-' + section.category.key}>
          <SectionHeader onClick={this.handleSectionHeaderClick} category={section.category}/>
          <div className={'section-content'}>
            <MovieGridComponent movies={section.movies}
                                onItemClick={this.handleItemClick}/>
          </div>
        </div>
      ))}
    </div>
  )
  
}

export default HomePage;