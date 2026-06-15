# Loader

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

A deprecated animated loading spinner. Use the newer `Loader` from `carbon-react/lib/components/loader/__next__` in new implementations.

**Category:** Feedback

## Quick Start

Import `Loader` into the project.

```javascript
import Loader from "carbon-react/lib/components/loader";
```

## Examples

### Default

This example of the Loader component demonstrates how it will appear as default.

See: `examples/Default.md`

### with gradient variant

This is an example of the Loader component with the `variant` prop set to `gradient`.

See: `examples/WithGradientVariant.md`

### Small

This is an example of a small Loader component.

See: `examples/Small.md`

### Large

This is an example of the large Loader component. The larger size is only used when a whole page is loading.

See: `examples/Large.md`

### Inside Buttons

This example shows a `Loader` nested inside of a `Button` component. To ensure that the correct styling is applied to the `Loader` component when it is nested inside of the `Button` component,
please remember to pass the `isInsideButton` prop to the `Loader` component.

See: `examples/InsideButton.md`

### Conditional Rendering

In most cases, Loaders are conditionally rendered on the page and are then replaced by content. 
It is important to wrap the relevant content in a `span` (when elements are inline) or a `div` (when elements are in a block) and pass the `aria-live` attribute with the value of `polite`. 

Please note that ARIA live regions provide a means for conveying dynamic updates to users who rely on assistive technologies like screen readers. 
By incorporating live regions permanently into the DOM, we can ensure that users are consistently informed of relevant changes as they occur.

See: `examples/ConditionalRendering.md`

## Props

### Loader

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| isActive | boolean \| undefined | No |  | Applies slate color. Available only when isInsideButton is true. | true |
| isInsideButton | boolean \| undefined | No |  | Applies white color. | false |
| loaderLabel | string \| undefined | No |  | Specify a custom accessible label for the Loader. This label is visible to users who have enabled the reduce motion setting in their operating system. It is also available to assistive technologies. |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  | Size of the loader. | "medium" |
| variant | string \| undefined | No |  | Toggle between the default variant and gradient variant | "default" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
