# Loader

Use the `Loader` component to clearly indicate that a task or data is still loading, helping users understand they should wait rather than refresh the page or abandon the process. The `Loader` component offers three loading types: `standalone` (with `typical` and `ai` variants), `ring` (with `inline`, `stacked`, `ai-stacked` and `ai-inline` variants) and `star` for clear visual feedback.

## Import

```javascript
import Loader from "carbon-react/lib/components/loader/__next__";
```

## Examples

### Loader Types

The `Loader` component offers three loading types: `standalone` (default), `ring` and `star`.

#### Standalone

See: `examples/StandaloneAndRingAndStar.md`

### Loader Variants

#### Standalone variants

The `standalone` loader type comes with two variants: `typical` (default) and `ai`.

#### Typical

See: `examples/StandaloneTypicalVariantAndStandaloneAiVariantAndRingStackedVariantAndRingInlineVariantAndRingAiStackedVariantAndRingAiInlineVariant.md`

### Loader Sizes

The `Loader` component offers size flexibility based on the selected loader type: the Standalone loader supports three sizes—Small, Medium, and Large—while the Ring loader provides four options—Extra Small, Small, Medium, and Large. The Star loader type has a single default size, ensuring a consistent appearance across use cases.

#### Standalone loader sizes

See: `examples/StandaloneSizesAndRingSizes.md`

### Inverse

You can use the `inverse` prop to render the Loader's standalone and ring types with the inverse color scheme.

#### Standalone typical inversed

See: `examples/StandaloneTypicalVariantInversedAndStandaloneAiVariantInversedAndRingStackedVariantInversedAndRingInlineVariantInversedAndRingAiInlineVariantInversed.md`

### Is Tracked

When the `isTracked` prop is set to `true`, the ring will become tracked, for specific use cases where wait/loading times are predictable.

See: `examples/RingIsTrackedAndSuccessStateAndErrorState.md`

### Animation time

The `animationTime` prop can also be set to any number, which will extend the animation time to that number in seconds.

See: `examples/AnimationTime.md`

### Disable Motion

See: `examples/DisabledMotion.md`

### Inside Buttons

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
| showLabel | boolean \| undefined | No |  | Specify if the label should be visible or not | true |
| size | LOADER_SIZES \| undefined | No |  | The size prop allows a specific size to be set ranging from `extra-small` to `large` |  |
| variant | LOADER_VARIANTS \| undefined | No |  | Toggle between the different Loader variants |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
