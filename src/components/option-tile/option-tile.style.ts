import styled, { css } from "styled-components";
import addFocusStyling from "../../style/utils/add-focus-styling";
import Icon from "../icon";

type BaseStateProps = {
  $isSelected?: boolean;
  $isDisabled?: boolean;
};

export const StyledNumberBadge = styled.span`
  box-sizing: border-box;
  flex-shrink: 0;
  min-width: var(--global-size-xs);
  height: var(--global-size-xs);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--global-space-comp-xs);
  border: var(--global-borderwidth-xs) solid
    var(--input-quickpick-border-default);
  border-radius: var(--global-radius-action-circle);
  background-color: var(--input-quickpick-bg-default);
  color: var(--container-action-txt-default);
  font: var(--global-font-static-comp-medium-m);
  font-variant-numeric: tabular-nums;
`;

export const StyledCustomIcon = styled(Icon)`
  flex-shrink: 0;
  width: var(--global-size-3-xs);
  height: var(--global-size-3-xs);
  margin-left: 4px;
  font-size: var(--global-size-3-xs);
  line-height: var(--global-size-3-xs);
  color: var(--container-action-icon-default);

  &::before {
    font-size: var(--global-size-3-xs);
    line-height: var(--global-size-3-xs);
  }
`;

export const StyledTileText = styled.span`
  font: var(--global-font-static-comp-regular-m);
  text-align: left;
`;

export const StyledCheckboxDecoration = styled.span<BaseStateProps>`
  box-sizing: border-box;
  flex-shrink: 0;
  width: var(--global-size-2-xs);
  height: var(--global-size-2-xs);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: var(--global-borderwidth-xs) solid var(--input-typical-border-default);
  border-radius: var(--global-radius-action-s);
  background-color: var(--input-typical-bg-default);

  svg {
    width: 14px;
    height: auto;
  }

  svg path {
    fill: transparent;
  }

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      svg path {
        fill: var(--input-typical-icon-active);
      }
    `}
`;

export const StyledCustomInput = styled.input`
  box-sizing: border-box;
  flex: 1 1 auto;
  width: 100%;
  height: var(--global-size-s);
  min-width: 0;
  padding: 0 var(--global-space-comp-s);
  border: var(--global-borderwidth-xs) solid var(--input-typical-border-default);
  border-radius: var(--global-radius-action-m);
  background-color: var(--input-typical-bg-default);
  color: var(--container-action-txt-default);
  font: var(--global-font-static-comp-regular-m);
  text-overflow: clip;
  white-space: nowrap;

  &:focus {
    ${addFocusStyling()}
  }
`;

const tileBaseStyles = css<BaseStateProps>`
  box-sizing: border-box;
  width: 424px;
  height: 48px;
  display: flex;
  align-items: center;
  gap: var(--global-space-comp-m);
  padding: 12px;
  border: var(--global-borderwidth-xs) solid transparent;
  border-radius: var(--global-radius-container-m);
  background-color: var(--container-action-bg-default);
  color: var(--container-action-txt-default);
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease;

  &:hover {
    background-color: var(--input-quickpick-bg-hover);
    color: var(--container-action-txt-hover);
  }

  &:focus-visible {
    ${addFocusStyling()}
  }

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      cursor: not-allowed;
      background-color: var(--container-action-bg-disabled);
      border-color: transparent;
      color: var(--container-action-txt-disabled);

      &:hover {
        background-color: var(--container-action-bg-disabled);
        color: var(--container-action-txt-disabled);
      }

      ${StyledNumberBadge} {
        border-color: var(--container-action-border-inactive);
        color: var(--container-action-txt-disabled);
      }

      ${StyledCheckboxDecoration} {
        border-color: var(--input-typical-border-disabled);
        background-color: var(--input-typical-bg-disabled);

        svg path {
          fill: var(--input-typical-icon-disabled);
        }
      }

      ${StyledCustomIcon} {
        color: var(--container-action-txt-disabled);
      }
    `}
`;

export const StyledOptionTileButton = styled.button<BaseStateProps>`
  ${tileBaseStyles}

  text-align: left;

  &:hover ${StyledNumberBadge} {
    background-color: var(--input-quickpick-bg-hover);
    border-color: var(--input-quickpick-border-hover);
  }
`;

export const StyledOptionTileMultiple = styled.div<BaseStateProps>`
  ${tileBaseStyles}

  ${({ $isSelected, $isDisabled }) =>
    $isSelected &&
    !$isDisabled &&
    css`
      background-color: var(--input-quickpick-bg-active);
      border-color: transparent;
      color: var(--input-quickpick-txt-active);

      &:hover {
        background-color: var(--input-quickpick-bg-active);
        color: var(--input-quickpick-txt-active);
      }
    `}
`;

export const StyledOptionTileCustomActive = styled.div<BaseStateProps>`
  ${tileBaseStyles}

  background-color: var(--input-quickpick-bg-active);
  border-color: transparent;
  cursor: text;

  &:hover {
    background-color: var(--input-quickpick-bg-active);
  }
`;

export const StyledOptionTileGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;
