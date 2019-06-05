import PropTypes from 'prop-types';
import React from 'react';
import StepSequenceStyle from './step-sequence.style';
import OptionsHelper from '../../utils/helpers/options-helper';

const StepSequence = (props) => {
  return (
    <StepSequenceStyle { ...props }>
      {React.Children.map(props.children, child => (
        React.cloneElement(
          child,
          {
            ...child.props,
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
  orientation: PropTypes.oneOf(OptionsHelper.orientation)
};

StepSequence.defaultProps = {
  orientation: 'horizontal'
};

export default StepSequence;
