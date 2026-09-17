import styled, { css } from "styled-components";
import { padding } from "styled-system";
import applyBaseTheme from "../../../../style/themes/apply-base-theme";
import StyledIconButton from "../../../icon-button/icon-button.style";
import StyledIcon from "../../../icon/icon.style";

const StyledSidebarHeader = styled.div.attrs(applyBaseTheme)<{
  $hasCloseButton?: boolean;
  $headerVariant?: "typical" | "inverse" | "light" | "dark";
  $gradientKeyLine?: boolean;
}>`
  ${({ $headerVariant }) => {
    const inverse = $headerVariant === "inverse" || $headerVariant === "dark";

    return css`
      background-color: ${inverse
        ? "var(--container-standard-inverse-bg-default)"
        : "var(--container-standard-bg-default)"};
      color: ${inverse
        ? "var(--container-standard-inverse-txt-default)"
        : "var(--container-standard-txt-default)"};
      position: relative;
    `;
  }}
  box-sizing: border-box;
  flex: 0 0 auto;
  min-height: calc((2 * var(--global-space-comp-xl)) + var(--global-size-s));
  width: 100%;
  transition: all 0.2s ease;
  padding: var(--global-space-comp-xl);
  ${padding}
  ${({ $hasCloseButton, $headerVariant }) =>
    $hasCloseButton &&
    css`
      display: flex;
      justify-content: space-between;
      gap: var(--global-space-comp-l);
      > ${StyledIconButton}:first-of-type {
        ${($headerVariant === "inverse" || $headerVariant === "dark") &&
        css`
          ${StyledIcon} {
            color: var(--container-standard-inverse-txt-default);
          }

          &:is(:hover, :active, :focus) ${StyledIcon} {
            color: var(--container-standard-inverse-txt-default);
          }

          &:disabled ${StyledIcon} {
            color: var(--container-standard-inverse-txt-alt);
          }
        `}
        align-self: flex-start;
        border-radius: var(--global-radius-action-circle);
        flex: 0 0 auto;
        height: var(--global-size-s);
        min-width: var(--global-size-s);
        width: var(--global-size-s);

        ${StyledIcon} {
          height: var(--global-size-2-xs);
          width: var(--global-size-2-xs);
        }
      }
    `}
  div[data-element="sidebar-heading"] {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: var(--global-space-comp-xs);
    min-width: 0;
    width: 100%;

    [data-element="sidebar-title"] {
      color: inherit;
    }
  }
`;

const StyledSidebarHeaderDivider = styled.hr.attrs(applyBaseTheme)<{
  $gradientKeyLine?: boolean;
}>`
  background: ${({ $gradientKeyLine }) =>
    $gradientKeyLine
      ? "var(--container-standard-border-ai-h)"
      : "var(--container-standard-border-default)"};
  border: var(--global-borderwidth-none);
  bottom: 0;
  height: ${({ $gradientKeyLine }) =>
    $gradientKeyLine
      ? "var(--global-borderwidth-s)"
      : "var(--global-borderwidth-xs)"};
  left: 0;
  margin: 0;
  position: absolute;
  right: 0;
`;

const StyledSidebarSubHeader = styled.div.attrs(applyBaseTheme)`
  box-sizing: border-box;
  width: 100%;
  color: var(--container-standard-txt-default);
  background-color: var(--container-standard-bg-alt);
  border-bottom: var(--global-borderwidth-xs) solid
    var(--container-standard-border-default);
  padding: var(--global-space-comp-s) var(--global-space-comp-2-xl);
  ${padding}
  transition: all 0.2s ease;
`;

export default StyledSidebarHeader;
export { StyledSidebarHeaderDivider, StyledSidebarSubHeader };
