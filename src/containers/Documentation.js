import React, { Component } from "react";
import MarkdownContainer from "./common/MarkdownContainer";
import MarkdownNav from "./common/MarkdownNav";

export default class Documentation extends Component {

    render() {
        return (
            <div>
                <div style={{ height: "90%", position: "fixed"}}>
                    <MarkdownNav history={this.props.history} />
                </div>
                <div style={{ width: "80%", "padding-left": "20%" }}>
                    <div className="App container">
                        <MarkdownContainer
                            style={{ float: 'left', 'margin-right': '10px', }}
                            history={this.props.history} />
                    </div>
                </div>
            </div>
        );
    }
}