import React from 'react';
import PropTypes from 'prop-types';
import OptionsHelper from '../../utils/helpers/options-helper';
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
    className,
    gutter
  } = props;

  function renderLabel() {
    if (!label) return null;

    return <Label inline htmlFor={ htmlFor }>{ label }</Label>;
  }

  return (
    <StyledInlineInputs data-component='inline-inputs' className={ className }>
      { renderLabel() }
      <Row gutter={ gutter }>
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
  htmlFor: PropTypes.string,
  /** Gutter prop gets passed down to Row component if false gutter value is "none" */
  gutter: PropTypes.oneOf(['none', ...OptionsHelper.sizesFull])
};

InlineInputs.defaultProps = {
  children: null,
  className: '',
  gutter: 'none'
};

export default InlineInputs;
