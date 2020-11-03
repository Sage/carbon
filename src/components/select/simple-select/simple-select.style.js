import styled, { css } from "styled-components";
import { space } from "styled-system";

import InputPresentationStyle from "../../../__experimental__/components/input/input-presentation.style";
import StyledInput from "../../../__experimental__/components/input/input.style";
import InputIconToggleStyle from "../../../__experimental__/components/input-icon-toggle/input-icon-toggle.style";
import { baseTheme } from "../../../style/themes";
import sizes from "../../../__experimental__/components/input/input-sizes.style";

const StyledSimpleSelect = styled.div`
  ${space}

  ${StyledInput} {
    cursor: pointer;
    color: transparent;
    user-select: none;
    text-shadow: 0 0 0 ${({ theme }) => theme.text.color};
    padding-left: ${({ size }) => sizes[size].horizontalPadding};

    ::placeholder {
      text-shadow: 0 0 0 ${({ theme }) => theme.text.placeholder};
    }

    ${({ disabled }) =>
      disabled &&
      css`
        cursor: not-allowed;
        color: ${({ theme }) => theme.disabled.disabled};
        text-shadow: none;
      `}

    ${({ readOnly }) =>
      readOnly &&
      css`
        cursor: default;
        color: ${({ theme }) => theme.readOnly.textboxText};
        text-shadow: none;
      `}
  }

  ${InputPresentationStyle} {
    cursor: pointer;
    padding-left: 0;
    padding-right: 0;

    ${({ disabled }) =>
      disabled &&
      css`
        cursor: not-allowed;
      `}

    ${({ readOnly }) =>
      readOnly &&
      css`
        cursor: default;
      `}
  }

  ${InputIconToggleStyle} {
    margin-right: 0;
  }

  ${({ transparent }) =>
    transparent &&
    css`
      ${InputPresentationStyle} {
        background: transparent;
        border: none;
      }

      ${StyledInput} {
        font-weight: 900;
        text-align: right;
      }

      ${InputIconToggleStyle} {
        margin-left: 0;
        width: auto;
      }
    `}
`;

StyledSimpleSelect.defaultProps = {
  size: "medium",
  theme: baseTheme,
};

export default StyledSimpleSelect;
