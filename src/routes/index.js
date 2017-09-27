import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import DeviceConnector from '../pages/DeviceConnector';
import DeviceManager from '../pages/DeviceManager';
import ScheduleModifier from '../pages/ScheduleModifier';

export default () => (
  <Router>
      <Switch>
        <Route path="/" exact render={() => <DeviceConnector />} />
        <Route path="/manage/:deviceId" component={DeviceManager} />
        <Route path="/schedule" component={ScheduleModifier} />
      </Switch>
  </Router>
);