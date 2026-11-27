---
name: carbon-component-tree-view
description: Carbon TreeView component props and usage examples.
---

# TreeView

## Import
`import TreeView from "carbon-react/lib/components/tree-view/tree-view.component";`

## Source
- Export: `./components/tree-view/tree-view.component`
- Props interface: `TreeViewProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| id | string | Yes |  | The unique identifier for the tree view. |  |
| items | TreeViewItemProps[] | Yes |  | The tree view items to be rendered. |  |
| ariaLabelledBy | string \| undefined | No |  | The ARIA label that describes the tree view. |  |

## Examples
### Default

**Render**

```tsx
() => {
  const items: TreeViewItemProps[] = [
    {
      id: "item-1",
      label: "Item 1",
      children: [
        {
          id: "item-1.1",
          label: "Item 1.1",
          children: [
            {
              id: "item-1.1.1",
              label: "Item 1.1.1",
              href: "#",
            },
            {
              id: "item-1.1.2",
              label: "Item 1.1.2",
            },
          ],
        },
        { id: "item-1.2", label: "Item 1.2" },
        {
          id: "item-1.3",
          label: "Item 1.3",
          href: "#",
        },
      ],
    },
    {
      id: "item-2",
      label: "Item 2",
    },
  ];

  return (
    <Box p="4px">
      <TreeView id="root" items={items} />
    </Box>
  );
}
```


### MDX Example 1

**Args**

```tsx
import { TreeView, TreeViewItem } from "carbon-react/lib/components/tree-view";
```

