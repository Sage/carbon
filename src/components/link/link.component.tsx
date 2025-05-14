import React, { forwardRef, useContext, useState } from "react";
import styled, { css } from "styled-components";
import LinkBase, { LinkBaseProps } from "./link-base.component";
import Icon, { IconType } from "../icon";
import MenuContext from "../menu/__internal__/menu.context";

export interface LinkProps extends LinkBaseProps {
  icon?: IconType;
  iconAlign?: "left" | "right";
  tooltipMessage?: string;
  tooltipPosition?: "top" | "right" | "bottom" | "left";
  removeAriaLabelOnIcon?: boolean;
  ariaLabel?: string;
  isDarkBackground?: boolean;
  maxWidth?: boolean;
}

const StyledLinkContent = styled.span<{ $maxWidth?: boolean }>`
  display: inline-flex;
  align-items: center;

  ${({ $maxWidth }) =>
    $maxWidth &&
    css`
      max-width: inherit;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: bottom;
    `}
`;

const IconWrapper = styled.span<{
  iconAlign: "left" | "right";
  hasChildren: boolean;
}>`
  position: relative;

  ${({ iconAlign, hasChildren }) =>
    !hasChildren
      ? css`
          margin: 0;
        `
      : iconAlign === "left"
      ? css`
          margin-right: var(--spacing100);
        `
      : css`
          margin-left: var(--spacing100);
          margin-right: 0;
        `}
`;

const Link = forwardRef<HTMLAnchorElement | HTMLButtonElement, LinkProps>(
  (
    {
      icon,
      iconAlign = "left",
      tooltipMessage,
      tooltipPosition,
      removeAriaLabelOnIcon,
      ariaLabel,
      children,
      maxWidth,
      ...rest
    },
    ref
  ) => {
    const { inMenu } = useContext(MenuContext);
    const [hasFocus, setHasFocus] = useState(false);
    const hasChildren = !!children;
    const isDisabled = rest.disabled || false;

    const renderIcon = (alignment: "left" | "right") => {
      if (icon && iconAlign === alignment) {
        return (
          <IconWrapper
            iconAlign={iconAlign}
            hasChildren={hasChildren}
            data-testid="icon-wrapper"
            data-role="icon-wrapper"
          >
            <Icon
              type={icon}
              disabled={isDisabled}
              ariaLabel={removeAriaLabelOnIcon ? undefined : ariaLabel}
              tooltipMessage={tooltipMessage}
              tooltipPosition={tooltipPosition}
              data-testid="icon"
            />
          </IconWrapper>
        );
      }
      return null;
    };

    const componentProps = {
      ref,
      ...rest,
      ...(ariaLabel && { "aria-label": ariaLabel }),
      onFocus: () => setHasFocus(true),
      onBlur: () => setHasFocus(false),
      "data-testid": "link-base",
    };

    return (
      <LinkBase {...componentProps}>
        <StyledLinkContent $maxWidth={maxWidth} data-testid="link-content">
          {iconAlign === "left" && renderIcon("left")}
          {hasChildren && <span>{children}</span>}
          {iconAlign === "right" && renderIcon("right")}
        </StyledLinkContent>
      </LinkBase>
    );
  }
);

Link.displayName = "Link";
export default Link;