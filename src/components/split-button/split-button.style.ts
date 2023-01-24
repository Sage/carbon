import styled from "styled-components";
import { margin } from "styled-system";
import StyledButton from "../button/button.style";
import baseTheme from "../../style/themes/base";

const StyledSplitButton = styled.div`
  ${margin}
  display: inline-block;
  position: relative;

  ${StyledButton}:first-of-type {
    border-bottom-right-radius: var(--borderRadius000);
    border-top-right-radius: var(--borderRadius000);
    border-bottom-left-radius: var(--borderRadius200);
    border-top-left-radius: var(--borderRadius200);
  }

  ${StyledButton} {
    &:hover {
      border-bottom-right-radius: var(--borderRadius000);
      border-top-right-radius: var(--borderRadius000);
      border-bottom-left-radius: var(--borderRadius200);
      border-top-left-radius: var(--borderRadius200);
    }
  }

  a:hover {
    border-radius: 0px;
  }

  & > ${StyledButton} {
    margin: 0;
    &:focus {
      border: 3px solid var(--colorsSemanticFocus500);
      outline: none;
      border-bottom-right-radius: var(--borderRadius200);
      border-top-right-radius: var(--borderRadius200);
      border-bottom-left-radius: var(--borderRadius000);
      border-top-left-radius: var(--borderRadius000);
      margin: -1px;
    }
    &:hover {
      :last-of-type {
        border-bottom-right-radius: var(--borderRadius200);
        border-top-right-radius: var(--borderRadius200);
        border-bottom-left-radius: var(--borderRadiu000);
        border-top-left-radius: var(--borderRadius000);
      }
    }
  }
`;

StyledSplitButton.defaultProps = {
  theme: baseTheme,
};

export default StyledSplitButton;
