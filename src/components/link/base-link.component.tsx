import React, { useMemo } from "react";
import Icon, { IconType } from "../icon";
import useLocale from "../../hooks/__internal__/useLocale";
import { StyledContent } from "./link.style";

export interface BaseLinkProps extends React.AriaAttributes {
  href?: string;
  icon?: IconType;
  iconAlign?: "left" | "right";
  tooltipMessage?: string;
  tooltipPosition?: "bottom" | "left" | "right" | "top";
  children?: React.ReactNode;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  onMouseDown?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  removeAriaLabelOnIcon?: boolean;
  isSkipLink?: boolean;
  disabled?: boolean;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  ref?: React.Ref<HTMLAnchorElement | HTMLButtonElement>;
  "data-element"?: string;
}

const BaseLink = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  BaseLinkProps
>(
  (
    {
      href,
      icon,
      iconAlign = "left",
      tooltipMessage,
      tooltipPosition,
      children,
      target,
      rel,
      ariaLabel,
      onClick,
      onKeyDown,
      onMouseDown,
      removeAriaLabelOnIcon,
      isSkipLink,
      disabled,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const l = useLocale();

    const ariaProps = useMemo(() => {
      return Object.entries(rest).reduce<Record<string, unknown>>(
        (acc, [key, value]) => {
          if (key.startsWith("aria-") || key.startsWith("data-")) {
            acc[key] = value;
          }
          return acc;
        },
        {},
      );
    }, [rest]);

    const renderIcon = (align: "left" | "right") =>
      icon && iconAlign === align ? (
        <Icon
          type={icon}
          disabled={disabled}
          ariaLabel={removeAriaLabelOnIcon ? undefined : ariaLabel}
          tooltipMessage={tooltipMessage}
          tooltipPosition={tooltipPosition}
          data-testid="icon"
        />
      ) : null;

    const Element = onClick && !href ? "button" : "a";

    const commonProps = {
      ref,
      onClick: disabled ? undefined : onClick,
      onKeyDown,
      onMouseDown,
      onFocus,
      onBlur,
      target,
      rel,
      href,
      disabled,
      "aria-label": ariaLabel,
      ...ariaProps,
    };

    const content = isSkipLink ? l.link.skipLinkLabel() : children;

    return React.createElement(
      Element,
      Element === "button"
        ? { ...commonProps, type: "button" }
        : { ...commonProps },
      <>
        {renderIcon("left")}
        <StyledContent data-testid="link-content">{content}</StyledContent>
        {renderIcon("right")}
      </>,
    );
  },
);

BaseLink.displayName = "BaseLink";
export default BaseLink;
