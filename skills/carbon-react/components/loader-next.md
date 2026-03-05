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
| inverse | boolean \| undefined | No |  | Toggle the inverse color scheme | false |
| isError | boolean \| undefined | No |  | Enable the error state for the ring loader when it is tracked | false |
| isSuccess | boolean \| undefined | No |  | Enable the success state for the ring loader when it is tracked | false |
| isTracked | boolean \| undefined | No |  | If set to `true` the animation type will become tracked, this is used specifically for when wait times are predictable | false |
| loaderLabel | string \| undefined | No |  | Specify a label for the loader |  |
| loaderType | LOADER_TYPES \| undefined | No |  | The loader type can be specified in order to change the loader | "standalone" |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| showLabel | boolean \| undefined | No |  | Specify if the label should be visible or not | true |
| size | LOADER_SIZES \| undefined | No |  | The size prop allows a specific size to be set ranging from `extra-small` to `large` |  |
| variant | LOADER_VARIANTS \| undefined | No |  | Toggle between the different Loader variants |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
No Storybook examples found.