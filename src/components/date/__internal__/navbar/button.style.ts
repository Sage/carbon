import styled from "styled-components";
import addFocusStyling from "../../../../style/utils/add-focus-styling";
import applyBaseTheme from "../../../../style/themes/apply-base-theme";

const StyledButton = styled.button
  .attrs(applyBaseTheme)
  .attrs({ type: "button" })`
  justify-content: center;
  align-items: center;
  display: flex;
  border: var(--borderWidth200) solid var(--colorsActionMinorTransparent);
  background: none;
  box-shadow: none;
  cursor: pointer;
  height: var(--sizing500);
  width: var(--sizing500);
  padding: var(--spacing150);
  box-sizing: border-box;
  border-radius: var(--borderRadius050);

  &:focus {
    ${addFocusStyling()}
  }
`;

export default StyledButton;
