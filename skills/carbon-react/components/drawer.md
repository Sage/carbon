---
name: carbon-component-drawer
description: Carbon Drawer component props and usage examples.
---

# Drawer

Displays sidebar content alongside a main content area.

## Pitfalls

- Use title to label the sidebar automatically, or provide sidebarAriaLabel when no title is rendered.
- Do not switch expanded between controlled and uncontrolled usage during the component's lifetime.

## Import
`import Drawer from "carbon-react/lib/components/drawer";`

## Source
- Export: `./components/drawer`
- Props interface: `DrawerProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  |  |  | Main content to display |  |
| backgroundColor | string \| undefined | No |  |  |  | Sets color of sidebar's background |  |
| expanded | boolean \| undefined | No |  |  |  | Sets the expansion state of the Drawer if component is meant to be used as controlled |  |
| expandedWidth | string \| undefined | No |  |  |  | The width of the expanded sidebar | "30vw" |
| footer | React.ReactNode | No |  |  |  | Content to display inside of a footer |  |
| height | string \| undefined | No |  |  |  | Sets the height of the component | "100%" |
| onChange | ((e: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>, isExpanded: boolean) => void) \| undefined | No |  |  |  | Callback fired when expansion state changes, onChange(event: object, isExpanded: boolean) |  |
| sidebar | React.ReactNode | No |  |  |  | Drawer sidebar content |  |
| sidebarAriaLabel | string \| undefined | No |  |  |  | Specify an aria-label for the Drawer sidebar |  |
| stickyFooter | boolean \| undefined | No |  |  |  | Makes the footer of the drawer sticky. Footer prop must also be set. |  |
| stickyHeader | boolean \| undefined | No |  |  |  | Makes the header of the drawer sticky. Title prop must also be set. |  |
| title | React.ReactNode | No |  |  |  | Sets the heading of the drawer |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  |  |  | Specify an aria-label for the Drawer component |  |
| animationDuration | string \| undefined | No |  | Yes | This prop will soon be removed. | Duration of a animation | "400ms" |
| defaultExpanded | boolean \| undefined | No |  | Yes | This prop will soon be removed, please use the `expanded` prop instead. | Set the default state of expansion of the Drawer if component is meant to be used as uncontrolled |  |
| showControls | boolean \| undefined | No |  | Yes | This prop will soon be removed, this component is now intended to be non-dismissible. | Enables expand/collapse button that controls drawer |  |

## Examples
Load only the example needed for the current task; playground stories are intentionally omitted.

- [Controlled](../examples/drawer/controlled.md) — Control sidebar visibility with expanded while keeping the sidebar labelled.