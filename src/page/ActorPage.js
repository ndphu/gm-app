import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import ActorComponent from '../component/actor/ActorComponent';

class ActorPage extends React.Component {
  render = () => (
    <div>
      <Route path={'/actor/:actorKey/page/:page'} component={ActorComponent}/>
      <Route exact path={'/actor'} render={()=><Redirect to={'/actor/johnny-depp/page/1'}/>}/>
    </div>
  )
}

export default ActorPage;