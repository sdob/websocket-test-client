import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

export class LoggedIn extends Component {
  handleLogout = () => {

  }

  render = () => {
    const { actions, onLogout } = this.props;
    return (
      <Fragment>
        <h1 className="Section__title">
          Howdy!
        </h1>
        <div>
          <button onClick={onLogout}>Log out</button>
        </div>
        <div>
          Actions:
          {' '}
          {actions}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ actions: { actions } }) => ({ actions });

export default connect(mapStateToProps)(LoggedIn);