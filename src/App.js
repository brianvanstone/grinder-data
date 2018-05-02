import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import AuthLayout from "./containers/common/AuthLayout";
import Auth from "./Auth";
import PublicLayout from "./containers/common/PublicLayout";

class App extends Component {

  render() {
    return (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/dashboard" component={AuthLayout} />
        <Route path="/profile" component={AuthLayout} />
        <Route path="/devices" component={AuthLayout} />
        <Route path="*" component={PublicLayout} />
      </Switch>
    );
  }
}

export default App;
