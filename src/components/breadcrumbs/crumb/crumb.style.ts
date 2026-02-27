import styled, { css } from "styled-components";
import { LinkProps } from "../../link";

interface StyledCrumbProps extends LinkProps {
  $isCurrent?: boolean;
}

const getTextColor = (inverse?: boolean) => {
  return inverse
    ? "var(--container-standard-inverse-txt-alt)"
    : "var(--container-standard-txt-alt)";
};

export const StyledCrumbCurrent = styled.span<StyledCrumbProps>`
  ${({ inverse }) => css`
    font: var(--global-font-static-comp-regular-m);
    cursor: text;
    color: ${getTextColor(inverse)};
  `}
`;

interface DividerProps {
  $inverse?: boolean;
}

export const Divider = styled.span<DividerProps>`
  ::after {
    content: "/";
    margin-left: var(--global-space-comp-s);
    font: var(--global-font-static-comp-regular-m);

    ${({ $inverse }) => css`
      color: ${getTextColor($inverse)};
    `}
  }
`;

export default { Divider };
