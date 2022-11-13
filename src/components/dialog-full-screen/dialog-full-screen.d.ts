import * as React from "react";
import { ModalProps } from "../modal";

export interface DialogFullScreenProps extends ModalProps {
  /** Prop to specify the aria-describedby property of the DialogFullscreen component */
  "aria-describedby"?: string;
  /**
   * Prop to specify the aria-label of the DialogFullscreen component.
   * To be used only when the title prop is not defined, and the component is not labelled by any internal element.
   */
  "aria-label"?: string;
  /**
   * Prop to specify the aria-labelledby property of the DialogFullscreen component
   * To be used when the title prop is a custom React Node,
   * or the component is labelled by an internal element other than the title.
   */
  "aria-labelledby"?: string;
  /** Child elements */
  children?: React.ReactNode;
  /** Reference to the scrollable content element */
  contentRef?:
    | React.MutableRefObject<HTMLElement>
    | (() => React.MutableRefObject<HTMLElement>);
  /** Disables auto focus functionality on child elements */
  disableAutoFocus?: boolean;
  /** remove padding from content */
  disableContentPadding?: boolean;
  /** Optional reference to an element meant to be focused on open */
  focusFirstElement?: React.MutableRefObject<HTMLElement>;
  /** Container for components to be displayed in the header */
  headerChildren?: React.ReactNode;
  /** Adds Help tooltip to Header */
  help?: string;
  /** For legacy styling when used with Pages component. Do not use this unless using Pages within a DialogFullScreen */
  pagesStyling?: boolean;
  /** Determines if the close icon is shown */
  showCloseIcon?: boolean;
  /** Subtitle displayed at top of dialog */
  subtitle?: string;
  /** Title displayed at top of dialog */
  title?: React.ReactNode;
  /** The ARIA role to be applied to the DialogFullscreen container */
  role?: string;
  /** an optional array of refs to containers whose content should also be reachable by tabbing from the dialog */
  focusableContainers?: React.MutableRefObject<HTMLElement | null>[];
  /** Optional selector to identify the focusable elements, if not provided a default selector is used */
  focusableSelectors?: string;
}

declare function DialogFullScreen(props: DialogFullScreenProps): JSX.Element;

export default DialogFullScreen;
