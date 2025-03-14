import React, { useContext, useEffect, useMemo, useState } from "react";

import Icon, { IconType } from "../icon";
import MenuContext from "../menu/__internal__/menu.context";
import { StyledLink, StyledContent, StyledLinkProps } from "./link.style";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import useLocale from "../../hooks/__internal__/useLocale";
import BatchSelectionContext from "../batch-selection/__internal__/batch-selection.context";

export interface LinkProps
  extends StyledLinkProps,
    React.AriaAttributes,
    TagProps {
  /** An href for an anchor tag. */
  href?: string;
  /** An icon to display next to the link. */
  icon?: IconType;
  /** Function called when the mouse is clicked. */
  onClick?: (
    ev:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /** Function called when a key is pressed. */
  onKeyDown?: (
    ev:
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /** Function called when a mouse down event triggers. */
  onMouseDown?: (
    ev:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;

  /** [Legacy] A message to display as a tooltip to the link. */
  tooltipMessage?: string;
  /** [Legacy] Positions the tooltip with the link. */
  tooltipPosition?: "bottom" | "left" | "right" | "top";
  /** Child content to render in the link. */
  children?: React.ReactNode;
  /** Target property in which link should open ie: _blank, _self, _parent, _top */
  target?: string;
  /** Aria label for accessibility purposes */
  ariaLabel?: string;
  /** allows to set rel property in <a> tag */
  rel?: string;
  /** @ignore @private internal prop to be set when no aria-label should be specified */
  removeAriaLabelOnIcon?: boolean;
  /**
   * @private
   * @internal
   * @ignore
   * Sets className for component. INTERNAL USE ONLY. */
  className?: string;
}

export const Link = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  LinkProps
>(
  (
    {
      children,
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
      target,
      variant = "default",
      isDarkBackground,
      removeAriaLabelOnIcon,
      className,
      ...rest
    }: LinkProps,
    ref,
  ) => {
    const [hasFocus, setHasFocus] = useState(false);
    const l = useLocale();
    const { inMenu } = useContext(MenuContext);
    const { batchSelectionDisabled } = useContext(BatchSelectionContext);
    const isDisabled = disabled || batchSelectionDisabled;

    const renderLinkIcon = (currentAlignment = "left") => {
      const hasProperAlignment = icon && iconAlign === currentAlignment;

      return hasProperAlignment ? (
        <Icon
          type={icon}
          disabled={isDisabled}
          ariaLabel={removeAriaLabelOnIcon ? undefined : ariaLabel}
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
      onKeyDown,
      onMouseDown,
      onClick,
      disabled: isDisabled,
      target,
      ref,
      href,
      rel,
      "aria-label": ariaLabel,
      ...ariaProps,
      onFocus: () => setHasFocus(true),
      onBlur: () => setHasFocus(false),
    };

    const buttonProps = {
      type: "button",
    };

    const createLinkBasedOnType = () => {
      let type = "a";

      if (onClick && !href) {
        type = "button";
      }

      return React.createElement(
        type,
        type === "button"
          ? {
              ...componentProps,
              ...buttonProps,
            }
          : {
              ...componentProps,
              "data-role": "link-anchor",
            },
        <>
          {renderLinkIcon()}

          <StyledContent>
            {isSkipLink ? l.link.skipLinkLabel() : children}
          </StyledContent>

          {renderLinkIcon("right")}
        </>,
      );
    };

    useEffect(() => {
      if (disabled || !(href || onClick)) {
        setHasFocus(false);
      }
    }, [disabled, href, onClick]);

    return (
      <StyledLink
        isSkipLink={isSkipLink}
        disabled={isDisabled}
        iconAlign={iconAlign}
        className={className}
        hasContent={Boolean(children)}
        variant={variant}
        isDarkBackground={isDarkBackground}
        isMenuItem={inMenu}
        {...tagComponent("link", rest)}
        {...(isSkipLink && { "data-element": "skip-link" })}
        hasFocus={hasFocus}
      >
        {createLinkBasedOnType()}
      </StyledLink>
    );
  },
);

Link.displayName = "Link";

export default Link;
