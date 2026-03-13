---
name: carbon-component-crumb
description: Carbon Crumb component props and usage examples.
---

# Crumb

## Import
`import { Crumb } from "carbon-react/lib/components/breadcrumbs";`

## Source
- Export: `./components/breadcrumbs`
- Props interface: `CrumbProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  |  |  | Child content to render in the link. |  |
| href | string \| undefined | No |  |  |  | An href for an anchor tag. |  |
| isCurrent | boolean \| undefined | No |  |  |  | This sets the Crumb to current, does not render Link |  |
| onClick | ((ev: React.MouseEvent<HTMLAnchorElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Function called when the mouse is clicked. |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLAnchorElement> \| React.KeyboardEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Function called when a key is pressed. |  |
| onMouseDown | ((ev: React.MouseEvent<HTMLAnchorElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Function called when a mouse down event triggers. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| bold | boolean \| undefined | No |  | Yes | The 'bold' prop in Crumb is deprecated and will soon be removed. | Sets the link style to bold |  |
| hasFocus | boolean \| undefined | No |  | Yes | Intended for internal use only |  |  |
| linkSize | "medium" \| "large" \| undefined | No |  | Yes | The 'linkSize' prop in Crumb is deprecated and will soon be removed. | Sets the correct link size |  |
| underline | "always" \| "hover" \| "never" \| undefined | No |  | Yes | The 'underline' prop in Crumb is deprecated and will soon be removed. | Specifies when the link underline should be displayed. |  |

## Examples
No Storybook examples found.