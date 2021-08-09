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

function stylingForType({ theme }) {
  return css`
    ${({ fullWidth }) =>
      fullWidth &&
      css`
        width: 100%;
        display: flex;
        button {
          width: 100%;
        }
      `}
    button {
      border: 2px solid ${theme.colors.primary};
      &:not(:last-of-type) {
        border-right-width: 0px;
      }
      &:focus {
        position: relative;
        z-index: 2;
        border-right-width: 2px;
        & + button {
          border-left-width: 0;
        }
      }
      &:hover {
        border-right-width: 2px;
        border-color: ${theme.colors.secondary};
        & + button {
          border-left-width: 0;
        }
        & ${StyledIcon} {
          background-color: ${theme.colors.secondary};
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
};

ButtonBar.propTypes = {
  /** Styled system spacing props */
  ...propTypes.space,
  children: PropTypes.node.isRequired,
};

export default ButtonBar;
