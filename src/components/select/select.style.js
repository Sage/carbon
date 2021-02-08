import styled, { css } from "styled-components";
import { margin } from "styled-system";

import InputPresentationStyle from "../../__experimental__/components/input/input-presentation.style";
import StyledInput from "../../__experimental__/components/input/input.style";
import InputIconToggleStyle from "../../__experimental__/components/input-icon-toggle/input-icon-toggle.style";
import { baseTheme } from "../../style/themes";

const StyledSelect = styled.div`
  position: relative;
  ${margin}

  ${StyledInput} {
    cursor: ${({ hasTextCursor }) => (hasTextCursor ? "text" : "pointer")};
    user-select: none;

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
        cursor: ${({ hasTextCursor }) => (hasTextCursor ? "text" : "default")};
        color: ${({ theme }) => theme.readOnly.textboxText};
        text-shadow: none;
      `}
  }

  ${InputPresentationStyle} {
    cursor: ${({ hasTextCursor }) => (hasTextCursor ? "text" : "pointer")};
    padding-right: 0;

    ${({ disabled }) =>
      disabled &&
      css`
        cursor: not-allowed;
      `}

    ${({ readOnly }) =>
      readOnly &&
      css`
        cursor: ${({ hasTextCursor }) => (hasTextCursor ? "text" : "default")};
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

StyledSelect.defaultProps = {
  size: "medium",
  theme: baseTheme,
};

export default StyledSelect;
