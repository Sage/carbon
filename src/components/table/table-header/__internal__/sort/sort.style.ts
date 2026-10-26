import styled, { css } from "styled-components";
import addFocusStyling from "../../../../../style/utils/add-focus-styling";

const StyledSortButton = styled.button<{
  $variant: "prominent" | "subtle-white" | "subtle-grey";
  size?: "extra-small" | "small" | "medium" | "large" | "extra-large";
}>`
  ${({ $variant }) => css`
    color: ${$variant === "prominent"
      ? "var(--table-header-harsh-label-default)"
      : "var(--table-header-subtle-label-default)"};
    cursor: pointer;
    align-items: center;
    background: transparent;
    border: none;
    border-radius: 0;
    display: inline-flex;
    justify-content: space-between;
    position: relative;
    text-align: left;
    word-break: keep-all;

    &:focus {
      ${addFocusStyling(true)}
      border-radius: var(--global-radius-action-xs);
    }

    & > span[data-component="icon"] {
      color: currentColor;
      margin-bottom: 1px;
    }
  `}
`;
export default StyledSortButton;
