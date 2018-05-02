import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";

var DBUtil = require("../util/DBUtil");

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            Alias: '',
            Avatar: ''
        };
    }

    validateAlias() {
        return this.state.Alias.length < 5 ? 'error' : null;
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    FormField({ id, label, validation, value, help, onChange, parent, ...props }) {
        return (
            <FormGroup
                controlId={id || props.name}
                validationState={validation || null}
                value={value}
                onChange={onChange || parent.handleChange}>
                <ControlLabel>{label || props.name}</ControlLabel>
                <FormControl {...props} />
                <FormControl.Feedback />
                {validation && <HelpBlock>{help}</HelpBlock>}
            </FormGroup>
        );
    }

    saveProfile(event) {
        event.preventDefault();
        DBUtil.saveProfile(this.state);
    }

    render() {
        return (
            <div className="App container">
                <Switch>
                    <Route path="/profile/edit" render={(props) => {
                        return (
                            <div id="profileEdit">
                                <h1>Editing Profile</h1>
                                <Form onSubmit={this.saveProfile}>
                                    <this.FormField
                                        help="Alias must be 5 or more characters"
                                        name="Alias"
                                        value={this.state.Alias}
                                        validation={this.validateAlias()}
                                        parent={this} />
                                    <input type="submit" value="Save" />
                                </Form>
                                <pre style={{ textAlign: "left" }}>{JSON.stringify(this.state, null, 2)}</pre>
                            </div>
                        )
                    }} />
                    <Route path="/profile" render={(props) => {
                        return (
                            <div id="profile">
                                <Link to="/profile/edit">edit</Link>
                                <pre style={{ textAlign: "left" }}>{JSON.stringify(this.props, null, 2)}</pre>
                            </div>
                        )
                    }} />
                </Switch>
            </div>
        );
    }
}