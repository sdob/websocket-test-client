import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { refreshActions } from './actions';
import './RefreshActionsForm.css';

export class RefreshActionsForm extends Component {
  state = {
    actions: 0,
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
      <Fragment>
        <h2>
          Send yourself an action refresh!
        </h2>
        <form
          className="RefreshActionsForm"
          onSubmit={this.handleSubmit}
        >
          <label>Actions</label>
          <input
            name="actions"
            value={actions}
            onChange={this.handleChange}
            type="number"
            className="RefreshActionsForm__input"
          />
          <button type="submit">Refresh</button>
        </form>
      </Fragment>
    );
  }
}

export default connect(null, { refreshActions })(RefreshActionsForm);