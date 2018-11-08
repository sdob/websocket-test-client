import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Qualities from './Qualities';

export class LoggedIn extends Component {
  render = () => {
    const { actions, characterId, characterName, onLogout } = this.props;
    return (
      <Fragment>
        <h1 className="Section__title Section__title--smaller">
          {characterName ? `It's ${characterName}! Welcome to the Internet, delicious friend!` : ' '}
        </h1>
        <div>
          {`Your character ID is ${characterId}`}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <div>
            Actions:
          {' '}
            {actions}
          </div>
          <button onClick={onLogout}>Log out</button>
        </div>
        <Qualities />
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  actions: { actions },
  user: { characterId, characterName },
}) => ({ actions, characterId, characterName });

export default connect(mapStateToProps)(LoggedIn);