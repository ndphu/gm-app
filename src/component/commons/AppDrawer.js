import React from 'react';
import {Drawer, ListItem} from 'material-ui';
import GenreIcon from 'material-ui/svg-icons/av/library-books';
import HomeIcon from 'material-ui/svg-icons/action/home';
import navigationService from '../../service/NavigatorService';
import categoryService from '../../service/CategoryService';

class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.categoryItems = categoryService.getCategories().map(category => {
      return <ListItem key={category.key}
                       primaryText={category.title}
                       onClick={() => {
                         this.setState({open: false});
                         navigationService.goToCategory(category);
                       }}/>
    });
  }
  
  componentDidMount = () => {
    this.setState({
      open: this.props.open,
    })
  };
  
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.open !== this.state.open) {
      this.setState({
        open: nextProps.open,
      });
    }
  };
  
  render = () => (
    <Drawer
      docked={false}
      width={220}
      open={this.state.open}
      onRequestChange={(open) => this.setState({open})}>
      <ListItem
        primaryText={'Trang Chủ'}
        leftIcon={<HomeIcon/>}
        onClick={() => {
          this.setState({open: false});
          navigationService.goToHome();
        }}
      />
      <ListItem
        primaryText='Thể Loại'
        leftIcon={<GenreIcon/>}
        initiallyOpen={false}
        primaryTogglesNestedList={true}
        nestedItems={this.categoryItems}/>
    </Drawer>
  )
}

export default AppDrawer;