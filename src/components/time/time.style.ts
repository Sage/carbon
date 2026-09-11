import styled, { css } from "styled-components";

const labelFontBySize = {
  small: "var(--global-font-static-comp-regular-s)",
  medium: "var(--global-font-static-comp-regular-m)",
  large: "var(--global-font-static-comp-regular-l)",
};

const colonFontBySize = {
  small: "var(--global-font-static-comp-regular-s)",
  medium: "var(--global-font-static-comp-regular-m)",
  large: "var(--global-font-static-comp-regular-l)",
};

type StyledColonProps = {
  $size: "small" | "medium" | "large";
  $isDisabled?: boolean;
  $isReadOnly?: boolean;
};

const StyledColon = styled.span<StyledColonProps>`
  ${({ $size, $isDisabled, $isReadOnly }) => css`
    font: ${colonFontBySize[$size]};
    color: var(--input-typical-txt-default);
    text-align: center;

    ${$isReadOnly &&
    css`
      color: var(--input-typical-txt-read-only);
    `}

    ${$isDisabled &&
    css`
      color: var(--input-typical-txt-disabled);
    `}
  `}
`;

type StyledTimeLayoutProps = {
  $hasToggle: boolean;
};

type StyledTimeSizeProps = {
  $size: "small" | "medium" | "large";
  $isDisabled?: boolean;
  $isReadOnly?: boolean;
};

const labelColour = ($isDisabled?: boolean, $isReadOnly?: boolean) => {
  if ($isDisabled) return "var(--input-typical-txt-disabled)";
  if ($isReadOnly) return "var(--input-typical-txt-read-only)";
  return "var(--input-typical-txt-default)";
};

const inputWidthBySize = {
  small: "var(--global-size-l)",
  medium: "var(--global-size-xl)",
  large: "var(--global-size-2-xl)",
};

const inputHeightBySize = {
  small: "var(--global-size-s)",
  medium: "var(--global-size-m)",
  large: "var(--global-size-l)",
};

const StyledTimeLayout = styled.div<StyledTimeLayoutProps>`
  ${({ $hasToggle }) => css`
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    row-gap: var(--global-space-layout-2-xs);
    column-gap: ${$hasToggle ? "var(--global-space-layout-2-xs)" : "0px"};

    @media screen and (max-width: 480px) {
      [data-role="time-toggle-wrapper"] {
        flex: 0 0 100%;
        margin-top: var(--global-space-none);
      }
    }
  `}
`;

const StyledTimeInputs = styled.div`
  display: flex;
  align-items: flex-start;
`;

const StyledTimeInputField = styled.div<StyledTimeSizeProps>`
  ${({ $size, $isDisabled, $isReadOnly }) => css`
    width: ${inputWidthBySize[$size]};
    min-width: ${inputWidthBySize[$size]};
    max-width: ${inputWidthBySize[$size]};

    [data-component="label"] {
      font: ${labelFontBySize[$size]};
      color: ${labelColour($isDisabled, $isReadOnly)};
    }

    [data-role="input-container"] {
      min-height: ${inputHeightBySize[$size]};
      height: ${inputHeightBySize[$size]};
    }
  `}
`;

const StyledColonWrapper = styled.div<StyledTimeSizeProps>`
  ${({ $size }) => css`
    border-radius: var(--global-radius-action-s);
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 var(--global-size-3-xs);
    width: var(--global-size-3-xs);
    min-width: var(--global-size-3-xs);
    max-width: var(--global-size-3-xs);

    [data-role="time-colon-input-row"] {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: ${inputHeightBySize[$size]};
      height: ${inputHeightBySize[$size]};
    }

    [data-role="time-colon-spacer"] {
      font: ${labelFontBySize[$size]};
      visibility: hidden;
    }
  `}
`;

export {
  StyledTimeLayout,
  StyledTimeInputs,
  StyledTimeInputField,
  StyledColonWrapper,
};

export default StyledColon;
