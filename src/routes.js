import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import MovieComponent from './component/movie/MovieComponent';
import WatchSerieComponent from './component/serie/WatchSerieComponent';
import ActorPage from './page/ActorPage';
import CategoryPage from './page/CategoryPage';
import FilmRequestPage from './page/FilmRequestPage';
import HomePage from './page/HomePage';
import SearchPage from './page/SearchPage';
import SeriePage from './page/SeriePage';


const AppRoutes = (props) => {
  return (
    <Switch>
      <Route path={'/home'} component={HomePage}/>
      <Route path={'/category'} component={CategoryPage}/>
      <Route path={'/actor'} component={ActorPage}/>
      <Route path={'/serie'} component={SeriePage}/>
      <Route path={'/search/q/:query'} component={SearchPage}/>
      <Route exact={true} path={'/filmRequest'} component={FilmRequestPage}/>
      <Route path={'/filmRequest/q/:query'} component={FilmRequestPage}/>
      <Route path={'/watch/serie/:serieId'} component={WatchSerieComponent}/>
      <Route path={'/watch/movie/:movieId'} component={MovieComponent}/>
      <Redirect exact={true} from={'/'} to={'/home'}/>
    </Switch>
  );
};

export default AppRoutes;
