import styled from "styled-components";
import { margin } from "styled-system";
import StyledButton from "../button/button.style";
import baseTheme from "../../style/themes/base";

const StyledSplitButton = styled.div`
  ${margin}
  display: inline-block;
  position: relative;

  & > ${StyledButton}:first-of-type {
    border-top-right-radius: var(--borderRadius000);
    border-bottom-right-radius: var(--borderRadius000);
  }

  & > ${StyledButton} {
    margin: 0;
    &:focus {
      position: relative;
      z-index: 1;
    }
  }
`;

StyledSplitButton.defaultProps = {
  theme: baseTheme,
};

export default StyledSplitButton;
