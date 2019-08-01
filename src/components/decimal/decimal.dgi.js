import React from 'react';
import PropTypes from 'prop-types';

class Decimal extends React.component {
static propTypes = {

  // NB align is used in the Input decorator. Removing the prop from here
  // causes an 'uknown prop align on input tag' error, so the
  // react/no-unused-prop-types has been disabled for this prop
  /**
     * Sets the default value alignment
     */
  align: PropTypes.string, // eslint-disable-line react/no-unused-prop-types

  /**
     * Callback function for when the decimal input
     * field blur event fires.
     */
  onBlur: PropTypes.func,

  /**
     * Callback to handle keyDown events.
     */
  onKeyDown: PropTypes.func,

  /**
     * Sets the precision of the field
     */
  precision: PropTypes.number,
  /**
     * The value of the Number input element
     */
  value: PropTypes.string,

  /**
     * The name of the hidden input element
     */
  name: PropTypes.string,
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
export default Decimal;
