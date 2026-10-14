---
name: carbon-component-preview
description: Carbon Preview component props and usage examples.
---

# Preview

## Import
`import Preview from "carbon-react/lib/components/preview";`

## Source
- Export: `./components/preview`
- Props interface: `PreviewProps`
- Deprecated: Yes
- Deprecation reason: Use `Skeleton` instead.

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Children content to render in the component. |  |
| disableAnimation | boolean \| undefined | No |  | Removes the animation. Also disabled when the user prefers reduced motion. |  |
| height | (string & {}) \| SkeletonHeight \| undefined | No |  | Sets a preset or custom pixel/CSS height. Presets: h1 (38px), h2 (30px), h3 (26px), h4 (23px), paragraph (21px), button (40px). |  |
| lines | number \| undefined | No |  | The number of placeholder shapes to render. |  |
| loading | boolean \| undefined | No |  | Sets loading state. |  |
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
| shape | SkeletonShape \| undefined | No |  | Sets the Skeleton shape. Legacy values remain supported for Preview compatibility. |  |
| width | string \| undefined | No |  | Sets the width of the Skeleton. Defaults to 100% (except circles, which match their height). |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
No Storybook examples found.