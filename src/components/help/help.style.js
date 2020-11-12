import styled, { css } from "styled-components";
import baseTheme from "../../style/themes/base";
import StyledIcon from "../icon/icon.style";

const StyledHelp = styled.div`
  background: none;
  color: ${({ theme }) => theme.help.color};
  cursor: default;
  border: none;
  outline: none;
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  position: relative;
  margin-bottom: 0;
  margin-top: 0;
  text-decoration: none;

  ${({ href }) =>
    href &&
    css`
      cursor: pointer;
    `}

  &:focus,
  &:hover {
    color: ${({ theme }) => theme.help.hover};
    text-decoration: none;
  }

  &:focus ${StyledIcon} {
    outline: ${({ theme }) => `2px solid ${theme.colors.focus}`};
  }
`;

StyledHelp.defaultProps = {
  theme: baseTheme,
};

export default StyledHelp;
