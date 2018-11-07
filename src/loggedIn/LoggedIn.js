import React, { Component, Fragment } from 'react';

export default class LoggedIn extends Component {
  handleLogout = () => {

  }

  render = () => {
    const { onLogout } = this.props;
    return (
      <Fragment>
        <h1 className="Section__title">
          Howdy!
        </h1>
        <div>
          <button onClick={onLogout}>Log out</button>
        </div>
      </Fragment>
    );
  }
}