# Breadcrumbs

Breadcrumbs are a secondary navigation aid that helps users easily understand their location and navigate to previous pages.

**Category:** Navigation

## Quick Start

To use Breadcrumbs component you need to import `Breadcrumbs` and pass an array of `Crumb`s.

```javascript
import { Breadcrumbs, Crumb } from "carbon-react/lib/components/breadcrumbs";
```

## Examples

### Default

A row of `Crumb` links separated by chevrons. The last crumb represents the current page and is rendered as plain text (no link).

See: `examples/Default.md`

### Inverse

You can use the `inverse` prop to render the Breadcrumbs with inverse styling.

See: `examples/Inverse.md`

## Props

### Breadcrumbs

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  |  |  | Child crumbs to display |  |
| inverse | boolean \| undefined | No |  |  |  | Sets the colour styling when component is to be rendered with inverse styles |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| isDarkBackground | boolean \| undefined | No |  | Yes | The 'isDarkBackground' prop in Breadcrumbs is deprecated and will soon be removed. Please use the 'inverse' prop instead. | Sets the colour styling when component is rendered on a dark background |  |
