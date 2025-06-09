import styled, { css } from "styled-components";
import StyledIcon from "../icon/icon.style";
import Button from "../button";
import Icon from "../icon";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { toColor } from "../../style/utils/color";

const commonStyles = `
  overflow: hidden;
  border-radius: var(--borderRadiusCircle);
  position: absolute;
  top: -14px;
  right: -4px;
  padding: 0;
  margin-right: 0;
  background: var(--colorsActionMajorYang100);
`;

const StyledBadgeWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledCounter = styled.div`
  font-weight: 500;
  font-size: 12px;
  margin-top: -1px;
`;

interface StyledBadgeProps {
  color: string;
  isFocused?: boolean;
  isHovered?: boolean;
}

const StyledBadge = styled.span.attrs(applyBaseTheme).attrs(({ onClick }) => ({
  as: onClick ? Button : undefined,
}))<StyledBadgeProps>`
  ${commonStyles}
  cursor: default;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  width: 22px;
  min-height: 22px;
  border: solid 2px transparent;
  z-index: 2;

  ${({ color, theme }) => css`
    border-color: ${toColor(theme, color)};
    color: ${toColor(theme, color)};
  `};

  ::-moz-focus-inner {
    border: none;
  }

  ${({ onClick, color, theme, isFocused, isHovered }) => css`
    ${onClick &&
    `
      ${commonStyles}
      width: 26px;
      min-height: 26px;
      text-align: center;

      ::-moz-focus-inner {
        border: none;
      }

      border-color: ${toColor(theme, color)};
      color: ${toColor(theme, color)};

      ${
        (isFocused || isHovered) &&
        `
        && {
          background: ${toColor(theme, color)};
          border: none;
          ${StyledCounter} {
            display: none;
          }

          ${StyledIcon} {
            display: block;
            width: auto;
            height: auto;
            margin-right: 0;

            :before {
              font-size: 20px;
              color: var(--colorsActionMajorYang100);
            }
          }
        }
      `
      }
      }
    `}
  `}
`;

const StyledCrossIcon = styled(Icon)`
  margin: 0;
  display: none;
`;

export { StyledBadge, StyledBadgeWrapper, StyledCrossIcon, StyledCounter };
