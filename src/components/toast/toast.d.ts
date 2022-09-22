import * as React from "react";

type ToastVariants = "error" | "info" | "success" | "warning" | "notice";

export interface ToastPropTypes {
  /** The rendered children of the component. */
  children: React.ReactNode;
  /** Customizes the appearance in the DLS theme */
  variant?: ToastVariants;
  /** Custom className */
  className?: string;
  /** Custom id  */
  id?: string;
  /** Component name */
  "data-component"?: string;
  /** Determines if the Toast is open. */
  open?: boolean;
  /** Callback for when dismissed. */
  onDismiss?: () => void;
  /** Time for Toast to remain on screen */
  timeout?: string | number;
  /** Centers the Toast on the screen */
  isCenter?: boolean;
  /** Target Portal ID where the Toast will render */
  targetPortalId?: string;
  /** Maximum toast width */
  maxWidth?: string;
  /** Disables auto focus functionality when the Toast has a close icon */
  disableAutoFocus?: boolean;
}

declare function Toast(
  props: ToastPropTypes & React.RefAttributes<HTMLDivElement>
): JSX.Element;

export default Toast;
