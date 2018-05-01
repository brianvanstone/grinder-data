import React from "react";
import AuthenticatedComponent from "./common/AuthenticatedComponent";

export default class Devices extends AuthenticatedComponent {

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