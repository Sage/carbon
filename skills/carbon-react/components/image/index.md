# Image

Basic component that allows either the rendering of an `img` element or a `div` with a `background-image`. This component
also gives access to a number of styling options such as `margin`, and `layout`.

## Import

```javascript
import Image from "carbon-react/lib/components/image";
```

## Examples

### Default

By default the component will render as a `div` element and use the `backgroundImage` to set the `background-image`
css attribute.

See: `examples/DefaultStory.md`

### With `position` Prop

To apply a CSS position to the component, pass in a valid CSS string value to the `position` prop.

To effect the `top`, `right`, `bottom` and `left` position of the component, pass in a valid CSS string value to the `top`, `right`, `bottom` and `left` props.

See: `examples/ImageWithPosition.md`

### As an img element

If you want to render an `img` element pass in a value to the `src` prop. The component will not accept `children` when
rendered in this way.

See: `examples/AsAnImg.md`

### With `hidden` prop

To hide the component completely - meaning hidden visually and from being accessible via keyboard navigation or a screen reader - the `hidden` prop can be passed. The underlying element remains in the DOM but is semantically hidden.

See: `examples/WithHiddenProp.md`

### Decorative Image

There may be a use case where a decorative image is required. Decorative images do not add information to the content of a page.
For example, a decorative image might be included to make the website more visually attractive.

In these cases, an empty alt text should be provided (alt="") so that they can be ignored by assistive technologies, such as screen readers.

See: `examples/DecorativeStory.md`

### Custom responsive behaviour

It is possible to conditionally change the props based on defined breakpoints in the example below. This example is best
viewed in the Canvas tab using full-screen mode with device or viewport emulation.

See: `examples/CustomResponsiveBehaviour.md`

## Props

### Image

No props metadata found.
