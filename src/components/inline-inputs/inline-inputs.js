import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Carbon
import { Row, Column } from './../row';

const label = (props) => {
  if (!props.label) { return null; }
  return (
    <label htmlFor={ props.htmlFor } className='carbon-inline-inputs__label'>
      { props.label }
    </label>
  );
};

const columnWrapper = (children) => {
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

const InlineInputs = (props) => {
  return (
    <div className={ classNames('carbon-inline-inputs', props.className) }>
      { label(props) }
      <Row gutter='none' className='carbon-inline-inputs__inputs'>
        { columnWrapper(props.children) }
      </Row>
    </div>
  );
};

InlineInputs.propTypes = {
  /**
   * Children elements
   *
   * @property children
   * @type {Node}
   */
  children: PropTypes.node,

  /**
   * A custom class name for the component.
   *
   * @property className
   * @type {String}
   */
  className: PropTypes.string,

  /**
   * Defines the label text for the heading.
   *
   * @property label
   * @type {String}
   */
  label: PropTypes.string,

  /**
   * The id of the corresponding input control for the label
   *
   * @property label
   * @type {String}
   */
  htmlFor: PropTypes.string,
};

export default InlineInputs;
