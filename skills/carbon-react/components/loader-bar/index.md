# LoaderBar

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

Use the LoaderBar component to let users know a task or loading data is still in progress.
Showing a LoaderBar helps the user to understand that they should wait, rather than reload the page or abandon a process.
In general, place a LoaderBar in the centre and middle of the page or container it relates to.

## Import

```javascript
import LoaderBar from "carbon-react/lib/components/loader-bar";
```

## Default bar

This example of the LoaderBar component demonstrates how it will appear as default.

<Canvas of={LoaderBarStories.DefaultStory} />

### Small bar

This is an example of a small LoaderBar component.

<Canvas of={LoaderBarStories.SmallStoryLoaderbar} />

### Large bar

This is an example of a large LoaderBar component.

<Canvas of={LoaderBarStories.LargeStoryLoaderbar} />

## Props

### LoaderBar

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
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
| size | "small" \| "medium" \| "large" \| undefined | No |  | Size of the LoaderBar. | "medium" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
