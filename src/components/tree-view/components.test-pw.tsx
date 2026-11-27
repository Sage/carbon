import React from "react";

import TreeView, { TreeViewProps } from "./tree-view.component";

export const items: TreeViewProps["items"] = [
  {
    id: "item-1",
    label: "Item 1",
    children: [
      {
        id: "item-1.1",
        label: "Item 1.1",
        children: [{ id: "item-1.1.1", label: "Item 1.1.1", href: "#" }],
      },
      { id: "item-1.2", label: "Item 1.2", href: "#" },
    ],
  },
  { id: "item-2", label: "Item 2" },
];

export const TreeViewDefault = (props: Partial<TreeViewProps>) => (
  <>
    <h2 id="tree-view-heading">Files</h2>
    <TreeView
      id="root"
      ariaLabelledBy="tree-view-heading"
      items={items}
      {...props}
    />
  </>
);
