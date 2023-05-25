import styled from "styled-components";
import addFocusStyling from "../../../../style/utils/add-focus-styling";

const oldFocusStyling = `
  &:focus {
    outline: solid 3px var(--colorsSemanticFocus500);
  }
`;

const StyledButton = styled.button.attrs({ type: "button" })`
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

  ${({ theme }) =>
    `${theme.focusRedesignOptOut ? oldFocusStyling : addFocusStyling()}`};
`;

export default StyledButton;
