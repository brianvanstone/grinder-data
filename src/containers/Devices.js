import React, { Component } from "react";

export default class Devices extends Component {
    render() {
        return (
            <div className="App container">
                <h1>Devices</h1>
                <div id="profile">
                    <pre style={{ textAlign: "left" }}>{JSON.stringify(this.props, null, 2)}</pre>
                </div>
            </div>
        );
    }
}