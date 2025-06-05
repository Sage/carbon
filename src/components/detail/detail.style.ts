import styled, { css } from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import Icon from "../icon";

const iconSize = "16px";

const StyledDetail = styled.div.attrs(applyBaseTheme)`
  position: relative;
  ${margin};

  + & {
    margin-top: 20px;
  }
`;

const StyledDetailContent = styled.div<{ hasIcon: boolean }>`
  ${({ hasIcon }) => css`
    display: inline-block;
    line-height: 18px;
    white-space: pre-wrap;
    text-overflow: ellipsis;
    overflow: hidden;

    ${hasIcon &&
    css`
      margin-left: 26px;
    `}
  `}
`;

const StyledDetailIcon = styled(Icon)`
  position: absolute;
  color: var(--colorsUtilityYin065);
  height: ${iconSize};
  width: ${iconSize};
  top: -1px;
  vertical-align: top;

  // StyledSvgIcon
  span {
    height: ${iconSize};
    width: ${iconSize};
    vertical-align: middle;
  }
`;

const StyledDetailFootnote = styled.div<{ hasIcon: boolean }>`
  ${({ hasIcon }) => css`
    color: var(--colorsUtilityYin055);
    font-size: 13px;
    position: relative;
    margin-top: -2px;

    ${hasIcon &&
    css`
      margin-left: 26px;
    `}
  `}
`;

export {
  StyledDetail,
  StyledDetailContent,
  StyledDetailIcon,
  StyledDetailFootnote,
};
