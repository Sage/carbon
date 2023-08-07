import styled, { css } from "styled-components";
import { margin } from "styled-system";
import Fieldset from "../fieldset";
import { Input } from "../../__internal__/input";
import { LegendContainerStyle } from "../fieldset/fieldset.style";
import StyledIcon from "../icon/icon.style";
import { baseTheme } from "../../style/themes";

const StyledTitle = styled.h3`
  font-size: 16px;
  font-weight: 900;
  margin: 0;
  margin-right: 16px;
  margin-bottom: 8px;
  color: var(--colorsActionMinorYin090);
`;

const StyledSubtitle = styled.h4`
  font-size: 14px;
  font-weight: 700;
  margin: 0;
  margin-right: 16px;
  margin-bottom: 8px;
  color: var(--colorsActionMinorYin090);
`;

const StyledAdornment = styled.div<{ hasAdditionalInformation: boolean }>`
  z-index: 500;
  margin-bottom: ${({ hasAdditionalInformation }) =>
    hasAdditionalInformation ? "4" : "8"}px;
`;

const StyledDescription = styled.p`
  color: var(--colorsActionMinorYin055);
  font-size: 14px;
  margin: 0;
`;

const StyledTileSelect = styled.div<{
  checked?: boolean;
  disabled?: boolean;
  hasAccordion?: boolean;
}>`
  background: var(--colorsActionMinorYang100);
  padding: 24px;

  ${({ checked }) =>
    checked &&
    css`
      background: var(--colorsActionMajor025);
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      background: var(--colorsActionMinorYang100);
      ${StyledTitle}, ${StyledSubtitle}, ${StyledDescription} {
        color: var(--colorsActionMinorYin030);
      }
      ${StyledAdornment} * {
        opacity: 0.3;
      }
    `}
`;

const StyledFocusWrapper = styled.div<{
  checked?: boolean;
  hasFocus: boolean;
}>`
  ${({ checked, hasFocus }) => css`
    position: relative;
    border: 1px solid var(--colorsActionMinor250);
    border-radius: var(--borderRadius100);
    overflow: hidden;

    ${checked &&
    css`
      border-color: var(--colorsActionMajor500);
      z-index: 10;
    `}

    ${hasFocus &&
    css`
      outline: 3px solid var(--colorsSemanticFocus500);
      z-index: 15;
    `}
  `}
`;

const StyledTileSelectContainer = styled.div<{
  checked?: boolean;
  disabled?: boolean;
}>`
  ${margin}

  width: 100%;
  position: relative;

  & + & ${StyledFocusWrapper} {
    margin-top: -1px;
  }
  ${({ checked, disabled }) =>
    !checked &&
    !disabled &&
    css`
      &:hover ${StyledTileSelect} {
        background: var(--colorsActionMinor050);
      }
    `}
`;

const StyledFooterWrapper = styled.div`
  width: fit-content;
  position: relative;
  z-index: 200;
`;

const StyledAccordionFooterWrapper = styled.div<{
  accordionExpanded?: boolean;
}>`
  width: fit-content;
  position: relative;
  z-index: 200;
  left: -12px;

  border-bottom-right-radius: var(--borderRadius100);
  border-bottom-left-radius: var(--borderRadius100);

  ${({ accordionExpanded }) => `
      span[data-element="chevron_down"] {
        transition: transform 0.3s;
        ${!accordionExpanded && "transform: rotate(-90deg)"};
      }
  `}
`;

const StyledTileSelectInput = styled(Input)`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  height: 100%;
  width: 100%;
  margin: 0;
  z-index: 100;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const StyledTitleContainer = styled.div`
  display: inline-flex;
  align-items: baseline;
  flex-wrap: wrap;
  margin-right: 16px;
  position: relative;
`;

const StyledDeselectWrapper = styled.div<{
  hasActionAdornment: boolean;
}>`
  ${({ hasActionAdornment }) => css`
    z-index: 200;
    position: relative;
    top: -4px;
    right: 8px;
    height: fit-content;

    ${hasActionAdornment &&
    `
      margin-right: var(--sizing200);
      display: flex;
      align-items: baseline;
      min-height: var(--sizing400);

      ${StyledIcon} {
        top: 2px;
      }
    `}
  `}
`;

const StyledTileSelectFieldset = styled(Fieldset)<{
  multiSelect: boolean;
}>`
  ${margin}

  ${LegendContainerStyle} {
    margin-bottom: 16px;
    legend {
      font-size: 16px;
      line-height: 16px;
      margin-left: -2px;
    }
  }
  ${({ multiSelect }) =>
    multiSelect &&
    css`
      ${StyledTileSelectContainer} {
        margin-bottom: 8px;
      }
    `}
`;

const StyledGroupDescription = styled.p`
  color: var(--colorsActionMinorYin055);
  margin: 0;
  margin-bottom: 16px;
`;

StyledTileSelectFieldset.defaultProps = {
  theme: baseTheme,
};

StyledTileSelectContainer.defaultProps = {
  theme: baseTheme,
};

export {
  StyledTileSelectFieldset,
  StyledGroupDescription,
  StyledTileSelectContainer,
  StyledTileSelect,
  StyledTileSelectInput,
  StyledTitleContainer,
  StyledTitle,
  StyledSubtitle,
  StyledAdornment,
  StyledDescription,
  StyledDeselectWrapper,
  StyledFooterWrapper,
  StyledFocusWrapper,
  StyledAccordionFooterWrapper,
};
