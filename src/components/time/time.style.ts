import styled, { css } from "styled-components";

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
};

const inputWidthBySize = {
  small: "48px",
  medium: "56px",
  large: "64px",
};

const inputHeightBySize = {
  small: "32px",
  medium: "40px",
  large: "48px",
};

const StyledTimeLayout = styled.div<StyledTimeLayoutProps>`
  ${({ $hasToggle }) => css`
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    row-gap: var(--global-space-comp-m);
    column-gap: ${$hasToggle ? "var(--global-space-comp-m)" : "0px"};

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
  ${({ $size }) => css`
    width: ${inputWidthBySize[$size]};
    min-width: ${inputWidthBySize[$size]};
    max-width: ${inputWidthBySize[$size]};

    [data-role="input-container"] {
      min-height: ${inputHeightBySize[$size]};
      height: ${inputHeightBySize[$size]};
    }
  `}
`;

const StyledColonWrapper = styled.div<StyledTimeSizeProps>`
  ${({ $size }) => css`
    display: flex;
    flex-direction: column;
    margin-left: var(--global-space-comp-s);
    margin-right: var(--global-space-comp-s);

    [data-role="time-colon-input-row"] {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: ${inputHeightBySize[$size]};
      height: ${inputHeightBySize[$size]};
    }

    [data-role="time-colon-spacer"] {
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
