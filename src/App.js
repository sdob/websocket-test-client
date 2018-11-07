import React, { Component } from 'react';
import { login } from './login/actions';

import Login from './login/Login';
import LoggedIn from './loggedIn/LoggedIn';

import PretendServer from './pretendServer/PretendServer';

import './App.css';

class App extends Component {
  handleLogin = async (username, password) => {
    console.info(`logging in with ${username} / ${password}`);
    const { jwt } = await login(username, password);
    window.localStorage.setItem('access_token', jwt);
  }

  handleLogout = () => {
    window.localStorage.removeItem('access_token');
  }

  render() {
    const loggedIn = !!window.localStorage.access_token;
    return (
      <div className="App">
        <div className="Section">
          {loggedIn ? <LoggedIn onLogout={this.handleLogout} /> : <Login onSubmit={this.handleLogin} />}
        </div>
        <div className="Section">
          <h1 className="Section__title">
            Pretend to be the FL app server
          </h1>
          <PretendServer />
        </div>
      </div>
    );
  }
}

export default App;
