# Button

A Button triggers a single action or event.
Use it to submit a form (Save), to advance to the next step in a process (Next), or to create a new item (New).

**This documentation is for the newer implementation of Button. If you are still using the older implementation, please use the Button documentation.**

**Category:** Actions

## Quick Start

```javascript
import Button, { type ButtonProps, type ButtonHandle } from "carbon-react/lib/components/button/__next__";
```

## Legacy support

To help with migration, this component can also accept the following
legacy Button props:

- the `buttonType` prop, which maps to the `variant` and `variantType` props as follows:
  - `primary` -> `variant="default"` and `variantType="primary"`
  - `secondary` -> `variant="default"` and `variantType="secondary"`
  - `tertiary` -> `variant="default"` and `variantType="tertiary"`
  - `destructive` -> `variant="destructive"` and `variantType="primary"`
  - `gradient-grey` -> `variant="gradient"` and `variantType="secondary"`
  - `gradient-white` -> `variant="gradient"` and `variantType="secondary"`
  - `darkBackground` -> `variant="default"` and `variantType="secondary"` with `inverse` set to `true`
- the `iconType` and `iconPosition` props, which are equivalent to composing an `Icon` component as a child
- the `isWhite` prop, which maps to the `inverse` prop

## Examples

### Default Button

By default, a `Button` with no additional properties pass will render a default
primary button, with the `button` HTML type.

See: `examples/Default.md`

### Button Content

Button content is composable; in other words, it's up to you to decide what you
want the button to show, and how. In the following example, you can see how to
implement [Icons](../icon/index.md) into buttons. If you have multiple
child elements, wrap them in a `Fragment` to ensure that the correct styling is
maintained.

See: `examples/ButtonContent.md`

### Click Handler

To make use of non-submit and non-reset buttons, provide an `onClick` handler to
enable actions to take place when users click the button.

See: `examples/ClickHandler.md`

### Variants

Buttons come in three variants: `default`, `destructive` and `gradient`. To set your
desired variant, pass the `variant` prop; if no value is passed, `default` is
used.

Similarly, variants can be one of up to four variant types: `primary`,
`secondary`, `tertiary` and `subtle`. Supported variant-type combinations are
as follows:

| Variant       | Primary | Secondary | Tertiary | Subtle |
| ------------- | ------- | --------- | -------- | ------ |
| `default`     | ✅      | ✅        | ✅       | ✅     |
| `destructive` | ✅      | ✅        | ❌       | ❌     |
| `gradient`    | ❌      | ✅        | ❌       | ❌     |

By default, the `primary` variant type will be used if no `variantType` property
is passed

See: `examples/Variations.md`

### Sizes

Buttons can be one of four sizes: `xs`, `small`, `medium` and `large`. Pass the
required size with the `size` property.

#### A note on the `xs` size

The `xs` button size is designed for use only in tables where spacing is limited;
**it is not meant for use beyond that**. XS buttons cannot use the `primary`
variant type, and will instead default to `secondary` if no variant is specified.
If `primary` is set, it will be ignored automatically. XS buttons should also use
only text content (i.e. no icons).

See: `examples/Sizes.md`

### Disabled

You can disable buttons using the `disabled` property. Before doing that, think
about whether a disabled button really makes sense for your situation — it's
best to save this option for times when other approaches won’t quite do the job.

See: `examples/Disabled.md`

### Full-Width

Passing the `fullWidth` property will allow buttons to use the full horizontal
space around them.

See: `examples/FullWidth.md`

### Inverse

Buttons can be marked as `inverse` for scenarios where they require a dark mode
appearance. Only the `default` variant supports `inverse`; other variants will
be ignored.

See: `examples/Inverse.md`

### Loading

Loading state can be applied to buttons by passing the [Loader component](../loader/index.md)
via the composable `children` prop.

See: `examples/Loading.md`

### Wrapping Text

If you require button text that does not wrap (due to e.g. limited spacing),
use the `noWrap` prop to prevent the text from wrapping across multiple
lines.

