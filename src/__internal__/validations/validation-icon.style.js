import styled, { css } from "styled-components";
import { margin } from "styled-system";
import BaseTheme from "../../style/themes/base";
import StyledIcon from "../../components/icon/icon.style";

const ValidationIconStyle = styled.span`
  background: none;
  cursor: default;
  display: flex;
  align-items: center;
  margin-top: 0;
  margin-bottom: 0;
  border: 0;
  outline: none;

  ${({ isPartOfInput }) =>
    isPartOfInput &&
    css`
      cursor: pointer;
    `}

  ${StyledIcon}:before {
    color: ${({ validationType, theme }) => theme.colors[validationType]};
  }

  ${StyledIcon}:focus {
    outline: solid 2px ${({ theme }) => theme.colors.focus};
  }

  ${margin}
`;

ValidationIconStyle.defaultProps = {
  validationType: "error",
  theme: BaseTheme,
};

export default ValidationIconStyle;
