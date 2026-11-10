import styled from "styled-components";

export const DragHandle = styled.button`
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  margin-inline-start: var(--global-space-comp-s);
  width: 28px;
  height: 32px;
  padding: 0;
  border: 0;
  color: inherit;
  background: transparent;
  cursor: grab;
  touch-action: none;
  user-select: none;

  &:active {
    cursor: grabbing;
  }
  &:focus-visible {
    outline: 2px solid var(--focus-borderalt);
  }
`;

export const ResizeHandle = styled.button`
  position: absolute;
  inset-inline-end: 0;
  top: 0;
  height: 100%;
  width: 12px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: col-resize;
  touch-action: none;
  user-select: none;
  z-index: 1;

  &::after {
    content: "";
    position: absolute;
    width: 2px;
    top: 6px;
    bottom: 6px;
    left: 5px;
    background: var(--table-header-subtle-border-default);
  }
  &:focus-visible {
    outline: 2px solid var(--focus-borderalt);
  }
`;

export const DropIndicator = styled.span<{ $edge: "left" | "right" }>`
  position: absolute;
  ${({ $edge }) => $edge}: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--focus-borderalt);
  pointer-events: none;
`;

export const ResizeGuide = styled.span`
  position: fixed;
  width: 2px;
  background: var(--focus-borderalt);
  pointer-events: none;
  z-index: 10;
`;
