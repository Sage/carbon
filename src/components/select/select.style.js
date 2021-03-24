import styled, { css } from "styled-components";
import { margin } from "styled-system";

import InputPresentationStyle from "../../__experimental__/components/input/input-presentation.style";
import StyledInput from "../../__experimental__/components/input/input.style";
import InputIconToggleStyle from "../../__experimental__/components/input-icon-toggle/input-icon-toggle.style";
import { baseTheme } from "../../style/themes";
import sizes from "../../__experimental__/components/input/input-sizes.style";

const StyledSelect = styled.div`
  ${({ hasTextCursor, disabled, theme, readOnly, transparent, size }) => css`
    ${margin}

    position: relative;

    ${StyledInput} {
      cursor: ${hasTextCursor ? "text" : "pointer"};

      ${disabled &&
      css`
        cursor: not-allowed;
        color: ${theme.disabled.disabled};
        text-shadow: none;
      `}

      ${readOnly &&
      css`
        cursor: ${hasTextCursor ? "text" : "default"};
        color: ${theme.readOnly.textboxText};
        text-shadow: none;
      `}
    }

    ${InputPresentationStyle} {
      cursor: ${hasTextCursor ? "text" : "pointer"};
      padding-right: ${sizes[size].height};

      ${disabled &&
      css`
        cursor: not-allowed;
      `}

      ${readOnly &&
      css`
        cursor: ${hasTextCursor ? "text" : "default"};
      `}
    }

    ${InputIconToggleStyle} {
      margin-right: 0;
      position: absolute;
      right: 0;
      height: 100%;
    }

    ${transparent &&
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
  `}
`;

StyledSelect.defaultProps = {
  size: "medium",
  theme: baseTheme,
};

export default StyledSelect;
