import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "./Auth";
import AuthLayout from "./containers/layout/AuthLayout";
import PublicLayout from "./containers/layout/PublicLayout";

class App extends Component {

  render() {
    return (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/dashboard" component={AuthLayout} />
        <Route path="/profile" component={AuthLayout} />
        <Route path="/devices" component={AuthLayout} />
        <Route path="/documentation" component={AuthLayout} />
        <Route path="*" component={PublicLayout} />
      </Switch>
    );
  }
}

export default App;
