import React, { forwardRef, useMemo } from "react";
import Icon, { IconType } from "../icon";
import { StyledContent } from "./link.style";
import useLocale from "../../hooks/__internal__/useLocale";

export interface BaseLinkProps extends React.AriaAttributes {
  href?: string;
  icon?: IconType;
  iconAlign?: "left" | "right";
  tooltipMessage?: string;
  tooltipPosition?: "top" | "right" | "bottom" | "left";
  target?: string;
  rel?: string;
  ariaLabel?: string;
  removeAriaLabelOnIcon?: boolean;
  isSkipLink?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  onMouseDown?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  onFocus?: () => void;
  onBlur?: () => void;
}

const BaseLink = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  BaseLinkProps
>(
  (
    {
      icon,
      iconAlign = "left",
      tooltipMessage,
      tooltipPosition,
      rel,
      target,
      href,
      onClick,
      onKeyDown,
      onMouseDown,
      ariaLabel,
      removeAriaLabelOnIcon,
      isSkipLink,
      disabled,
      className,
      children,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const locale = useLocale();

    const ariaProps = useMemo(() => {
      const props: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(rest)) {
        if (key.startsWith("aria-") || key.startsWith("data-")) {
          props[key] = value;
        }
      }
      return props;
    }, [rest]);

    const renderIcon = (position: "left" | "right") => {
      if (icon && iconAlign === position) {
        return (
          <Icon
            type={icon}
            disabled={disabled}
            ariaLabel={removeAriaLabelOnIcon ? undefined : ariaLabel}
            tooltipMessage={tooltipMessage}
            tooltipPosition={tooltipPosition}
          />
        );
      }
      return null;
    };

    const isButton = onClick && !href;
    const tag = isButton ? "button" : "a";

    const commonProps = {
      ref,
      onClick: disabled ? undefined : onClick,
      onKeyDown,
      onMouseDown,
      "aria-label": ariaLabel,
      className,
      disabled,
      target,
      href,
      rel,
      onFocus,
      onBlur,
      "data-disabled": disabled ? "true" : undefined,
      ...(isButton ? { type: "button" } : { "data-role": "link-anchor" }),
      ...ariaProps,
    };

    return React.createElement(
      tag,
      commonProps,
      <>
        {renderIcon("left")}
        <StyledContent>
          {isSkipLink ? locale.link.skipLinkLabel() : children}
        </StyledContent>
        {renderIcon("right")}
      </>,
    );
  },
);

BaseLink.displayName = "BaseLink";
export default BaseLink;
