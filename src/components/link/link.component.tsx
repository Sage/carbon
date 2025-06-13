import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "styled-components";

import { IconType } from "../icon";
import MenuContext from "../menu/__internal__/menu.context";
import addLinkStyle, { StyledLinkProps } from "./link.style";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import useLocale from "../../hooks/__internal__/useLocale";
import BatchSelectionContext from "../batch-selection/__internal__/batch-selection.context";
import type { ThemeObject } from "../../style/themes/theme.types";
import BaseLink from "./__internal__/base-link.component";

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
      disabled = false,
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

    const props = {
      onKeyDown,
      onMouseDown,
      onClick,
      disabled: isDisabled,
      target,
      ref,
      href,
      rel,
      "aria-label": ariaLabel,
      onFocus: () => setHasFocus(true),
      onBlur: () => setHasFocus(false),
      ...tagComponent("link", rest),
      icon,
      iconAlign,
      tooltipMessage,
      tooltipPosition,
      removeAriaLabelOnIcon,
      ...rest,
    };

    useEffect(() => {
      if (disabled || !(href || onClick)) {
        setHasFocus(false);
      }
    }, [disabled, href, onClick]);

    const theme = useTheme();
    const styles = addLinkStyle({
      isSkipLink,
      iconAlign,
      hasContent: !!children,
      disabled: isDisabled,
      variant,
      isDarkBackground,
      isMenuItem: inMenu,
      hasFocus,
      theme: theme as ThemeObject,
    });

    return (
      <BaseLink {...props} styles={styles}>
        {isSkipLink ? l.link.skipLinkLabel() : children}
      </BaseLink>
    );
  },
);

Link.displayName = "Link";

export default Link;
