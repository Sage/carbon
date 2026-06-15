# Loader Star

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

A deprecated animated star-shaped loading indicator. Use `Loader` in new implementations.

**Category:** Feedback

## Quick Start

Import `LoaderStar` into the project.

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
