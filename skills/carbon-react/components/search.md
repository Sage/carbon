---
name: carbon-component-search
description: Carbon Search component props and usage examples.
---

# Search

## Import
`import Search from "carbon-react/lib/components/search/search.component";`

## Source
- Export: `./components/search/search.component`
- Props interface: `SearchProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| onChange | (ev: SearchEvent) => void | Yes |  |  |  | Prop for `onChange` events on the Search input |  |
| value | string | Yes |  |  |  | Current value |  |
| className | string \| undefined | No |  |  |  |  |  |
| error | string \| boolean \| undefined | No |  |  |  | Indicate that error has occurred. |  |
| id | string \| undefined | No |  |  |  | Unique identifier for the input. Label id will be based on it, using following pattern: [id]-label. Will use a randomly generated GUID if none is provided. |  |
| inputHint | string \| undefined | No |  |  |  | A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. |  |
| inputWidth | number \| undefined | No |  |  |  | The width of the input as a percentage |  |
| inverse | boolean \| undefined | No |  |  |  | When set to `true`, inverts the Search input and button styling for use on darker backgrounds. |  |
| label | string \| undefined | No |  |  |  | Label content |  |
| labelInline | boolean \| undefined | No |  |  |  | When true label is inline. |  |
| listData | SearchListGroup[] \| undefined | No |  |  |  | Structured list data to render as grouped menu items in the popover. |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| maxHeight | string \| undefined | No |  |  |  | Optional max-height for the dropdown list. Overrides size-based defaults when provided. |  |
| maxWidth | string \| undefined | No |  |  |  | Prop for specifying the max-width of the Search input. Leaving the `maxWidth` prop with no value will default the width to '100%' |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| minQueryLength | number \| undefined | No |  |  |  | Minimum number of characters required before announcing available results. |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| name | string \| undefined | No |  |  |  | Name of the input |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Event handler for the blur event |  |
| onClick | ((ev: SearchEvent) => void) \| undefined | No |  |  |  | Prop for `onClick` events on the Search button. `onClick` events are triggered when the Search button is clicked or when the Search input's cross icon is clicked if the `triggerOnClear` prop is set to `true`. |  |
| onClose | ((event?: Event, value?: string) => void) \| undefined | No |  |  |  | Callback fired when the popover requests to close. |  |
| onFocus | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Event handler for the focus event |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on keyDown |  |
| onListItemSelect | ((value: string) => void) \| undefined | No |  |  |  | Callback fired when a list item is selected. Receives the item's value. |  |
| open | boolean \| undefined | No |  |  |  | When `true`, renders the new popover menu anchored to the Search input. |  |
| required | boolean \| undefined | No |  |  |  | Flag to configure component as mandatory |  |
| searchButtonAriaLabel | string \| undefined | No |  |  |  | Prop to specify the accessible name of the Search button |  |
| searchButtonDataProps | TagProps \| undefined | No |  |  |  | Data tag prop bag for searchButton |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  |  |  | Size of an input |  |
| triggerOnClear | boolean \| undefined | No |  |  |  | Sets whether the `onClick` action should be triggered when the Search cross icon is clicked. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  |  |  | Prop to specify the accessible name of the Search input. To be used when no visible label is provided |  |
| info | string \| boolean \| undefined | No |  | Yes | This prop no longer has any effect. This prop will eventually be removed. |  |  |
| placeholder | string \| undefined | No |  | Yes | This prop no longer has any effect. This prop will eventually be removed. |  |  |
| searchButton | string \| boolean \| undefined | No |  | Yes | This prop no longer has any effect. This prop will eventually be removed. Pass a boolean to render a search Button with default text. Pass a string to override the text in the search Button |  |  |
| searchWidth | string \| undefined | No |  | Yes | This prop no longer has any effect. This prop will eventually be removed. Use `inputWidth` instead. Prop for specifying the width of the Search container. This value is mapped to `inputWidth`. Leaving the `searchWidth` prop with no value will default the width to '100%' |  |  |
| tabIndex | number \| undefined | No |  | Yes | This prop no longer has any effect. This prop will eventually be removed. Input tabindex |  |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  | Yes | `tooltipPosition` has been deprecated, the functionality will no longer work. |  |  |
| variant | "default" \| "dark" \| undefined | No |  | Yes | This prop no longer has any effect. This prop will eventually be removed. `variant="dark"` is mapped to `inverse={true}` to preserve legacy behavior. |  |  |
| warning | string \| boolean \| undefined | No |  | Yes | This prop no longer has any effect. This prop will eventually be removed. |  |  |

## Examples
### With Dropdown

**Render**

```tsx
() => {
  const minQueryLength = 2;

  const recentItems = [
    { value: "Recent term 1", label: "Recent term 1" },
    { value: "Recent term 2", label: "Recent term 2" },
    { value: "Recent term 3", label: "Recent term 3" },
  ];

  const suggestedItems = [
    { value: "Suggested term 1", label: "Suggested term 1" },
    { value: "Suggested term 2", label: "Suggested term 2" },
    { value: "Suggested term 3", label: "Suggested term 3" },
    { value: "Suggested term 4", label: "Suggested term 4" },
    { value: "Suggested term 5", label: "Suggested term 5" },
  ];

  const [value, setValue] = useState("");
  const [dismissed, setDismissed] = useState(false);

  const match = <T extends { label: string }>(items: T[]) =>
    items.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase()),
    );

  const filteredRecent = match(recentItems);
  const filteredSuggested = match(suggestedItems);

  const listData = [
    ...(filteredRecent.length > 0
      ? [
          {
            heading: "Recent searches",
            icon: <Icon type="refresh_clock" />,
            items: filteredRecent,
          },
        ]
      : []),
    ...(filteredSuggested.length > 0
      ? [
          {
            heading: "Suggested",
            icon: <Icon type="search" />,
            items: filteredSuggested,
          },
        ]
      : []),
  ];

  const isOpen =
    value.length >= minQueryLength && listData.length > 0 && !dismissed;

  return (
    <Box height="300px" width="700px">
      <Search
        label="Search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setDismissed(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setValue("");
            setDismissed(true);
          }
        }}
        onFocus={() => setDismissed(false)}
        open={isOpen}
        minQueryLength={minQueryLength}
        listData={listData}
        onListItemSelect={(val) => {
          setValue(val);
          setDismissed(true);
        }}
        onClose={() => setDismissed(true)}
      />
    </Box>
  );
}
```

