import React, { useMemo } from "react";
import { IconType } from "components/icon/icon";

import Icon from "../icon";
import Event from "../../__internal__/utils/helpers/events";
import { StyledLink, StyledContent } from "./link.style";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import useLocale from "../../hooks/__internal__/useLocale";

export interface LinkProps extends React.AriaAttributes {
  /** The disabled state of the link. */
  disabled?: boolean;
  /** An href for an anchor tag. */
  href?: string;
  /** An icon to display next to the link. */
  icon?: IconType;
  /** Which side of the link to the render the link. */
  iconAlign?: "left" | "right";
  /** Function called when the mouse is clicked. */
  onClick?: (
    ev:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  /** Function called when a key is pressed. */
  onKeyDown?: (
    ev:
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  /** Function called when a mouse down event triggers. */
  onMouseDown?: (
    ev:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => void;

  /** Whether to include the link in the tab order of the page */
  tabbable?: boolean;
  /** A message to display as a tooltip to the link. */
  tooltipMessage?: string;
  /** Positions the tooltip with the link. */
  tooltipPosition?: "bottom" | "left" | "right" | "top";
  /** Child content to render in the link. */
  children?: React.ReactNode;
  /** Classes to apply to the component. */
  className?: string;
  /** Target property in which link should open ie: _blank, _self, _parent, _top */
  target?: string;
  /** Aria label for accessibility purposes */
  ariaLabel?: string;
  /** Allows to create skip link */
  isSkipLink?: boolean;
  /** allows to set rel property in <a> tag */
  rel?: string;
}

export const Link = React.forwardRef<
  HTMLLinkElement | HTMLButtonElement,
  LinkProps
>(
  (
    {
      children,
      className,
      onKeyDown,
      href,
      onClick,
      onMouseDown,
      icon,
      iconAlign = "left",
      isSkipLink,
      disabled,
      ariaLabel,
      rel,
      tooltipMessage,
      tooltipPosition,
      tabbable = true,
      target,
      ...rest
    }: LinkProps,
    ref
  ) => {
    const l = useLocale();
    const tabIndex = tabbable && !disabled ? "0" : "-1";
    const handleOnKeyDown = (
      ev:
        | React.KeyboardEvent<HTMLAnchorElement>
        | React.KeyboardEvent<HTMLButtonElement>
    ) => {
      if (onKeyDown) {
        onKeyDown(ev);
      }

      // return early if there is no onClick or there is a href prop
      // or the event is not an enter key
      if (href || (!Event.isEnterKey(ev) && !Event.isSpaceKey(ev))) {
        return;
      }

      if (onClick) {
        onClick(ev);
      }
    };
    const renderLinkIcon = (currentAlignment = "left") => {
      const hasProperAlignment = icon && iconAlign === currentAlignment;

      return hasProperAlignment ? (
        <Icon
          type={icon}
          bgSize="extra-small"
          color="--colorsActionMajor500"
          disabled={disabled}
          ariaLabel={ariaLabel}
          tooltipMessage={tooltipMessage}
          tooltipPosition={tooltipPosition}
        />
      ) : null;
    };

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
      onKeyDown: handleOnKeyDown,
      onMouseDown,
      onClick,
      disabled,
      tabIndex,
      target,
      ref,
      href,
      rel,
      "aria-label": ariaLabel,
      ...ariaProps,
    };
    const createLinkBasedOnType = () => {
      let type = "a";

      if (onClick && !href) {
        type = "button";
      }

      return React.createElement(
        type,
        { ...componentProps, ...(type === "button" && { role: "link" }) },
        <>
          {renderLinkIcon()}

          <StyledContent>
            {isSkipLink ? l.link.skipLinkLabel() : children}
          </StyledContent>

          {renderLinkIcon("right")}
        </>
      );
    };

    return (
      <StyledLink
        isSkipLink={isSkipLink}
        disabled={disabled}
        className={className}
        iconAlign={iconAlign}
        hasContent={Boolean(children)}
        {...tagComponent("link", rest)}
        {...(isSkipLink && { "data-element": "skip-link" })}
      >
        {createLinkBasedOnType()}
      </StyledLink>
    );
  }
);

Link.displayName = "Link";

export default Link;
