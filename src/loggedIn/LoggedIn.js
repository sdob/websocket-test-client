import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

export class LoggedIn extends Component {
  handleLogout = () => {

  }

  render = () => {
    const { actions, characterName, onLogout } = this.props;
    return (
      <Fragment>
        <h1 className="Section__title Section__title--smaller">
          {characterName ? `It's ${characterName}! Welcome to the Internet, delicious friend!` : ' '}
        </h1>
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <div>
            Actions:
          {' '}
            {actions}
          </div>
          <button onClick={onLogout}>Log out</button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  actions: { actions },
  user: { characterName },
}) => ({ actions, characterName });

export default connect(mapStateToProps)(LoggedIn);