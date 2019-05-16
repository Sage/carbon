import PropTypes from 'prop-types';
import React from 'react';
import StepSequenceStyle from './step-sequence.style';

const StepSequence = (props) => {
  return (
    <StepSequenceStyle { ...props }>
      {props.children.map(child => (
        React.cloneElement(
          child,
          {
            ...child.props,
            key: `step-seq-item-${child.props.indicator}`,
            orientation: props.orientation
          },
          child.props.children
        )
      ))}
    </StepSequenceStyle>
  );
};

StepSequence.propTypes = {
  /** Step sequence items to be rendered */
  children: PropTypes.node,
  /** The direction that step sequence items should be rendered */
  orientation: PropTypes.oneOf([
    'horizontal',
    'vertical'
  ])
};

StepSequence.defaultProps = {
  orientation: 'horizontal'
};

export default StepSequence;
