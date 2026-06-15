# Textarea

- Useful for collecting a significant amount of text (e.g. notes about clients, or a short email message).
- If content in a textarea is read-only, remove the field border so it appears as static text.
- Use placeholder text to give the user context or examples of what to write.

**Category:** Inputs

## Quick Start

```javascript
import Textarea from "carbon-react/lib/components/textarea";
```

## Validation States

This component supports input validation, see our Validations documentation page for more information.

## Examples

### Default

A multi-line text input. Provide a `label` and wire up `value` and `onChange` for controlled behaviour. Supports the standard form field props: `labelInline`, `labelWidth`, `inputWidth`, `fieldHelp`, and validation.

See: `examples/DefaultStory.md`

### Disabled

Set `disabled` to prevent user interaction. The field is visually dimmed and not focusable.

See: `examples/DisabledStory.md`

### ReadOnly

Set `readOnly` to display the value as non-editable text within the field boundary. Unlike `disabled`, the value can still be selected and copied.

See: `examples/ReadOnlyStory.md`

### Expandable

Set `expandable` to allow the textarea to grow in height as the user types. The field starts at a fixed height and expands to accommodate additional content.

See: `examples/ExpandableStory.md`

### With characterLimit

If you use the `inputHint` prop to provide the user with a hint before the input, please use a full stop `.` at the end,
as it forces a pause before any other announcements, this well help screen reader users understand the hint fully.

See: `examples/CharacterLimitStory.md`

### with characterLimit - with translations

Various translations can be applied to both the visually hidden hint message, and the character
counter below the input.

These translations have been split up to include a number which represents the current character count which
is over/under the set `characterLimit`. Please see below how this has been achieved with a French translation.
Include the formatted number count wherever makes sense for the language you're translating too.

See: `examples/TranslationsCharacterLimitStory.md`

### With custom maxWidth

Set `maxWidth` to constrain the component width using any valid CSS value (e.g. `"300px"` or `"50%"`).

See: `examples/MaxWidthStory.md`

### With inputHint

When the `inputHint` prop is passed, please use a full stop `.` at the end. This forces a pause
before any other announcements, this well help screen reader users understand the hint fully.

See: `examples/InputHintStory.md`

### Required

You can use the `required` prop to indicate if the field is mandatory.

See: `examples/RequiredStory.md`

#### Customer Border Radius

The `borderRadius` prop accepts either a single design token, or an array of them, that will be applied as the CSS `border-radius` property.
See [MDN docs](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius) for examples of how this works with multiple values.

See: `examples/BorderRadiusStory.md`

#### Borderless Textarea

If you want to remove the borders from the component, you can use the `hideBorders` prop. This will still apply the border styling for validations and also the focus styling to the component.

See: `examples/BorderlessExample.md`

### With labelInline (legacy)

Use the `labelInline` prop to display the label on the same horizontal row as the input. You can adjust its appearance using the `labelWidth` and
`labelAlign` props to control the width and text alignment of the label and the `inputWidth` prop to control the width of the input.

**Note:** This is a legacy feature and will only render if the `validationRedesignOptIn` feature flag on an ancestor [CarbonProvider](../carbon-provider/index.md) is *false*.

See: `examples/LabelInlineStory.md`

See: `examples/LabelAlignStory.md`

### With labelHelp (legacy)

**Note:** This is a legacy feature and will only render if the `validationRedesignOptIn` feature flag on an ancestor [CarbonProvider](../carbon-provider/index.md) is *false*.

See: `examples/LabelHelpStory.md`

### With fieldHelp (legacy)

**Note:** This is a legacy feature and will only render if the `validationRedesignOptIn` feature flag on an ancestor [CarbonProvider](../carbon-provider/index.md) is *false*.

See: `examples/FieldHelpStory.md`

## Props

