import styled, { css } from "styled-components";
import StyledRow from "../row/row.style";
import StyledColumn from "../row/column/column.style";

import { StyledLabelContainer } from "../../__experimental__/components/label/label.style";
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

  ${StyledLabelContainer} {
    margin-bottom: 0;
    margin-right: 15px;
    width: auto;
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

  ${StyledColumn} + ${StyledColumn} {
    margin-left: -1px;
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
    `}
`;

StyledInlineInputs.defaultProps = {
  theme: baseTheme,
};

export default StyledInlineInputs;
