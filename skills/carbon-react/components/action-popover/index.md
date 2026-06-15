# ActionPopover

ActionPopovers present a handy list of actions the user can perform on a whole table, a specific row within a table, or a tile.
Click the ellipsis icon to show actions the user can take on a specific table row, for example, emailing the invoice.

**Category:** Actions

## Quick Start

To use action popover, import `ActionPopover` alongside `ActionPopoverItem` and the other components that you would like to use in relation,
to the action popover.

```javascript
import {
  ActionPopover,
  ActionPopoverDivider,
  ActionPopoverItem,
  ActionPopoverMenu,
  ActionPopoverMenuButton,
  type ActionPopoverHandle,
} from "carbon-react/lib/components/action-popover";
```

## Related Components

- Data entry rather than an action? Try Select.
- Only a single action? [Try Button](../button/index.md).
- Doesn’t relate to a single table row or tile? [Try SplitButton](../split-button/index.md) or [MultiActionButton](../multi-action-button/index.md).

## Examples

### Default

Story showing most of the functionality of the action popover and what can be achieved by using it

See: `examples/Default.md`

### With icons

Use the `icon` prop on `ActionPopoverItem` to display an icon next to each menu label. Items are separated with an `ActionPopoverDivider`.

See: `examples/Icons.md`

### With disabled item

ActionPopoverItem's can be disabled. These items are not clickable and can not be navigated to with the keyboard.

See: `examples/DisabledItems.md`

### With menu right aligned

It is possible to align the Menu to the right of the MenuButton by passing the `rightAlignMenu` to ActionPopover

See: `examples/MenuRightAligned.md`

### With item content aligned to right

Use the `horizontalAlignment="right"` prop on `ActionPopover` to align both the icon and label text to the right side of each menu item.

See: `examples/ContentAlignedRight.md`

### With no icons

Menu items can also be displayed without icons.

See: `examples/NoIcons.md`

### With custom menu button

It is possible to use the `renderButton` prop to override the default button used to trigger the opening and closing of
ActionPopoverMenu.

The `renderButton` prop is a function that allows consumers to pass `tabIndex`, `data-element` and the provided aria attribute props to
`ActionPopoverMenuButton` or a custom button component.

A default `aria-label` will be provided to the button, but this can be overridden by passing the `ariaLabel` prop to the
`ActionPopover` or making use of the `actionPopover.ariaLabel` translation key. Please ensure to set this to `undefined` if your
button contains visible text, as this will prevent screen readers from reading the visible label.

See the example below for an example of how to use the `renderButton` prop:

See: `examples/CustomMenuButton.md`

### With submenu

A menu item can be passed a sub-menu to add further sub-actions if needed. items with sub-menus will display an chevron
icons pointing in the direction that the sub-menu will open; by default it will open to the left.

Hovering the mouse cursor over an item will open the sub-menu if it has one and moving the mouse cursor away will
close it. No action is dispatched on click of the item and the sub-menu is opened by mouse enter and closed on mouse
leave.

See: `examples/Submenu.md`

### With submenu positioned to right

Submenu can be positioned on either the left of the right with the use of the `submenuPosition` prop.

See: `examples/SubmenuPositionedRight.md`

### With disabled submenu

A sub-menu will not open if the item is in a disabled state.

See: `examples/DisabledSubmenu.md`

### With menu opening above

The menu can also be rendered above the button control by setting using `placement="top"`.

See: `examples/MenuOpeningAbove.md`

### Keyboard navigation

ActionPopover and ActionPopoverItem have extensive keyboard support. It is possible to open the menu when the
ActionPopover is focused: pressing either the "enter" or "down" key will open the menu and focus the first item;
pressing the "up" key when the button is focused will open the menu and focus the last element.

Once the menu is open, it is possible to navigate the items using the "up" and "down" arrow keys. Alpha keys can also
be used as shortcuts to navigate the items: pressing a-z selects the next item in the list starting with that letter,
wrapping around to the start if required. Pressing an alpha key which doesn't match any items in the menu list will
result leave the focus on the current item.

Pressing the "enter" key will trigger the action associated with the currently focused item. Pressing either the "esc"
or "tab" key will close the menu with no action being triggered and focus the next focusable element. Pressing
"shift + tab" will close the menu and focus the previously focused element.

See: `examples/KeyboardNavigation.md`

### Keyboard navigation left aligned submenu

Sub-menus can be accessed via the keyboard as well, when the sub-menu is left aligned it can be opened by navigating to
the parent item and pressing the "left" key. The same accessible shortcuts described above can then be used to navigate
the sub-menu. Pressing the "right" key will return focus back to the main menu and close the sub-menu without
triggering an action.

See: `examples/KeyboardNavigationLeftAlignedSubmenu.md`

### Keyboard navigation right aligned submenu

When sub-menus aligns to the right hand side, the key shortcuts are switched: pressing the "right" key whilst focus
is on a item will open a sub-menu if it has one and pressing the "left" key will close it.

See: `examples/KeyboardNavigationRightAlignedSubmenu.md`

### With additional options

When a row has many actions, group the primary actions at the top and use a dedicated item (separated by an `ActionPopoverDivider`) for less frequently used options — in this example, "Manage Devices".

