import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { updateQuality } from './actions';

import './UpdateQualityForm.css';

export class UpdateQualityForm extends Component {
  state = {
    characterId: '',
    qualityId: '',
    qualityValue: '',
  }

  handleChange = (e, key) => {
    this.setState({ [key]: e.target.value });
  }

  handleSubmit = (e) => {
    const { updateQuality } = this.props;
    const { characterId, qualityId, qualityValue } = this.state;
    e.preventDefault();
    updateQuality({
      characterId: Number(characterId),
      qualityId: Number(qualityId),
      qualityValue: Number(qualityValue),
    });
  }

  render = () => {
    const { characterId, qualityId, qualityValue } = this.state;
    return (
      <Fragment>
        <h2>Update a character's quality</h2>
        <form className="UpdateQualityForm" onSubmit={this.handleSubmit}>
          <label className="UpdateQualityForm__label">
            Character ID
            <input
              name="characterId"
              type="text"
              value={characterId}
              onChange={e => this.handleChange(e, 'characterId')}
            />
          </label>
          <label className="UpdateQualityForm__label">
            Quality ID
            <input
              name="qualityId"
              type="text"
              value={qualityId}
              onChange={e => this.handleChange(e, 'qualityId')}
            />
          </label>
          <label className="UpdateQualityForm__label">
            Quality value
            <input
              name="qualityValue"
              type="text"
              value={qualityValue}
              onChange={e => this.handleChange(e, 'qualityValue')}
            />
          </label>
          <button className="UpdateQualityForm__submit" type="submit">Submit</button>
        </form>
      </Fragment>
    );
  }
}

export default connect(null, { updateQuality })(UpdateQualityForm);