import styled, { css } from "styled-components";
import InputPresentation from "../../__internal__/input/input-presentation.style";

import { StyledLabelContainer } from "../../__internal__/label/label.style";
import baseTheme from "../../style/themes/base";

const spacings = {
  none: 0,
  "extra-small": 8,
  small: 16,
  "medium-small": 20,
  medium: 24,
  "medium-large": 28,
  large: 32,
  "extra-large": 40,
};

const StyledInlineInput = styled.div`
  flex: 1;

  ${({ gutter }) =>
    css`
      margin-bottom: 0;
      padding-left: ${spacings[gutter]}px;
    `}
`;

const StyledContentContainer = styled.div`
  display: flex;
  flex: ${({ inputWidth }) => (inputWidth ? `0 0 ${inputWidth}%` : 1)};

  ${({ gutter }) =>
    css`
      margin-bottom: 0;
      margin-left: -${spacings[gutter]}px;

      ${gutter === "none" &&
      css`
        ${StyledInlineInput} + ${StyledInlineInput} ${InputPresentation} {
          border-left: none;
        }
      `}
    `}
`;

const StyledInlineInputs = styled.div`
  display: flex;
  align-items: center;

  ${StyledLabelContainer} {
    width: auto;
    margin-bottom: 0;
    padding-right: 16px;
    flex: 0 0 ${({ labelWidth }) => (labelWidth ? `${labelWidth}%` : "auto")};
  }

  input {
    width: 1px;
  }

  [data-component="carbon-select"] input {
    width: 30px;
  }
`;

StyledInlineInputs.defaultProps = {
  theme: baseTheme,
};

export { StyledContentContainer, StyledInlineInput };
export default StyledInlineInputs;
