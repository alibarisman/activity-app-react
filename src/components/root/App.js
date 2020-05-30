import React from 'react';
import Navi from '../navi/Navi';
import Home from './Home';
import Dashboard from "./Dashboard";
import { Route,Switch } from 'react-router-dom';
import AddOrUpdateActivity from '../activities/AddOrUpdateActivity';
import Panel from '../panel/Dashboard';
import Register from '../common/Register';
import Login from '../common/Login';
import NotFound from '../common/NotFound';

function App() {
  return (
    <div>
      <Navi />
      <Switch>
      <Route path="/" exact component={Home} />
        <Route path="/activity"  component={Dashboard} />
        <Route path="/saveactivity/:activityId" component={AddOrUpdateActivity} />
        <Route path="/saveactivity" component={AddOrUpdateActivity} />
        <Route path="/panel" component={Panel} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
