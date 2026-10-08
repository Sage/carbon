---
name: carbon-component-draggable-container
description: Carbon DraggableContainer component props and usage examples.
---

# DraggableContainer

## Import
`import { DraggableContainer } from "carbon-react/lib/components/draggable";`

## Source
- Export: `./components/draggable`
- Props interface: `DraggableContainerProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | The content of the component `<DraggableItem />` is required to make `Draggable` works |  |
| flexDirection | "row" \| "row-reverse" \| undefined | No |  | Defines the direction in which the draggable items contents are placed. Can be either "row" or "row-reverse". | "row" |
| getOrder | ((draggableItemIds?: (string \| number \| undefined)[], movedItemId?: string \| number \| undefined) => void) \| undefined | No |  | Callback fired when an item is successfully dropped. |  |
| m | SpacingProperty | No |  |  |  |
| margin | SpacingProperty | No |  |  |  |
| marginBottom | SpacingProperty | No |  |  |  |
| marginLeft | SpacingProperty | No |  |  |  |
| marginRight | SpacingProperty | No |  |  |  |
| marginTop | SpacingProperty | No |  |  |  |
| marginX | SpacingProperty | No |  |  |  |
| marginY | SpacingProperty | No |  |  |  |
| mb | SpacingProperty | No |  |  |  |
| ml | SpacingProperty | No |  |  |  |
| mr | SpacingProperty | No |  |  |  |
| mt | SpacingProperty | No |  |  |  |
| mx | SpacingProperty | No |  |  |  |
| my | SpacingProperty | No |  |  |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
No Storybook examples found.