import React from 'react';
import PropTypes from 'prop-types';

class Textarea extends React.component {
static propTypes = {
/** A custom close event handler */
  onCancel: PropTypes.func,
  /** Sets the open state of the modal */
  open: PropTypes.bool.isRequired,
  /** Determines if the background is disabled when the modal is open */
  enableBackgroundUI: PropTypes.bool,
  /** Determines if the Esc Key closes the modal */
  disableEscKey: PropTypes.bool,
  /** The ARIA role to be applied to the modal */
  ariaRole: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  /** Allows developers to specify a specific height for the dialog. */
  height: PropTypes.string,
  /** Title displayed at top of dialog */
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  /** Subtitle displayed at top of dialog */
  subtitle: PropTypes.string,
  /** Size of dialog, default size is 750px */
  size: PropTypes.string,
  /** Determines if the close icon is shown */
  showCloseIcon: PropTypes.bool,
  /** If true then the dialog receives focus when it opens */
  autoFocus: PropTypes.bool,
  /** Determines if the sticky footer is shown */
  stickyFormFooter: PropTypes.bool,
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
export default Textarea;
