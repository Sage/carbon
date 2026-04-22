import styled from "styled-components";
import { margin } from "styled-system";

import InputIconToggleStyle from "../../__internal__/input-icon-toggle/input-icon-toggle.style";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { SimpleSelectProps } from "./simple-select";

export interface StyledSelectProps
  extends Pick<SimpleSelectProps, "disabled" | "readOnly" | "transparent"> {
  hasTextCursor?: boolean;
  isOpen: boolean;
}

const StyledSelect = styled.div.attrs(applyBaseTheme)<StyledSelectProps>`
  margin-bottom: var(--fieldSpacing);
  ${margin}

  position: relative;

  ${InputIconToggleStyle} {
    margin-right: 0;
  }
`;

export default StyledSelect;
