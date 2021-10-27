import React, { useContext, useMemo } from "react";
import { ThemeContext } from "styled-components";
import PropTypes from "prop-types";
import Icon from "../icon";
import Event from "../../__internal__/utils/helpers/events";
import { StyledLink, StyledContent } from "./link.style";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import { baseTheme } from "../../style/themes";

const Link = React.forwardRef(
  (
    {
      children,
      className,
      onKeyDown,
      href,
      onClick,
      onMouseDown,
      icon,
      iconAlign,
      isSkipLink,
      disabled,
      ariaLabel,
      rel,
      tooltipMessage,
      tooltipPosition,
      tabbable,
      target,
      ...rest
    },
    ref
  ) => {
    const theme = useContext(ThemeContext) || baseTheme;
    const tabIndex = tabbable && !disabled ? "0" : "-1";
    const handleOnKeyDown = (ev) => {
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
          color={theme.colors.primary}
          disabled={disabled}
          ariaLabel={ariaLabel}
          tooltipMessage={tooltipMessage}
          tooltipPosition={tooltipPosition}
        />
      ) : null;
    };

    const ariaProps = useMemo(
      () =>
        Object.keys(rest)
          .filter((key) => key.startsWith("aria"))
          .reduce((obj, key) => {
            obj[key] = rest[key];
            return obj;
          }, {}),
      [rest]
    );

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
            {isSkipLink ? "Skip to main content" : children}
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

Link.propTypes = {
  /** Child content to render in the link. */
  children: PropTypes.node,
  /** Classes to apply to the component. */
  className: PropTypes.string,
  /** The disabled state of the link. */
  disabled: PropTypes.bool,
  /** An href for an anchor tag. */
  href: PropTypes.string,
  /**
   * <a href="https://brand.sage.com/d/NdbrveWvNheA/foundations#/icons/icons" target="_blank">List of supported icons</a>
   *
   * An icon to display next to the link.
   */
  icon: PropTypes.string,
  /** Which side of the link to the render the link. */
  iconAlign: PropTypes.string,
  /** Function called when the mouse is clicked. */
  onClick: PropTypes.func,
  /** Function called when a key is pressed. */
  onKeyDown: PropTypes.func,
  /** Function called when a mouse down event triggers. */
  onMouseDown: PropTypes.func,
  /** Whether to include the link in the tab order of the page */
  tabbable: PropTypes.bool,
  /** A message to display as a tooltip to the link. */
  tooltipMessage: PropTypes.string,
  /** Positions the tooltip with the link. */
  tooltipPosition: PropTypes.oneOf(["bottom", "left", "right", "top"]),
  /** Allows to create skip link */
  isSkipLink: PropTypes.bool,
  /** Target property in which link should open ie: _blank, _self, _parent, _top */
  target: PropTypes.string,
  /** Aria label for accessibility purposes */
  ariaLabel: PropTypes.string,
  /** allows to set rel property in <a> tag */
  rel: PropTypes.string,
};

Link.defaultProps = {
  iconAlign: "left",
  tabbable: true,
};

export default Link;
