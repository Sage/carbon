import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { assign } from 'lodash';
import { Row, Column } from './../row';

/* eslint-disable react/prop-types */

const Label = (props) => {
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
    // Input is never going to be re-ordered so we don't require a defined key
    /* eslint-disable react/no-array-index-key */
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
      { Label(props) }
      <Row gutter='none' className='carbon-inline-inputs__inputs'>
        { columnWrapper(props.children) }
      </Row>
    </div>
  );
};

Label.propTypes = {
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
  htmlFor: PropTypes.string
};

Label.defaultProps = {
  label: '',
  htmlFor: null
};

// Assign props over for demo site
InlineInputs.propTypes = assign({}, {
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
  className: PropTypes.string
}, Label.propTypes);

InlineInputs.defaultProps = {
  children: null,
  className: ''
};

/* eslint-enable react/prop-types */

export default InlineInputs;
