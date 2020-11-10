import styled, { css } from "styled-components";
import BaseTheme from "../../style/themes/base";
import StyledIcon from "../icon/icon.style";
import { isClassic } from "../../utils/helpers/style-helper";

const ValidationIconStyle = styled.div`
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 0;
  margin-bottom: 0;
  border: 0;
  outline: none;

  ${StyledIcon}:before {
    color: ${({ validationType, theme }) => theme.colors[validationType]};
  }

  ${({ theme }) =>
    isClassic(theme) &&
    css`
      ${StyledIcon}:focus {
        outline: none;
      }
    `}

  ${({ theme }) =>
    !isClassic(theme) &&
    css`
      ${StyledIcon}:focus {
        outline: solid 2px ${theme.colors.focus};
      }
    `}
`;

ValidationIconStyle.defaultProps = {
  validationType: "error",
  theme: BaseTheme,
};

export default ValidationIconStyle;
