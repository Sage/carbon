import styled from "styled-components";

import applyBaseTheme from "../../../../style/themes/apply-base-theme";
import addFocusStyling from "../../../../style/utils/add-focus-styling";

const StyledDatePickerTriggerButton = styled.button.attrs(applyBaseTheme)`
  align-items: center;
  align-self: stretch;
  background: transparent;
  border: 0;
  color: inherit;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: var(--global-size-m);

  &:focus {
    ${addFocusStyling()}
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export default StyledDatePickerTriggerButton;
