import React from 'react';
import CategoryComponent from './CategoryComponent';
import {Redirect, Route} from 'react-router-dom';
import CategorySelectionComponent from './CategorySelectionComponent';

class CategoryPage extends React.Component {
  render = () => (
    <div>
      <Route path={'/gm/category/:categoryKey'} component={CategorySelectionComponent}/>
      <Route path={'/gm/category/:categoryKey/page/:page'} component={CategoryComponent}/>
      <Route exact path={'/gm/category'} render={()=><Redirect to={'/gm/category/kinh-di/page/1'}/>}/>
    </div>
  )
}

export default CategoryPage;