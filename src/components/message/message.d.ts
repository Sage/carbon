import * as React from "react";
import { MarginProps } from "styled-system";

export interface MessageProps extends MarginProps {
  /** set content to component */
  children?: React.ReactNode;
  /** set custom class to component */
  className?: string;
  /** set custom aria label for message close button */
  closeButtonAriaLabel?: string;
  /** set custom id to component root */
  id?: string;
  /** function runs when user click dismiss button */
  onDismiss?: React.MouseEventHandler<HTMLButtonElement>;
  /** show message component */
  open?: boolean;
  /** determines if the close icon is shown */
  showCloseIcon?: boolean;
  /** set message title */
  title?: React.ReactNode;
  /** set background to be invisible */
  transparent?: boolean;
  /** set type of message based on new DLS standard */
  variant?:
    | "default"
    | "error"
    | "help"
    | "info"
    | "maintenance"
    | "new"
    | "success"
    | "warning";
}

declare function Message(props: MessageProps): JSX.Element;

export default Message;
