import styled, { css } from "styled-components";
import { margin } from "styled-system";

import InputPresentationStyle from "../../__internal__/input/input-presentation.style";
import StyledInput from "../../__internal__/input/input.style";
import InputIconToggleStyle from "../../__internal__/input-icon-toggle/input-icon-toggle.style";
import { baseTheme } from "../../style/themes";

const StyledSelect = styled.div`
  ${({ hasTextCursor, disabled, readOnly, transparent }) => css`
    ${margin}

    position: relative;

    ${StyledInput} {
      cursor: "text";

      ${disabled &&
      css`
        cursor: not-allowed;
        color: var(--colorsUtilityYin030);
        text-shadow: none;
      `}

      ${readOnly &&
      css`
        cursor: "text";
        color: var(--colorsYin065);
        text-shadow: none;
      `}
    }

    ${InputPresentationStyle} {
      cursor: ${hasTextCursor ? "text" : "pointer"};
      padding-right: 0;

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
    }

    ${transparent &&
    css`
      ${InputPresentationStyle} {
        background: transparent;
        border: none;
      }

      ${InputIconToggleStyle} {
        margin-left: 0;
      }
    `}

    ${!hasTextCursor &&
    css`
      ${StyledInput} {
        position: absolute;
        width: auto;
        opacity: 0;
      }
    `}
  `}
`;

StyledSelect.defaultProps = {
  size: "medium",
  theme: baseTheme,
};

export default StyledSelect;
