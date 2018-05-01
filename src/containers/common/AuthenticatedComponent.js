import React from "react";
import Auth from "../../Auth";

var AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-2',
    accessKeyId: "AKIAJKYD742Y56SH4MVQ",
    secretAccessKey: "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"
});

var auth = new Auth();

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
            var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
            var getParams = {
                TableName: "UserData",
                Key: {
                    userId: this.state.userId
                }
            }
            docClient.get(getParams, (err, data) => {
                if (err || !data.Item.userId) {
                    if (!data) {
                        console.log("Error fetching profile", err);
                    } else {
                        var putParams = {
                            TableName: "UserData",
                            Item: {
                                'userId': this.state.userId,
                                createdDate: Date.now()
                            }
                        }
                        docClient.put(putParams, (err, data) => {
                            if (err) {
                                console.log("Unexpected error creating profile", err);
                            } else {
                                this.setState({ userData: data.Item })
                            }
                        });
                    }
                } else {
                    this.setState({ userData: data.Item });
                }
            });
        }
    }
}