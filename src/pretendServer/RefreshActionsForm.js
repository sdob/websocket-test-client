import React, { Component } from 'react';
import { connect } from 'react-redux';

import { refreshActions } from './actions';

export class RefreshActionsForm extends Component {
  state = {
    actions: '',
  }
  
  handleChange = (e) => {
    this.setState({ actions: e.currentTarget.value });
  }

  handleSubmit = async (e) => {
    const { refreshActions } = this.props;
    const { actions } = this.state;
    console.info(`submitting ${actions}`);
    e.preventDefault();
    await refreshActions(actions);
  }

  render = () => {
    const { actions } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Refresh actions</label>
        <input
          name="actions"
          value={actions}
          onChange={this.handleChange}
          type="number"
        />
        <button type="submit">Refresh</button>
      </form>
    );
  }
}

export default connect(null, { refreshActions })(RefreshActionsForm);