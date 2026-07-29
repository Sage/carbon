import React from "react";

import type { OptionProps } from "../option";
import StyledActionOption from "./action-option.style";

export type ActionOptionProps = OptionProps;

/**
 * An Option with action-specific visual treatment. In SimpleSelect, its
 * `onClick` callback runs without changing the selected value.
 */
const ActionOption = React.forwardRef<HTMLLIElement, ActionOptionProps>(
  (props, ref) => <StyledActionOption ref={ref} {...props} />,
);

ActionOption.displayName = "ActionOption";

export default ActionOption;
