import React from 'react';
import ReactDOM from 'react-dom';
import createHisory from 'history/createBrowserHistory';
import { Route, Switch, Router } from 'react-router-dom';

import { App } from '../components';

import '../resources/scss/style.scss';

ReactDOM.render(
  <Router history={createHisory()}>
    <Switch>
        <Route path='/' component={App} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);