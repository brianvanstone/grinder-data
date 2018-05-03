import React from "react";
import Auth from "../../Auth";

var auth = new Auth();

var DBUtil = require('../../util/DBUtil');

export default class AuthenticatedComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            displayed: false,
            userId: "",
            userData: ""
        };

        auth.getProfile((err, userProfile) => {
            if (err) {
                //squash
            } else {
                this.setState({ userId: userProfile.sub });
            }
        });
    }

    logout(path) {
        auth.logout(() => {
            this.props.history.push(path);
        });
    }

    componentDidMount() {
        var path = this.props.history.location.pathname;

        if (!auth.isAuthenticated()) {
            this.setState({ displayed: false });
            auth.login(path);
        } else {
            this.setState({ displayed: true });
        }
    }

    componentDidUpdate() {
        if (!this.state.userData && this.state.userId) {
            DBUtil.getProfile(this.state.userId, (err, data) => {
                if (err) {
                    console.log("Error fetching profile", err);
                } else {
                    this.setState({ userData: data });
                }
            });
        }
    }
}