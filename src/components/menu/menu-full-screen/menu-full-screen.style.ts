import styled, { css } from "styled-components";
import applyBaseTheme from "../../../style/themes/apply-base-theme";
import menuConfigVariants from "../menu.config";

interface StyledMenuFullscreenProps {
  $transitionDuration: number;
  $startPosition: "left" | "right";
}

export const StyledMenuFullscreen = styled.div.attrs(
  applyBaseTheme,
)<StyledMenuFullscreenProps>`
  ${({ $startPosition, $transitionDuration, theme }) => css`
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: ${theme.zIndex.fullScreenModal};

    &.enter {
      visibility: hidden;
      ${$startPosition}: -100%;
    }

    &.enter-active {
      visibility: visible;
      ${$startPosition}: 0;
      transition: all ${$transitionDuration}ms ease;
    }

    &.exit {
      visibility: visible;
      ${$startPosition}: 0;
    }

    &.exit-active {
      visibility: hidden;
      ${$startPosition}: -100%;
      transition: all ${$transitionDuration}ms ease;
    }
  `}
`;

interface StyledMenuModalProps {
  $menuVariant: "white" | "black";
}

export const StyledMenuModal = styled.div.attrs(
  applyBaseTheme,
)<StyledMenuModalProps>`
  ${({ $menuVariant }) => css`
    height: 100vh;
    width: 100vw;
    outline: none;
    background-color: ${menuConfigVariants[$menuVariant].background};
  `}
`;

export const StyledMenuFullscreenHeader = styled.div<StyledMenuModalProps>`
  ${({ $menuVariant }) => css`
    height: var(--global-size-m);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 var(--global-space-comp-l);
    margin-bottom: var(--global-space-comp-s);
    background-color: ${menuConfigVariants[$menuVariant].fullScreenHeader};
  `}
`;

export const StyledMenuFullscreenContent = styled.div`
  overflow-y: auto;
  width: 100%;
  // 100% - header height & spacing
  height: calc(100% - var(--global-size-m) - var(--global-space-comp-s));
`;
