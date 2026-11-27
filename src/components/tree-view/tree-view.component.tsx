import React from "react";
import {
  TreeViewItem,
  TreeViewItemProps,
} from "./tree-view-item/tree-view-item.component";
import { StyledTreeView } from "./tree-view.style";

export type TreeViewProps = {
  /**
   * The ARIA label that describes the tree view.
   */
  ariaLabelledBy?: string;
  /**
   * The unique identifier for the tree view.
   */
  id: string;
  /**
   * The tree view items to be rendered.
   */
  items: TreeViewItemProps[];
};

export const TreeView = ({ ariaLabelledBy, id, items }: TreeViewProps) => {
  return (
    <StyledTreeView aria-labelledby={ariaLabelledBy} id={id} role="tree">
      {items.map((item) => (
        <TreeViewItem key={item.id} {...item} />
      ))}
    </StyledTreeView>
  );
};

export default TreeView;