See: `examples/AdditionalOptions.md`

### with download button

Use the `download` and `href` props on `ActionPopoverItem` to trigger a browser file download when the item is clicked. A disabled download item is also included to show that disabled state prevents the download.

See: `examples/DownloadButton.md`

### in overflow hidden container

`ActionPopover` menus renders even when placed inside a container with `overflow: hidden` (here an `Accordion`). The popover escapes the overflow boundary so the menu is never clipped.

See: `examples/InOverflowHiddenContainer.md`

### In FlatTable with highlightable rows

`ActionPopover` placed in the last cell of each `FlatTableRow`, using `placement="top"` so the menu opens upward. The `onOpen` callback is wired to the row's `highlighted` prop so opening the popover also highlights its parent row.

See: `examples/InFlatTable.md`

### Action opening a Modal

Triggers a `Confirm` dialog from an `ActionPopoverItem`. Uses `renderButton` with visible text ("Open Actions"), which requires setting `aria-label={undefined}` on the button to avoid duplicate screen-reader labels.

See: `examples/OpeningAModal.md`

### Focusing the Menu Button programmatically

The component exposes a `focusButton` function that supports programmatically focusing the menu button which can be called
by passing a `ref` to the component.

See: `examples/FocusButtonProgrammatically.md`

## Props

### ActionPopover Props

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Children for popover component |  |
| horizontalAlignment | Alignment \| undefined | No |  | Horizontal alignment of menu items content |  |
| id | string \| undefined | No |  | Unique ID |  |
| onClose | (() => void) \| undefined | No |  | Callback to be called on menu close |  |
| onOpen | (() => void) \| undefined | No |  | Callback to be called on menu open |  |
| placement | "bottom" \| "top" \| undefined | No |  | Set whether the menu should open above or below the button |  |
| renderButton | ((buttonProps: RenderButtonProps) => React.ReactNode) \| undefined | No |  | Render a custom menu button to override default ellipsis icon |  |
| rightAlignMenu | boolean \| undefined | No |  | Boolean to control whether menu should align to right |  |
| submenuPosition | Alignment \| undefined | No |  | Sets submenu position |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-describedby | string \| undefined | No |  | Prop to specify an aria-describedby for the component |  |
| aria-label | string \| undefined | No |  | Prop to specify an aria-label for the component |  |
| aria-labelledby | string \| undefined | No |  | Prop to specify an aria-labelledby for the component |  |

### ActionPopoverMenu Props

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Children for the menu |  |
| focusIndex | number \| undefined | No |  |  |  |
| isOpen | boolean \| undefined | No |  | Flag to indicate whether a menu should open |  |
| menuID | string \| undefined | No |  | A unique ID for the menu |  |
| parentID | string \| undefined | No |  | Unique ID for the menu's parent |  |
| placement | "bottom" \| "top" \| undefined | No |  | Set whether the menu should open above or below the button |  |
| role | string \| undefined | No |  |  |  |
| setFocusIndex | ((args: number) => void) \| undefined | No |  |  |  |
| setOpen | ((args: boolean) => void) \| undefined | No |  | Callback to set the isOpen flag |  |
| style | { left: string \| number; top?: string; bottom?: string; right: string \| number; } \| undefined | No |  |  |  |
| data-element | string \| undefined | No |  |  |  |

### ActionPopoverMenuButton Props

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| ariaAttributes | ActionPopoverMenuButtonAria | Yes |  | ARIA attributes to be applied to the button HTML element |  |
| tabIndex | number | Yes |  | Overrides the default tabindex of the component |  |
| data-element | string | Yes |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| buttonType | ButtonTypes \| undefined | No |  | Variant of the menu button |  |
| children | string \| undefined | No |  | Content of the button |  |
| iconPosition | ButtonIconPosition \| undefined | No |  | Defines an Icon position related to the children: "before" \| "after" |  |
| iconType | IconType \| undefined | No |  | Defines an Icon type within the button |  |
| size | SizeOptions \| undefined | No |  | Assigns a size to the button: "small" \| "medium" \| "large" |  |

### ActionPopoverItem Props

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | string | Yes |  | The text label to display for this Item |  |
| currentSubmenuPosition | Alignment \| undefined | No |  |  |  |
| disabled | boolean \| undefined | No |  | Flag to indicate if item is disabled | false |
| download | boolean \| undefined | No |  | allows to provide download prop that works dependent with href |  |
| focusItem | boolean \| undefined | No |  |  |  |
| href | string \| undefined | No |  | allows to provide href prop |  |
| icon | IconType \| undefined | No |  | The name of the icon to display next to the label |  |
| onClick | ((ev: React.MouseEvent<HTMLButtonElement> \| React.KeyboardEvent<HTMLButtonElement>) => void) \| undefined | No |  | Callback to run when item is clicked |  |
| setCurrentSubmenuPosition | ((value: Alignment) => void) \| undefined | No |  |  |  |
| submenu | React.ReactNode | No |  | Submenu component for item |  |

## Ref methods

`ActionPopover`'s forwarded ref exposes the following imperative methods:

| Method Name     | Description                                         |
| --------------- | --------------------------------------------------- |
| `focusButton()` | Programmatically focuses the action popover button. |
