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

export const StyledColon = styled.span<StyledColonProps>`
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
