import styled, { css } from "styled-components";
import { baseTheme } from "../../style/themes";
import Icon from "../icon";

const iconSize = "16px";

const StyledDetail = styled.div`
  position: relative;

  + & {
    margin-top: 20px;
  }
`;

const StyledDetailContent = styled.div`
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
  ${({ theme }) => css`
    position: absolute;
    color: ${theme.palette.slateTint(50)};
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
  `}
`;

const StyledDetailFootnote = styled.div`
  ${({ hasIcon, theme }) => css`
    color: ${theme.palette.slateTint(20)};
    font-size: 13px;
    position: relative;
    margin-top: -2px;

    ${hasIcon &&
    css`
      margin-left: 26px;
    `}
  `}
`;

StyledDetailIcon.defaultProps = {
  theme: baseTheme,
};

StyledDetailFootnote.defaultProps = {
  theme: baseTheme,
};

export {
  StyledDetail,
  StyledDetailContent,
  StyledDetailIcon,
  StyledDetailFootnote,
};
