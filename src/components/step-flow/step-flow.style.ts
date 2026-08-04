import styled, { css } from "styled-components";
import { margin } from "styled-system";

export const StyledStepFlow = styled.div`
  display: flex;
  gap: var(--global-space-comp-l);
  align-items: flex-start;

  ${margin}
`;

export const StyledStepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--global-space-comp-xs);
  flex: 1 0 0;
`;

export const StyledProgressIndicatorWrapper = styled.div`
  display: flex;
  padding: var(--global-space-comp-xs) 0;
  gap: var(--global-space-comp-l);
`;

export const StyledStepLabel = styled.span`
  color: var(--progress-label-alt);
  font: var(--global-font-static-body-regular-l);
`;

interface StyledProgressIndicatorProps {
  $isCompleted: boolean;
  $isInProgress: boolean;
}

export const StyledProgressIndicator = styled.div<StyledProgressIndicatorProps>`
  ${({ $isCompleted, $isInProgress }) => css`
    width: 100%;
    height: var(--global-size-4-xs);
    border-radius: var(--global-radius-container-xs);

    ${!$isCompleted &&
    !$isInProgress &&
    css`
      background: var(--progress-stepflow-bg-default);
      box-shadow: inset 0 0 0 var(--global-borderwidth-xs)
        var(--progress-stepflow-border-default);
    `}

    ${$isInProgress &&
    css`
      background-color: var(--progress-stepflow-bg-active);
      outline: var(--global-borderwidth-s) solid
        var(--progress-stepindicator-border-active-outer);
      outline-offset: var(--global-borderwidth-s);
    `}

    ${$isCompleted &&
    css`
      background-color: var(--progress-stepflow-bg-complete);
    `}
  `}
`;
