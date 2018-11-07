import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

export class PretendServer extends Component {
  state = {

  }

  handleSendMessage = () => {
    // const { characterId, messageText } = this.state;
  }

  render = () => {
    const { characterId: myCharacterId } = this.props;
    return (
      <Fragment>
        <div>
          Send a text message to a user. Your character ID is
          {' '}
          {myCharacterId}.
        </div>
        <form onSubmit={this.handleSendMessage}>

        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user: { characterId } }) => ({ characterId });

export default connect(mapStateToProps)(PretendServer);