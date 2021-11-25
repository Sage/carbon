import * as React from "react";
import { PaddingProps } from "styled-system";

export interface PopoverContainerProps extends PaddingProps {
  /** The element that will open popover-container */
  renderOpenComponent?: React.ReactNode | Node;
  /** The element that will close popover-container */
  renderCloseComponent?: React.ReactNode | Node;
  /** The content of the popover-container */
  children?: React.ReactNode;
  /** Sets rendering position of dialog */
  position?: "left" | "right";
  /** Sets the popover container dialog header name */
  title?: string;
  /** Callback fires when close icon clicked */
  onClose?: () => void;
  /** if `true` the popover-container is open */
  open?: boolean;
  /** Callback fires when open component is clicked */
  onOpen?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** if `true` the popover-container will cover open button */
  shouldCoverButton?: boolean;
  /** The id of the element that describe the dialog. */
  ariaDescribedBy?: string;
  /** Open button aria label */
  openButtonAriaLabel?: string;
  /** Close button aria label */
  closeButtonAriaLabel?: string;
  /** Container aria label */
  containerAriaLabel?: string;
}

declare function PopoverContainer(props: PopoverContainerProps): JSX.Element;

export default PopoverContainer;
