import React from 'react';
import {Col, Grid, Row} from 'react-bootstrap';
import {DropDownMenu, MenuItem} from 'material-ui';
import categoryService from '../../service/CategoryService';


class CategorySelectionComponent extends React.Component {
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
    this.props.history.push(`/gm/category/${item.key}/page/1`)
  };

  retrieveCategories = () => {
    if (this.state.categories.length === 0) {
      categoryService.getCategories().then(categories => {
        const list = categories.map((e) => {
          return Object.assign({}, {key: e.key.toLowerCase().replace(/ /g, '-')}, {title: e.title.toUpperCase()})
        });
        list.sort(function (c1, c2) {
          if (c1.key < c2.key) {
            return -1;
          } else if (c1.key > c2.key){
            return 1;
          } else {
            return 0;
          }
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

export default CategorySelectionComponent;