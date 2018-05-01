import React, { Component } from "react";

export default class Dashboard extends Component {

    render() {
        return (
            <div className="App container">
                <h1>Dashboard</h1>
                <div id="dashboard">
                    <pre style={{ textAlign: "left" }}>{JSON.stringify(this.props, null, 2)}</pre>
                    <pre style={{ textAlign: "left" }}>{JSON.stringify(this.props, null, 2)}</pre>
                    <pre style={{ textAlign: "left" }}>{JSON.stringify(this.props, null, 2)}</pre>
                    <pre style={{ textAlign: "left" }}>{JSON.stringify(this.props, null, 2)}</pre>
                    <pre style={{ textAlign: "left" }}>{JSON.stringify(this.props, null, 2)}</pre>
                    <pre style={{ textAlign: "left" }}>{JSON.stringify(this.props, null, 2)}</pre>
                </div>
            </div>
        );
    }
}