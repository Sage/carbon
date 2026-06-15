# Fieldset

This component can be used within a [Form](../form/index.md) component to group related fields together. 
It will render a `<fieldset>` element with a `<legend>` element to provide a title for the group of fields.

**Category:** Inputs

## Quick Start

```javascript
import Fieldset from "carbon-react/lib/components/fieldset";
```

## Validation States

This component supports input validation, see our [Validations](../../references/docs/validations.md) documentation page for more information.

## Examples

### Default

To use the `Fieldset` component, pass any valid Carbon input as a child.

See: `examples/Default.md`

### With Legend Hint

To add a hint below the legend, pass the `legendHint` prop.

See: `examples/WithLegendHint.md`

### Horizontal Orientation

By default, the inputs will be rendered with a `"vertical"` orientation. 
You can set the `orientation` prop to `"horizontal"` to render the inputs horizontally.

See: `examples/HorizontalOrientation.md`

### Sizes

By default, the size of the component is set to `"medium"`, this can be changed by using the `size` prop.
Note that setting the size of the `Fieldset` will also change the size of the inputs.

See: `examples/Sizes.md`

See: `examples/HorizontalSizes.md`

### Label Font Weight

The label of inputs within the `Fieldset` will be rendered with a `"regular"` font weight. 
You can set the `labelWeight` prop to `"bold"` to render the input's labels with a bold font weight instead.

See: `examples/LabelFontWeight.md`

### Required

Set the `required` prop to make all of the inputs within `Fieldset` required.

See: `examples/Required.md`

## Props

### Fieldset

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Inputs rendered within the fieldset. |  |
| error | string \| undefined | No |  | Error message to be displayed when validation fails. |  |
| id | string \| undefined | No |  | Set an id value on the fieldset. |  |
| labelWeight | "bold" \| "regular" \| undefined | No |  | Set the label weight of the children input's label. | "regular" |
| legend | string \| undefined | No |  | The content for the fieldset legend. |  |
| legendHint | string \| undefined | No |  | Content for an additional hint text below the legend. |  |
| orientation | "vertical" \| "horizontal" \| undefined | No |  | Set the orientation of the fieldset's children. | "vertical" |
| required | boolean \| undefined | No |  | If true, an asterisk will be added to the legend and all inputs within the fieldset will be required. |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  | Set the size of the component. | "medium" |
| validationMessagePositionTop | boolean \| undefined | No |  | Specifies whether the validation message should be displayed above the input. | true |
| warning | string \| undefined | No |  | Warning message to be displayed when validation warning occurs. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
