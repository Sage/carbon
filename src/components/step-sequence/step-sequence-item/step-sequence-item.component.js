import PropTypes from 'prop-types';
import React from 'react';
import StepSequenceItemStyle from './step-sequence-item.style';
import StepSequenceItemContentStyle from './step-sequence-item-content.style';
import StepSequenceItemIndicatorStyle from './step-sequence-item-indicator.style';
import StepSequenceItemHiddenLabelStyle from './step-sequence-item-hidden-label.style';
import Icon from '../../icon';
import OptionsHelper from '../../../utils/helpers/options-helper';

const StepSequenceItem = (props) => {
  const indicatorText = () => (
    <StepSequenceItemIndicatorStyle>{props.indicator}</StepSequenceItemIndicatorStyle>
  );

  const icon = () => (props.status === 'complete' ? <Icon type='tick' /> : indicatorText());

  const hiddenLabel = () => {
    const {
      status,
      hiddenCompleteLabel,
      hiddenCurrentLabel
    } = props;

    if (hiddenCompleteLabel && status === 'complete') {
      return (
        <StepSequenceItemHiddenLabelStyle>{hiddenCompleteLabel}</StepSequenceItemHiddenLabelStyle>
      );
    }
    if (hiddenCurrentLabel && status === 'current') {
      return (
        <StepSequenceItemHiddenLabelStyle>{hiddenCurrentLabel}</StepSequenceItemHiddenLabelStyle>
      );
    }
    return null;
  };

  return (
    <StepSequenceItemStyle
      data-component='step-sequence-item'
      { ...props }
      key={ `step-seq-item-${props.indicator}` }
    >
      {hiddenLabel()}
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
  status: PropTypes.oneOf(OptionsHelper.steps),
  /** Hidden label to be displayed if item is complete */
  hiddenCompleteLabel: PropTypes.string,
  /** Hidden label to be displayed if item is current */
  hiddenCurrentLabel: PropTypes.string
};

StepSequenceItem.defaultProps = {
  status: 'incomplete'
};

export default StepSequenceItem;
