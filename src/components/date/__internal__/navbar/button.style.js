import styled from "styled-components";

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

  &:focus {
    outline: var(--borderWidth300) solid var(--colorsSemanticFocus500);
  }
`;

export default StyledButton;
