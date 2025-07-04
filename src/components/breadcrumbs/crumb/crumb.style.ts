import styled, { SimpleInterpolation, css } from "styled-components";

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

  > a {
    color: ${isDarkBackground
      ? "var(--colorsActionMajor350)"
      : "var(--colorsActionMajor500)"};
  }

  ${!isCurrent &&
  `
    a:focus,
    button:focus {
      outline: yellow;
      text-decoration: none;
      border-bottom-left-radius: var(--borderRadius000);
      border-bottom-right-radius: var(--borderRadius000);
      max-width: fit-content;
      box-shadow: 0 var(--spacing050) 0 0 var(--colorsUtilityYin090);
      border-bottom-left-radius: var(--borderRadius025);
      border-bottom-right-radius: var(--borderRadius025);
    }
  `}

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

export default { styledCrumb, Divider };
