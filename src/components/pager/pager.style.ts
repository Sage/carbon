import styled, { css } from "styled-components";

import StyledInput from "../../__internal__/input/input.style";
import StyledInputPresentation from "../../__internal__/input/input-presentation.style";
import StyledFormField from "../../__internal__/form-field/form-field.style";
import InputIconToggleStyle from "../../__internal__/input-icon-toggle/input-icon-toggle.style";
import { StyledSelectText } from "../select/__internal__/select-textbox/select-textbox.style";
import Link from "../link";

const StyledSelectContainer = styled.div`
  height: 26px;
  width: 55px;
  margin-left: 8px;
  margin-right: 8px;
  ${StyledInputPresentation} {
    padding-left: 0;
  }
`;

interface StyledPagerContainerProps {
  variant?: "alternate" | "default";
  isSmallScreen?: boolean;
}

const StyledPagerContainer = styled.div<StyledPagerContainerProps>`
  box-sizing: border-box;
  display: inline-grid;
  align-items: center;
  justify-content: space-between;
  grid-template-columns: 1fr;
  padding: 0px var(--sizing100);
  width: 100%;
  height: var(--sizing550);
  font-size: var(--fontSizes100);
  color: var(--colorsUtilityYin090);
  border: 1px solid var(--colorsUtilityMajor100);
  border-radius: var(--borderRadius100);

  ${({ isSmallScreen }) =>
    !isSmallScreen &&
    css`
      grid-template-columns: repeat(3, 1fr);
      padding: 0px var(--sizing300);
    `}

  ${({ variant }) => css`
    background-color: ${variant === "alternate"
      ? "var(--colorsUtilityMajor040)"
      : "var(--colorsUtilityMajor010)"};
  `}
`;

const StyledPagerSizeOptions = styled.div`
  grid-area: 1 / 1 / 1 / 1;

  ${StyledInputPresentation} {
    width: 55px;
    height: 26px;
    min-height: 26px;
    min-width: 10px;
    margin: 0px;

    ${StyledSelectText} {
      font-size: 14px;
      padding-right: 0px;
      padding-left: 8px;
      height: 22px;
      width: 13px;
    }

    ${InputIconToggleStyle} {
      margin-left: 0;
      width: 20px;
      height: 24px;
    }
  }
`;

const StyledPagerSizeOptionsInner = styled.div`
  display: flex;
  align-items: center;
`;

interface StyledPagerNavigationProps {
  isSmallScreen?: boolean;
}

const StyledPagerNavigation = styled.div<StyledPagerNavigationProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ isSmallScreen }) =>
    !isSmallScreen &&
    css`
      justify-content: center;
      grid-area: 1 / 2 / 1 / 2;
    `}

  && ${StyledInputPresentation} {
    padding: 0;
    margin: 4px 8px;
    height: 26px;
    line-height: 26px;
    min-height: 24px;

    ${StyledInput} {
      text-align: center;
      height: 24px;
      padding: 0;
    }
  }
`;

const StyledPagerNavInner = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px;
  margin: 4px 0;

  && ${StyledFormField} {
    margin-bottom: 0;
  }
`;

const StyledPagerNavLabel = styled.label`
  white-space: nowrap;
  padding: 9px 12px;
  margin: 4px 0;
`;

interface StyledPagerLinkProps {
  hideDisabledButtons?: boolean;
  isSmallScreen?: boolean;
}

const StyledPagerLink = styled(Link)<StyledPagerLinkProps>`
  ${({ isSmallScreen }) =>
    !isSmallScreen &&
    css`
      margin-left: 17px;
      margin-right: 17px;
    `}

  ${({ hideDisabledButtons }) =>
    hideDisabledButtons &&
    css`
      & {
        visibility: hidden;
      }
    `}
`;

const StyledPagerNoSelect = styled.div`
  user-select: none;
  white-space: nowrap;
  font-weight: normal;
`;

const StyledPagerSummary = styled.div`
  justify-self: end;
  grid-area: 1 / 3 / 1 / 3;
`;

export {
  StyledPagerContainer,
  StyledPagerSizeOptions,
  StyledPagerSizeOptionsInner,
  StyledPagerNavigation,
  StyledPagerNavInner,
  StyledPagerNavLabel,
  StyledPagerLink,
  StyledPagerNoSelect,
  StyledPagerSummary,
  StyledSelectContainer,
};
