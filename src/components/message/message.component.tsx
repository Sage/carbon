import React, { useRef } from "react";
import { MarginProps } from "styled-system";

import Typography from "../typography";
import Content from "../content";
import MessageStyle, { MessageContent, TypeIconStyle } from "./message.style";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import Icon from "../icon";
import IconButton from "../icon-button";
import { filterStyledSystemMarginProps } from "../../style/utils";
import useLocale from "../../hooks/__internal__/useLocale";

export interface TypeIconProps {
  transparent?: boolean;
  variant: MessageVariant;
}

export type MessageVariant =
  | "error"
  | "info"
  | "success"
  | "warning"
  | "neutral";

export interface MessageProps extends MarginProps, TagProps {
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
    const localRef = useRef<HTMLDivElement | null>(null);
    const messageRef = ref || localRef;
    const locale = useLocale();

    const marginProps = filterStyledSystemMarginProps(props);

    type IconType = "error" | "info" | "tick_circle" | "warning";

    const VARIANT_ICON_MAP: Record<MessageVariant, IconType> = {
      neutral: "info",
      success: "tick_circle",
      error: "error",
      warning: "warning",
      info: "info",
    };

    if (!open) {
      return null;
    }

    return (
      <MessageStyle
        {...tagComponent("Message", props)}
        transparent={transparent}
        variant={variant}
        id={id}
        width={width}
        ref={messageRef}
        {...marginProps}
        tabIndex={-1}
      >
        <TypeIconStyle variant={variant} transparent={transparent}>
          <Icon data-role="category-icon" type={VARIANT_ICON_MAP[variant]} />
        </TypeIconStyle>
        <Typography screenReaderOnly>{locale.message[variant]()}</Typography>
        <MessageContent
          data-element="message-content"
          data-role="message-content"
        >
          {!showCloseIcon || !onDismiss ? (
            <Content title={title}>{children}</Content>
          ) : (
            <>
              <Content title={title}>{children}</Content>
              <IconButton
                data-element="close"
                aria-label={
                  closeButtonAriaLabel || locale.message.closeButtonAriaLabel()
                }
                onClick={onDismiss}
              >
                <Icon type="close" />
              </IconButton>
            </>
          )}
        </MessageContent>
      </MessageStyle>
    );
  },
);

Message.displayName = "Message";

export default Message;
