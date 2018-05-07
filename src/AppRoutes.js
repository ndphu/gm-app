import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import ActorPage from './page/ActorPage';
import FilmRequestPage from './page/FilmRequestPage';
import GenrePage from './page/GenrePage';
import HomePage from './page/HomePage';
import SearchPage from './page/SearchPage';
import WatchPage from './page/WatchPage';
import ManagePage from './page/ManagePage';


const AppRoutes = () => {
  return (
    <Switch>
      <Route path={'/home'} component={HomePage}/>
      <Route path={'/genre/:genreKey/page/:page'} component={GenrePage}/>
      <Route path={'/actor'} component={ActorPage}/>
      <Route path={'/search/q/:query'} component={SearchPage}/>
      <Route exact={true} path={'/filmRequest'} component={FilmRequestPage}/>
      <Route path={'/filmRequest/q/:query'} component={FilmRequestPage}/>
      <Route path={'/watch/:itemId'} component={WatchPage}/>
      <Route path={'/manage'} component={ManagePage}/>
      <Redirect exact={true} from={'/'} to={'/home'}/>
    </Switch>
  );
};

export default AppRoutes;
