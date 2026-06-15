# Pod

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

A deprecated card-like container that groups related content under an optional title, subtitle, and footer. Supports edit and delete actions, soft-delete state, configurable padding, borders, and primary/secondary/tertiary visual variants.

**Category:** UI presentation

## Quick Start

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

A basic `Pod` with a title and body content. Padding and border are applied by default.

See: `examples/Default.md`

### with title and subtitle passed as nodes

A node can be passed as both the `title` and `subtitle` props, we recommend using `<Typography>`

See: `examples/WithTitleAndSubtitleNode.md`

### Custom height

Use the `height` prop to fix the pod to a specific height.

See: `examples/WithCustomHeight.md`

### Even height

If you want to have the same height of the Pods based on the highest one, use `Grid` component to position `Pods`
and then set `height` prop to `100%` on each `Pod` so that it fills the entire height of `GridItem`

See: `examples/EvenHeightMultiplePods.md`

### With subtitle and footer

Add descriptive `subtitle` text below the title and pass footer content via the `footer` prop.

See: `examples/WithSubtitleAndFooter.md`

### Without border

Set `border={false}` to render the pod without an outer border.

See: `examples/WithoutBorder.md`

### With edit button

Pass an `onEdit` callback to render an edit button in the pod footer. Clicking it triggers the callback.

See: `examples/WithEditButton.md`

### With delete button

Pass an `onDelete` callback to render a delete button. Can be combined with `onEdit`.

See: `examples/WithDeleteButton.md`

### Soft delete state

Set `softDelete={true}` to visually indicate the pod is in a "soft deleted" (pending deletion) state.

See: `examples/SoftDeleteState.md`

### With edit button and displayEditButtonOnHover

Set `displayEditButtonOnHover={true}` to reveal the edit button only when hovering over the pod.

See: `examples/WithDisplayEditButtonOnHover.md`

### With edit button and editContentFullWidth

Set `editContentFullWidth={true}` to render the edit content spanning the full pod width.

See: `examples/WithEditContentFullWidth.md`

### With internal edit button

Set `internalEditButton={true}` to render the edit button inside the pod content area rather than in the footer.

See: `examples/WithInternalEditButton.md`

### With different variants

Use the `variant` prop to switch between `"primary"` (default), `"secondary"`, and `"tertiary"` background styles.

See: `examples/WithDifferentVariants.md`

### With different sizes

Use the `size` prop to control the internal padding. Available values are `"extra-small"`, `"small"`, `"medium"` (default), `"large"`, and `"extra-large"`.

See: `examples/WithDifferentSizes.md`

### With different title alignments

Use the `alignTitle` prop to set the horizontal alignment of the title. Accepted values are `"left"` (default), `"center"`, and `"right"`.

See: `examples/WithDifferentTitleAlignments.md`

### Address pod

An example of a `Pod` used to display a formatted postal address, demonstrating typical real-world content composition.

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
