# ProgressTracker

Use the `ProgressTracker` component to let users know a task or loading data is still in progress.
Showing a `ProgressTracker` helps the user to understand that they should wait, rather than reload the page or abandon a process.
In general, place a `ProgressTracker` in the centre and middle of the page or container it relates to.

**Category:** Feedback

## Quick Start

```javascript
import ProgressTracker from "carbon-react/lib/components/progress-tracker";
```

## Examples

### Default

By default, the `ProgressTracker` component will display a progress bar with a percentage value out of 100% as a label.

See: `examples/Default.md`

### Small bar size

This is an example of a small `ProgressTracker` component.

See: `examples/SizeSmall.md`

### Large bar size

This is an example of a large `ProgressTracker` component.

See: `examples/SizeLarge.md`

### Custom bar length

By default, the length of the component is "256px". However, you can use the `length` prop to override this with any valid css string.

See: `examples/CustomBarLength.md`

### Color variants

Depending on the progress or state of the component, the colour of the progress bar is automatically updated.

See: `examples/ColorVariants.md`

### Custom label values

To set your own labels, you can set the `currentProgressLabel` and `maxProgressLabel` props. 

Note that the preposition between the current and max labels will be 'of' by default, but you can override this by setting the `customValuePreposition` prop or making use of the `of` translation key.

You can also use the `description` prop to provide additional context to the user.

See: `examples/CustomLabelValues.md`

### Label position

By default, the position of the label is above the bar. To override this you can set the `labelsPosition` prop to `"bottom"` or `"left"`.

See: `examples/LabelsPositionBottom.md`

When positioning the labels to the `"left"`, you can use the `labelWidth` prop to ensure consistent label lengths.
This can also facilitate comparison between multiple `ProgressTracker` components.

See: `examples/LabelPositionLeft.md`

## Props

### ProgressTracker

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| currentProgressLabel | string \| undefined | No |  | Value to display as current progress. |  |
| customValuePreposition | string \| undefined | No |  | Value of the preposition defined between Value1 and Value2 on the label. |  |
| description | string \| undefined | No |  | Value to add a description to the label |  |
| error | boolean \| undefined | No |  | Flag to control error state. | false |
| labelsPosition | "left" \| "bottom" \| "top" \| undefined | No |  | The position the value label are rendered in. | "top" |
| labelWidth | string \| undefined | No |  | Label width when position is "left" |  |
| length | string \| undefined | No |  | Length of the component, any valid css string. | "256px" |
| maxProgressLabel | string \| undefined | No |  | Value to display as the maximum progress limit. |  |
| progress | number \| undefined | No |  | Current progress (percentage). | 0 |
| size | "small" \| "medium" \| "large" \| undefined | No |  | Size of the progress bar. | "medium" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
