import styled, { css } from "styled-components";
import { space } from "styled-system";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";
import BaseTheme from "../../style/themes/base";
import StyledIcon from "../icon/icon.style";

const ButtonBar = styled.div`
  ${space}
  ${stylingForType}
`;

function stylingForType({ theme, size }) {
  return css`
    ${({ fullWidth }) =>
      fullWidth &&
      css`
        width: 100%;
        display: flex;
        button {
          box-sizing: content-box;
          padding: 0;
          width: 100%;
          ${size === "small" && "min-height: 28px"}
          ${size === "medium" && "min-height: 36px"}
          ${size === "large" && "min-height: 44px"}
        }
      `}

    button {
      margin: 0;
      border: 2px solid ${theme.colors.primary};

      &:not(:last-of-type) {
        border-right-color: transparent;
      }
      &:not(:first-of-type) {
        margin-left: -2px;
      }
      &:focus {
        position: relative;
        z-index: 2;
        border-right-color: ${theme.colors.primary};
      }
      &:hover {
        background-color: ${theme.colors.secondary};
        border-color: ${theme.colors.secondary};
        & + button {
          border-left-color: ${theme.colors.secondary};
        }
        & ${StyledIcon} {
          color: white;
        }
      }
      & ${StyledIcon} {
        color: ${theme.colors.primary};
      }
    }
  `;
}

ButtonBar.defaultProps = {
  theme: BaseTheme,
  size: "medium",
};

ButtonBar.propTypes = {
  /** Styled system spacing props */
  ...propTypes.space,
  /** Assigns a size to the button: "small" | "medium" | "large" */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  children: PropTypes.node.isRequired,
};

export default ButtonBar;
