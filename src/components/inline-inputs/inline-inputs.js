import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Carbon
import Row from './../row';

let InlineInputs = (props) =>
  <div className={ classNames("carbon-inline-inputs", props.className) }>
    { label(props) }
    <Row gutter="none" className="carbon-inline-inputs__inputs">
      { props.children }
    </Row>
  </div>
;

let label = (props) => {
  if (props.label) {
    return <label className="carbon-inline-inputs__label">{ props.label }</label>;
  }
};

InlineInputs.propTypes = {
  /**
   * Defines the label text for the heading.
   *
   * @property label
   * @type {String}
   */
  label: PropTypes.string
};

export default InlineInputs;
