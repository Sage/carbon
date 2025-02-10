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

export type MessageVariant =
  | "error"
  | "info"
  | "success"
  | "warning"
  | "neutral";

export interface MessageProps extends MarginProps {
  /** Set the component's content */
  children?: React.ReactNode;
  /** Set custom aria-label for component's close button */
  closeButtonAriaLabel?: string;
  /** Set custom id to component root */
  id?: string;
  /** Callback triggered on dismiss */
  onDismiss?: (
    e:
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;
  /** Flag to determine if the message is rendered */
  open?: boolean;
  /** Flag to determine if the close button is rendered */
  showCloseIcon?: boolean;
  /** Set message title */
  title?: React.ReactNode;
  /** Set transparent styling */
  transparent?: boolean;
  /** Set the component's variant */
  variant?: MessageVariant;
  /** Set the component's width, accepts any valid css string */
  width?: string;
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
      closeButtonAriaLabel,
      showCloseIcon = true,
      width,
      ...props
    }: MessageProps,
    ref,
  ) => {
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
        transparent={transparent}
        variant={variant}
        id={id}
        width={width}
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
