import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Column } from '../row';
import Label from '../../__experimental__/components/label';
import './inline-inputs.scss';

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
  const {
    label,
    htmlFor,
    children,
    className
  } = props;

  function renderLabel() {
    if (!label) return null;

    return <Label htmlFor={ htmlFor }>{ label }</Label>;
  }

  return (
    <div className={ classNames('carbon-inline-inputs', className) }>
      { renderLabel() }
      <Row gutter='none' className='carbon-inline-inputs__inputs'>
        { columnWrapper(children) }
      </Row>
    </div>
  );
};

// Assign props over for demo site
InlineInputs.propTypes = {
  /** Children elements */
  children: PropTypes.node,
  /** [Legacy prop] A custom class name for the component. */
  className: PropTypes.string,
  /** Defines the label text for the heading. */
  label: PropTypes.string,
  /** The id of the corresponding input control for the label */
  htmlFor: PropTypes.string
};

InlineInputs.defaultProps = {
  children: null,
  className: ''
};

/* eslint-enable react/prop-types */

export default InlineInputs;
