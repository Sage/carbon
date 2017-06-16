import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Carbon
import { Row, Column } from './../row';

let InlineInputs = (props) => {
  return (
    <div className={ classNames("carbon-inline-inputs", props.className) }>
      { label(props) }
      <Row gutter="none" className="carbon-inline-inputs__inputs">
        { columnWrapper(props.children) }
      </Row>
    </div>
  );
};

let label = (props) => {
  if (props.label) {
    return <label className="carbon-inline-inputs__label">{ props.label }</label>;
  }
};

let columnWrapper = (children) => {
  let inputs = children;

  if (!Array.isArray(inputs)) {
    inputs = [children];
  }

  return inputs.map((input, index) => {
    return (
      <Column key={ index }>
        { input }
      </Column>
    );
  });
};

InlineInputs.propTypes = {
  /**
   * Defines the label text for the heading.
   *
   * @property label
   * @type {String}
   */
  label: PropTypes.string,

  /**
  * Children elements
  *
  * @property children
  * @type {Node}
  */
  children: PropTypes.node
};

export default InlineInputs;
