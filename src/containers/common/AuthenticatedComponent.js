import React from "react";
import Auth from "../../Auth";

var auth = new Auth();

export default class AuthenticatedComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            displayed: false,
            profile: {}
        };
    }

    componentWillMount() {
        if (!this.state.profile.sub) {
            auth.getProfile((err, userProfile) => {
                if (err) {
                    //squash
                } else {
                    this.setState({profile: userProfile});
                }
            });
        }
    }

    logout(path) {
        auth.logout(() => {
            this.props.history.push(path);
        });
    }

    componentDidMount() {
        var path = this.props.history.location.pathname;

        if (!auth.isAuthenticated()) {
            this.setState({displayed: false});
            auth.login(path);
        } else {
            this.setState({ displayed: true });
            //check if user profile has been setup
        }
    }
}