import styled, { css } from "styled-components";
import { padding, flexbox, PaddingProps, FlexboxProps } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { Position, Orientation } from "./navigation-bar.component";

export type StyledNavigationBarProps = PaddingProps &
  FlexboxProps & {
    /** Color scheme of navigation component */
    $variant?: "white" | "black";
    /** Defines whether the navigation bar should be positioned fixed or sticky */
    $position?: Position;
    /** Defines the offset of navigation bar */
    $offset?: string;
    /** Defines whether the navigation bar should be positioned top or bottom */
    $orientation?: Orientation;
  };

const StyledNavigationBar = styled.nav.attrs(
  applyBaseTheme,
)<StyledNavigationBarProps>`
  display: flex;
  align-items: center;
  padding: 0 40px;

  & > * {
    box-sizing: border-box;
    min-height: 40px;
    vertical-align: middle;
  }

  @media only screen and (max-width: 1259px) {
    padding: 0 32px;
  }

  @media only screen and (max-width: 959px) {
    padding: 0 24px;
  }

  @media only screen and (max-width: 599px) {
    padding: 0 16px;
  }

  && {
    ${padding}
  }

  ${flexbox}

  .carbon-logo {
    margin-right: 10px;
  }

  ${({ $position, $orientation, $offset }) =>
    $position &&
    $orientation &&
    css`
      position: ${$position};
      ${$orientation}: ${$offset};

      ${$position === "fixed" &&
      css`
        box-sizing: border-box;
        width: 100%;
      `}
    `}

  ${({ $variant }) => css`
    min-height: 40px;

    &[data-component="global-header"] {
      z-index: var(--carbon-zindex-global-nav);
    }
    &:not([data-component="global-header"]) {
      z-index: var(--carbon-zindex-nav);
    }

    ${$variant === "black" &&
    css`
      background-color: var(--nav-primary-bg-default);
      color: var(--nav-primary-label-default);
    `}

    ${$variant === "white" &&
    css`
      background-color: var(--nav-tertiary-bg-default);
      color: var(--nav-tertiary-label-default);
    `}
  `}
`;

export default StyledNavigationBar;