See: `examples/WrappingText.md`

### HTML Button Type

Standard HTML buttons can be one of three types: `button`, `submit` or
`reset`. This functionality is available via the `type` prop, which
allows `Button` instances to be used as standard buttons in elements
such as forms.

See: `examples/HTMLButtonType.md`

### Button as Link

It is possible to use the `Button` component as a link by passing an `href` prop.
When doing so, the component will render as an anchor tag (`<a>`) rather than a button (`<button>`).
When using the `Button` component as a link, the `type` prop will be ignored, as it is not
relevant for anchor tags. Instead, the `href`, `target` and `rel` props will be used to
determine the behaviour of the link.

See: `examples/ButtonAsALink.md`

### Programmatic focus

To programmatically set focus on a `Button`, you can use the imperative `focusButton` method available via the component's ref:

See: `examples/ProgrammaticFocus.md`

## Props

### Button

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  |  |  | The content that the button displays. |  |
| className | string \| undefined | No |  |  |  |  |  |
| disabled | boolean \| undefined | No |  |  |  | Flag to indicate that the button is disabled. |  |
| form | string \| undefined | No |  |  |  | Associates the button with a form element; value should be the id of the form. |  |
| fullWidth | boolean \| undefined | No |  |  |  | Flag to indicate that the button can be full-width. |  |
| href | string \| undefined | No |  |  |  | Used to transform button into anchor |  |
| iconPosition | ButtonIconPosition \| undefined | No |  |  |  | Defines an Icon position related to the children: "before" \| "after" |  |
| iconType | IconType \| undefined | No |  |  |  | Defines an Icon type within the button |  |
| id | string \| undefined | No |  |  |  | The ID of the button. |  |
| inverse | boolean \| undefined | No |  |  |  | Set the button to use a dark-mode appearance. |  |
| name | string \| undefined | No |  |  |  | The name of the button. |  |
| noWrap | boolean \| undefined | No |  |  |  | Flag to indicate whether the button text can wrap over multiple lines. |  |
| onBlur | ((ev: React.FocusEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Handler to fire when the button is blurred. |  |
| onChange | ((ev: React.FormEvent<HTMLButtonElement \| HTMLAnchorElement> \| React.ChangeEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on change |  |
| onClick | ((ev: React.MouseEvent<HTMLAnchorElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Handler to fire when the button is clicked. |  |
| onFocus | ((ev: React.FocusEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Handler to fire when the button is focused. |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Handler to fire when the button is activated via the Enter or Space keys. |  |
| rel | string \| undefined | No |  |  |  | HTML rel attribute |  |
| size | Size \| undefined | No |  |  |  | The size of the button. |  |
| target | string \| undefined | No |  |  |  | HTML target attribute |  |
| type | "reset" \| "button" \| "submit" \| undefined | No |  |  |  | The HTML type that this button should use. |  |
| variant | Variant \| undefined | No |  |  |  | The variant of the button. |  |
| variantType | VariantType \| undefined | No |  |  |  | The variant type of the button. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-describedby | string \| undefined | No |  |  |  | Identifies the element(s) offering additional information about the button that the user might require. |  |
| aria-label | string \| undefined | No |  |  |  | The aria-label attribute of the button. |  |
| aria-labelledby | string \| undefined | No |  |  |  | Identifies the element(s) labelling the button. |  |
| buttonType | LegacyButtonProps["buttonType"] | No |  | Yes | Please use `variantType` prop instead. |  |  |
| destructive | boolean \| undefined | No |  | Yes | Please use `variant="destructive"` instead. |  |  |
| isWhite | boolean \| undefined | No |  | Yes | Please use `inverse` instead. |  |  |
| subtext | string \| undefined | No |  | Yes | Second text child, renders under main text, only when size is "large" |  |  |

## Ref methods

`Button`'s forwarded ref exposes the following imperative methods:

| Method Name   | Description                          |
| ------------- | ------------------------------------ |
| `focusButton` | Programmatically focuses the button. |
