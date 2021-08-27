import styled, { css } from "styled-components";
import StyledRow from "../row/row.style";
import StyledColumn from "../row/column/column.style";
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

const StyledInlineInputs = styled.div`
  display: flex;
  align-items: center;

  ${({ inputWidth }) =>
    inputWidth &&
    `
    flex: 0 0 ${inputWidth}%;
  `}

  ${StyledLabelContainer} {
    margin-bottom: 0;
    padding-right: 16px;
    width: ${({ labelWidth }) => (labelWidth ? `${labelWidth}%` : "auto")};
  }

  input {
    width: 1px;
  }

  [data-component="carbon-select"] input {
    width: 30px;
  }

  ${StyledRow} {
    flex-grow: 1;
  }

  ${({ gutter }) =>
    css`
      ${StyledRow} {
        margin-bottom: 0;
        margin-left: -${spacings[gutter]}px;

        > ${StyledColumn} {
          margin-bottom: 0;
          padding-left: ${spacings[gutter]}px;
        }
      }

      ${gutter === "none" &&
      css`
        ${StyledColumn} + ${StyledColumn} ${InputPresentation} {
          border-left: none;
        }
      `}
    `}
`;

StyledInlineInputs.defaultProps = {
  theme: baseTheme,
};

export default StyledInlineInputs;
