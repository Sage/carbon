import React from "react";

import { MenuButtonOverrideWrapper } from "../action-popover.style";
import Button, {
  ButtonIconPosition,
  ButtonTypes,
  SizeOptions,
} from "../../../__internal__/__legacy__/button/button.component";
import { IconType } from "../../icon";

export type ActionPopoverMenuButtonAria = {
  "aria-haspopup": string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-controls": string;
  "aria-expanded": string;
};

export interface ActionPopoverMenuButtonProps {
  /** ARIA attributes to be applied to the button HTML element */
  ariaAttributes: ActionPopoverMenuButtonAria;
  /** Variant of the menu button */
  buttonType?: ButtonTypes;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element": string;
  /** Content of the button */
  children?: string;
  /** Defines an Icon position related to the children: "before" | "after" */
  iconPosition?: ButtonIconPosition;
  /** Defines an Icon type within the button */
  iconType?: IconType;
  /** Assigns a size to the button: "small" | "medium" | "large" */
  size?: SizeOptions;
  /** Overrides the default tabindex of the component */
  tabIndex: number;
}

export const ActionPopoverMenuButton = ({
  buttonType,
  iconType,
  iconPosition,
  size,
  children,
  ariaAttributes,
  ...props
}: ActionPopoverMenuButtonProps) => (
  <MenuButtonOverrideWrapper>
    <Button
      buttonType={buttonType}
      iconType={iconType}
      iconPosition={iconPosition}
      size={size}
      {...ariaAttributes}
      {...props}
    >
      {children}
    </Button>
  </MenuButtonOverrideWrapper>
);

ActionPopoverMenuButton.displayName = "ActionPopoverMenuButton";

export default ActionPopoverMenuButton;
