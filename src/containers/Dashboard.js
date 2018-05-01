import React from "react";
import AuthenticatedComponent from "./common/AuthenticatedComponent";

export default class Dashboard extends AuthenticatedComponent {

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