import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import RefreshActionsForm from './RefreshActionsForm';
import UpdateQualityForm from './UpdateQualityForm';

export class PretendServer extends Component {
  render = () => {
    const { characterId: myCharacterId } = this.props;

    return (
      <Fragment>
        <div>
          Your character ID is
          {' '}
          {myCharacterId}.
        </div> 
        <UpdateQualityForm />
        <RefreshActionsForm />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user: { characterId } }) => ({ characterId });

export default connect(mapStateToProps)(PretendServer);