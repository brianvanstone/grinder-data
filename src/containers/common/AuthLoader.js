import React, { Component } from 'react';
import { BeatLoader } from 'react-spinners';
import Auth from "../../Auth";

export default class AuthLoader extends Component {
  auth = new Auth();
  interval;

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.auth.isAuthenticated()) {
        this.stop();
        this.setState({ loading: false });
      }
    }, 100);
  }

  componentWillUnmount() {
    this.stop();
  }

  stop() {
    clearInterval(this.interval);
    if (this.props.path) {
      this.props.history.push(this.props.path);
    }
  }

  render() {
    return (
      <div className='loader'>
        <BeatLoader
          color={'#123abc'}
          loading={this.state.loading}
        />
      </div>
    )
  }
}