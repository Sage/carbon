# useMediaQuery

`useMediaQuery` is a custom React hook and a JavaScript implementation of a CSS media query. Pass in a valid CSS media query as a string, and it returns a boolean depending on the outcome of the query.

This is particularly useful for setting responsive breakpoints on a component by component basis for particular properties, for example padding or margin.

## Import path

```javascript
import useMediaQuery from "carbon-react/lib/hooks/useMediaQuery";
```

## Examples

### Basic usage

```javascript
const isWideScreen = useMediaQuery("(min-width: 1000px)");

// Returns "true" if the current window width is greater than (or equal to) 1000px
// Returns "false" if not.
```

### Setting multiple breakpoints

This [responsive example using Menu](../../components/menu/index.md) showcases how `useMediaQuery` can be used to set responsive breakpoints to determine what content to render.

This [Image example](../../components/image/index.md) uses responsive breakpoints to change the image displayed based on the window width.

## Parameters

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| query | string | Yes |  | Any valid CSS media query. |  |
