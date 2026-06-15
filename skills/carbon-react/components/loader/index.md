# Loader

Use the `Loader` component to clearly indicate that a task or data is still loading, helping users understand they should wait rather than refresh the page or abandon the process. The `Loader` component offers three loading types: `standalone` (with `typical` and `ai` variants), `ring` (with `inline`, `stacked`, `ai-stacked` and `ai-inline` variants) and `star` for clear visual feedback.

**Category:** Feedback

## Quick Start

Import `Loader` into the project.

```javascript
import Loader from "carbon-react/lib/components/loader/__next__";
```

## Examples

### Loader Types

The `Loader` component offers three loading types: `standalone` (default), `ring` and `star`.

#### Standalone

The default loader type. Renders an animated spinner suited to general loading contexts.

See: `examples/Standalone.md`

#### Ring

A circular ring loader, available in stacked, inline, and AI variants.

See: `examples/Ring.md`

#### Star

A star-shaped loader for distinct visual differentiation. Has a single fixed size.

See: `examples/Star.md`

### Loader Variants

#### Standalone variants

The `standalone` loader type comes with two variants: `typical` (default) and `ai`.

#### Typical

The standard standalone spinner using the default brand colour palette.

See: `examples/StandaloneTypicalVariant.md`

#### A.I.

The standalone loader with AI-specific gradient styling, intended for AI-driven features.

See: `examples/StandaloneAiVariant.md`

#### Ring variants

The `ring` loader type comes with four variants: `stacked` (default), `inline`, `ai-stacked` and `ai-inline`.

#### Stacked

The ring loader with label text displayed below the ring.

See: `examples/RingStackedVariant.md`

#### Inline

The ring loader with label text displayed beside the ring, suited to compact or inline contexts.

See: `examples/RingInlineVariant.md`

#### A.I. Stacked

The stacked ring loader with AI gradient styling.

See: `examples/RingAiStackedVariant.md`

#### A.I. Inline

The inline ring loader with AI gradient styling.

See: `examples/RingAiInlineVariant.md`

### Loader Sizes

The `Loader` component offers size flexibility based on the selected loader type: the Standalone loader supports three sizes—Small, Medium, and Large—while the Ring loader provides four options—Extra Small, Small, Medium, and Large. The Star loader type has a single default size, ensuring a consistent appearance across use cases.

#### Standalone loader sizes

The standalone type supports `small`, `medium` (default), and `large` sizes via the `size` prop.

See: `examples/StandaloneSizes.md`

#### Ring loader sizes

The ring type supports `extra-small`, `small`, `medium` (default), and `large` sizes via the `size` prop.

See: `examples/RingSizes.md`

### Inverse

You can use the `inverse` prop to render the Loader's standalone and ring types with the inverse color scheme.

#### Standalone typical inversed

The default standalone loader rendered in inverse colours for use on dark backgrounds.

See: `examples/StandaloneTypicalVariantInversed.md`

#### Standalone A.I inversed

The AI standalone loader rendered in inverse colours.

See: `examples/StandaloneAiVariantInversed.md`

#### Ring stacked inversed

The stacked ring loader rendered in inverse colours.

See: `examples/RingStackedVariantInversed.md`

#### Ring inline inversed

The inline ring loader rendered in inverse colours.

See: `examples/RingInlineVariantInversed.md`

#### Ring A.I inline inversed

The AI inline ring loader rendered in inverse colours.

See: `examples/RingAiInlineVariantInversed.md`

### Is Tracked

When the `isTracked` prop is set to `true`, the ring will become tracked, for specific use cases where wait/loading times are predictable.

See: `examples/RingIsTracked.md`

#### Success State

When the loader is tracked the prop `isSuccess` can be passed to display the success state

See: `examples/SuccessState.md`

#### Error State

When the loader is tracked the prop `isError` can be passed to display the error state

See: `examples/ErrorState.md`

### Animation time

The `animationTime` prop can also be set to any number, which will extend the animation time to that number in seconds.

See: `examples/AnimationTime.md`

### Disable Motion

Use the `hasMotion={false}` prop to render the loader in a static (non-animated) state.

See: `examples/DisabledMotion.md`

### Inside Buttons

A `Loader` can be composed inside a `Button` to show in-progress state while an action is completing.

See: `examples/InsideButtons.md`

## Props

### Loader

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| animationTime | number \| undefined | No |  | Specify a custom animation time for the loader |  |
| hasMotion | boolean \| undefined | No |  | If set to `false` all motion will be suspended | true |
| inverse | boolean \| undefined | No |  | Toggle the inverse color scheme | false |
| isError | boolean \| undefined | No |  | Enable the error state for the ring loader when it is tracked | false |
| isSuccess | boolean \| undefined | No |  | Enable the success state for the ring loader when it is tracked | false |
| isTracked | boolean \| undefined | No |  | If set to `true` the animation type will become tracked, this is used specifically for when wait times are predictable | false |
| loaderLabel | string \| undefined | No |  | Specify a label for the loader |  |
| loaderType | LOADER_TYPES \| undefined | No |  | The loader type can be specified in order to change the loader | "standalone" |
| showLabel | boolean \| undefined | No |  | Specify if the label should be visible or not | true |
| size | LOADER_SIZES \| undefined | No |  | The size prop allows a specific size to be set ranging from `extra-small` to `large` |  |
| variant | LOADER_VARIANTS \| undefined | No |  | Toggle between the different Loader variants |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
