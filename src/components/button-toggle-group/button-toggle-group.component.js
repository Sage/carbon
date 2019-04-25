import React from 'react';
import PropTypes from 'prop-types';
import FormField from '../../__experimental__/components/form-field';
import ButtonToggleGroupStyle from './button-toggle-group.style';

const ButtonToggleGroup = (props) => {
  return (
    <FormField { ...props }>
      <ButtonToggleGroupStyle { ...props }>
        {props.children}
      </ButtonToggleGroupStyle>
    </FormField>
  );
};

ButtonToggleGroup.propTypes = {
  /** Children to be rendered (ButtonToggle). */
  children: PropTypes.node.isRequired,
  /** Text for the label. */
  label: PropTypes.string,
  /** Text for the labels help tooltip. */
  labelHelp: PropTypes.string,
  /** The percentage width of the ButtonToggleGroup. */
  inputWidth: PropTypes.number,
  /** The text for the field help. */
  fieldHelp: PropTypes.string,
  /** Sets the field help to inline. */
  fieldHelpInline: PropTypes.bool,
  /** Sets the label to be inline. */
  labelInline: PropTypes.bool,
  /** The percentage width of the label. */
  labelWidth: PropTypes.number,
  /** The alignment for the text in the label. */
  labelAlign: PropTypes.string
};

export default ButtonToggleGroup;
