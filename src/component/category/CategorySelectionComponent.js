import {Drawer, MenuItem, RaisedButton} from 'material-ui';
import React from 'react';
import categoryService from '../../service/CategoryService';


class CategorySelectionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      open: false,
      currentCategory: {},
    };
    this.handleCategoryChange.bind(this);
    this.onMenuItemClick.bind(this);
  }

  componentDidMount = () => {
    this.retrieveCategories();
  };

  handleCategoryChange = (event, index, item) => {
    this.setState({
      currentCategory: item
    });
    this.props.history.push(`/category/${item.key}/page/1`)
  };

  retrieveCategories = () => {
    if (this.state.categories.length === 0) {
      categoryService.getCategories().then(categories => {
        categories.content.sort(function (c1, c2) {
          if (c1.key < c2.key) {
            return -1;
          } else if (c1.key > c2.key) {
            return 1;
          } else {
            return 0;
          }
        });
        this.setState({
          categories: categories.content,
          currentCategory: categories.content.filter(cat => cat.key === this.props.match.params.categoryKey)[0],
        });
      });
    }
  };

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  onMenuItemClick = (category) => {
    if (category.key !== this.props.match.params.categoryKey) {
      this.props.history.push(`/category/${category.key}/page/1`)
    }
    this.setState({
      open: false,
      currentCategory: category
    });
  };

  render = () => (
    <div id={'category-page-content-list'}>
      {/*<Menu style={{display: 'inline-block',}}>*/}
      {this.state.currentCategory && (
        <div style={{display: 'flex', margin: 8, marginLeft: 16}}>
          <h3 >{this.state.currentCategory.title}</h3>
          <RaisedButton style={{margin: 16}} label={'CHANGE'} primary={true} onClick={this.handleToggle}/>
        </div>
      )}
      <Drawer
        docked={false}
        width={220}
        open={this.state.open}
        onRequestChange={(open) => this.setState({open})}>
        {this.state.categories.map(category => {
          return <MenuItem key={category.key} primaryText={category.title}
                           onClick={() => this.onMenuItemClick(category)}/>
        })}
      </Drawer>
      {/*</Menu>*/}

    </div>
  )
}

export default CategorySelectionComponent;