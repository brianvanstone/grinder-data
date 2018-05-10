import React from "react";
import { Nav, NavItem, Navbar } from "react-bootstrap";
import { home } from 'react-icons-kit/icomoon/home';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, Route, Switch } from "react-router-dom";
import Dashboard from "../Dashboard";
import Devices from "../Devices";
import Documentation from "../Documentation";
import Profile from "../Profile";
import AuthLoader from "../common/AuthLoader";
import AuthenticatedComponent from "../common/AuthenticatedComponent";
import Icon from "../common/Icon";

export default class AuthLayout extends AuthenticatedComponent {
    render() {
        if (this.state.displayed) {
            return (
                <div>
                    <Navbar fluid collapseOnSelect fixedTop>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/"><Icon icon={home} alt="home" /></Link>
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
                                <LinkContainer to="/documentation">
                                    <NavItem onClick={null}>Documentation</NavItem>
                                </LinkContainer>
                            </Nav>
                            <Nav pullRight>
                                <li role="presentation">
                                    <Link to="/profile">Hi, {this.state.profile.given_name}</Link>
                                </li>
                                <NavItem onClick={() => this.logout('/')}>Logout</NavItem>
                                <li role="presentation">
                                    <Link  id="profilelink" to="/profile"><img id="profilepic" src={this.state.profile.picture} width="32px" alt=""/></Link>
                                </li>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div id="content">
                        <Switch>
                            <Route path="/dashboard" render={(props) => <Dashboard {...props} user={this.state.profile} />} />
                            <Route path="/profile" render={(props) => <Profile {...props} user={this.state.profile} />} />
                            <Route path="/devices" render={(props) => <Devices {...props} user={this.state.profile} />} />
                            <Route path="/documentation" render={(props) => <Documentation {...props} user={this.state.profile} />} />
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