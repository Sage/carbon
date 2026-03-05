---
name: carbon-component-portal
description: Carbon Portal component props and usage examples.
---

# Portal

## Import
`import Portal from "carbon-react/lib/components/portal";`

## Source
- Export: `./components/portal`
- Props interface: `PortalProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | The content of the portal. |  |
| className | string \| undefined | No |  |  |  |
| id | string \| undefined | No |  | Id attribute attached to portal container. |  |
| inertOptOut | boolean \| undefined | No |  | A flag to ensure the portal content will remain interactive with by both mouse users and screenreader users, even if a modal is opened outside of or on top of the portal. To be used with caution. |  |
| onReposition | (() => void) \| undefined | No |  | Callback function triggered when parent element is scrolled or window resized. |  |

## Examples
### Default

**Args**

```tsx
{}
```


### MDX Example 1

**Args**

```tsx
## Usage

This example demonstrates how to render a Portal with a Box component as a child that uses a design-token for the background color.
```

