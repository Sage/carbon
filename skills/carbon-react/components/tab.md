---
name: carbon-component-tab
description: Carbon Tab component props and usage examples.
---

# Tab

## Import
`import { Tab } from "carbon-react/lib/components/tabs";`

## Source
- Export: `./components/tabs`
- Props interface: `TabProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| controls | string | Yes |  |  |  | The tab panel that this tab controls |  |
| id | string | Yes |  |  |  | The ID of the tab |  |
| label | React.ReactNode | Yes |  |  |  | The label shown on the tab |  |
| ariaLabelledby | string \| undefined | No |  |  |  |  |  |
| children | React.ReactNode | No |  |  |  | The child elements of Tab component. |  |
| error | string \| boolean \| undefined | No |  |  |  | The error state of the tab |  |
| hasCustomLayout | boolean \| undefined | No |  |  |  |  |  |
| headerWidth | string \| undefined | No |  |  |  |  |  |
| isTabSelected | boolean \| undefined | No |  |  |  |  |  |
| leftSlot | React.ReactNode | No |  |  |  | The item shown to the left of the label |  |
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top and bottom |  |
| rightSlot | React.ReactNode | No |  |  |  | The item shown to the right of the label |  |
| role | string \| undefined | No |  |  |  |  |  |
| titleProps | { "data-role"?: string; } \| undefined | No |  |  |  | Additional props to be passed to the Tab's corresponding title. |  |
| validationStatusOverride | { error?: boolean; warning?: boolean; info?: boolean; } \| undefined | No |  |  |  |  |  |
| warning | string \| boolean \| undefined | No |  |  |  | The warning state of the tab |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| customLayout | React.ReactNode | No |  | Yes | Support for customLayout will be removed in a future release, it is recommended to use the `label` prop instead. | Overrides default layout with a one defined in this prop |  |
| errorMessage | string \| undefined | No |  | Yes | Message displayed when Tab has error The legacy validation pattern is being removed in a future release. |  |  |
| href | string \| undefined | No |  | Yes | Using tabs as links is inaccessible; this prop will be deprecated in a future release. | Allows Tab to be a link |  |
| info | string \| boolean \| undefined | No |  | Yes | to be removed when legacy `Tabs` and `Tab` are removed | The info state of the tab |  |
| infoMessage | string \| undefined | No |  | Yes | Message displayed when Tab has info The legacy validation pattern is being removed in a future release. |  |  |
| position | "left" \| "top" \| undefined | No |  | Yes | Support will be removed in a future release. | The position of the Tab. |  |
| siblings | React.ReactNode | No |  | Yes | Support for siblings will be removed in a future release. It is recommended to use `label` prop to compose what you want. | Additional content to display with title |  |
| tabId | string \| undefined | No |  | Yes | Support will be removed in a future release, it is recommended to use `id` instead. | A unique ID to identify this specific tab. |  |
| title | string \| undefined | No |  | Yes | Support will be removed in a future release, it is recommended to use `label` prop instead. | The title of the Tab. |  |
| titlePosition | "before" \| "after" \| undefined | No |  | Yes | Support for titlePosition will be removed in a future release. It is recommended to use `label` prop to compose what you want. | Position title before or after siblings |  |
| warningMessage | string \| undefined | No |  | Yes | Message displayed when Tab has warning The legacy validation pattern is being removed in a future release. |  |  |

## Examples
### Default

**Args**

```tsx
{}
```

