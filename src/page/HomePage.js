import React from 'react';
import {loader} from '../component/commons/GlobalLoaderBar';
import MovieGridComponent from '../component/commons/MovieGridComponent';
import SectionHeader from '../component/commons/SectionHeader';
import homeService from '../service/HomeService'
import navigatorService from '../service/NavigatorService';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
    };
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

  handleSectionHeaderClick = (category) => {
    //this.props.history.push(`/category/${category.key}/page/1`);
    navigatorService.goToCategory(category);
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
            <MovieGridComponent items={section.items}
                                onItemClick={this.handleItemClick}/>
          </div>
        </div>
      ))}
    </div>
  )

}

export default HomePage;