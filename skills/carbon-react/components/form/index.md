# Form

Represents a document section containing interactive controls for submitting information.

**Category:** Inputs

## Quick Start

To use Form, import the `Form` and pass the content, usually various inputs, as children.
You can provide a save button using the `saveButton` prop.

```javascript
import Form, {
  RequiredFieldsIndicator,
} from "carbon-react/lib/components/form";
```

## Examples

### With footer node

Pass a custom React node via the `saveButton` prop to render action buttons in the form footer.

See: `examples/WithFooterNode.md`

### With sticky footer

When `stickyFooter` prop is set as true, footer becomes stickied to the bottom of the screen when necessary - this also works in `Dialog`

See: `examples/DefaultWithStickyFooter.md`

### With sticky footer variant

Use the `stickyFooter` variant that controls how the footer sticks when scrolling inside a constrained container.

See: `examples/StickyFooterVariant.md`

### Full Width Buttons

Use the `buttonAlignment` or pass `fullWidth` buttons to make footer action buttons stretch the full form width.

See: `examples/WithFullWidthButtons.md`

### Field Spacing

You can use the `fieldSpacing` prop to set the spacing between fields within `Form`, which will add a margin-bottom to supported input components.
The value is multiplied by the base theme `8px` spacing value, by default this is set to `3`.

See: `examples/FieldSpacing.md`

### Override spacing on a field

You can override the spacing of a field by using the `mb` prop on the specific input.

See: `examples/OverrideFieldSpacing.md`

### Validations

When either `errorCount` or `warningCount` or both are provided, summary with the number of errors and/or warnings is rendered wrapping the save button.

See: `examples/WithErrorsSummary.md`

See: `examples/WithWarningsSummary.md`

See: `examples/WithBothErrorsAndWarningsSummary.md`

### Required Fields Indicator

The `RequiredFieldsIndicator` component visually indicates that form fields are required using an asterisk prefix. It can be used
within a `Form` to provide users with a clear indication of which fields are mandatory, or used independently.

See: `examples/RequiredFieldsIndicatorStory.md`

### Example with optional and required fields

You can set the `required` or `isOptional` on any `Form` input to make them mandatory or optional. You can also
include an indicator within the `Form` by importing the `RequiredFieldsIndicator` component.

See: `examples/WithBothOptionalOrRequired.md`

### Buttons variations

Additional buttons can be passed using `leftSideButtons` and `rightSideButtons` props.

See: `examples/WithAdditionalButtons.md`

When `buttonAlignment` prop is set as `left`, buttons are aligned to the left side.

See: `examples/WithButtonsAlignedToTheLeft.md`

### In Dialog

It is possible to render `Form` as a content of `Dialog` component.

See: `examples/InDialog.md`

#### With sticky footer

See: `examples/InDialogWithStickyFooter.md`

### In full-screen `Dialog`

It is possible to render `Form` as a content of full-screen `Dialog` component.

See: `examples/InDialogFullScreen.md`

#### With sticky footer

See: `examples/InDialogFullScreenWithStickyFooter.md`

### With labels inline

Use the `labelInline` prop on individual inputs (or `Fieldset`) to display labels on the same row as the inputs.

See: `examples/WithLabelsInline.md`

### With custom footer padding

Override the default footer padding using the `footerPadding` prop.

See: `examples/WithCustomFooterPadding.md`

## Props

### Form

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| buttonAlignment | "left" \| "right" \| undefined | No |  | Alignment of buttons | "right" |
| children | React.ReactNode | No |  | Child elements |  |
| errorCount | number \| undefined | No |  | The total number of errors present in the form |  |
| fieldSpacing | 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| undefined | No |  | Spacing between form fields, given number will be multiplied by base spacing unit (8) | 3 |
| footerChildren | React.ReactNode | No |  | Custom content to render in the form's footer |  |
| footerPadding | PaddingProps | No |  | Padding to be set on the form footer | {} |
| fullWidthButtons | boolean \| undefined | No |  | Applies styling for full width buttons. Please note that you will still need to pass the `fullWidth` prop to the button you compose | false |
| height | string \| undefined | No |  | Height of the form (any valid CSS value) |  |
| id | string \| undefined | No |  | The id attribute of the underlying form element |  |
| leftSideButtons | React.ReactNode | No |  | Additional buttons rendered on the left side of the save button |  |
| noValidate | boolean \| undefined | No |  | Disable HTML5 validation | true |
| onSubmit | React.FormEventHandler<HTMLFormElement> \| undefined | No |  | Callback passed to the form element |  |
| rightSideButtons | React.ReactNode | No |  | Additional buttons rendered on the right side of the save button |  |
| saveButton | React.ReactNode | No |  | Save button to be rendered |  |
| stickyFooter | boolean \| undefined | No |  | Enables the sticky footer. |  |
| stickyFooterVariant | "light" \| "grey" \| undefined | No |  | Background variant for the sticky footer. | "light" |
| warningCount | number \| undefined | No |  | The total number of warnings present in the form |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
