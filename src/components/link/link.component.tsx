import React, { forwardRef, useContext, useState, useMemo } from "react";
import styled from "styled-components";
import LinkBase, { LinkBaseProps } from "./link-base.component";
import Icon, { IconType } from "../icon";
import MenuContext from "../menu/__internal__/menu.context";

const StyledLink = styled.a<{ hasChildren: boolean; iconAlign: "left" | "right" }>`
  text-decoration: ${(props) => (props.hasChildren ? "underline" : "none")};
  display: inline-flex;
  align-items: center;
  ${(props) =>
    props.iconAlign === "left"
      ? `
      margin-right: var(--spacing100);
      `
      : `
      margin-left: var(--spacing100);
      `}
`;

const LinkIconWrapper = styled.span`
  position: relative;
`;

export interface LinkProps extends LinkBaseProps {
  icon?: IconType;
  iconAlign?: "left" | "right";
  tooltipMessage?: string;
  tooltipPosition?: "top" | "right" | "bottom" | "left";
  removeAriaLabelOnIcon?: boolean;
  ariaLabel?: string;
  isDarkBackground?: boolean;
}

const Link = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  LinkProps
>(({
  icon,
  iconAlign = "left",
  tooltipMessage,
  tooltipPosition,
  removeAriaLabelOnIcon,
  ariaLabel,
  children,
  ...rest
}, ref) => {
  const { inMenu } = useContext(MenuContext);
  const [ setHasFocus] = useState(false);
  const hasChildren = !!children;

  const isDisabled = rest.disabled || false;

  const ariaProps = useMemo(() => {
    const restObject = rest as Record<string, unknown>;

    return Object.keys(restObject)
      .filter((key) => key.startsWith("aria"))
      .reduce((obj: Record<string, unknown>, key: string) => {
        obj[key] = restObject[key];
        return obj;
      }, {});
  }, [rest]);

  const componentProps = {
    ref,
    ...ariaProps,
    ...rest,
    onFocus: () => setHasFocus(true),
    onBlur: () => setHasFocus(false),
  };

  return (
    <LinkBase {...componentProps}>
      <StyledLink hasChildren={hasChildren} iconAlign={iconAlign}>
        {iconAlign === "left" && icon && (
          <LinkIconWrapper>
            <Icon
              type={icon}
              disabled={isDisabled}
              ariaLabel={removeAriaLabelOnIcon ? undefined : ariaLabel}
              tooltipMessage={tooltipMessage}
              tooltipPosition={tooltipPosition}
              data-testid="icon"
            />
          </LinkIconWrapper>
        )}
        {hasChildren && <span>{children}</span>}
        {iconAlign === "right" && icon && (
          <LinkIconWrapper>
            <Icon
              type={icon}
              disabled={isDisabled}
              ariaLabel={removeAriaLabelOnIcon ? undefined : ariaLabel}
              tooltipMessage={tooltipMessage}
              tooltipPosition={tooltipPosition}
              data-testid="icon"
            />
          </LinkIconWrapper>
        )}
      </StyledLink>
    </LinkBase>
  );
});

Link.displayName = "Link";
export default Link;
