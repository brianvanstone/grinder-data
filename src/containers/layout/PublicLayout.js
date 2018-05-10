import React, { Component } from "react";
import { Nav, NavItem, Navbar } from "react-bootstrap";
import { home } from 'react-icons-kit/icomoon/home';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, Route, Switch } from "react-router-dom";
import Home from "../Home";
import Icon from "../common/Icon";
import NotFound from "../common/NotFound";

export default class PublicLayout extends Component {
    render() {
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
                        <Nav pullRight>
                            <LinkContainer to="/dashboard">
                                <NavItem onClick={null}>Login</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="App container">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
                <Navbar fluid collapseOnSelect fixedBottom>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem href="https://github.com/brianvanstone/grinder-data">
                                <img src="github.png" alt="github" width="32px" />
                            </NavItem>
                            <NavItem href="https://reactjs.org/">
                                <img src="react.ico" alt="React JS" width="32px" />
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}