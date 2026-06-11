# Form

Represents a document section containing interactive controls for submitting information.

## Import

```javascript
import Form, { RequiredFieldsIndicator } from "carbon-react/lib/components/form";
```

## Examples

### With footer node

See: `examples/WithFooterNode.md`

### With sticky footer

When `stickyFooter` prop is set as true, footer becomes stickied to the bottom of the screen when necessary - this also works in `Dialog`

See: `examples/DefaultWithStickyFooter.md`

### With sticky footer variant

See: `examples/StickyFooterVariant.md`

### Full Width Buttons

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

See: `examples/WithErrorsSummaryAndWithWarningsSummaryAndWithBothErrorsAndWarningsSummary.md`

### Required Fields Indicator

The `RequiredFieldsIndicator` component visually indicates that form fields are required using an asterisk prefix. It can be used 
within a `Form` to provide users with a clear indication of which fields are mandatory, or used independently.

See: `examples/RequiredFieldsIndicatorStory.md`

### Buttons variations

Additional buttons can be passed using `leftSideButtons` and `rightSideButtons` props.

See: `examples/WithAdditionalButtonsAndWithButtonsAlignedToTheLeft.md`

### In Dialog

It is possible to render `Form` as a content of `Dialog` component.

See: `examples/InDialogAndInDialogWithStickyFooter.md`

### In full-screen `Dialog`

It is possible to render `Form` as a content of full-screen `Dialog` component.

See: `examples/InDialogFullScreenAndInDialogFullScreenWithStickyFooter.md`

### With labels inline

See: `examples/WithLabelsInline.md`

### With custom footer padding

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
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| noValidate | boolean \| undefined | No |  | Disable HTML5 validation | true |
| onSubmit | React.FormEventHandler<HTMLFormElement> \| undefined | No |  | Callback passed to the form element |  |
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| rightSideButtons | React.ReactNode | No |  | Additional buttons rendered on the right side of the save button |  |
| saveButton | React.ReactNode | No |  | Save button to be rendered |  |
| stickyFooter | boolean \| undefined | No |  | Enables the sticky footer. |  |
| stickyFooterVariant | "light" \| "grey" \| undefined | No |  | Background variant for the sticky footer. | "light" |
| warningCount | number \| undefined | No |  | The total number of warnings present in the form |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
