---
name: carbon-component-loader-next
description: Carbon LoaderNext component props and usage examples.
---

# LoaderNext

## Import
`import Loader from "carbon-react/lib/components/loader/__next__";`

## Source
- Export: `./components/loader/__next__`
- Props interface: `LoaderProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| animationTime | number \| undefined | No |  | Specify a custom animation time for the loader |  |
| hasMotion | boolean \| undefined | No |  | If set to `false` all motion will be suspended | true |
| inverse | boolean \| undefined | No |  | Toggle the inverse color scheme |  |
| isError | boolean \| undefined | No |  | Enable the error state for the ring loader when it is tracked | false |
| isSuccess | boolean \| undefined | No |  | Enable the success state for the ring loader when it is tracked | false |
| isTracked | boolean \| undefined | No |  | If set to `true` the animation type will become tracked, this is used specifically for when wait times are predictable | false |
| loaderLabel | string \| undefined | No |  | Specify a label for the loader |  |
| loaderType | LOADER_TYPES \| undefined | No |  | The loader type can be specified in order to change the loader | "standalone" |
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
| showLabel | boolean \| undefined | No |  | Specify if the label should be visible or not | true |
| size | LOADER_SIZES \| undefined | No |  | The size prop allows a specific size to be set ranging from `extra-small` to `large` |  |
| variant | LOADER_VARIANTS \| undefined | No |  | Toggle between the different Loader variants |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
No Storybook examples found.