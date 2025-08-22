import styled, { css } from "styled-components";
import Link, { LinkProps } from "../../link";

interface StyleCrumbProps extends LinkProps {
  isCurrent?: boolean;
  inverse: boolean;
}

const getCurrentCrumbColor = (inverse: boolean) => {
  return inverse ? "var(--colorsUtilityYang100)" : "var(--colorsUtilityYin090)";
};

export const StyledCrumb = styled(Link)<StyleCrumbProps>`
  font: var(--typographyLinkTextM);
  ${({ isCurrent, inverse }) =>
    isCurrent &&
    css`
      a {
        color: ${getCurrentCrumbColor(inverse)};
        text-decoration: none;
        font: var(--typographyBreadcrumbCurrentPageM);
        :hover {
          color: ${getCurrentCrumbColor(inverse)};
          text-decoration: none;
          cursor: text;
        }
      }
    `}
`;

interface DividerProps {
  isDarkBackground: boolean;
}

export const Divider = styled.span<DividerProps>`
  ::after {
    content: "/";
    margin: 0px var(--spacing050) 0px var(--spacing100);
    line-height: 16px;
    font: var(--typographyBreadcrumbSeparatorM);
    ${({ isDarkBackground }) => css`
      color: ${isDarkBackground
        ? "var(--colorsUtilityYang100)"
        : "var(--colorsUtilityYin055)"};
    `}
  }
`;

export default { StyledCrumb, Divider };
