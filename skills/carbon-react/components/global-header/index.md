# Global Header

`GlobalHeader` is a wrapper component designed for creating site-wide navigation layouts.

**Category:** Navigation

## Quick Start

```javascript
import GlobalHeader from "carbon-react/lib/components/global-header";
```

## Examples

### Default

`GlobalHeader` shares similarities with the [NavigationBar component](../navigation-bar/index.md), but is permanently fixed to the top of the viewport and has a greater z-index than `NavigationBar`.

See: `examples/Default.md`

### With logo

A custom logo in the form of an HTML element or a React component can be rendered by passing it via the `logo` prop. The logo is wrapped in a container that applies style rules for margins and child element height. It is possible to set a custom height for the logo element, but any value that exceeds the height of the `GlobalHeader` component will be constrained to 40px.

See: `examples/WithLogo.md`

### Basic menu

In conjunction with the [Menu component](../menu/index.md), `GlobalHeader` can be used to create global navigation layouts.

See: `examples/BasicMenu.md`

### Responsive menu

This story is best viewed in the `canvas` view and by adjusting the size of the window. The fullscreen behaviour will trigger when the screen size is smaller than `600px`.

See: `examples/ResponsiveMenu.md`

### Global and local navigation bar layout

The component can be used alongside the [NavigationBar component](../navigation-bar/index.md) to create a two navigation bar layout, with the former being for site-wide navigation and the latter being for local navigation. Since `GlobalHeader` is fixed to top of the viewport, the `NavigationBar` must also have its `position` fixed, with a top `orientation` and `offset` of 40px.

See: `examples/GlobalLocalNavBarLayout.md`

## Props

### Global Header

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Child elements |  |
| logo | React.ReactNode | No |  | Logo to render |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
