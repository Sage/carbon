# Duelling Picklist

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

<DeprecationWarning>
Duelling Picklist has been deprecated, if this pattern is still needed please see our deprecation migration docs for a recommended alternative.
</DeprecationWarning>

## Import

```javascript
import {
  Picklist,
  PicklistItem,
  PicklistDivider,
  PicklistPlaceholder,
  DuellingPicklist,
} from "carbon-react/lib/components/duelling-picklist";
```

## PicklistItem Examples

### Add item

<Canvas of={DuellingPicklistStories.AddItem} />

### Remove item

<Canvas of={DuellingPicklistStories.RemoveItem} />

### Locked

<Canvas of={DuellingPicklistStories.Locked} />

### Custom tooltip message

<Canvas of={DuellingPicklistStories.CustomTooltipMessage} />

## Props:

### Picklist

<ArgTypes of={PickListStories} />

### PicklistItem

<ArgTypes of={PicklistItemStories} />

### DuellingPicklist

<ArgTypes of={DuellingPicklistStories} />

### PicklistDivider

`PicklistDivider` currently has no props for external use.

### PicklistPlaceholder

<ArgTypes of={PicklistPlaceholderStories} />

## Examples

### Default

Example of composed Duelling Picklist components with order preservation and search implemented.

See: `examples/Default.md`

### Grouped

Picklist items can be organised into selectable groups. Whole groups can be moved from one list to another at once, or group items can be moved individually.

See: `examples/Grouped.md`

### In Dialog

Same as above but as a children of `Dialog` component.

See: `examples/InDialog.md`
