import styled, { css } from "styled-components";
import { margin } from "styled-system";
import StyledDateInput from "../date/date.style";
import InputContainer from "../../__internal__/input/input.style";
import StyledIcon from "../icon/icon.style";
import { propsForSize as buttonSizeConfig } from "../button/__next__/button.config";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import addFocusStyling from "../../style/utils/add-focus-styling";

const rangeSizeConfig = {
  small: {
    gap: "var(--global-space-comp-m)",
    font: "var(--global-font-static-comp-regular-s)",
    padding: "var(--global-space-comp-s)",
  },
  medium: {
    gap: "var(--global-space-comp-l)",
    font: "var(--global-font-static-comp-regular-m)",
    padding: "var(--global-space-comp-m)",
  },
  large: {
    gap: "var(--global-space-comp-xl)",
    font: "var(--global-font-static-comp-regular-l)",
    padding: "var(--global-space-comp-l)",
  },
};

type RangeSize = keyof typeof rangeSizeConfig;

export interface StyledDateRangeProps {
  /** [Legacy] Display labels inline */
  labelsInline?: boolean;
  /** Render the ValidationMessage above the inputs when validationRedesignOptIn flag is set */
  validationMessagePositionTop?: boolean;
}
const StyledDateRange = styled.div.attrs(applyBaseTheme)<
  StyledDateRangeProps & { $size: RangeSize }
>`
  ${({ validationMessagePositionTop }) => `
    display: flex;
    align-items: ${validationMessagePositionTop ? "flex-end" : "flex-start"};
  `}
  margin-bottom: var(--fieldSpacing);
  ${margin}

  & ${StyledDateInput} {
    display: inline-block;
    vertical-align: ${({ labelsInline }) => (labelsInline ? "top" : "bottom")};
  }

  & ${StyledDateInput}:first-of-type {
    margin-right: ${({ $size }) => rangeSizeConfig[$size].gap};
  }
`;

export const StyledCombinedTrigger = styled.button`
  display: flex;
  align-items: center;
  align-self: stretch;
  min-width: 0;
  margin: var(--global-space-none);
  padding: var(--global-space-none);
  border: none;
  border-radius: inherit;
  background: transparent;
  color: var(--input-typical-txt-default);
  text-align: left;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:disabled {
    color: var(--input-typical-txt-disabled);
    cursor: not-allowed;
  }
`;

export const StyledCombinedField = styled(InputContainer)`
  ${({ $error }) => css`
    box-sizing: border-box;
    align-self: flex-start;

    ${!$error &&
    css`
      &:has(${StyledCombinedTrigger}:hover:not(:disabled)) {
        background: var(--input-typical-bg-hover);
        border-color: var(--input-typical-border-hover);
      }
    `}

    &:has(${StyledCombinedTrigger}:focus-visible) {
      ${addFocusStyling()}
      z-index: 2;
    }
  `}
`;

/** The visible value, inside `StyledCombinedTriggerText`. */
export const StyledCombinedTriggerValue = styled.span``;

/**
 * The value shares one grid cell with a hidden full-length sample range (`data-sizer`), so the
 * trigger is never narrower than a complete range.
 */
export const StyledCombinedTriggerText = styled.span<{ $size: RangeSize }>`
  ${({ $size }) => css`
    display: grid;
    min-width: 0;
    padding: var(--global-space-none) ${rangeSizeConfig[$size].padding};
    font: ${rangeSizeConfig[$size].font};
    white-space: nowrap;

    &::after {
      content: attr(data-sizer);
      visibility: hidden;
    }

    &::after,
    ${StyledCombinedTriggerValue} {
      grid-area: 1 / 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `}
`;

export const StyledCombinedTriggerIcon = styled.span<{ $size: RangeSize }>`
  ${({ $size }) => css`
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    width: calc(
      ${buttonSizeConfig[$size].height} - var(--global-borderwidth-xs)
    );
    border-radius: var(--global-radius-none) var(--global-radius-action-m)
      var(--global-radius-action-m) var(--global-radius-none);

    && ${StyledIcon} {
      color: var(--input-typical-icon-default);
    }

    ${StyledCombinedTrigger}:disabled && ${StyledIcon} {
      color: var(--button-typical-subtle-label-disabled);
    }
  `}
`;

export default StyledDateRange;
