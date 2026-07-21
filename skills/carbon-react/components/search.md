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
| info | string \| boolean \| undefined | No |  |  |  | [Legacy] Indicate additional information. |  |
| inputHint | string \| undefined | No |  |  |  | A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. |  |
| inputWidth | number \| undefined | No |  |  |  | The width of the input as a percentage |  |
| inverse | boolean \| undefined | No |  |  |  | When set to `true`, inverts the Search input and button styling for use on darker backgrounds. |  |
| label | string \| undefined | No |  |  |  | Label content |  |
| labelInline | boolean \| undefined | No |  |  |  | When true label is inline. |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| maxWidth | string \| undefined | No |  |  |  | Prop for specifying the max-width of the Search input. Leaving the `maxWidth` prop with no value will default the width to '100%' |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| name | string \| undefined | No |  |  |  | Name of the input |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Event handler for the blur event |  |
| onClick | ((ev: SearchEvent) => void) \| undefined | No |  |  |  | Prop for `onClick` events on the Search button. `onClick` events are triggered when the Search button is clicked or when the Search input's cross icon is clicked if the `triggerOnClear` prop is set to `true`. |  |
| onFocus | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Event handler for the focus event |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on keyDown |  |
| required | boolean \| undefined | No |  |  |  | Flag to configure component as mandatory |  |
| searchButtonAriaLabel | string \| undefined | No |  |  |  | Prop to specify the accessible name of the Search button |  |
| searchButtonDataProps | TagProps \| undefined | No |  |  |  | Data tag prop bag for searchButton |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  |  |  | Size of an input |  |
| triggerOnClear | boolean \| undefined | No |  |  |  | Sets whether the `onClick` action should be triggered when the Search cross icon is clicked. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  |  |  | Prop to specify the accessible name of the Search input. To be used when no visible label is provided |  |
| placeholder | string \| undefined | No |  | Yes | This prop no longer has any effect. This prop will eventually be removed. |  |  |
| searchButton | string \| boolean \| undefined | No |  | Yes | This prop no longer has any effect. This prop will eventually be removed. Pass a boolean to render a search Button with default text. Pass a string to override the text in the search Button |  |  |
| searchWidth | string \| undefined | No |  | Yes | This prop no longer has any effect. This prop will eventually be removed. Use `inputWidth` instead. Prop for specifying the width of the Search container. This value is mapped to `inputWidth`. Leaving the `searchWidth` prop with no value will default the width to '100%' |  |  |
| tabIndex | number \| undefined | No |  | Yes | This prop no longer has any effect. This prop will eventually be removed. Input tabindex |  |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  | Yes | `tooltipPosition` has been deprecated, the functionality will no longer work. |  |  |
| variant | "default" \| "dark" \| undefined | No |  | Yes | This prop no longer has any effect. This prop will eventually be removed. `variant="dark"` is mapped to `inverse={true}` to preserve legacy behavior. |  |  |
| warning | string \| boolean \| undefined | No |  | Yes | This prop no longer has any effect. This prop will eventually be removed. |  |  |

## Examples
### Default

**Render**

```tsx
() => {
  const [value, setValue] = useState("");

  return <Search value={value} onChange={(e) => setValue(e.target.value)} />;
}
```


### With Label and Input Hint

**Render**

```tsx
() => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Search
      label="Search"
      inputHint="Hint text (optional)."
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
}
```


### Sizes

**Render**

```tsx
() => {
  const [valueS, setValueS] = useState("");
  const [valueM, setValueM] = useState("");
  const [valueL, setValueL] = useState("");
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Search
        label="Small"
        size="small"
        onChange={(e) => setValueS(e.target.value)}
        value={valueS}
      />
      <Search
        label="Medium"
        size="medium"
        onChange={(e) => setValueM(e.target.value)}
        value={valueM}
      />
      <Search
        label="Large"
        size="large"
        onChange={(e) => setValueL(e.target.value)}
        value={valueL}
      />
    </Box>
  );
}
```


### Custom Widths

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Search
        label="searchWidth"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        inputWidth={25}
      />
      <Search
        label="maxWidth"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        maxWidth="75%"
      />
    </Box>
  );
}
```


### Inverse

**Render**

```tsx
() => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Box
      width="700px"
      display="flex"
      flexDirection="column"
      p={3}
      backgroundColor="#000000"
    >
      <Search
        label="Inverse"
        inputHint="Use this prop on darker backgrounds"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        inverse
      />
    </Box>
  );
}
```


### Label Inline

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Search
        label="Search"
        labelInline
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <Search
        label="Search with hint"
        inputHint="Hint text (optional)."
        labelInline
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </Box>
  );
}
```

