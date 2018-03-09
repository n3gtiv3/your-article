import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Dashboard from './containers/Dashboard/';
import Summary from "./containers/Summary";
import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute title="Dashboard" component={Dashboard} />
    <Route path = "/opening" component = {Summary} />
    <Route path = "/purchase" component = {Summary} />
    <Route path = "/sale" component = {Summary} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
