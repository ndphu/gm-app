import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import ActorComponent from './ActorComponent';
import ActorSelectionComponent from './ActorSelectionComponent';

class ActorPage extends React.Component {
  render = () => (
    <div>
      {/*<Route path={'/gm/actor/:actorKey'} component={ActorSelectionComponent}/>*/}
      <Route path={'/gm/actor/:actorKey/page/:page'} component={ActorComponent}/>
      <Route exact path={'/gm/actor'} render={()=><Redirect to={'/gm/actor/johnny-depp/page/1'}/>}/>
    </div>
  )
}

export default ActorPage;