import styled, { css } from "styled-components";
import addFocusStyling from "../../../style/utils/add-focus-styling";

const styleConfig = {
  compact: {
    fontSize: "13px",
  },
  small: {
    fontSize: "14px",
  },
  medium: {
    fontSize: "14px",
  },
  large: {
    fontSize: "16px",
  },
  extraLarge: {
    fontSize: "16px",
  },
};

const StyledSortButton = styled.button<{
  colorTheme?: "light" | "transparent-base" | "transparent-white" | "dark";
  size?: "compact" | "small" | "medium" | "large" | "extraLarge";
}>`
  ${({ colorTheme = "light", size = "medium" }) => css`
    align-items: center;
    background: transparent;
    border: none;
    border-radius: 0;
    color: ${colorTheme === "dark"
      ? "var(--colorsUtilityYang100)"
      : "var(--colorsUtilityYin090)"};
    display: inline-flex;
    font-size: ${styleConfig[size].fontSize};
    font-weight: 500;
    gap: var(--spacing075);
    position: relative;
    text-align: left;
    word-break: keep-all;

    span[data-role="sort-placeholder"] {
      min-width: 24px;
      :hover {
        border-bottom: none;
      }
    }

    &:hover {
      span:first-of-type {
        border-bottom: 1px solid
          ${colorTheme === "dark"
            ? "var(--colorsUtilityYang100)"
            : "var(--colorsUtilityYin090)"};
      }
    }

    :focus {
      ${addFocusStyling()}
      border-radius: var(--borderRadius025);
    }

    span[data-component="icon"] {
      color: ${colorTheme === "dark"
        ? "var(--colorsActionMinorYang100)"
        : "var(--colorActionMinor500)"};
      margin-bottom: 1px;
    }
  `}
`;
export default StyledSortButton;
