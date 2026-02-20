import styled, { css } from "styled-components";
import Link, { LinkProps } from "../../link";

interface StyledCrumbProps extends LinkProps {
  $isCurrent?: boolean;
}

const getTextColor = (inverse?: boolean) => {
  return inverse
    ? "var(--container-standard-inverse-txt-alt)"
    : "var(--container-standard-txt-alt)";
};

export const StyledCrumb = styled(Link)<StyledCrumbProps>`
  ${({ $isCurrent, inverse }) =>
    $isCurrent &&
    css`
      a {
        color: ${getTextColor(inverse)};
        text-decoration: none;
        :hover {
          color: ${getTextColor(inverse)};
          text-decoration: none;
          cursor: text;
        }
      }
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

export default { StyledCrumb, Divider };
