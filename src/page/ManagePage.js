import React from 'react';
import PageBase from './PageBase';
import {List, ListItem, RaisedButton, Subheader, TextField} from 'material-ui';
import api from '../client/Api';
import {loader} from '../component/commons/GlobalLoaderBar';

class ManagePage extends React.Component {
  constructor(props) {
    super(props);
    this.onAuthorizeClick.bind(this);
    this.onSetServerCookieClick.bind(this);
  }

  onAuthorizeClick = () => {
    loader.start();
    api.get('/manage/authorize').then(() => {
      loader.finish();
    });
  };

  onSetServerCookieClick = () => {
    loader.start();
    api.post('/manage/serverCookie', {
      serverCookie: this.ref.serverCookie.getValue()
    }).then((resp) => {
      console.log(resp);
      loader.finish();
    });
  };

  render = () => {
    return (
      <PageBase wrapPaper={true}
                title={'Admin Page'}>
        <div>
          <h4 style={{marginTop: 32}}>Authorize Server Location</h4>
          <RaisedButton primary={true}
                        label={'Authorize'}
                        onClick={this.onAuthorizeClick}/>

          <h4 style={{marginTop: 32}}>Manually Set Server Cookie</h4>
          <TextField
            id={'server-cookie-input'}
            ref={'serverCookie'}
            fullWidth={true}
            multiLine={true}
            onChange={this.onChange}/>
          <RaisedButton primary={true}
                        label={'Set Cookie'}
                        onClick={this.onSetServerCookieClick}/>

          <List>
            <Subheader>General</Subheader>
            <ListItem
              primaryText="Profile photo"
              secondaryText="Change your Google+ profile photo"
            />
            <ListItem
              primaryText="Show your status"
              secondaryText="Your status is visible to everyone you use with"
            />
          </List>
        </div>
      </PageBase>
    )

  }
}

export default ManagePage;