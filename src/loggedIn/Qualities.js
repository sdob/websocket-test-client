import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getQualityCategories } from './selectors';
import './Qualities.css';

export class Qualities extends Component {
  state = {
    filterString: '',
  }

  handleFilterChange = (e) => {
    this.setState({ filterString: e.target.value })
  }

  render = () => {
    const { categories } = this.props;
    const { filterString } = this.state;
    return (
      <Fragment>
        <h2>Qualities</h2>
        <input type="text" value={filterString} onChange={this.handleFilterChange} />
        <ul className="Qualities">
          {categories
          .filter(c => c.qualities.find(q => q.name.toLowerCase().indexOf(filterString.toLowerCase()) >= 0))
          .map(({ name, qualities }) => (
            <li key={name} className="Category">
              <h3>{name}</h3>
              <ul className="Category__qualities">
                {qualities
                  .filter(q => q.level > 0)
                  .map(({ id, name, level }) => (
                  <li key={id}>{`${id} ${name}: ${level}`}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  categories: getQualityCategories(state),
});

export default connect(mapStateToProps)(Qualities);