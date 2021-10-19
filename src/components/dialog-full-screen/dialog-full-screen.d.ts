import * as React from "react";
import Modal, { ModalProps } from "../modal/modal";

export interface DialogFullScreenProps extends ModalProps {
  /** Child elements */
  children?: React.ReactNode;
  /** remove padding from content */
  disableContentPadding?: boolean;
  /** Container for components to be displayed in the header */
  headerChildren?: React.ReactNode;
  /** For legacy styling when used with Pages component. Do not use this unless using Pages within a DialogFullScreen */
  pagesStyling?: boolean;
  /** Determines if the close icon is shown */
  showCloseIcon?: boolean;
  /** Subtitle displayed at top of dialog */
  subtitle?: string;
  /** Title displayed at top of dialog */
  title?: React.ReactNode;
}

declare class DialogFullScreen extends Modal<DialogFullScreenProps> {}

export default DialogFullScreen;
