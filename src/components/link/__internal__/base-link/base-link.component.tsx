import React, { forwardRef, useCallback, useMemo } from "react";
import { SimpleInterpolation } from "styled-components";

import StyledBaseLinkWrapper from "./base-link.style";

import Icon, { IconType } from "../../../icon";
import tagComponent from "../../../../__internal__/utils/helpers/tags/tags";

// BaseLink component is a low-level component that can be used to create links or buttons with consistent styling and behavior.
export interface BaseLinkProps {
  /** Aria label for accessibility purposes */
  ariaLabel?: string;
  /** Child content to render. */
  children?: React.ReactNode;
  /**
   * @private
   * @internal
   * @ignore
   * Sets className for component. INTERNAL USE ONLY. */
  className?: string;
  /**
   * Data attribute for the component, used for testing and tracking purposes.
   * @private
   * @internal
   * @ignore */
  "data-component"?: string;
  /**
   * Data attribute for the element, used for testing and tracking purposes.
   * @private
   * @internal
   * @ignore */
  "data-element"?: string;
  /**
   * Data attribute for the role, used for testing and tracking purposes.
   * @private
   * @internal
   * @ignore */
  "data-role"?: string;
  /** Disables the link. */
  disabled?: boolean;
  /** A href for an anchor tag. */
  href?: string;
  /** An icon to display next to the link. */
  icon?: IconType;
  /** Aligns the icon to the left or right of the link text. */
  iconAlign?: "left" | "right";
  /** Function called when focus is lost. */
  onBlur?: (
    ev:
      | React.FocusEvent<HTMLAnchorElement>
      | React.FocusEvent<HTMLButtonElement>,
  ) => void;
  /** Function called when the mouse is clicked. */
  onClick?: (
    event:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /** Function called when focus is received. */
  onFocus?: (
    ev:
      | React.FocusEvent<HTMLAnchorElement>
      | React.FocusEvent<HTMLButtonElement>,
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
  /** Value of rel property in <a> tag */
  rel?: string;
  /** @ignore @private Internal prop to be set when no aria-label should be specified */
  removeAriaLabelOnIcon?: boolean;
  /** Styling to apply to the component */
  styles?: SimpleInterpolation;
  /** Target property in which link should open ie: _blank, _self, _parent, _top */
  target?: string;
  /** [Legacy] A message to display as a tooltip to the link. */
  tooltipMessage?: string;
  /** [Legacy] Positions the tooltip with the link. */
  tooltipPosition?: "bottom" | "left" | "right" | "top";
}

const BaseLink = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  BaseLinkProps
>(
  (
    {
      ariaLabel,
      children,
      className,
      "data-component": dataComponent = "link",
      "data-element": dataElement,
      "data-role": dataRole,
      disabled,
      href,
      icon,
      iconAlign = "left",
      onBlur,
      onClick,
      onFocus,
      onKeyDown,
      onMouseDown,
      rel,
      removeAriaLabelOnIcon = false,
      styles,
      target,
      tooltipMessage,
      tooltipPosition,
      ...rest
    }: BaseLinkProps,
    ref,
  ) => {
    /* istanbul ignore next */
    const setAnchorRef = useCallback(
      (reference: HTMLAnchorElement | null) => {
        if (!ref) return;
        if (typeof ref === "object" && ref !== null)
          (
            ref as React.MutableRefObject<
              HTMLAnchorElement | HTMLButtonElement | null
            >
          ).current = reference;
        if (typeof ref === "function") {
          ref(reference);
        }
      },
      [ref],
    );

    /* istanbul ignore next */
    const setButtonRef = useCallback(
      (reference: HTMLButtonElement | null) => {
        if (!ref) return;
        if (typeof ref === "object" && ref !== null)
          (
            ref as React.MutableRefObject<
              HTMLAnchorElement | HTMLButtonElement | null
            >
          ).current = reference;
        if (typeof ref === "function") {
          ref(reference);
        }
      },
      [ref],
    );

    // Extract aria- properties from the rest of the props
    const ariaProps = useMemo(() => {
      const restObject = rest as Record<string, unknown>;
      restObject["aria-disabled"] = disabled;

      return Object.keys(restObject)
        .filter((key) => key.startsWith("aria"))
        .reduce((obj: Record<string, unknown>, key: string) => {
          obj[key] = restObject[key];
          return obj;
        }, {});
    }, [disabled, rest]);

    // Prepare the component props to be passed to the anchor or button element
    const componentProps = {
      "aria-label": ariaLabel,
      ...ariaProps,
      disabled,
      href,
      onBlur,
      onClick,
      onFocus,
      onKeyDown,
      onMouseDown,
      rel,
      target,
    };

    // Render the component with the icon and children
    const renderedComponent = useMemo(
      () => (
        <>
          {icon && iconAlign === "left" && (
            <Icon
              type={icon}
              disabled={disabled}
              ariaLabel={removeAriaLabelOnIcon ? undefined : ariaLabel}
              tooltipMessage={tooltipMessage}
              tooltipPosition={tooltipPosition}
              data-icon-align={iconAlign}
            />
          )}
          {children}
          {icon && iconAlign === "right" && (
            <Icon
              type={icon}
              disabled={disabled}
              ariaLabel={removeAriaLabelOnIcon ? undefined : ariaLabel}
              tooltipMessage={tooltipMessage}
              tooltipPosition={tooltipPosition}
              data-icon-align={iconAlign}
            />
          )}
        </>
      ),
      [
        children,
        icon,
        iconAlign,
        disabled,
        ariaLabel,
        tooltipMessage,
        tooltipPosition,
        removeAriaLabelOnIcon,
      ],
    );

    return (
      <StyledBaseLinkWrapper
        $styles={styles}
        className={className}
        {...tagComponent(dataComponent, rest)}
        data-element={dataElement}
        data-role={dataRole}
      >
        {onClick && !href ? (
          <button ref={setButtonRef} type="button" {...componentProps}>
            {renderedComponent}
          </button>
        ) : (
          <a ref={setAnchorRef} {...componentProps} data-role="link-anchor">
            {renderedComponent}
          </a>
        )}
      </StyledBaseLinkWrapper>
    );
  },
);

export default BaseLink;
