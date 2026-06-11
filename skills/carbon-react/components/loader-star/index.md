# Loader Star

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

<DeprecationWarning>
Loader Star has been deprecated, if this pattern is still needed please see our deprecation migration docs for a recommended alternative.
</DeprecationWarning>

## Import

```javascript
import LoaderStar from "carbon-react/lib/components/loader-star";
```

## Examples

### Default

This example of the Loader Star component demonstrates how it will appear as default.

See: `examples/Default.md`

## Props

### Loader Star

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| loaderStarLabel | string \| undefined | No |  | The loaderStarLabel prop allows a specific label to be set. This label will be present if the user has `reduce-motion` enabled and will also be available to assistive technologies. By default the label will be `Loading...`. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
