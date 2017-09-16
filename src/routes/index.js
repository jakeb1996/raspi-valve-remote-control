import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import DeviceConnector from '../pages/DeviceConnector';
import DeviceManager from '../pages/DeviceManager';

export default () => (
  <Router>
      <Switch>
        <Route path="/" exact render={() => <DeviceConnector />} />
        <Route path="/manage/:deviceId" component={DeviceManager} />
      </Switch>
  </Router>
);