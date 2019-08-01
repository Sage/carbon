import React from 'react';
import PropTypes from 'prop-types';

class RadioButton extends React.component {
static propTypes = {
  /**
       * Classes to apply to the component.
       */
  className: PropTypes.string,

  /**
       * Displays fieldHelp inline with the checkbox/radio button.
       *
       */
  fieldHelpInline: PropTypes.bool,
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
export default RadioButton;
