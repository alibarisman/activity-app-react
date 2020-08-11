import React from 'react';
import { Route,Switch } from 'react-router-dom';
import Navi from '../navi/Navi';
import Home from './Home';
import Activity from "../activities/Activity";
import AddOrUpdateActivity from '../activities/AddOrUpdateActivity';
import Register from '../common/Register';
import Login from '../common/Login';
import Dashboard from '../dashboard/Home';
import Activities from '../dashboard/Activities';
import Customers from '../dashboard/Customers';
import Projects from '../dashboard/Projects';
import UserList from '../dashboard/Users';
import NotFound from '../common/NotFound';

function App() {
  return (
    <div>
      <Navi />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/activity"  component={Activity} />
        <Route path="/saveactivity/:activityId" component={AddOrUpdateActivity} />
        <Route path="/saveactivity" component={AddOrUpdateActivity} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/activities" component={Activities} />
        <Route path="/customers" component={Customers} />
        <Route path="/users" component={UserList} />
        <Route path="/projects" component={Projects} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
