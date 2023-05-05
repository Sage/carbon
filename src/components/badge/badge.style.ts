import styled, { css } from "styled-components";
import StyledIcon from "../icon/icon.style";
import Button from "../button";
import Icon from "../icon";

const commonStyles = `
  overflow: hidden;
  border-radius: var(--borderRadiusCircle);
  position: absolute;
  top: -11px;
  right: -11px;
  padding: 0;
  margin-right: 0;
  background: var(--colorsActionMajorYang100);
`;

const StyledBadgeWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledCounter = styled.div`
  font-weight: 700;
  font-size: 12px;
  margin-top: -1px;
`;

const StyledBadge = styled.span.attrs(({ onClick }) => ({
  as: onClick ? Button : undefined,
}))`
  ${commonStyles}
  cursor: default;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  width: 18px;
  min-height: 18px;
  border: solid 2px transparent;
  border-color: var(--colorsActionMajor500);
  color: var(--colorsActionMajor500);

  ::-moz-focus-inner {
    border: none;
  }

  ${({ onClick }) => css`
    ${onClick &&
    `
      ${commonStyles}
      width: 22px;
      min-height: 22px;
      text-align: center;

      ::-moz-focus-inner {
        border: none;
      }

      &:hover,
      &:focus {
        background: var(--colorsActionMajor500);
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
            font-size: 16px;
            color: var(--colorsActionMajorYang100);
          }
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
