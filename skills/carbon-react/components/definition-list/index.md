# Definition List

Renders a semantic HTML `<dl>` definition list using `Dl`, `Dt` (term) and `Dd` (description) sub-components. Use it to display key–value pairs such as record details, contact information or form summaries.

**Category:** UI presentation

## Quick Start

```javascript
import { Dl, Dt, Dd } from "carbon-react/lib/components/definition-list";
```

## Examples

### Default

A two-column key–value list using `Dl`, `Dt` (term) and `Dd` (description). The `Dt` column is right-aligned and `Dd` is left-aligned by default.

See: `examples/DefaultStory.md`

### Action popover and icon support

A `Dd` cell can contain rich content such as an `ActionPopover` or an `Icon`, not just plain text.

See: `examples/ActionPopoverAndIconSupport.md`

### Conditional rendering with `<React.Fragment />`

_CAUTION: Direct children of `Dl` can only be `<React.Fragment />`, `Dt` or `Dd`_

See: `examples/WithConditionalRendering.md`

### As a single column

Setting the `asSingleColumn` prop will render the `DefinitionList` as a single column. Please note that the default alignment
for `Dt` components is `right` so you will likely need to set `dtTextAlign` to `left` to achieve the layout below.

See: `examples/AsASingleColumn.md`

It is also possible to create more complex layouts, like below, using single column `DefinitionList`s with other components
such as `Typography` and `Hr`.

See: `examples/MultipleSingleColumnsWithSegments.md`

### Responsive Example

At narrow viewports the two-column layout collapses to a single-column stack. Best viewed in a Canvas with viewport emulation.

See: `examples/Responsive.md`

## Props

### Dl

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | prop to render children. |  |
| asSingleColumn | boolean \| undefined | No |  | Render the DefinitionList as a single column | false |
| ddTextAlign | ElementAlignment \| undefined | No |  | This string will specify the text align styling of the `<dd></dd>`. | "left" |
| dtTextAlign | ElementAlignment \| undefined | No |  | This string will specify the text align styling of the `<dt></dt>`. | "right" |
| id | string \| undefined | No |  | HTML id attribute of the input |  |
| w | number \| undefined | No |  | This value will specify the width of the `StyledDtDiv` as a percentage. The remaining space will be taken up by the `StyledDdDiv`. This prop has no effect when `asSingleColumn` is set. | 50 |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### Dt

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Prop for what will render in the `<Dd></Dd>` tags |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### Dd

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Prop for what will render in the `<Dd></Dd>` tags |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
