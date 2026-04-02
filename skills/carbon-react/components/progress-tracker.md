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
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| currentProgressLabel | string \| undefined | No |  | Value to display as current progress. |  |
| customValuePreposition | string \| undefined | No |  | Value of the preposition defined between Value1 and Value2 on the label. |  |
| description | string \| undefined | No |  | Value to add a description to the label |  |
| error | boolean \| undefined | No |  | Flag to control error state. | false |
| labelsPosition | "left" \| "bottom" \| "top" \| undefined | No |  | The position the value label are rendered in. | "top" |
| labelWidth | string \| undefined | No |  | Label width when position is "left" |  |
| length | string \| undefined | No |  | Length of the component, any valid css string. | "256px" |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| maxProgressLabel | string \| undefined | No |  | Value to display as the maximum progress limit. |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| progress | number \| undefined | No |  | Current progress (percentage). | 0 |
| size | "large" \| "small" \| "medium" \| undefined | No |  | Size of the progress bar. | "medium" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Color Variants

**Render**

```tsx
() => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <ProgressTracker progress={15} currentProgressLabel="15%" />
      <ProgressTracker mt={2} progress={50} currentProgressLabel="50%" />
      <ProgressTracker mt={2} progress={100} currentProgressLabel="100%" />
      <ProgressTracker
        mt={2}
        progress={100}
        error
        currentProgressLabel="error"
      />
    </Box>
  );
}
```


### Custom Bar Length

**Render**

```tsx
() => {
  return (
    <Box display="flex" justifyContent="space-around">
      <ProgressTracker progress={50} length="150px" />
    </Box>
  );
}
```


### Custom Label Values

**Render**

```tsx
() => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <ProgressTracker
        progress={50}
        currentProgressLabel="$50"
        maxProgressLabel="$200"
      />
      <ProgressTracker
        mt={2}
        progress={70}
        currentProgressLabel="Step 3"
        maxProgressLabel="5"
        description="Adding VAT"
      />
      <ProgressTracker mt={2} progress={100} currentProgressLabel="$200" />
      <ProgressTracker
        mt={2}
        progress={100}
        error
        currentProgressLabel="error"
      />
    </Box>
  );
}
```


### Default

**Render**

```tsx
() => {
  return (
    <Box display="flex" justifyContent="space-around">
      <ProgressTracker progress={50} />
    </Box>
  );
}
```


### Label Position Bottom

**Render**

```tsx
() => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <ProgressTracker
        mt={2}
        labelsPosition="bottom"
        progress={15}
        currentProgressLabel="15%"
      />
      <ProgressTracker
        mt={2}
        labelsPosition="bottom"
        progress={50}
        currentProgressLabel="50%"
      />
      <ProgressTracker
        mt={2}
        labelsPosition="bottom"
        progress={100}
        currentProgressLabel="100%"
      />
      <ProgressTracker
        mt={2}
        labelsPosition="bottom"
        progress={100}
        error
        currentProgressLabel="error"
      />
    </Box>
  );
}
```


### Label Position Left

**Render**

```tsx
() => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <ProgressTracker
        mt={2}
        labelsPosition="left"
        progress={15}
        currentProgressLabel="15%"
        labelWidth="40px"
      />
      <ProgressTracker
        mt={2}
        labelsPosition="left"
        progress={50}
        currentProgressLabel="50%"
        labelWidth="40px"
      />
      <ProgressTracker
        mt={2}
        labelsPosition="left"
        progress={100}
        currentProgressLabel="100%"
        labelWidth="40px"
      />
      <ProgressTracker
        mt={2}
        labelsPosition="left"
        progress={100}
        error
        currentProgressLabel="error"
        labelWidth="40px"
      />
    </Box>
  );
}
```


### Size - Large

**Render**

```tsx
() => {
  return (
    <Box display="flex" justifyContent="space-around">
      <ProgressTracker size="large" progress={50} />
    </Box>
  );
}
```


### Size - Small

**Render**

```tsx
() => {
  return (
    <Box display="flex" justifyContent="space-around">
      <ProgressTracker size="small" progress={50} />
    </Box>
  );
}
```

