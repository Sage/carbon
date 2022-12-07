import styled, { css } from "styled-components";
import StyledInput from "../../__internal__/input/input.style";
import StyledInputPresentation from "../../__internal__/input/input-presentation.style";
import StyledFormField from "../../__internal__/form-field/form-field.style";
import InputIconToggleStyle from "../../__internal__/input-icon-toggle/input-icon-toggle.style";
import StyledSelectText from "../select/__internal__/select-text/select-text.style";
import Link from "../link";

const StyledSelectContainer = styled.div`
  height: 26px;
  width: 55px;
  margin-left: 4px;
  margin-right: 4px;

  ${StyledInputPresentation} {
    padding-left: 0;
  }
`;

const StyledPagerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 24px;
  align-items: center;
  border-top-width: 0;
  font-size: 13px;
  border-top: none;
  color: var(--colorsUtilityYin090);

  ${({ variant }) =>
    css`
      border-width: 1px 1px 1px 1px;
      border-style: none solid solid solid;
      border-color: var(--colorsUtilityMajor100);
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
    margin: 8px 4px 0 4px;
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

  && ${StyledFormField} {
    margin-bottom: 0;
  }
`;

const StyledPagerLinkStyles = styled(Link)`
  padding: 0 10px;
  margin-left: 7px;
  margin-right: 7px;
`;

const StyledPagerNoSelect = styled.div`
  user-select: none;
  white-space: nowrap;
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
  StyledPagerLinkStyles,
  StyledPagerNoSelect,
  StyledPagerSummary,
  StyledSelectContainer,
};
