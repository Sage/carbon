import styled, { css } from "styled-components";

import { PagerProps } from ".";
import StyledInput from "../../__internal__/input/input.style";
import StyledInputPresentation from "../../__internal__/input/input-presentation.style";
import StyledFormField from "../../__internal__/form-field/form-field.style";
import InputIconToggleStyle from "../../__internal__/input-icon-toggle/input-icon-toggle.style";
import { StyledSelectText } from "../select/__internal__/select-textbox/select-textbox.style";
import Link from "../link";

interface StyledPagerProps {
  hideDisabledButtons?: boolean;
}

const StyledSelectContainer = styled.div`
  height: 26px;
  width: 55px;
  margin-left: 8px;
  margin-right: 8px;
  ${StyledInputPresentation} {
    padding-left: 0;
  }
`;

const StyledPagerContainer = styled.div<Pick<PagerProps, "variant">>`
  display: flex;
  justify-content: space-between;
  padding: 0px 24px;
  align-items: center;
  font-size: 13px;
  color: var(--colorsUtilityYin090);
  border: 1px solid var(--colorsUtilityMajor100);
  border-radius: var(--borderRadius100);

  ${({ variant }) => css`
    background-color: ${variant === "alternate"
      ? "var(--colorsUtilityMajor040)"
      : "var(--colorsUtilityMajor010)"};
  `}
`;

const StyledPagerSizeOptions = styled.div`
  display: flex;
  flex: 1 1 30%;
  justify-content: flex-start;

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

const StyledPagerNavigation = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;

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

const StyledPagerLink = styled(Link)<
  Pick<StyledPagerProps, "hideDisabledButtons">
>`
  margin-left: 17px;
  margin-right: 17px;

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
  display: flex;
  flex: 1 1 30%;
  justify-content: flex-end;
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
