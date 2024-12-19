import styled, { css } from "styled-components";
import { margin } from "styled-system";
import baseTheme from "../../style/themes/base";
import StyledIcon from "../icon/icon.style";
import addFocusStyling from "../../style/utils/add-focus-styling";

interface StyledHelpProps {
  href?: string;
}

const StyledHelp = styled.div<StyledHelpProps>`
  background: none;
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

  ${StyledIcon} {
    color: var(--colorsUtilityYin065);
  }

  ${({ href }) =>
    href &&
    css`
      cursor: pointer;
    `}

  &:focus ${StyledIcon},
  &:hover ${StyledIcon} {
    color: var(--colorsUtilityYin090);
    text-decoration: none;
  }

  &:focus ${StyledIcon} {
    border-radius: var(--borderRadius050);
    ${addFocusStyling()}
  }

  ${margin}
`;

StyledHelp.defaultProps = {
  theme: baseTheme,
};

export default StyledHelp;
