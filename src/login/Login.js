import React, { Component, Fragment } from 'react';
import './Login.css';

export default class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  handleChange = (name, evt) => {
    const value = evt.currentTarget.value;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    const { onSubmit } = this.props;
    const { username, password } = this.state;
    e.preventDefault();
    onSubmit(username, password);
  }

  render = () => {
    const { username, password } = this.state;
    return (
      <Fragment>
        <h1 className="Section__title">
          Log in
        </h1>
        <form className="Login" onSubmit={this.handleSubmit} >
          <input
            className="Login__input"
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={evt => this.handleChange('username', evt)}
          />
          <input
            className="Login__input"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={evt => this.handleChange('password', evt)}
          />
          <button className="Login__submit" type="submit">Log in</button>
        </form>
      </Fragment>
    );
  }
}