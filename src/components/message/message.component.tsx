import React, { useRef } from "react";
import { MarginProps } from "styled-system";

import Typography from "../typography";
import MessageStyle from "./message.style";
import TypeIcon from "./__internal__/type-icon/type-icon.component";
import MessageContent from "./__internal__/message-content/message-content.component";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import Icon from "../icon";
import IconButton from "../icon-button";
import { filterStyledSystemMarginProps } from "../../style/utils";
import useLocale from "../../hooks/__internal__/useLocale";
import Logger from "../../__internal__/utils/logger";

let deprecatedClassNameWarningShown = false;

export type MessageVariant =
  | "error"
  | "info"
  | "success"
  | "warning"
  | "neutral";

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
  onDismiss?: (
    e:
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;
  /** show message component */
  open?: boolean;
  /** determines if the close icon is shown */
  showCloseIcon?: boolean;
  /** set message title */
  title?: React.ReactNode;
  /** set background to be invisible */
  transparent?: boolean;
  /** set type of message based on new DLS standard */
  variant?: MessageVariant;
}

export const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  (
    {
      open = true,
      transparent = false,
      title,
      variant = "info",
      children,
      onDismiss,
      id,
      className,
      closeButtonAriaLabel,
      showCloseIcon = true,
      ...props
    }: MessageProps,
    ref,
  ) => {
    if (!deprecatedClassNameWarningShown && className) {
      Logger.deprecate(
        "The 'className' prop has been deprecated and will soon be removed from the 'Message' component.",
      );
      deprecatedClassNameWarningShown = true;
    }
    const messageRef = useRef<HTMLDivElement | null>(null);
    const refToPass = ref || messageRef;

    const marginProps = filterStyledSystemMarginProps(props);
    const l = useLocale();

    const renderCloseIcon = () => {
      if (!showCloseIcon || !onDismiss) return null;

      return (
        <IconButton
          data-element="close"
          aria-label={closeButtonAriaLabel || l.message.closeButtonAriaLabel()}
          onClick={onDismiss}
        >
          <Icon type="close" />
        </IconButton>
      );
    };

    return open ? (
      <MessageStyle
        {...tagComponent("Message", props)}
        className={className}
        transparent={transparent}
        variant={variant}
        id={id}
        ref={refToPass}
        {...marginProps}
        tabIndex={-1}
      >
        <TypeIcon variant={variant} transparent={transparent} />
        <Typography screenReaderOnly>{l.message[variant]()}</Typography>
        <MessageContent
          showCloseIcon={showCloseIcon}
          title={title}
          reduceLeftPadding={transparent}
        >
          {children}
        </MessageContent>
        {renderCloseIcon()}
      </MessageStyle>
    ) : null;
  },
);

Message.displayName = "Message";

export default Message;
