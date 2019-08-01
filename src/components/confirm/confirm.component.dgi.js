import React from 'react';
import PropTypes from 'prop-types';

class Confirm extends React.component {
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
  // ** A custom event handler when a confirmation takes place */
  onConfirm: PropTypes.func.isRequired,

  // ** Customise the confirm button label */
  confirmLabel: PropTypes.string,

  // ** Customise the cancel button label */
  cancelLabel: PropTypes.string
}

render() {
  return (<></>);
}
}
export default Confirm;
