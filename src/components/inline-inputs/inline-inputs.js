import React from 'react';
import classNames from 'classnames';

// Carbon
import Row from './../row';

let InlineInputs = (props) =>
  <div className={ classNames("carbon-inline-inputs", props.className) }>
    <label className="carbon-inline-inputs__label">{ props.label }</label>
    <Row gutter="none" className="carbon-inline-inputs__inputs">
      { props.children }
    </Row>
  </div>
;

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
