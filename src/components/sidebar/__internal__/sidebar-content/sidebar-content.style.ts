import styled, { css } from "styled-components";
import { PaddingProps, padding as paddingFn } from "styled-system";

import {
  StyledForm,
  StyledFormContent,
  StyledFormFooter,
  StyledLeftButtons,
  StyledRightButtons,
} from "../../../form/form.style";
import { smallScreenBreakpoint } from "../../sidebar.config";

type StyledSidebarContentProps = PaddingProps & {
  $disableStickyOnSmallScreen?: boolean;
  $hasCustomFooter?: boolean;
  $stickyFooter?: boolean;
};

type StyledSidebarBodyProps = PaddingProps & {
  $disableStickyOnSmallScreen?: boolean;
  $stickyFooter?: boolean;
};

const StyledSidebarBody = styled.div<StyledSidebarBodyProps>`
  box-sizing: border-box;
  flex: 1 0 auto;
  padding: var(--global-space-comp-xl);
  ${paddingFn}

  &:has(${StyledForm}.sticky) {
    padding: var(--global-space-comp-none);
  }

  ${({ $stickyFooter }) =>
    $stickyFooter &&
    css`
      flex: 1 1 auto;
      min-height: var(--global-size-none);
      overflow-y: auto;
    `}

  ${({ $disableStickyOnSmallScreen }) =>
    $disableStickyOnSmallScreen &&
    css`
      @media screen and (max-width: ${smallScreenBreakpoint}) {
        overflow-y: visible;
      }
    `}
`;

const StyledSidebarContent = styled.div<StyledSidebarContentProps>`
  box-sizing: border-box;
  display: block;
  overflow-y: auto;
  flex-grow: 1;

  color: var(--container-standard-txt-default);
  font: var(--global-font-static-body-regular-m);
  padding: var(--global-space-comp-xl);
  ${paddingFn}

  ${({ $hasCustomFooter, $stickyFooter }) =>
    $hasCustomFooter &&
    css`
      display: flex;
      flex-direction: column;
      padding: var(--global-space-comp-none);

      ${$stickyFooter &&
      css`
        min-height: var(--global-size-none);
        overflow-y: hidden;
      `}
    `}

  &:has(${StyledForm}.sticky) {
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    padding: 0;

    ${StyledForm}.sticky {
      ${StyledFormContent} {
        padding: var(--global-space-comp-xl);
        ${paddingFn}
      }

      ${StyledFormFooter} {
        background: var(--container-standard-bg-default);
        border-top: var(--global-borderwidth-xs) solid
          var(--container-standard-border-default);
        gap: var(--global-space-comp-m);
        padding: var(--global-space-comp-l) var(--global-space-comp-xl);

        ${StyledLeftButtons},
        ${StyledRightButtons} {
          gap: var(--global-space-comp-m);
        }
      }
    }
  }

  ${({ $disableStickyOnSmallScreen }) =>
    $disableStickyOnSmallScreen &&
    css`
      @media screen and (max-width: ${smallScreenBreakpoint}) {
        flex: 0 0 auto;
        min-height: auto;
        overflow-y: visible;

        &:has(${StyledForm}.sticky) {
          overflow-y: visible;

          ${StyledForm}.sticky {
            height: auto;

            ${StyledFormContent} {
              overflow-y: visible;
            }

            ${StyledFormFooter} {
              box-shadow: none;
              position: static;
            }
          }
        }
      }
    `}
`;

export { StyledSidebarBody, StyledSidebarContent };
