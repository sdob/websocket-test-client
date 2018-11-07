import React, { Component, Fragment } from 'react';

export default class PretendServer extends Component {
  state = {

  }

  handleSendMessage = () => {
    const { characterId, messageText } = this.state;
  }

  render = () => {
    return (
      <Fragment>
        <div>
          Send a text message to a user. Your character ID is
          {' '}
          .
        </div>
        <form onSubmit={this.handleSendMessage}>

        </form>
      </Fragment>
    );
  }
}