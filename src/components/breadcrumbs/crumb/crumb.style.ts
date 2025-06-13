import styled, { SimpleInterpolation, css } from "styled-components";
import Link, { LinkProps } from "../../link";

interface StyleCrumbProps extends LinkProps {
  isCurrent?: boolean;
  isDarkBackground: boolean;
}

const getCurrentCrumbColor = (isDarkBackground: boolean) => {
  return isDarkBackground
    ? "var(--colorsUtilityYang100)"
    : "var(--colorsUtilityYin090)";
};

export const styledCrumb = (
  baseStyles: SimpleInterpolation,
  isDarkBackground: boolean,
  isCurrent?: boolean,
) => css`
  ${baseStyles}

  font: var(--typographyLinkTextM);
  ${isCurrent &&
  `
    a {
      color: ${getCurrentCrumbColor(isDarkBackground)};
      text-decoration: none;
      font: var(--typographyBreadcrumbCurrentPageM);
      :hover {
        color: ${getCurrentCrumbColor(isDarkBackground)};
        text-decoration: none;
        cursor: text;
      }
    }
  `}
`;

export const StyledCrumb = styled(Link)<StyleCrumbProps>`
  font: var(--typographyLinkTextM);
  ${({ isCurrent, isDarkBackground }) =>
    isCurrent &&
    css`
      a {
        color: ${getCurrentCrumbColor(isDarkBackground)};
        text-decoration: none;
        font: var(--typographyBreadcrumbCurrentPageM);
        :hover {
          color: ${getCurrentCrumbColor(isDarkBackground)};
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
