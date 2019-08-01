import React from 'react';
import PropTypes from 'prop-types';

class Dropdown extends React.component {
static propTypes = {
  /**
     * Automatically focus the input.
     */
  autoFocus: PropTypes.bool,

  /**
     * Determines if the visibleValue will be cached or not.
     */
  cacheVisibleValue: PropTypes.bool,

  /**
     * Disable all user interaction.
     */
  disabled: PropTypes.bool,

  /**
    * A custom onBlur handler.
    */
  onBlur: PropTypes.func,

  /**
     * The options to be displayed in the dropdown. Should be set in the store and passed from the parent component.
     *
     * This should be an Immutable object.
     */
  options: PropTypes.object.isRequired,

  /**
     * Set the name of the corresponding hidden input.
     */
  name: PropTypes.string,

  /**
     * Display the currently selected value without displaying the dropdown.
     */
  readOnly: PropTypes.bool,

  /**
     * The ID value for the component
     */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),

  /**
     * An optional function to be passed that will render each of the dropdown's items.
     */
  renderItem: PropTypes.func,
  /**
       * Integer to determine timeout for defered callback. Default: 750
       */
  deferTimeout: PropTypes.number,

  /**
       * Defered callback called after onChange event
       */
  onChangeDeferred: PropTypes.func,
  /**
       * Either a string or false to turn the label off
       */
  label: PropTypes.node,

  /**
       * Pass true to format the input/label inline
       */
  labelInline: PropTypes.bool,

  /**
       * Pass a percentage to define the width of the label when it
       *  is displayed inline.
       */
  labelWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),


  /**
       * Aligns label content to the right if set
       */
  labelAlign: PropTypes.string,

  /**
       * Text applied to tooptip of help icon
       */
  labelHelp: PropTypes.string,

  /**
       * Pass a percentage to define the width of the label when it
       *  is displayed inline
       */
  inputWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),

  /**
       * A string representing a help message
       */
  fieldHelp: PropTypes.node,

  /**
       * Boolean to determine whether the help message should be inline
       */
  fieldHelpInline: PropTypes.bool,
  /**
       * Array of validations to apply to this input
       */
  validations: PropTypes.array,

  /**
       * Array of warnings to apply to this input
       */
  warnings: PropTypes.array,

  /**
       * Array of info to apply to this input
       */
  info: PropTypes.array,

  /**
       * Number which sets timing of when the message will disappear
       * Expected time is set in miliseconds
       */
  timeToDisappear: PropTypes.number
}

render() {
  return (<></>);
}
}
export default Dropdown;
