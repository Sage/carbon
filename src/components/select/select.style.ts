import styled, { css } from "styled-components";
import { margin } from "styled-system";

import InputIconToggleStyle from "../../__internal__/input-icon-toggle/input-icon-toggle.style";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { SimpleSelectProps } from "./simple-select";

export interface StyledSelectProps
  extends Pick<SimpleSelectProps, "disabled" | "readOnly" | "transparent"> {
  $labelInline?: boolean;
  $size?: "small" | "medium" | "large";
  hasTextCursor?: boolean;
  isOpen: boolean;
}

const StyledSelect = styled.div.attrs(applyBaseTheme)<StyledSelectProps>`
  margin-bottom: var(--fieldSpacing);
  ${margin}

  ${InputIconToggleStyle} {
    margin-right: 0;
  }

  &[data-component="simple-select"]
    [data-component="popover-menu-item"]:not([data-select-action="true"]):not(
      :active
    ):hover {
    background-color: var(--input-dropdown-bg-hover);
  }

  ${({ $labelInline, $size }) =>
    $labelInline &&
    $size !== "medium" &&
    css`
      [data-role="select-textbox"] {
        gap: var(--global-space-comp-${$size === "large" ? "xl" : "l"});
      }
    `}
`;

export default StyledSelect;
