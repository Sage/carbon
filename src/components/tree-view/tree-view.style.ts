import styled, { css } from "styled-components";

const treeNodeContent = css`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: var(--global-space-comp-s);
  width: 100%;
  padding: var(--global-space-comp-s);
  overflow-wrap: anywhere;
  text-align: start;
`;

export const StyledTreeView = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  color: var(--container-action-txt-default);
  font: var(--global-font-static-comp-regular-m);
`;

export const StyledTreeViewItem = styled.li`
  & > ${StyledTreeView} {
    margin-inline-start: calc(
      var(--global-space-comp-l) + var(--global-size-2-xs)
    );
  }

  & > ${StyledTreeView} > &:last-child {
    border-block-end: 0;
  }
`;

export const StyledTreeNodeToggle = styled.button`
  ${treeNodeContent}
  position: relative;
  border: 0;
  background: transparent;
  color: inherit;
  font: var(--global-font-static-section-heading-s);
  cursor: pointer;

  &:hover {
    background-color: var(--container-action-bg-hover);
  }

  &:focus-visible {
    position: relative;
    z-index: 1;
    outline: 3px solid transparent;
    box-shadow: var(--focus-shadow-default);
  }
`;

export const StyledTreeNodeIcon = styled.span`
  display: inline-flex;
  flex: 0 0 var(--global-size-2-xs);
  align-items: center;
  justify-content: center;
  width: var(--global-size-2-xs);
  height: var(--global-size-2-xs);
  color: var(--container-action-icon-default);

  ${StyledTreeNodeToggle}[aria-expanded="true"] > & {
    transform: rotate(90deg);
  }

  @media (prefers-reduced-motion: no-preference) {
    transition: transform 0.4s;
  }
`;

export const StyledTreeNodeLink = styled.a`
  ${treeNodeContent}
  color: var(--link-typical-label-default);
  text-decoration: underline;

  &:hover {
    background-color: var(--container-action-bg-hover);
    color: var(--link-typical-label-hover);
  }

  &:focus-visible {
    position: relative;
    z-index: 1;
    outline: 3px solid transparent;
    box-shadow: var(--focus-shadow-default);
  }
`;

export const StyledTreeNodeLabel = styled.span`
  ${treeNodeContent}
`;
