import React from 'react';
import {IndexRoute, Route, Redirect} from 'react-router';
import UserRole from '../components/UserRole';
import UserDetail from '../components/UserDetail';
import Frame from '../components/Frame';

export default (
  <Route path='/' component={Frame}>
    <IndexRoute component={UserRole} />
    <Route path='users' component={UserRole} />
    <Route path='user/:id' component={UserDetail} />
    <Redirect from='*' to='/' />
  </Route>
);
