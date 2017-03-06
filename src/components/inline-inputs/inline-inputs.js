import React from 'react';
import classNames from 'classnames';

// Carbon
import Row from './../row';

let InlineInputs = (props) =>
  <div className={ classes(props) }>
    <label className="carbon-inline-inputs-label">{ props.label }</label>
    <Row gutter="none" className="carbon-inline-inputs-wrapper">
      { props.children }
    </Row>
  </div>
;

const classes = (props) => {
  return classNames(
    "carbon-inline-inputs",
    props.className
  );
};

InlineInputs.propTypes = {
  /**
   * Defines the label text for the heading.
   *
   * @property label
   * @type {String}
   */
  label: React.PropTypes.string
};

export default InlineInputs;
