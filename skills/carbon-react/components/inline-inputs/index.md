# Inline Inputs

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

A deprecated layout component that renders multiple inputs side-by-side on the same row, sharing a single label. Use `Fieldset` with `orientation="horizontal"` in new implementations.

**Category:** Inputs

## Quick Start

```javascript
import InlineInputs from "carbon-react/lib/components/inline-inputs";
```

## Examples

### Default

Multiple Carbon inputs rendered inline (side by side) under a single shared label.

See: `examples/Default.md`

### required

Use the `required` prop to mark the shared label with a mandatory asterisk.

See: `examples/Required.md`

### labelAlign

Use the `labelAlign` prop (`"left"` or `"right"`) to control the text alignment of the shared label.

See: `examples/LabelAlign.md`

## Props

### InlineInputs

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  |  |  | Children elements | null |
| className | string \| undefined | No |  |  |  |  |  |
| gutter | GutterOptions \| undefined | No |  |  |  | Gutter prop gets passed down to Row component if false gutter value is "none" | "none" |
| htmlFor | string \| undefined | No |  |  |  | The id of the corresponding input control for the label |  |
| inputWidth | number \| undefined | No |  |  |  | Width of the inline inputs container in percentage |  |
| label | string \| undefined | No |  |  |  | Defines the label text for the heading. |  |
| labelAlign | "left" \| "right" \| undefined | No |  |  |  | Inline label alignment |  |
| labelId | string \| undefined | No |  |  |  | Custom label id, could be used in combination with aria-labelledby prop of each input, to make them accessible for screen readers. |  |
| labelInline | boolean \| undefined | No |  |  |  |  | true |
| labelWidth | number \| undefined | No |  |  |  | Width of a label in percentage |  |
| required | boolean \| undefined | No |  |  |  | Flag to configure component as mandatory. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| adaptiveLabelBreakpoint | number \| undefined | No |  | Yes | `adaptiveLabelBreakpoint` has been deprecated. It is recommended to use `useMediaQuery` hook to implement adaptive behaviour. Breakpoint for adaptive label (inline label change to top aligned). Enables the adaptive behaviour when set |  |  |
