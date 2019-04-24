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
  children: PropTypes.node.isRequired, /** Children to be rendered (ButtonToggle). */
  label: PropTypes.string, /** Text for the label. */
  labelHelp: PropTypes.string, /** Text for the labels help tooltip. */
  inputWidth: PropTypes.number, /** The percentage width of the ButtonToggleGroup. */
  fieldHelp: PropTypes.string, /** The text for the field help. */
  fieldHelpInline: PropTypes.bool, /** Sets the field help to inline. */
  labelInline: PropTypes.bool, /** Sets the label to be inline. */
  labelWidth: PropTypes.number, /** The percentage width of the label. */
  labelAlign: PropTypes.string /** The alignment for the text in the label. */
};

export default ButtonToggleGroup;
