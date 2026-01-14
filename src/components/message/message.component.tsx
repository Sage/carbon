import React, { useRef } from "react";
import { MarginProps } from "styled-system";

import Typography from "../typography";
import {
  MessageStyle,
  MessageContentWrapper,
  MessageContent,
  MessageWrapper,
  TypeIconStyle,
} from "./message.style";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import Icon, { IconType } from "../icon";
import IconButton from "../icon-button";
import AiIcon, { AiIconInverse } from "../../__internal__/ai-icon";
import { filterStyledSystemMarginProps } from "../../style/utils";
import useLocale from "../../hooks/__internal__/useLocale";
import Logger from "../../__internal__/utils/logger";

export type MessageVariant =
  | "error"
  | "info"
  | "success"
  | "warning"
  | "neutral"
  | "ai"
  | "error-subtle"
  | "info-subtle"
  | "success-subtle"
  | "warning-subtle"
  | "ai-subtle"
  | "callout-subtle";

export type InternalMessageVariant =
  | "error"
  | "info"
  | "success"
  | "warning"
  | "neutral"
  | "ai"
  | "callout";

let deprecateTransparentTriggered = false;
let deprecateNeutralVariantTriggered = false;
let deprecateShowCloseIconTriggered = false;

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
  /** @deprecated Flag to determine if the close button is rendered*/
  showCloseIcon?: boolean;
  /** Set message title */
  title?: React.ReactNode;
  /** @deprecated Set transparent styling */
  transparent?: boolean;
  /** Set the component's variant */
  variant?: MessageVariant;
  /** Set the component's width, accepts any valid css string */
  width?: string;
  /** Set the component's size */
  size?: "medium" | "large";
}

const Message = React.forwardRef<HTMLDivElement, MessageProps>(
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
      size = "medium",
      ...props
    }: MessageProps,
    ref,
  ) => {
    if (transparent && !deprecateTransparentTriggered) {
      Logger.deprecate(
        "The 'transparent' prop in `Message` is deprecated and will soon be removed.",
      );
      deprecateTransparentTriggered = true;
    }

    if (variant === "neutral" && !deprecateNeutralVariantTriggered) {
      Logger.deprecate(
        "The 'neutral' variant in `Message` is deprecated and will soon be removed.",
      );
      deprecateNeutralVariantTriggered = true;
    }

    if (showCloseIcon === false && !deprecateShowCloseIconTriggered) {
      Logger.deprecate(
        "The 'showCloseIcon' prop in `Message` is deprecated and will soon be removed. To prevent the close button from being rendered, don't pass the `onDismiss` prop.",
      );
      deprecateShowCloseIconTriggered = true;
    }

    const localRef = useRef<HTMLDivElement | null>(null);
    const messageRef = ref || localRef;
    const locale = useLocale();

    const marginProps = filterStyledSystemMarginProps(props);

    type VariantIconType = Exclude<InternalMessageVariant, "ai">;

    const VARIANT_ICON_MAP: Record<VariantIconType, IconType> = {
      neutral: "info",
      success: "tick_circle",
      error: "error",
      warning: "warning",
      info: "info",
      callout: "tag",
    };

    const isSubtle = variant.endsWith("-subtle");
    const internalVariant = variant.replace(
      "-subtle",
      "",
    ) as InternalMessageVariant;

    const getVariantIcon = () => {
      if (variant === "ai") {
        return <AiIcon data-role="ai-icon" />;
      }

      if (variant === "ai-subtle") {
        return <AiIconInverse data-role="ai-icon-subtle" />;
      }

      return (
        <Icon type={VARIANT_ICON_MAP[internalVariant as VariantIconType]} />
      );
    };

    const renderVariantIcon = () => {
      return (
        <>
          <TypeIconStyle
            aria-hidden="true"
            variant={internalVariant}
            isSubtle={isSubtle}
            transparent={transparent}
          >
            {getVariantIcon()}
          </TypeIconStyle>
          <Typography screenReaderOnly>
            {locale.message[internalVariant]?.()}
          </Typography>
        </>
      );
    };

    const renderTitle = () => {
      if (!title) return null;

      if (typeof title === "string") {
        return (
          <Typography
            m={0}
            fontWeight="500"
            fontSize={size === "large" ? "16px" : "14px"}
          >
            {title}
          </Typography>
        );
      }

      return title;
    };

    if (!open) {
      return null;
    }

    return (
      <MessageStyle
        {...tagComponent("Message", props)}
        transparent={transparent}
        variant={internalVariant}
        isSubtle={isSubtle}
        id={id}
        width={width}
        ref={messageRef}
        {...marginProps}
        tabIndex={-1}
      >
        {!isSubtle && renderVariantIcon()}
        <MessageWrapper>
          <MessageContent
            data-role="message-content"
            size={size}
            isSubtle={isSubtle}
          >
            {isSubtle && renderVariantIcon()}
            <MessageContentWrapper size={size}>
              {renderTitle()}
              {children}
            </MessageContentWrapper>
          </MessageContent>
          {showCloseIcon && onDismiss && (
            // TODO: replace with "subtle" Button
            <IconButton
              my={size === "large" ? 2 : 1}
              mr={size === "large" ? 2 : 1}
              p="4px"
              data-element="close"
              aria-label={
                closeButtonAriaLabel || locale.message.closeButtonAriaLabel()
              }
              onClick={onDismiss}
            >
              <Icon type="cross" />
            </IconButton>
          )}
        </MessageWrapper>
      </MessageStyle>
    );
  },
);

Message.displayName = "Message";

export default Message;
