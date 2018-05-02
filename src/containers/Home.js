import React, { Component } from "react";
import Markdown from 'react-markdown';

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
            <Markdown source={this.state.markdown} />
        );
    }
}