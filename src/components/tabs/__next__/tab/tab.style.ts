import styled, { css } from "styled-components";
import addFocusStyling from "../../../../style/utils/add-focus-styling";

const VERTICAL_TAB_WIDTH = 200;

export const sizes = {
  medium: {
    labelFont: "var(--global-font-static-comp-medium-m)",
    subtextFont: "var(--global-font-static-comp-regular-xs)",
    minHeight: "var(--global-size-m)",
    paddingX: "var(--global-space-comp-l)",
    // only vertical tabs
    paddingY: "var(--global-space-comp-s)",
  },
  large: {
    labelFont: "var(--global-font-static-comp-medium-l)",
    subtextFont: "var(--global-font-static-comp-regular-s)",
    minHeight: "var(--global-size-l)",
    paddingX: "var(--global-space-comp-xl)",
    // only vertical tabs
    paddingY: "var(--global-space-comp-m)",
  },
};

const getActiveLineBgColor = (
  error?: string | boolean,
  warning?: string | boolean,
) => {
  if (error) return "var(--tab-validation-border-error)";
  if (warning) return "var(--tab-validation-border-warning)";
  return "var(--tab-border-active)";
};

export const StyledTabContent = styled.div<{
  $headerWidth?: string;
  $hasCustomLayout?: boolean;
}>`
  ${({ $headerWidth, $hasCustomLayout }) => css`
    display: flex;
    flex: 1 0 0;
    gap: var(--global-space-comp-s);
    align-items: center;
    white-space: nowrap;
    text-align: left;

    ${$headerWidth &&
    css`
      white-space: normal;
    `}

    ${$hasCustomLayout &&
    css`
      > * {
        flex-grow: 1;
      }
    `}
  `}
`;

export const StyledTabLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const StyledTabSubtext = styled.span<{ $size: "medium" | "large" }>`
  ${({ $size }) => css`
    font: ${sizes[$size].subtextFont};
  `}
`;

interface StyledTabProps {
  $activeTab: boolean;
  $error?: string | boolean;
  $warning?: string | boolean;
  $orientation: "horizontal" | "vertical";
  $size: "medium" | "large";
  $hasCustomLayout?: boolean;
  $headerWidth?: string;
}

export const StyledTab = styled.button<StyledTabProps>`
  ${({
    $activeTab,
    $orientation,
    $size,
    $error,
    $warning,
    $hasCustomLayout,
    $headerWidth,
  }) => css`
    cursor: pointer;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    gap: var(--global-space-comp-s);
    background-color: transparent;
    border: none;
    color: var(--tab-label-default);
    position: relative;
    font: ${sizes[$size].labelFont};
    min-height: ${sizes[$size].minHeight};
    padding: var(--global-space-comp-s) ${sizes[$size].paddingX};
    border-radius: var(--global-radius-action-m) var(--global-radius-action-m)
      var(--global-radius-none) var(--global-radius-none);

    // overlay border to prevent layout shifts when state changes
    ::before {
      content: "";
      pointer-events: none;
      position: absolute;
      inset: 0;
      border-radius: inherit;
      border-bottom: var(--global-borderwidth-s) solid var(--tab-border-default);
    }

    ${$activeTab &&
    css`
      background-color: var(--tab-bg-active);

      ${$orientation === "horizontal" &&
      css`
        ::before {
          border: var(--global-borderwidth-s) solid var(--tab-border-active-alt);
          border-bottom: none;
        }

        // active line
        ::after {
          content: "";
          pointer-events: none;
          position: absolute;
          bottom: 0;
          // padding + outline border
          left: calc(${sizes[$size].paddingX} + var(--global-borderwidth-s));
          right: calc(${sizes[$size].paddingX} + var(--global-borderwidth-s));
          width: stretch;
          height: var(--global-size-5-xs);
          background-color: ${getActiveLineBgColor($error, $warning)};
          border-radius: var(--global-radius-action-xs);
          box-shadow:
            calc(-1 * var(--global-borderwidth-xl)) 0 0 0
              var(--tab-border-active-outline),
            var(--global-borderwidth-xl) 0 0 0 var(--tab-border-active-outline);
        }
      `}
    `}

    ${$orientation === "vertical" &&
    css`
      border-radius: var(--global-radius-action-m) var(--global-radius-none)
        var(--global-radius-none) var(--global-radius-action-m);
      max-width: ${$headerWidth ?? `${VERTICAL_TAB_WIDTH}px`};
      width: ${$headerWidth ?? `${VERTICAL_TAB_WIDTH}px`};
      padding: ${sizes[$size].paddingY} ${sizes[$size].paddingX};

      ::before {
        border: none;
        border-right: var(--global-borderwidth-s) solid
          var(--tab-border-active-alt);
      }

      ${$activeTab &&
      css`
        ::before {
          border: var(--global-borderwidth-s) solid var(--tab-border-active-alt);
          border-right: none;
        }

        // active line
        ::after {
          content: "";
          pointer-events: none;
          position: absolute;
          right: 0;
          // padding + outline border
          top: calc(${sizes[$size].paddingY} + var(--global-borderwidth-s));
          bottom: calc(${sizes[$size].paddingY} + var(--global-borderwidth-s));
          height: stretch;
          width: var(--global-size-5-xs);
          background-color: ${getActiveLineBgColor($error, $warning)};
          border-radius: var(--global-radius-action-xs);
          box-shadow:
            0 calc(-1 * var(--global-borderwidth-xl)) 0 0
              var(--tab-border-active-outline),
            0 var(--global-borderwidth-xl) 0 0 var(--tab-border-active-outline);
        }
      `}
    `}

    ${$hasCustomLayout &&
    css`
      padding: 0;
    `}

    ${!$activeTab &&
    css`
      :hover {
        background-color: var(--tab-bg-hover);
      }
    `}

    :focus {
      ${addFocusStyling(true)}
      z-index: 1;

      ::before,
      ::after {
        display: none;
      }
    }
  `}
`;
