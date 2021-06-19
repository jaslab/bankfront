import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/pages/Login'
import Logout from './components/pages/Logout'
import Dashboard from './components/pages/Dashboard'

function App() {
  return (
    <>
      <Router>
        <Switch>
           <Route path="/" component={Login} exact />
           <Route path="/logput" component={Logout} exact/>
           <Route path="/dashboard" component={Dashboard} exact/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
