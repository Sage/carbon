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
  padding: var(--global-space-none) var(--global-space-comp-xs);
  border: var(--global-borderwidth-xs) solid
    var(--container-action-border-default);
  border-radius: var(--global-radius-action-circle);
  background-color: var(--container-action-bg-default);
  color: var(--container-action-txt-default);
  font: var(--global-font-static-comp-medium-m);
`;

export const StyledCustomIcon = styled(Icon)`
  flex-shrink: 0;
  color: var(--container-action-icon-default);
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
  border: var(--global-borderwidth-xs) solid
    var(--container-action-border-default);
  border-radius: var(--global-radius-action-xs);
  background-color: var(--container-action-bg-default);

  &::after {
    content: "";
    width: 10px;
    height: 6px;
    border-left: var(--global-borderwidth-s) solid
      var(--container-action-bg-default);
    border-bottom: var(--global-borderwidth-s) solid
      var(--container-action-bg-default);
    transform: rotate(-45deg) translateY(-1px);
    opacity: 0;
  }

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      background-color: var(--container-action-icon-active);
      border-color: var(--container-action-icon-active);

      &::after {
        opacity: 1;
      }
    `}
`;

export const StyledCustomInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  padding: var(--global-space-comp-2-xs) var(--global-space-comp-xs);
  border: var(--global-borderwidth-xs) solid
    var(--container-action-border-active);
  border-radius: var(--global-radius-action-s);
  background-color: var(--container-action-bg-default);
  color: var(--container-action-txt-default);
  font: var(--global-font-static-comp-regular-m);
  text-overflow: clip;
  white-space: nowrap;

  &::placeholder {
    color: var(--container-action-txt-alt-default);
  }

  &:focus {
    ${addFocusStyling()}
  }
`;

const tileBaseStyles = css<BaseStateProps>`
  box-sizing: border-box;
  width: 424px;
  min-height: var(--global-size-m);
  display: flex;
  align-items: center;
  gap: var(--global-space-comp-m);
  padding: var(--global-space-comp-s) var(--global-space-comp-m);
  border: var(--global-borderwidth-xs) solid
    var(--container-action-border-default);
  border-radius: var(--global-radius-container-m);
  background-color: var(--container-action-bg-default);
  color: var(--container-action-txt-default);
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease;

  &:hover {
    background-color: var(--container-action-bg-hover);
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
      border-color: var(--container-action-border-inactive);
      color: var(--container-action-txt-disabled);

      &:hover {
        background-color: var(--container-action-bg-disabled);
        color: var(--container-action-txt-disabled);
      }

      ${StyledNumberBadge}, ${StyledCheckboxDecoration} {
        border-color: var(--container-action-border-inactive);
        color: var(--container-action-txt-disabled);
      }

      ${StyledCustomIcon} {
        color: var(--container-action-txt-disabled);
      }
    `}
`;

export const StyledOptionTileButton = styled.button<BaseStateProps>`
  ${tileBaseStyles}

  text-align: left;
`;

export const StyledOptionTileMultiple = styled.div<BaseStateProps>`
  ${tileBaseStyles}

  ${({ $isSelected, $isDisabled }) =>
    $isSelected &&
    !$isDisabled &&
    css`
      background-color: var(--button-typical-subtle-bg-active);
      border-color: var(--container-action-border-active);
      color: var(--container-action-txt-active);

      &:hover {
        background-color: var(--button-typical-subtle-bg-active);
        color: var(--container-action-txt-active);
      }
    `}
`;

export const StyledOptionTileCustomActive = styled.div<BaseStateProps>`
  ${tileBaseStyles}

  border-color: var(--container-action-border-active);
  cursor: text;

  &:hover {
    background-color: var(--container-action-bg-default);
  }
`;

export const StyledOptionTileGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--global-space-comp-s);
`;
