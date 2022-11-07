import React from "react";

import {
  ExplicitUnion,
  Expand,
} from "../../../__internal__/utils/helpers/types";
import { MenuButtonOverrideWrapper } from "../action-popover.style";
import Button from "../../button";
import { ButtonTypes } from "../../button/button.component";
import { IconType } from "../../icon";

export type ActionPopoverMenuButtonAria = {
  "aria-haspopup": string;
  "aria-label": string;
  "aria-controls": string;
  "aria-expanded": string;
};

export interface ActionPopoverMenuButtonProps {
  children?: string;
  buttonType?: ExplicitUnion<ButtonTypes>;
  iconType?: ExplicitUnion<IconType>;
  iconPosition?: "after" | "before";
  size?: "small" | "medium" | "large";
  tabIndex: number;
  ariaAttributes: Expand<ActionPopoverMenuButtonAria>;
  "data-element": string;
}

const ActionPopoverMenuButton = ({
  buttonType,
  iconType,
  iconPosition,
  size,
  children,
  ...props
}: ActionPopoverMenuButtonProps) => (
  <MenuButtonOverrideWrapper>
    <Button
      buttonType={buttonType}
      iconType={iconType}
      iconPosition={iconPosition}
      size={size}
      {...props}
    >
      {children}
    </Button>
  </MenuButtonOverrideWrapper>
);

export default ActionPopoverMenuButton;
