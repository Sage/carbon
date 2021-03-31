import * as React from "react";
import { ModalProps } from "../modal/modal";

export interface DialogFullScreenProps extends ModalProps {
  /** Child elements */
  children?: React.ReactElement;
  /** remove padding from content */
  disableContentPadding?: boolean;
  /** Container for components to be displayed in the header */
  headerChildren?: React.ReactElement;
  /** For legacy styling when used with Pages component. Do not use this unless using Pages within a DialogFullScreen */
  pagesStyling?: boolean;
  /** Determines if the close icon is shown */
  showCloseIcon?: boolean;
  /** Subtitle displayed at top of dialog */
  subtitle?: string;
  /** Title displayed at top of dialog */
  title?: string | object;
}

declare class DialogFullScreen extends React.Component<DialogFullScreenProps> {}

export default DialogFullScreen;
