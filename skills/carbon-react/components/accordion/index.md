# Accordion

An accordion is used to group, hide, and reveal content using progressive disclosure. When closed, an accordion shows top-level information only. A user can open the accordion and quickly access more information.

**Category:** UI presentation

## Quick Start

To use accordions, import the `Accordion` component and pass the desired content as child components.

```javascript
import { Accordion } from "carbon-react/lib/components/accordion";
```

## Examples

### Default

To render an `Accordion`, please ensure you provide a `title` prop.

See: `examples/Default.md`

### Subtitle

To add a subtitle below the title, you can pass the `subTitle` prop.

See: `examples/Subtitle.md`

### Custom Title

The `title` prop supports passing a React node for custom title layouts.

See: `examples/WithCustomTitle.md`

### Simple Variant

To render a simple `Accordion`, set the `variant` prop to `simple`.
**Note:** The `subTitle` prop is not supported with this variant.

See: `examples/SimpleVariant.md`

### Size

The `standard` variant is available in sizes `small` and `medium`.
The `simple` variant is available in sizes `small`, `medium` and `large`.

To set the size of the component, set the `size` prop to the desired value.

See: `examples/StandardSizes.md`

See: `examples/SimpleSizes.md`

### Header Spacing

By default, the `Accordion` has internal spacing applied to the header area. Custom spacing can be applied using the `headerSpacing` prop.

See: `examples/HeaderSpacing.md`

### Disable Borders

The `borders` prop can be set to `none` to render the `Accordion` without borders.

See: `examples/DisableBorders.md`

### Width

You can set the `width` prop to specify the width of the `Accordion`.

See: `examples/Width.md`

## Props

### Accordion

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| title | React.ReactNode | Yes |  |  |  | Title of the Accordion |  |
| borders | "default" \| "none" \| "full" \| undefined | No |  |  |  | Sets Accordion borders. **Deprecation Warning:** The "full" borders are deprecated and will be removed in a future release. |  |
| children | React.ReactNode | No |  |  |  | Content of the Accordion component |  |
| defaultExpanded | boolean \| undefined | No |  |  |  | Set the default state of expansion of the Accordion if component is to be used as uncontrolled |  |
| expanded | boolean \| undefined | No |  |  |  | Sets the expansion state of the Accordion if component is to be used as controlled |  |
| headerSpacing | SpaceProps | No |  |  |  | Styled system spacing props provided to Accordion Title |  |
| id | string \| undefined | No |  |  |  |  |  |
| onChange | ((event: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>, isExpanded: boolean) => void) \| undefined | No |  |  |  | Callback fired when expansion state changes |  |
| openTitle | string \| undefined | No |  |  |  | Title of the Accordion when it is open |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  |  |  | Sets Accordion size |  |
| subTitle | string \| undefined | No |  |  |  | Sets accordion sub title |  |
| variant | "standard" \| "simple" \| "subtle" \| undefined | No |  |  |  | Sets Accordion variant. **Deprecation Warning:** The "subtle" variant is deprecated, please use "simple" instead. |  |
| width | string \| undefined | No |  |  |  | Sets Accordion width |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| disableContentPadding | boolean \| undefined | No |  | Yes | Padding is no longer applied to the Accordion content by default. Any desired spacing can be applied directly to the provided content. | Disable padding for the content. |  |
| error | string \| undefined | No |  | Yes | Validation messages on accordions are no longer supported. | An error message to be displayed in the tooltip. |  |
| iconAlign | "left" \| "right" \| undefined | No |  | Yes | Icon alignment on accordions is deprecated and will be removed in a future release. Icons will now render on the left by default. | Sets icon alignment. |  |
| iconType | "chevron_down" \| "chevron_down_thick" \| "dropdown" \| undefined | No |  | Yes | Custom icon types on accordions are deprecated and will be removed in a future release. | Sets icon type |  |
| info | string \| undefined | No |  | Yes | Validation messages on accordions are no longer supported. | An info message to be displayed in the tooltip. |  |
| warning | string \| undefined | No |  | Yes | Validation messages on accordions are no longer supported. | A warning message to be displayed in the tooltip. |  |

### AccordionGroup (Deprecated)

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | AccordionGroupChild | No |  | An Accordion or list of Accordion components to be rendered inside the AccordionGroup |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
