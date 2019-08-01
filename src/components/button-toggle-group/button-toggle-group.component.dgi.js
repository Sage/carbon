import React from 'react';
import PropTypes from 'prop-types';
import OptionsHelper from '../../utils/helpers/options-helper';

const validationShape = PropTypes.shape({
  message: PropTypes.func,
  validate: PropTypes.func
});
const validationsPropTypes = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, validationShape]))
]);

class ButtonToggleGroup extends React.component {
static propTypes = {
  /** flag to indicate if the component is disabled */
  disabled: PropTypes.bool,
  /** flag to indicate if the component is in an error state */
  hasError: PropTypes.bool,
  /** label for the component */
  name: PropTypes.string,
  /** flag to indicate the reverse state of the component */
  reverse: PropTypes.bool,
  /** size property of the component */
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
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
  labelAlign: PropTypes.string,
  /** The current value of the component */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  /** Custom function to be called when the component blurs */
  onBlur: PropTypes.func,
  /** Custom function called when component value changes */
  onChange: PropTypes.func,
  /** An array of validations to apply to the input. */
  validations: validationsPropTypes,
  /** An array of warnings to apply to the input. */
  warnings: validationsPropTypes,
  /** An array of info messages to apply to the input. */
  info: validationsPropTypes,
  /** triggers validation when it's boolean value changes */
  forceUpdateTriggerToggle: PropTypes.bool,
  /** Custom function to add input form to state */
  addInputToFormState: PropTypes.func
}

render() {
  return (<></>);
}
}
export default ButtonToggleGroup;