### Textarea

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| onChange | (ev: React.ChangeEvent<HTMLInputElement>) => void | Yes |  |  |  | Callback fired when the user types in the Textarea |  |
| value | string | Yes |  |  |  | The value of the Textbox |  |
| adaptiveLabelBreakpoint | number \| undefined | No |  |  |  | Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set |  |
| align | "left" \| "right" \| undefined | No |  |  |  |  |  |
| as | React.ElementType<any, keyof React.JSX.IntrinsicElements> \| undefined | No |  |  |  | Override the variant component |  |
| autoFocus | boolean \| undefined | No |  |  |  | Automatically focus the input on component mount |  |
| borderRadius | BorderRadiusType \| BorderRadiusType[] \| undefined | No |  |  |  | Specify a custom border radius for the component. Any valid border-radius design token, or an array of border-radius design tokens. |  |
| characterLimit | number \| undefined | No |  |  |  | Character limit of the textarea |  |
| children | React.ReactNode | No |  |  |  | Type of the icon that will be rendered next to the input |  |
| disabled | boolean \| undefined | No |  |  |  | If true, the component will be disabled |  |
| error | string \| boolean \| undefined | No |  |  |  | Indicate that error has occurred. Pass string to display icon, tooltip and red border. Pass true boolean to only display red border. |  |
| expandable | boolean \| undefined | No |  |  |  | Allows the Textareas Height to change based on user input |  |
| fieldHelp | React.ReactNode | No |  |  |  | [Legacy] Help content to be displayed under an input |  |
| helpAriaLabel | string \| undefined | No |  |  |  | [Legacy] Aria label for rendered help component |  |
| hideBorders | boolean \| undefined | No |  |  |  | Hides the borders for the component. Please note that validation and focus styling will still be applied |  |
| id | string \| undefined | No |  |  |  | id of the input |  |
| info | string \| boolean \| undefined | No |  |  |  | [Legacy] Indicate additional information. Pass string to display icon, tooltip and blue border. Pass true boolean to only display blue border. |  |
| inputBorderRadius | BorderRadiusType \| BorderRadiusType[] \| undefined | No |  |  |  | Specify a custom border radius for the input. Any valid border-radius design token, or an array of border-radius design tokens. |  |
| inputHint | string \| undefined | No |  |  |  | A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. |  |
| inputIcon | IconType \| undefined | No |  |  |  | <a href="https://brand.sage.com/d/NdbrveWvNheA/foundations#/icons/icons" target="_blank">List of supported icons</a> Icon to display inside of the Textarea |  |
| inputWidth | number \| undefined | No |  |  |  | [Legacy] Width of an input in percentage. Works only when labelInline is true |  |
| label | string \| undefined | No |  |  |  | The content of the label for the input |  |
| labelAlign | "left" \| "right" \| undefined | No |  |  |  | Label alignment |  |
| labelHelp | React.ReactNode | No |  |  |  | [Legacy] Text applied to label help tooltip. When opted into new design validations it will render as a hint above the input, unless an `inputHint` prop is also passed |  |
| labelInline | boolean \| undefined | No |  |  |  | [Legacy] When true, label is placed in line an input |  |
| labelSpacing | 1 \| 2 \| undefined | No |  |  |  | [Legacy] Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) |  |
| labelWidth | number \| undefined | No |  |  |  | [Legacy] Width of a label in percentage. Works only when labelInline is true |  |
| maxWidth | string \| undefined | No |  |  |  | Prop for specifying the max width of the input. Leaving the `maxWidth` prop with no value will default the width to '100%' |  |
| minHeight | number \| undefined | No |  |  |  | Specify the minimum height. This property is only applied if rows is not set. |  |
| name | string \| undefined | No |  |  |  | Name of the input |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on blur |  |
| onClick | ((ev: React.MouseEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on click |  |
| onFocus | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on focus |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on keyDown |  |
| placeholder | string \| undefined | No |  |  |  | Placeholder text for the component |  |
| readOnly | boolean \| undefined | No |  |  |  | Adds readOnly property |  |
| required | boolean \| undefined | No |  |  |  | Flag to configure component as mandatory |  |
| rows | number \| undefined | No |  |  |  | The number of visible text lines for the control. When set, this determines the height of the textarea, and the minHeight property is ignored. |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  |  |  | [Legacy] Overrides the default tooltip position |  |
| validationIconId | string \| undefined | No |  |  |  | Id of the validation icon |  |
| validationMessagePositionTop | boolean \| undefined | No |  |  |  | Render the ValidationMessage above the Textarea when validationRedesignOptIn flag is set |  |
| validationOnLabel | boolean \| undefined | No |  |  |  | [Legacy] When true, validation icon will be placed on label instead of being placed on the input |  |
| warning | string \| boolean \| undefined | No |  |  |  | Indicate that warning has occurred. Pass string to display icon, tooltip and orange border. Pass true boolean to only display orange border. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-describedby | string \| undefined | No |  |  |  | The ID of the input's description, is set along with hint text and error message. |  |
| aria-labelledby | string \| undefined | No |  |  |  | Prop to specify the aria-labelledby property of the component |  |
| isOptional | boolean \| undefined | No |  | Yes | If the value of this component is not required, use the `required` prop and set it to false instead. | [Legacy] Flag to configure component as optional. |  |
