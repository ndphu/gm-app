import React from 'react';
import CategoryComponent from '../component/category/CategoryComponent';
import {Redirect, Route} from 'react-router-dom';

class CategoryPage extends React.Component {
  render = () => (
    <div id={'category-page-content'}>
      <Route path={'/category/:categoryKey/page/:page'} component={CategoryComponent}/>
      <Route exact path={'/category'} render={()=><Redirect to={'/category/kinh-di/page/1'}/>}/>
    </div>
  )
}

export default CategoryPage;