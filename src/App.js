import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import AuthLayout from "./containers/common/AuthLayout";
import Auth from "./Auth";
import NotFound from "./containers/NotFound";

class App extends Component {

  render() {
    return (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/dashboard" component={AuthLayout} />
        <Route path="/profile" component={AuthLayout} />
        <Route path="/devices" component={AuthLayout} />
        <Route path="/" exact component={Home} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default App;
