import * as React from "react";
import { ModalProps } from "../modal";

type PaddingValues = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface ContentPaddingInterface {
  p?: PaddingValues;
  py?: PaddingValues;
  px?: PaddingValues;
}

export type DialogSizes =
  | "auto"
  | "extra-small"
  | "small"
  | "medium-small"
  | "medium"
  | "medium-large"
  | "large"
  | "extra-large";

export interface DialogProps extends ModalProps {
  /** Prop to specify the aria-describedby property of the Dialog component */
  "aria-describedby"?: string;
  /**
   * Prop to specify the aria-label of the Dialog component.
   * To be used only when the title prop is not defined, and the component is not labelled by any internal element.
   */
  "aria-label"?: string;
  /**
   * Prop to specify the aria-labelledby property of the Dialog component
   * To be used when the title prop is a custom React Node,
   * or the component is labelled by an internal element other than the title.
   */
  "aria-labelledby"?: string;
  /* Disables auto focus functionality on child elements */
  disableAutoFocus?: boolean;
  /* Disables the focus trap when the dialog is open */
  disableFocusTrap?: boolean;
  /** Optional reference to an element meant to be focused on open */
  focusFirstElement?: React.MutableRefObject<HTMLElement>;
  /** Allows developers to specify a specific height for the dialog. */
  height?: string;
  /** Adds Help tooltip to Header */
  help?: string;
  /** A custom close event handler */
  onCancel?: (
    ev: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLButtonElement>
  ) => void;
  /** Determines if the close icon is shown */
  showCloseIcon?: boolean;
  /** Size of dialog, default size is 750px */
  size?: DialogSizes;
  /** Subtitle displayed at top of dialog */
  subtitle?: string;
  /** Title displayed at top of dialog */
  title?: React.ReactNode;
  /** The ARIA role to be applied to the Dialog container */
  role?: string;
  /** Padding to be set on the Dialog content */
  contentPadding?: ContentPaddingInterface;
  /** an optional array of refs to containers whose content should also be reachable by tabbing from the dialog */
  focusableContainers?: React.MutableRefObject<HTMLElement>[];
}

declare function Dialog(props: DialogProps): JSX.Element;

export default Dialog;
