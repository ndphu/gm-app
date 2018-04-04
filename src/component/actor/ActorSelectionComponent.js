import React from 'react';
import {Col, Grid, Row} from 'react-bootstrap';
import {DropDownMenu, MenuItem} from 'material-ui';
import categoryService from '../../service/CategoryService';
import actorService from '../../service/ActorService';


class ActorSelectionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currentCategory: {},
    };
    this.handleCategoryChange.bind(this);
  }

  componentDidMount = () => {
    this.retrieveCategories();
  };

  handleCategoryChange = (event, index, item) => {
    this.setState({
      currentCategory: item
    });
    this.props.history.push(`/gm/actor/${item.key}/page/1`)
  };

  retrieveCategories = () => {
    if (this.state.categories.length === 0) {
      actorService.getActors().then(actors => {
        const list = actors.map((e) => {
          return Object.assign({}, {key: e.key.toLowerCase().replace(/ /g, '-')}, {title: e.title.toUpperCase()})
        });
        this.setState({
          categories: list,
          currentCategory: list.filter(cat => cat.key === this.props.match.params.categoryKey)[0],
        });
      });
    }
  };

  render = () => (
    <Grid>
      <Row>
        <Col>
          <DropDownMenu onChange={this.handleCategoryChange} value={this.state.currentCategory}>
            {this.state.categories.map(category => {
              return <MenuItem key={category.key} value={category} primaryText={category.title}/>
            })}
          </DropDownMenu>
        </Col>
      </Row>
    </Grid>
  )
}

export default ActorSelectionComponent;