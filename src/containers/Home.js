import React, { Component } from "react";
import Markdown from 'react-markdown';
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            markdown: ""
        };
    }

    componentWillMount() {
        var request = require('request');
        var obj = this;
        request.get('https://raw.githubusercontent.com/brianvanstone/grinder-data/creating-project/README.md', function (error, response, body) {
            if (!error && response.statusCode === 200) {
                obj.setState({
                    markdown: body
                })
            }
        });
    }

    render() {
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
                        <Nav pullRight>
                            <LinkContainer to="/dashboard">
                                <NavItem onClick={null}>Login</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="App container">
                    <Markdown source={this.state.markdown} />
                </div>
                <Navbar fluid collapseOnSelect fixedBottom>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem href="https://github.com/brianvanstone/grinder-data">Powered By: <img src="github.png" alt="github" /></NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}