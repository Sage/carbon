import React from "react";
import PropTypes from "prop-types";

import Dialog from "../dialog";

const Alert = ({ children, ...rest }) => (
  <Dialog data-component="alert" role="alertdialog" {...rest}>
    {children}
  </Dialog>
);

Alert.propTypes = {
  /** Prop to specify the aria-describedby property of the component */
  "aria-describedby": PropTypes.string,
  /**
   * Prop to specify the aria-label of the component.
   * To be used only when the title prop is not defined, and the component is not labelled by any internal element.
   */
  "aria-label": PropTypes.string,
  /**
   * Prop to specify the aria-labeledby property of the component
   * To be used when the title prop is a custom React Node,
   * or the component is labelled by an internal element other than the title.
   */
  "aria-labelledby": PropTypes.string,
  /** Alert content */
  children: PropTypes.node,
  /** Controls the open state of the component */
  open: PropTypes.bool.isRequired,
  /** A custom close event handler */
  onCancel: PropTypes.func,
  /** Determines if the Esc Key closes the Alert */
  disableEscKey: PropTypes.bool,
  /** Allows developers to specify a specific height for the dialog. */
  height: PropTypes.string,
  /** Title displayed at top of Alert */
  title: PropTypes.node,
  /** Subtitle displayed at top of Alert */
  subtitle: PropTypes.string,
  /** Size of Alert */
  size: PropTypes.oneOf([
    "auto",
    "extra-small",
    "small",
    "medium-small",
    "medium",
    "medium-large",
    "large",
    "extra-large",
  ]),
  /** Determines if the close icon is shown */
  showCloseIcon: PropTypes.bool,
  /** Optional reference to an element meant to be focused on open */
  focusFirstElement: PropTypes.shape({ current: PropTypes.any }),
  /** Disables auto focus functionality on child elements */
  disableAutoFocus: PropTypes.bool,
};

Alert.defaultProps = {
  size: "extra-small",
};

export default Alert;
