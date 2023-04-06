import styled, { css } from "styled-components";
import Link, { LinkProps } from "../../link";

interface StyleCrumbProps extends LinkProps {
  isCurrent?: boolean;
}

export const StyledCrumb = styled(Link)<StyleCrumbProps>`
  font: var(--typographyLinkTextM);
  ${({ isCurrent }) =>
    isCurrent &&
    css`
      a {
        color: var(--colorsUtilityYin090);
        text-decoration: none;
        font: var(--typographyBreadcrumbCurrentPageM);
        cursor: text;
        :hover {
          color: var(--colorsUtilityYin090);
          text-decoration: none;
          cursor: text;
        }
      }
    `}
`;

export const Divider = styled.span.attrs({
  children: "/",
  "aria-hidden": "true",
})`
  margin: 0px var(--spacing050) 0px var(--spacing100);
  line-height: 16px;
  font: var(--typographyBreadcrumbSeparatorM);
  color: var(--colorsUtilityYin055);
`;

export default { StyledCrumb, Divider };
