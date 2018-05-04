import React from "react";
import { Nav, NavItem, Navbar } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { Link, Route, Switch } from "react-router-dom";
import Dashboard from "../Dashboard";
import Devices from "../Devices";
import Profile from "../Profile";
import AuthLoader from "./AuthLoader";
import AuthenticatedComponent from "./AuthenticatedComponent";

export default class AuthLayout extends AuthenticatedComponent {
    render() {
        if (this.state.displayed) {
            return (
                <div>
                    <Navbar fluid collapseOnSelect fixedTop>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/"><img src="/home-icon.jpg" width="30" alt="home" /></Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                                <LinkContainer to="/dashboard">
                                    <NavItem onClick={null}>Dashboard</NavItem>
                                </LinkContainer>
                                <LinkContainer to="/devices">
                                    <NavItem onClick={null}>Devices</NavItem>
                                </LinkContainer>
                                <LinkContainer to="/profile">
                                    <NavItem onClick={null}>Profile</NavItem>
                                </LinkContainer>
                            </Nav>
                            <Nav pullRight>
                                <NavItem onClick={() => this.logout('/')}>Logout</NavItem>
                                <NavItem href="https://github.com/brianvanstone/grinder-data"><img src="github.png" alt="github" /></NavItem>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div id="content">
                        <Switch>
                            <Route path="/dashboard" render={(props) => <Dashboard {...props} user={this.state.profile} />} />
                            <Route path="/profile" render={(props) => <Profile {...props} user={this.state.profile} />} />
                            <Route path="/devices" render={(props) => <Devices {...props} user={this.state.profile} />} />
                        </Switch>
                    </div>
                    <div>
                        <pre><code>{JSON.stringify(this.state)}</code></pre>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="App container">
                    <AuthLoader />
                </div>
            );
        }
    }
}