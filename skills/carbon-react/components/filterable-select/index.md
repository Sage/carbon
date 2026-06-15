# Filterable Select

Select one of available options from the drop-down menu using filter.
Filterable Select is a Carbon styled implementation of WAI-ARIA Combobox with Inline Autocomplete.

**Category:** Inputs

## Quick Start

```javascript
import { FilterableSelect, Option } from "carbon-react/lib/components/select";
```

Always insert `Option` Components inside the `FilterableSelect`, analogous to the `<select>` and `<option>` HTML Elements.

If you type printable characters in the Textbox, you can filter through the existing options leaving only those that match the text you typed.

## Validation States

This component supports input validation, see our [Validations](../../references/docs/validations.md) documentation page for more information.

## Testing

For testing interactions with `FilterableSelect` as part of a broader user journey, we recommend testing within a browser environment using tools like Playwright or Cypress, rather than Node-based environments like JSDOM. Since JSDOM does not render visual content, mocking will be required to ensure the component's internal layout calculations function correctly, making your tests less effective.

### JSDOM tests (if required)

If you need to test within JSDOM, we provide a utility function for setting up any required global mocks:

```javascript
import { setupSelectMocks } from "carbon-react/lib/components/select";

describe("Select tests", () => {
  beforeAll(() => {
    setupSelectMocks();
  });

  test("should render", () => {
    // your test code here
  });
});
```

## Examples

### Default

A basic `FilterableSelect` with `Option` children. Type in the input to filter the list; only options whose text matches the typed characters will be shown.

See: `examples/Default.md`

### List placement

By default, the placement of the select list is below the input element and will automatically adjust its position if there is not enough space.
However, you can use `listPlacement` prop to manually set the initial position of the select list relative to the input element.

See: `examples/ListPlacement.md`

### List height

You can use `listMaxHeight` prop to override default max height value of select list.

See: `examples/ListHeight.md`

### List width

You can use `listWidth` prop to override the width of the select list. By default the list
will have the same width as the input.

See: `examples/ListWidth.md`

### Open on focus

Set `openOnFocus` to open the option list automatically when the input receives focus, without requiring any typed input.

See: `examples/OpenOnFocus.md`

### Disabled

Set `disabled` to prevent user interaction. The input and dropdown are visually dimmed and non-interactive.

See: `examples/Disabled.md`

### Read Only

Set `readOnly` to display the current value without allowing changes. The filter input is disabled but the value remains visible and accessible.

See: `examples/Readonly.md`

### With multiple columns

Pass a `tableHeader` and multi-column `Option` children (using `OptionRow`) to display the dropdown as a table with column headers.

See: `examples/WithMultipleColumns.md`

### With multiple columns and nested tags/components

Demonstrates that multi-column options can contain arbitrary nested elements — such as `Badge` components or other rich content — within each cell.

See: `examples/WithMultipleColumnsAndNested.md`

### With Action Button

Default Action Button will be rendered when the `listActionButton` prop is set to `true` on the Component.

A custom `Button` Component could be passed as the `listActionButton` value.

See: `examples/WithActionButton.md`

### With isLoading prop

When `isLoading` prop is passed, a loader will be appended at the end of the Select List. That functionality could be used to load the options asynchronously.

See: `examples/WithIsLoadingProp.md`

### Infinite scroll example

The `isLoading` prop in combination with the `onListScrollBottom` prop can be used to implement infinite scroll.
This prop will be called every time a user scrolls to the bottom of the list.

See: `examples/WithInfiniteScroll.md`

### With custom maxWidth

In this example the `maxWidth` prop is 50%.

See: `examples/WithCustomMaxWidth.md`

### Required

You can use the `required` prop to indicate if the field is mandatory.

See: `examples/Required.md`

### With object as value

Option values could be passed as objects, useful when custom data is associated with an option.
When the `id` property is set, objects will be compared based on that property (could be used when the list is recreated after an API call).
If there is no `id` prop specified on an object, then the exact objects will be compared.

See: `examples/WithObjectAsValue.md`

### Virtual scrolling

The `enableVirtualScroll` prop can be used to enable "virtual scrolling" to only render a few options into the DOM at any one time.
This allows an unlimited amount of children to be passed with little impact on rendering performance.

