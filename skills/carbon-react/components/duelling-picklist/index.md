# Duelling Picklist

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

A deprecated two-panel selection component. Items are moved between a "source" and a "destination" list using add/remove controls. Supports search, grouped items and drag-and-drop-free keyboard navigation.

**Category:** Inputs

## Quick Start

To create fully functioning `Duelling Picklist` component you can compose it yourself out of provided `Carbon` components.

```javascript
import {
  Picklist,
  PicklistItem,
  PicklistDivider,
  PicklistPlaceholder,
  DuellingPicklist,
} from "carbon-react/lib/components/duelling-picklist";
```

- `DuellingPicklist` is meant to be a container composed of two `Picklist` children and a `PicklistDivider` between them.

- It also accepts `leftLabel` and `rightLabel` props of type string which will be rendered above the corresponding `PickList`.

- Similarly to labels, `leftControls` and `rightControls` props accept a node to be rendered between the labels and the `Picklist`.
  This is a suitable place for components like `Search` or `Filter` used to manipulate displayed data.
  To display an overlay over whole `DuellingPicklist` content pass a `disabled` prop set to true.

- `Picklist` wraps a list of `PicklistItem`, applies enter transition animations and provides an extended keyboard navigation (up/down/home/end keys).

- `PicklistDivider` as name states is a component meant to visually divide two `PickList`. It is optional, the spacing between the two picklists will be equal with or without it.

- `PicklistItem` is a component meant to visually represent one of the iterable entities. It can be of a type `add` or `remove`.
  It invokes passed `onChange` method with passed `item` prop as an argument when either `add` or `remove` icon is clicked or `space` or `enter` pressed when whole `PicklistItem` is focused.

- `PicklistPlaceholder` can be used to display the content of its `text` prop. It is meant to be passed as a `placeholder` prop in `Picklist` component.

## Examples

### Default

Example of composed Duelling Picklist components with order preservation and search implemented.

See: `examples/Default.md`

### Alternative search placement

The `Search` component can be placed outside of the picklist controls and positioned anywhere as required. This example also shows the option of not using a `PicklistDivider`.

<Canvas
  name="alternative search placement"
  of={DuellingPicklistStories.AlternativeSearch}
/>

### Grouped

Picklist items can be organised into selectable groups. Whole groups can be moved from one list to another at once, or group items can be moved individually.

See: `examples/Grouped.md`

### In Dialog

Same `DuellingPicklist` composition rendered as children of a `Dialog` component.

See: `examples/InDialog.md`

### PicklistItem Examples

#### Add item

A `PicklistItem` with `type="add"` renders a ⊕ icon; clicking it (or pressing Space/Enter) calls `onChange` with the item data to move it to the destination list.

See: `examples/AddItem.md`

#### Remove item

A `PicklistItem` with `type="remove"` renders a ⊖ icon; clicking it calls `onChange` to move the item back to the source list.

See: `examples/RemoveItem.md`

#### Locked

A `PicklistItem` with the `locked` prop cannot be moved; the add/remove icon is replaced by a lock icon.

See: `examples/Locked.md`

#### Custom tooltip message

Override the default tooltip text on the add/remove icon using the `tooltipMessage` prop.

See: `examples/CustomTooltipMessage.md`

## Props

### Picklist

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | List of PicklistItem elements |  |
| disabled | boolean \| undefined | No |  | Indicate if component is disabled |  |
| index | number \| undefined | No |  |  |  |
| placeholder | React.ReactNode | No |  | Placeholder to be rendered when list is empty |  |

### PicklistItem

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Item content |  |
| item | Item | Yes |  | Value passed to the onChange handler - can be a string, a number or an object |  |
| onChange | (item: Item) => void | Yes |  | Handler invoked when add/remove button is clicked or when space/enter is pressed on the whole item |  |
| type | "add" \| "remove" | Yes | add \| remove | Define if item is of type add or remove |  |
| groupIndex | number \| undefined | No |  |  |  |
| index | number \| undefined | No |  |  |  |
| isLastGroup | boolean \| undefined | No |  |  |  |
| isLastItem | boolean \| undefined | No |  |  |  |
| listIndex | number \| undefined | No |  |  |  |
| locked | boolean \| undefined | No |  | Disable the item |  |
| tooltipMessage | string \| undefined | No |  | Tooltip message for the locked icon (only present when locked prop is true) |  |

### DuellingPicklist

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Content of the component, should contain two Picklist children and a PicklistDivider |  |
| disabled | boolean \| undefined | No |  | Indicate if component is disabled |  |
| leftControls | React.ReactNode | No |  | Place for components like Search or Filter placed above the left list |  |
| leftLabel | string \| undefined | No |  | Left list label |  |
| rightControls | React.ReactNode | No |  | Place for components like Search or Filter placed above the right list |  |
| rightLabel | string \| undefined | No |  | Right list label |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### PicklistPlaceholder

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| text | string | Yes |  | Text to be displayed when list is empty |  |
