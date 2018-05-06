import auth0 from 'auth0-js';
import React, { Component } from 'react';
import AuthLoader from "./containers/common/AuthLoader";

export default class Auth extends Component {

    constructor() {
        super();
        if (this.getSession().expires_at) {
            this.scheduleRenewal();
        }
    }

    authConfig = (path) => {
        return {
            domain: 'grinder.auth0.com',
            clientID: 'aJh7jg1toaADHOTncRWHKxk7ttT3PNI5',
            redirectUri: 'http://localhost:3000/auth?redirect=' + path,
            audience: 'https://grinder.auth0.com/userinfo',
            responseType: 'token id_token',
            scope: 'openid profile email'
        };
    };

    auth0 = new auth0.WebAuth(this.authConfig("/"));

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                console.log(err);
            }
        });
    }

    setSession(authResult) {
        // Set the time that the Access Token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        console.log("Session set, expiring in: " + (expiresAt - Date.now()));
        this.scheduleRenewal();
    }

    getSession() {
        return {
            access_token: localStorage.getItem("access_token"),
            id_token: localStorage.getItem("id_token"),
            expires_at: localStorage.getItem("expires_at")
        };
    }

    isAuthenticated() {
        // Check whether the current time is past the 
        // Access Token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    login(path) {
        this.auth0 = new auth0.WebAuth(this.authConfig(path));
        this.auth0.authorize();
    }

    renewToken() {
        this.auth0.checkSession({}, (err, result) => {
            if (err) {

            } else {
                this.setSession(result);
            }
        });
    }

    tokenRenewalTimeout;
    scheduleRenewal() {
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        const delay = expiresAt - Date.now();
        if (delay > 0) {
            this.tokenRenewalTimeout = setTimeout(() => {
                this.renewToken();
            }, delay);
        }
    }

    getProfile(cb) {
        var authClient = new auth0.WebAuth({
            domain: 'grinder.auth0.com',
            clientID: 'aJh7jg1toaADHOTncRWHKxk7ttT3PNI5',
            audience: 'https://grinder.auth0.com/userinfo',
            scope: 'openid profile email'
        });
        let session = this.getSession()
        if (session.access_token) {
            authClient.client.userInfo(session.access_token, (err, userProfile) => {
                if (userProfile) {
                    cb(null, userProfile);
                } else {
                    cb(err);
                }
            });
        }
    }

    logout(callback) {
        // Clear Access Token and ID Token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        clearTimeout(this.tokenRenewalTimeout);
        if (callback) {
            callback();
        }
    }

    render() {
        this.handleAuthentication();

        //add wait for auth saved

        var qParams = new URLSearchParams(this.props.location.search);

        var path = qParams.get('redirect') || "/";
        return <AuthLoader path={path} history={this.props.history} />;
    }
}