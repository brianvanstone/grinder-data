import React, { Component } from "react";
import Markdown from 'react-markdown';

export default class MarkdownContainer extends Component {
    constructor(props) {
        super(props);

        var request = require('request');
        var obj = this;
        request.get(`${process.env.REACT_APP_BASE_URI}${this.props.history.location.pathname}/README.md`, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                obj.setState({ markdown: body });
            }
        });

        this.state = {
            markdown: "",
        };
    }

    refresh(location) {
        var request = require('request');
        var obj = this;
        request.get(`${process.env.REACT_APP_BASE_URI}${location.pathname}/README.md`, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                obj.setState({
                    markdown: body
                })
            }
        });
    }

    componentDidMount() {
        this.props.history.listen(location => {
            this.refresh(location);
        });
    }

    render() {
        return (
            <Markdown source={`${this.state.markdown}`} />
        );
    }
}