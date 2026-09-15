import styled, { css } from "styled-components";

import Button, { ButtonProps } from "../../../../button/__next__";

interface StyledToolbarButtonProps extends ButtonProps {
  tabIndex?: number;
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
  size: "small" | "medium" | "large";
}

const sizeMap = {
  small: {
    toolbarPadding: "var(--global-space-comp-s)",
    withHeaderPadding: "var(--global-space-comp-xs)",
    buttonSize: "var(--global-size-s)",
  },
  medium: {
    toolbarPadding: "var(--global-space-comp-m)",
    withHeaderPadding: "var(--global-space-comp-s)",
    buttonSize: "var(--global-size-m)",
  },
  large: {
    toolbarPadding: "var(--global-space-comp-l)",
    withHeaderPadding: "var(--global-space-comp-m)",
    buttonSize: "var(--global-size-l)",
  },
};

interface StyledToolbarProps {
  hasHeader?: boolean;
  size: "small" | "medium" | "large";
}

const StyledToolbarWrapper = styled.div<StyledToolbarProps>`
  ${({ size, hasHeader }) => css`
    padding: ${sizeMap[size].toolbarPadding};

    ${hasHeader &&
    css`
      padding-top: ${sizeMap[size].withHeaderPadding};
    `}
  `};

  display: flex;
  flex-direction: row;
  gap: var(--global-space-comp-s);
  border-bottom: var(--global-borderwidth-xs) solid
    var(--input-typical-border-default);
  align-items: center;
  flex-wrap: wrap;
`;

const StyledToolbar = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--global-space-comp-s);
  align-items: center;
  flex-wrap: wrap;
  padding: var(--global-space-comp-xs);
`;

const CommandButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--global-space-comp-s);
`;

const StyledToolbarButton = styled(Button)<StyledToolbarButtonProps>`
  border: none;
  color: var(--button-typical-toggle-label-default);

  &:hover {
    background-color: var(--button-typical-toggle-bg-hover);
    color: var(--button-typical-toggle-label-hover);
  }

  ${({ size }) => css`
    min-width: ${sizeMap[size].buttonSize};
    min-height: ${sizeMap[size].buttonSize};
  `}
`;

export {
  StyledToolbar,
  StyledToolbarWrapper,
  CommandButtons,
  StyledToolbarButton,
};
