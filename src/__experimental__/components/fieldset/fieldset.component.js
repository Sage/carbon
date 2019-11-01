import React from 'react';
import PropTypes from 'prop-types';
import { validProps } from '../../../utils/ether';
import tagComponent from '../../../utils/helpers/tags';
import { FieldsetStyle, LegendContainerStyle } from './fieldset.style';
import ValidationIcon from '../../../components/validations/validation-icon.component';
import { getValidationType } from '../../../components/validations/with-validation.hoc';

const validationsPresent = ({ hasError, hasWarning, hasInfo }) => hasError || hasWarning || hasInfo;

const Fieldset = (props) => {
  const validationIcon = () => {
    if (validationsPresent(props) && props.tooltipMessage) {
      return (
        <ValidationIcon
          type={ getValidationType(props) }
          tooltipMessage={ props.tooltipMessage }
          tabIndex={ 0 }
        />
      );
    }

    return null;
  };

  const legend = () => {
    if (!props.legend) return null;

    return (
      <LegendContainerStyle>
        <legend data-element='legend'>
          { props.legend }
        </legend>
        { validationIcon() }
      </LegendContainerStyle>
    );
  };

  const { ...safeProps } = validProps({
    propTypes: Fieldset.propTypes,
    props
  });

  return (
    <FieldsetStyle
      { ...tagComponent('fieldset', props) }
      { ...safeProps }
    >
      { legend() }
      { props.children }
    </FieldsetStyle>
  );
};

Fieldset.propTypes = {
  /** Child elements */
  children: PropTypes.node,
  /** The text for the fieldsets legend element. */
  legend: PropTypes.string,
  /** Prop to indicate that an error has occurred */
  hasError: PropTypes.bool,
  /** Prop to indicate that a warning has occurred */
  hasWarning: PropTypes.bool,
  /** Prop to indicate additional information  */
  hasInfo: PropTypes.bool,
  /** A message that the ValidationIcon component will display */
  tooltipMessage: PropTypes.string
};

export default Fieldset;
