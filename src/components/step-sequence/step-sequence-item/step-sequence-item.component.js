import PropTypes from 'prop-types';
import React from 'react';
import StepSequenceItemStyle from './step-sequence-item.style';
import StepSequenceItemContentStyle from './step-sequence-item-content.style';
import StepSequenceItemIndicatorStyle from './step-sequence-item-indicator.style';
import Icon from '../../icon';

const StepSequenceItem = (props) => {
  const indicatorText = () => (
    <StepSequenceItemIndicatorStyle>{props.indicator}</StepSequenceItemIndicatorStyle> || null
  );

  const icon = () => (props.status === 'complete' ? <Icon type='tick' /> : indicatorText());

  return (
    <StepSequenceItemStyle { ...props }>
      <StepSequenceItemContentStyle>{ icon() } { props.children }</StepSequenceItemContentStyle>
    </StepSequenceItemStyle>
  );
};

StepSequenceItem.propTypes = {
  /** Text content for the step item */
  children: PropTypes.node.isRequired,
  /** Value to be displayed before text for uncomplete steps */
  indicator: PropTypes.string.isRequired,
  /** Aria label */
  ariaLabel: PropTypes.string,
  /** Status for the step */
  status: PropTypes.oneOf(['complete', 'current', 'incomplete']),
  hiddenCompleteLabel: PropTypes.string,
  hiddenCurrentLabel: PropTypes.string
};

StepSequenceItem.defaultProps = {
  status: 'incomplete'
};

export default StepSequenceItem;
