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
  | "neutral"
  | "ai";

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

    const VARIANT_ICON_MAP: Record<Exclude<MessageVariant, "ai">, IconType> = {
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
          {variant === "ai" ? (
            <svg
              data-role="ai-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 20 20"
            >
              <g clipPath="url(#a)">
                <path
                  fill="#fff"
                  d="m16.378 9.799-3.776-1.49a1.615 1.615 0 0 1-.91-.91l-1.49-3.775c-.537-1.364-2.466-1.364-3.004 0L5.708 7.4a1.615 1.615 0 0 1-.91.91L1.022 9.799c-1.363.537-1.363 2.466 0 3.004l3.776 1.49c.417.163.746.493.91.91l1.49 3.775c.538 1.363 2.467 1.363 3.005 0l1.489-3.776c.164-.416.494-.745.91-.91l3.776-1.489c1.364-.538 1.364-2.467 0-3.004Z"
                />
                <path
                  fill="#00D639"
                  d="M17.172 5.655a2.827 2.827 0 1 0 0-5.655 2.827 2.827 0 0 0 0 5.655Z"
                />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M0 0h20v20H0z" />
                </clipPath>
              </defs>
            </svg>
          ) : (
            <Icon type={VARIANT_ICON_MAP[variant]} />
          )}
        </TypeIconStyle>

        <Typography screenReaderOnly>
          {locale.message?.[variant]?.()}
        </Typography>
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
