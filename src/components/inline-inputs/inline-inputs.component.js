import React from 'react';
import PropTypes from 'prop-types';
import { Row, Column } from '../row';
import Label from '../../__experimental__/components/label';
import StyledInlineInputs from './inline-inputs.style';

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

    return <Label inline htmlFor={ htmlFor }>{ label }</Label>;
  }

  return (
    <StyledInlineInputs data-component='inline-inputs' className={ className }>
      { renderLabel() }
      <Row gutter='none'>
        { columnWrapper(children) }
      </Row>
    </StyledInlineInputs>
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
