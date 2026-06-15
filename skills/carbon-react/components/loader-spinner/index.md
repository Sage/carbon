# Loader Spinner

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

Use the loader spinner to help users understand why they are waiting.

Can be used to demonstrate a known or unknown wait time.

**Category:** Feedback

## Quick Start

Import `LoaderSpinner` into the project.

```javascript
import { LoaderSpinner } from "carbon-react/lib/components/loader-spinner";
```

## Examples

### Default

Please see the default render of the component below. If a user prefers reduced motion, only the
loading label will be displayed.

See: `examples/Default.md`

### Override Spinner label

Please find an example of the `spinnerLabel` prop used below, any string can be passed to the prop to override
the default `"Loading..."` label.

See: `examples/OverrideSpinnerLabel.md`

### Sizes

Please find examples of all spinner sizes below. Ranging from sizes `extra-small` to `extra-large`.

See: `examples/Sizes.md`

### Show Spinner label

When the `showSpinnerLabel` prop is set to `false` no visual label will be rendered underneath the spinner.
A visually hidden label will still be available for assistive technologies. However, even with `showSpinnerLabel`
set to `false`, a label will still be rendered if end users have preferred reduced motion.

See: `examples/ShowSpinnerLabel.md`

### Variants

Please find examples of all spinner variants below. Shown against the ligher background are the `action` and `neutral` variants.
Against the darker background are the `inverse`, `gradient-grey` and `gradient-white` variants.

The `gradient-grey` and `gradient-white` have a slower default animation time than other variants.

See: `examples/Variants.md`

### Label color

Please find an example of a spinner below when the label color has been inverted. This will ensure proper contrast is
achieved on the label, when used on a dark background. This is only applied with the `inverse` and `gradient-white` variants.

See: `examples/LabelColor.md`

### Has Motion

When the `hasMotion` prop is set to `false`, the motion will become static, and no animation will trigger.

See: `examples/HasMotion.md`

### Is Tracked

When the `isTracked` prop is set to `true`, the spinner will become tracked, for specific use cases where wait/loading times
are predictable. The `isTracked` prop cannot be true when the `gradient-grey` or `gradient-white` colors are set.

See: `examples/IsTracked.md`

### Animation time

The `animationTime` prop can also be set to any number, which will extend the animation time to that number in seconds.

See: `examples/AnimationTime.md`

## Props

### LoaderSpinner

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| animationTime | number \| undefined | No |  | The total animation time (in seconds). Default animation is time `1` second. For any gradient variants the default animation time is `2` seconds |  |
| hasMotion | boolean \| undefined | No |  | If set to `false` all motion will be suspended | true |
| isTracked | boolean \| undefined | No |  | If set to `true` the animation type will become tracked, this is used specifically for when wait times are predictable | false |
| showSpinnerLabel | boolean \| undefined | No |  | If set to `false` no visual label will be displayed, however a visually hidden label will still be available for assistive technologies | true |
| size | "small" \| "medium" \| "large" \| "extra-small" \| "extra-large" \| undefined | No |  | The size prop allows a specific size to be set, ranging from `extra-small` to `extra-large` | "medium" |
| spinnerLabel | string \| undefined | No |  | Use the spinnerLabel prop to override the default `"Loading..."` label with any custom string |  |
| variant | "gradient-grey" \| "gradient-white" \| "inverse" \| "neutral" \| "action" \| undefined | No |  | The variant prop can be used to change the appearance of the component. Typically both the outer and inner spinner will change color, however there will still be sufficient contrast between them | "action" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
