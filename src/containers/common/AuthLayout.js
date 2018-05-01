import React from "react";
import { Route, Switch } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dashboard from "../Dashboard";
import Profile from "../Profile";
import AuthenticatedComponent from "./AuthenticatedComponent";
import AuthLoader from "./AuthLoader";
import Devices from "../Devices";
import { LinkContainer } from 'react-router-bootstrap';

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
                                {/* <LinkContainer to=""> */}
                                    <NavItem onClick={() => this.logout('/')}>Logout</NavItem>
                                {/* </LinkContainer> */}
                                <NavItem href="https://github.com/brianvanstone/grinder-data"><img src="github.png" alt="github" /></NavItem>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div id="content">
                        <Switch>
                            <Route path="/dashboard" component={Dashboard} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/devices" component={Devices} />
                        </Switch>
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