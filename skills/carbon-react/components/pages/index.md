# Pages

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

<DeprecationWarning>
Pages has been deprecated, if this pattern is still needed please see our deprecation migration docs for a recommended alternative.
</DeprecationWarning>

## Import

```javascript
import Pages, { Page } from "carbon-react/lib/components/pages";
```

## Inside Dialog

<Canvas of={PagesStories.InsideDialogFullScreen} />

### Overriding content padding

<Canvas of={PagesStories.OverridingContentPadding} />

## Examples

### Default

See: `examples/Default.md`

### Pages with Initial Page Index

See: `examples/WithInitialPageIndex.md`

## Props

### Props for Pages

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Individual Page components |  |
| initialpageIndex | string \| number \| undefined | No |  | The selected tab on page load | 0 |
| pageIndex | string \| number \| undefined | No |  | The current page's index |  |
| theme | Partial<ThemeObject> \| undefined | No |  |  |  |
| transition | string \| undefined | No |  | Controls which transition to use (fade or slide). | "slide" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### Props for Page

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | This component supports children. |  |
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| role | string \| undefined | No |  | The ARIA role to be applied to the component |  |
| title | React.ReactNode | No |  | The title for the page, normally a Heading component. |  |
| transitionName | (() => string) \| undefined | No |  |  |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
