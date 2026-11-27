import React, { useState } from "react";
import Icon from "../../icon";
import {
  StyledTreeNodeLabel,
  StyledTreeNodeIcon,
  StyledTreeNodeLink,
  StyledTreeNodeToggle,
  StyledTreeView,
  StyledTreeViewItem,
} from "../tree-view.style";

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
  const toggleId = `${id}-toggle`;

  return (
    <StyledTreeViewItem
      role="treeitem"
      aria-expanded={hasChildren ? expanded : undefined}
      aria-labelledby={hasChildren ? toggleId : undefined}
    >
      {hasChildren ? (
        <>
          <StyledTreeNodeToggle
            type="button"
            id={toggleId}
            aria-controls={expanded ? id : undefined}
            onClick={() => setExpanded(!expanded)}
          >
            <StyledTreeNodeIcon aria-hidden="true">
              <Icon size="small" type="chevron_right" />
            </StyledTreeNodeIcon>
            <span>{label}</span>
          </StyledTreeNodeToggle>

          {expanded && children && (
            <StyledTreeView role="group" id={id} aria-labelledby={toggleId}>
              {children.map((child) => (
                <TreeViewItem key={child.id} {...child} />
              ))}
            </StyledTreeView>
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
