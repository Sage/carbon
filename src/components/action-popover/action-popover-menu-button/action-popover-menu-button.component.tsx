import React from "react";

import Button, { ButtonProps } from "../../button/__next__/";
import { IconType } from "../../icon";
import { RenderButtonProps } from "../action-popover.component";

export type ActionPopoverMenuButtonAria = RenderButtonProps["ariaAttributes"];

export interface ActionPopoverMenuButtonProps {
  /** ARIA attributes to be applied to the button HTML element */
  ariaAttributes: ActionPopoverMenuButtonAria;
  /**
   * Variant of the menu button
   */
  buttonType?: Extract<
    ButtonProps["variantType"],
    "primary" | "secondary" | "tertiary"
  >;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element": string;
  /** Content of the button */
  children?: string;
  /**
   * Defines an Icon position related to the children: "before" | "after"
   */
  iconPosition?: ButtonProps["iconPosition"];
  /**
   * Defines an Icon type within the button
   */
  iconType?: IconType;
  /** Assigns a size to the button: "small" | "medium" | "large" */
  size?: ButtonProps["size"];
  /**
   * Overrides the default tabindex of the component
   */
  tabIndex: number;
}

/**
 * @deprecated This component is kept for backward compatibility.
 * Use `Button` component directly instead.
 * */
export const ActionPopoverMenuButton = React.forwardRef<
  HTMLElement,
  ActionPopoverMenuButtonProps
>(
  (
    {
      buttonType,
      iconType,
      iconPosition,
      size,
      children,
      ariaAttributes,
      ...props
    }: ActionPopoverMenuButtonProps,
    ref,
  ) => (
    <Button
      variantType={buttonType}
      iconType={iconType}
      iconPosition={iconPosition}
      size={size}
      {...ariaAttributes}
      {...props}
      ref={ref as React.Ref<HTMLButtonElement>}
    >
      {children}
    </Button>
  ),
);

ActionPopoverMenuButton.displayName = "ActionPopoverMenuButton";

export default ActionPopoverMenuButton;
