import React, { useState } from "react";
import Icon from "../../icon";
import {
  StyledTreeNodeLabel,
  StyledTreeNodeIcon,
  StyledTreeNodeLink,
  StyledTreeNodeToggle,
  StyledTreeViewItem,
} from "../tree-view.style";
import TreeView from "../tree-view.component";

export type TreeViewItemProps = {
  /**
   * The child tree view items of this item.
   */
  children?: TreeViewItemProps[];
  /**
   * The URL that the tree view item should link to.
   */
  href?: string;
  /**
   * The unique identifier for the tree view item.
   */
  id: string;
  /**
   * The label of the tree view item.
   */
  label: string;
};

export const TreeViewItem = ({
  children,
  href,
  id,
  label,
}: TreeViewItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = Boolean(children?.length);

  return (
    <StyledTreeViewItem>
      {hasChildren ? (
        <>
          <StyledTreeNodeToggle
            type="button"
            aria-controls={id}
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
            role="treeitem"
          >
            <StyledTreeNodeIcon aria-hidden="true">
              <Icon size="small" type="chevron_right" />
            </StyledTreeNodeIcon>
            <span>{label}</span>
          </StyledTreeNodeToggle>

          {expanded && children && (
            <TreeView ariaLabelledBy={id} id={id} items={children} />
          )}
        </>
      ) : href ? (
        <StyledTreeNodeLink href={href}>{label}</StyledTreeNodeLink>
      ) : (
        <StyledTreeNodeLabel>{label}</StyledTreeNodeLabel>
      )}
    </StyledTreeViewItem>
  );
};

export default TreeViewItem;
