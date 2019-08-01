import React from 'react';
import PropTypes from 'prop-types';

class GroupedCharacter extends React.component {
static propTypes = {
/**
     * A custom class name for the component.
     */
  className: PropTypes.string,
  /** an array of  group sizes */
  groups: PropTypes.array.isRequired,
  /** pixel value that sets inputWidth */
  inputWidth: PropTypes.string,
  /** a separator character to insert between number groups */
  separator: ((props, propName, componentName) => {
    if ((props[propName]).length > 1 || typeof props[propName] !== 'string') {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Must be string of length 1.`
      );
    }
    return null;
  }),

  /**
     * The value of the Input
     *
     * @property value
     * @type {String}
     */
  value: PropTypes.string,
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
export default GroupedCharacter;
