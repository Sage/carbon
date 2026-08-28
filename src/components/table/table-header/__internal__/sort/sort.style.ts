import styled, { css } from "styled-components";
import addFocusStyling from "../../../../../style/utils/add-focus-styling";

const styleConfig = {
  "extra-small": {
    fontSize: "13px",
  },
  "small": {
    fontSize: "14px",
  },
  "medium": {
    fontSize: "14px",
  },
  "large": {
    fontSize: "16px",
  },
  "extra-large": {
    fontSize: "16px",
  },
};

const StyledSortButton = styled.button<{
  $variant: "prominent" | "subtle-white" | "subtle-grey";
  size?: "extra-small" | "small" | "medium" | "large" | "extra-large";
}>`
  ${({ $variant, size = "medium" }) => css`
    color: ${$variant === "prominent" ? "var(--table-header-harsh-label-default)" : "var(--table-header-subtle-label-default)"};
    cursor: pointer;
    align-items: center;
    background: transparent;
    border: none;
    border-radius: 0;

    display: inline-flex;
    font-size: ${styleConfig[size].fontSize};
    font-weight: 500;
    gap: var(--spacing075);
    position: relative;
    text-align: left;
    word-break: keep-all;

    &:focus {
      ${addFocusStyling(true)}
      border-radius: var(--borderRadius025);
    }

    & > span[data-component="icon"] {
      color: currentColor;
      margin-bottom: 1px;
    }
  `}
`;
export default StyledSortButton;
