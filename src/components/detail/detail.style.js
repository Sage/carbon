import styled, { css } from "styled-components";
import { baseTheme } from "../../style/themes";

const iconSize = "16px";

const StyledDetail = styled.div`
  ${({ hasIcon, theme }) => css`
    position: relative;

    + .carbon-detail {
      margin-top: 20px;
    }

    .carbon-detail__content {
      display: inline-block;
      line-height: 18px;
      white-space: pre-wrap;
      text-overflow: ellipsis;
      overflow: hidden;

      ${hasIcon &&
      css`
        margin-left: 26px;
      `}
    }

    .carbon-detail__icon {
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
    }

    .carbon-detail__footnote {
      color: ${theme.palette.slateTint(20)};
      font-size: 13px;
      position: relative;
      margin-top: -2px;

      ${hasIcon &&
      css`
        margin-left: 26px;
      `}
    }
  `}
`;

StyledDetail.defaultProps = {
  theme: baseTheme,
};

export default StyledDetail;
