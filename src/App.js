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
    showNotifications: true,
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    if (window.localStorage.access_token) {
      dispatch(fetchUser());
      this.createWebsocketConnection();
      this.setState({ loggedIn: true });
    }
  }

  createWebsocketConnection = () => {
    const { dispatch } = this.props;
    const { showNotifications } = this.state;
    const { access_token } = window.localStorage;

    this.socket = io.connect(WEBSOCKET_URL);
    this.socket.on('connect', () => {
      this.socket.emit('authentication', { token: access_token });
    });

    this.socket.on('message', (data) => {
      const { message } = data;
      dispatch(message);
      if (showNotifications) {
        if (message.type === 'actions/REFRESH_ACTIONS') {
          return new Notification('Your actions have been refreshed!');
        }
        console.info('new notification!');
        return new Notification(`Your quality #${message.payload.qualityId} has changed to ${message.payload.qualityValue}!`);
      }
    });
  }

  handleLogin = async (username, password) => {
    console.info(`logging in with ${username} / ${password}`);
    const { jwt } = await login(username, password);
    window.localStorage.setItem('access_token', jwt);
    this.createWebsocketConnection();
    this.setState({ loggedIn: true });
  }

  handleLogout = () => {
    window.localStorage.removeItem('access_token');
    this.setState({ loggedIn: false });
  }

  render() {
    const loggedIn = !!window.localStorage.access_token;
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
