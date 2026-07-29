---
name: carbon-component-progress-tracker
description: Carbon ProgressTracker component props and usage examples.
---

# ProgressTracker

## Import
`import ProgressTracker from "carbon-react/lib/components/progress-tracker";`

## Source
- Export: `./components/progress-tracker`
- Props interface: `ProgressTrackerProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| currentProgressLabel | string \| undefined | No |  |  |  | Value to display as current progress. |  |
| customValuePreposition | string \| undefined | No |  |  |  | Value of the preposition defined between Value1 and Value2 on the label. |  |
| description | string \| undefined | No |  |  |  | Value to add a description to the label |  |
| labelsPosition | "left" \| "bottom" \| "top" \| undefined | No |  |  |  | The position the value label are rendered in. | "top" |
| labelWidth | string \| undefined | No |  |  |  | Label width when position is "left" |  |
| length | string \| undefined | No |  |  |  | Length of the component, any valid css string. | "256px" |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| maxProgressLabel | string \| undefined | No |  |  |  | Value to display as the maximum progress limit. |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| progress | number \| undefined | No |  |  |  | Current progress (percentage). | 0 |
| size | "small" \| "medium" \| "large" \| undefined | No |  |  |  | Size of the progress bar. | "medium" |
| variant | TrackerVariants \| undefined | No |  |  |  | Variant of the progress bar | "neutral" |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| error | boolean \| undefined | No |  | Yes | Please use variant="error" instead. | Flag to control error state. |  |

## Examples
### Default

**Args**

```tsx
{
    progress: 50,
  }
```

**Render**

```tsx
(args) => <ProgressTracker {...args} />
```


### WithDescription

**Args**

```tsx
{
    ...Default.args,
    description: "Description",
  }
```


### CustomLabelValues

**Args**

```tsx
{
    currentProgressLabel: "£75",
    maxProgressLabel: "£200",
    customValuePreposition: "out of",
    progress: Math.round((75 / 200) * 100),
  }
```

**Render**

```tsx
(args) => <ProgressTracker {...args} />
```


### CustomLength

**Args**

```tsx
{
    ...Default.args,
    length: "500px",
  }
```


### LabelsPosition

**Args**

```tsx
{
    progress: 50,
    currentProgressLabel: "50%",
  }
```

**Render**

```tsx
(args) => (
    <>
      <ProgressTracker labelsPosition="top" description="Top" {...args} />
      <ProgressTracker labelsPosition="bottom" description="Bottom" {...args} />
      <ProgressTracker labelsPosition="left" description="Left" {...args} />
    </>
  )
```


### Sizes

**Args**

```tsx
{
    progress: 50,
  }
```

**Render**

```tsx
(args) => (
    <>
      <ProgressTracker size="small" description="Small" {...args} />
      <ProgressTracker size="medium" description="Medium" {...args} />
      <ProgressTracker size="large" description="Large" {...args} />
    </>
  )
```


### Variants

**Args**

```tsx
{
    progress: 50,
  }
```

**Render**

```tsx
(args) => (
    <>
      <ProgressTracker variant="neutral" description="Neutral" {...args} />
      <ProgressTracker variant="warning" description="Warning" {...args} />
      <ProgressTracker
        variant="information"
        description="Information"
        {...args}
      />
      <ProgressTracker variant="error" description="Error" {...args} />
      <ProgressTracker variant="success" description="Success" {...args} />
    </>
  )
```

