import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import RefreshActionsForm from './RefreshActionsForm';
import UpdateQualityForm from './UpdateQualityForm';

export class PretendServer extends Component {
  state = {

  }

  handleSendMessage = () => {
    const { characterId, messageText } = this.state;
  }

  render = () => {
    const { characterId: myCharacterId } = this.props;

    console.info(process.env);

    return (
      <Fragment>
        <div>
          Send a text message to a user. Your character ID is
          {' '}
          {myCharacterId}.
        </div>
        <form onSubmit={this.handleSendMessage}>

        </form>
        <UpdateQualityForm />
        <RefreshActionsForm />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user: { characterId } }) => ({ characterId });

export default connect(mapStateToProps)(PretendServer);