By default this will render 5 not-currently-visible options into the DOM on either side of the currently-visible ones - this value can
be customised if desired using the `virtualScrollOverscan` prop. Higher values will make scrolling smoother but may negatively impact performance.

See: `examples/Virtualised.md`

### Selection confirmed

A change event is emitted each time an option is navigated via keyboard as it sets the value of the
Select input. For those that need to trigger further actions when the user makes a selection, there is
a `selectionConfirmed` property on the emitted event when the enter key is pressed or an option is clicked.

See: `examples/SelectionConfirmedStory.md`

### Custom filtering and option styles

By default, filtering and highlighting of options is handled by the component itself. In order to use custom filtering behaviour, or to use custom styling of option values, the
default filtering can be disabled using the `disableDefaultFiltering` prop.

This allows use-cases like server-side filtering of options, or rich formatting of options.

See: `examples/CustomFilterAndOptionStyle.md`

## Props

### Filterable Select

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| onChange | (ev: React.ChangeEvent<HTMLInputElement>) => void | Yes |  |  |  | Specify a callback triggered on change |  |
| value | string \| number \| readonly string[] \| undefined | Yes |  |  |  | The value of the input |  |
| accessibilityLabelId | string \| undefined | No |  |  |  | Id of the element containing the currently displayed value to be read by voice readers |  |
| activeDescendantId | string \| undefined | No |  |  |  |  |  |
| align | "left" \| "right" \| undefined | No |  |  |  |  |  |
| ariaLabel | string \| undefined | No |  |  |  | Prop to specify the aria-label attribute of the component input |  |
| ariaLabelledby | string \| undefined | No |  |  |  | Prop to specify the aria-labelledby property of the component input |  |
| as | React.ElementType<any, keyof React.JSX.IntrinsicElements> \| undefined | No |  |  |  | Override the variant component |  |
| autoFocus | boolean \| undefined | No |  |  |  | If true the Component will be focused when rendered |  |
| deferTimeout | number \| undefined | No |  |  |  | Integer to determine a timeout for the deferred callback |  |
| disabled | boolean \| undefined | No |  |  |  | If true, the component will be disabled |  |
| error | string \| boolean \| undefined | No |  |  |  | Indicate that error has occurred. |  |
| formattedValue | string \| undefined | No |  |  |  | Value to be displayed in the Textbox |  |
| iconOnClick | ((ev: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>) => void) \| undefined | No |  |  |  | Optional handler for click event on Textbox icon |  |
| iconOnMouseDown | ((ev: React.MouseEvent<HTMLElement>) => void) \| undefined | No |  |  |  | Optional handler for mouse down event on Textbox icon |  |
| iconTabIndex | number \| undefined | No |  |  |  | Overrides the default tabindex of the component |  |
| id | string \| undefined | No |  |  |  | Id attribute of the input element |  |
| info | string \| boolean \| undefined | No |  |  |  | [Legacy] Indicate additional information. |  |
| inputHint | string \| undefined | No |  |  |  | A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. |  |
| inputIcon | string \| number \| boolean \| React.ReactElement<any, string \| React.JSXElementConstructor<any>> \| Iterable<React.ReactNode> \| React.ReactPortal \| null \| undefined | No |  |  |  | Type of the icon that will be rendered next to the input |  |
| inputWidth | number \| undefined | No |  |  |  | The width of the input as a percentage |  |
| isOpen | boolean \| undefined | No |  |  |  | If true, the list is displayed |  |
| label | string \| undefined | No |  |  |  | Label content |  |
| labelHelp | React.ReactNode | No |  |  |  | [Legacy] A message that the Help component will display |  |
| labelId | string \| undefined | No |  |  |  | Label id passed from Select component |  |
| labelInline | boolean \| undefined | No |  |  |  | [Legacy] When true label is inline |  |
| labelWidth | number \| undefined | No |  |  |  | [Legacy] Label width |  |
| leftChildren | React.ReactNode | No |  |  |  | Additional child elements to display before the input |  |
| maxWidth | string \| undefined | No |  |  |  | Prop for specifying the max width of the input. Leaving the `maxWidth` prop with no value will default the width to '100%' |  |
| name | string \| undefined | No |  |  |  | Name attribute of the input element |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on blur |  |
| onChangeDeferred | ((ev: React.ChangeEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Deferred callback to be called after the onChange event |  |
| onClick | ((ev: React.MouseEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on click |  |
| onFocus | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on focus |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered onKeyDown |  |
| onMouseDown | ((ev: React.MouseEvent<HTMLElement>) => void) \| undefined | No |  |  |  | Event handler for the mouse down event |  |
| placeholder | string \| undefined | No |  |  |  | Placeholder string to be displayed in input |  |
| prefix | string \| undefined | No |  |  |  | Emphasized part of the displayed text |  |
| readOnly | boolean \| undefined | No |  |  |  | If true, the component will be read-only |  |
| required | boolean \| undefined | No |  |  |  | Flag to configure component as mandatory |  |
| selectedValue | string \| Record<string, unknown> \| (string \| Record<string, unknown>)[] \| undefined | No |  |  |  | Value of the Select Input |  |
| selectType | "simple" \| "filterable" \| "multi" \| undefined | No |  |  |  | Sets the type of select, which determines the behaviour of the textbox. If "simple", the textbox does not allow typing and functions as a standard select. If "filterable", the textbox allows typing and filters the options based on the input value. If "multi", the textbox allows typing and is used for multi-selects, displaying selected options as comma-separated values. |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  |  |  | Size of an input |  |
| transparent | boolean \| undefined | No |  |  |  |  |  |
| validationIconId | string \| undefined | No |  |  |  | Id of the validation icon |  |
| validationMessagePositionTop | boolean \| undefined | No |  |  |  | Render the ValidationMessage above the Textbox input when validationRedesignOptIn flag is set |  |
| warning | string \| boolean \| undefined | No |  |  |  | Indicate that warning has occurred. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-controls | string \| undefined | No |  |  |  | Id attribute of the select list |  |
| aria-describedby | string \| undefined | No |  |  |  | The ID of the input's description, is set along with hint text and error message. |  |
| aria-labelledby | string \| undefined | No |  |  |  | Prop to specify the aria-labelledby property of the component |  |
| adaptiveLabelBreakpoint | number \| undefined | No |  | Yes | `adaptiveLabelBreakpoint` has been deprecated. It is recommended to use `useMediaQuery` hook to implement adaptive behaviour. Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set |  |  |
| fieldHelp | React.ReactNode | No |  | Yes | `fieldHelp` has been deprecated, `inputHint` should be used instead. [Legacy] Help content to be displayed under an input. |  |  |
| helpAriaLabel | string \| undefined | No |  | Yes | `helpAriaLabel` has been deprecated, the functionality will no longer work. |  |  |
| labelAlign | "left" \| "right" \| undefined | No |  | Yes | `labelAlign` has been deprecated, the functionality will no longer work. |  |  |
| labelSpacing | 1 \| 2 \| undefined | No |  | Yes | `labelSpacing` has been deprecated, the functionality will no longer work. |  |  |
| reverse | boolean \| undefined | No |  | Yes | `reverse` has been deprecated, the functionality will no longer work. |  |  |
| tooltipId | string \| undefined | No |  | Yes | `tooltipId` has been deprecated, the functionality will no longer work. |  |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  | Yes | `tooltipPosition` has been deprecated, the functionality will no longer work. |  |  |
| validationOnLabel | boolean \| undefined | No |  | Yes | `validationOnLabel` has been deprecated, the functionality will no longer work. |  |  |

### Option Component

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| borderColor | string \| undefined | No |  | MultiSelect only - custom Pill border color - provide any color from palette or any valid css color value. |  |
| children | React.ReactNode | No |  | Alternative rendered content, displayed within `<SelectList>` of `<Select>` (eg: an icon, an image, etc) |  |
| disabled | boolean \| undefined | No |  | If true, the component will be disabled |  |
| fill | boolean \| undefined | No |  | MultiSelect only - fill Pill background with color |  |
| id | string \| undefined | No |  | Unique identifier for the component. Will use a randomly generated GUID if none is provided. |  |
| index | number \| undefined | No |  |  |  |
| onClick | ((value: string \| Record<string, unknown>) => void) \| undefined | No |  |  |  |
| onSelect | ((target: OptionData) => void) \| undefined | No |  |  |  |
| text | string \| undefined | No |  | The option's visible text, displayed within `<Textbox>` of `<Select>`, and used for filtering |  |
| value | string \| Record<string, unknown> \| undefined | No |  | The option's invisible internal value, if this is not passed the option will not be treated as interactive or selectable |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
