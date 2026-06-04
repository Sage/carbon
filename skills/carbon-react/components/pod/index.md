# Pod

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

<DeprecationWarning>
Pod has been deprecated, if this pattern is still needed please see our deprecation migration docs for a recommended alternative.
</DeprecationWarning>

## Import

```javascript
import Pod from "carbon-react/lib/components/pod";
```

## Related Components

- Editing a number of closely related inputs? [Try Fieldset](../fieldset/index.md).
- Filling in a broad series of inputs? [Try Form](../form/index.md).

## Designer's Notes

- Configure Pod and Fieldset components manually to customise the following:

- The onEdit property shows a standard edit icon, which can be used to show a fieldset. You can choose whether this icon appears inside or outside the pod, and whether it appears only on hover. You can also choose whether clicking only the icon triggers the onEdit property, or clicking anywhere on the pod.

- Choose from various visual options, including padding, borders, and primary, secondary, or tertiary appearance.

- Set the pod to flex to the width of its content, or take up the full width of its container.

## Examples

### Default

See: `examples/Default.md`

### with title and subtitle passed as nodes

A node can be passed as both the `title` and `subtitle` props, we recommend using `<Typography>`

See: `examples/WithTitleAndSubtitleNode.md`

### Custom height

See: `examples/WithCustomHeight.md`

### Even height

If you want to have the same height of the Pods based on the highest one, use `Grid` component to position `Pods`
and then set `height` prop to `100%` on each `Pod` so that it fills the entire height of `GridItem`

See: `examples/EvenHeightMultiplePods.md`

### With subtitle and footer

See: `examples/WithSubtitleAndFooter.md`

### Without border

See: `examples/WithoutBorder.md`

### With edit button

See: `examples/WithEditButton.md`

### With delete button

See: `examples/WithDeleteButton.md`

### Soft delete state

See: `examples/SoftDeleteState.md`

### With edit button and displayEditButtonOnHover

See: `examples/WithDisplayEditButtonOnHover.md`

### With edit button and editContentFullWidth

See: `examples/WithEditContentFullWidth.md`

### With internal edit button

See: `examples/WithInternalEditButton.md`

### With different variants

See: `examples/WithDifferentVariants.md`

### With different sizes

See: `examples/WithDifferentSizes.md`

### With different title alignments

See: `examples/WithDifferentTitleAlignments.md`

### Address pod

See: `examples/AddressExample.md`

## Props

### Pod

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| alignTitle | "left" \| "right" \| "center" \| undefined | No |  | Aligns the title to left, right or center |  |
| border | boolean \| undefined | No |  | Enables/disables the border around the pod. |  |
| children | React.ReactNode | No |  | Children elements |  |
| displayEditButtonOnHover | boolean \| undefined | No |  | Determines if the edit button should be hidden until the user hovers over the content |  |
| editContentFullWidth | boolean \| undefined | No |  | Determines if the editable pod content should be full width |  |
| footer | React.ReactNode | No |  | A component to render as a Pod footer |  |
| height | string \| number \| undefined | No |  | Sets Pod height, number is changed to pixels and string is passed as raw css value |  |
| internalEditButton | boolean \| undefined | No |  | Renders edit button inside the pod if it exists. |  |
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
| onDelete | ((ev: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>) => void) \| undefined | No |  | Supplies a delete action to the pod |  |
| onEdit | ((ev: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>) => void) \| undefined | No |  | Supplies an edit action to the pod |  |
| onUndo | ((ev: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>) => void) \| undefined | No |  | Supplies an undo action to the pod in soft delete state. |  |
| size | "small" \| "medium" \| "large" \| "extra-small" \| "extra-large" \| undefined | No |  | Determines the padding around the pod |  |
| softDelete | boolean \| undefined | No |  | Sets soft boolean delete state |  |
| subtitle | React.ReactNode | No |  | Optional subtitle for the pod |  |
| title | React.ReactNode | No |  | Title for the pod |  |
| triggerEditOnContent | boolean \| undefined | No |  | Determines if clicking the pod content calls the onEdit action |  |
| variant | "primary" \| "secondary" \| "tertiary" \| "transparent" \| "tile" \| undefined | No |  | Prop to apply a theme to the Pod |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
