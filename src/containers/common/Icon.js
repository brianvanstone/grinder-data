import React, { Component } from 'react';
import SvgIcon from 'react-icons-kit';

export default class Icon extends Component {

    render() {
        return (
            <SvgIcon size={this.props.size || 20} icon={this.props.icon} />
        );
    }
}