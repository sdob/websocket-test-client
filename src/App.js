import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { login } from './login/actions';

import Login from './login/Login';
import LoggedIn from './loggedIn/LoggedIn';

import { fetchUser } from './user/actions';

import './App.css';

const { REACT_APP_WEBSOCKET_SERVER_URL: WEBSOCKET_URL } = process.env;

class App extends Component {
  socket = null
  
  state = {
    loggedIn: false,
    showNotifications: false,
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    // If we have an access token, then get the user object
    if (window.localStorage.access_token) {
      dispatch(fetchUser());
      // Connect to the websocket server immediately
      this.createWebsocketConnection();
      // We're logged in
      this.setState({ loggedIn: true });
    }
  }

  createWebsocketConnection = () => {
    const { dispatch } = this.props;
    const { showNotifications } = this.state;
    const { access_token } = window.localStorage;

    // Connect to the websocket server
    this.socket = io.connect(WEBSOCKET_URL);
    // When we've connected, send the access token to the websocket server
    this.socket.on('connect', () => {
      this.socket.emit('authentication', { token: access_token });
    });

    // Set us up to handle messages
    this.socket.on('message', (message) => {
      console.info(`message received: ${JSON.stringify(message, null, 2)}`);
      // The message should be a Redux action we can simply dispatch
      dispatch(message);
      // TODO: handle notifications --- this code works fine on desktops but throws an error on mobiles
      if ('Notification' in window && showNotifications) {
        if (message.type === 'actions/REFRESH_ACTIONS') {
          return new Notification('Your actions have been refreshed!');
        }
        console.info('new notification!');
        return new Notification(`Your quality #${message.payload.qualityId} has changed to ${message.payload.qualityValue}!`);
      }
    });
  }

  handleLogin = async (username, password) => {
    const { dispatch } = this.props;
    // Log in to FL
    const { jwt } = await login(username, password);
    // Set the access token
    window.localStorage.setItem('access_token', jwt);
    // Connect to the websocket server
    this.createWebsocketConnection();
    // Fetch the user data from the FL API
    dispatch(fetchUser());
    // OK, we're logged in
    this.setState({ loggedIn: true });
  }

  handleLogout = () => {
    // Remove the access token
    window.localStorage.removeItem('access_token');
    // We're logged out
    this.setState({ loggedIn: false });
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <div className="App">
        <div className="Section">
          {loggedIn ? <LoggedIn onLogout={this.handleLogout} /> : <Login onSubmit={this.handleLogin} />}
        </div>
      </div>
    );
  }
}

export default connect()(App);
