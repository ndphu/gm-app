import React from 'react';
import CategoryComponent from './CategoryComponent';
import {Redirect, Route} from 'react-router-dom';
import CategorySelectionComponent from './CategorySelectionComponent';

class CategoryPage extends React.Component {
  render = () => (
    <div>
      <Route path={'/category/:categoryKey'} component={CategorySelectionComponent}/>
      <Route path={'/category/:categoryKey/page/:page'} component={CategoryComponent}/>
      <Route exact path={'/category'} render={()=><Redirect to={'/category/kinh-di/page/1'}/>}/>
    </div>
  )
}

export default CategoryPage;