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
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| onChange | (ev: SearchEvent) => void | Yes |  | Prop for `onChange` events |  |
| value | string | Yes |  | Current value |  |
| error | string \| boolean \| undefined | No |  | Indicate that error has occurred. |  |
| id | string \| undefined | No |  | Prop for `id` |  |
| info | string \| boolean \| undefined | No |  | [Legacy] Indicate additional information. |  |
| inputHint | string \| undefined | No |  | A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. |  |
| label | string \| undefined | No |  | Label content |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| maxWidth | string \| undefined | No |  | Prop for specifying the max-width of the input. Leaving the `maxWidth` prop with no value will default the width to '100%' |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| name | string \| undefined | No |  | Prop for `name` |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | Prop for `onBlur` events |  |
| onClick | ((ev: SearchEvent) => void) \| undefined | No |  | Prop for `onClick` events. `onClick` events are triggered when the `searchButton` is clicked |  |
| onFocus | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | Prop for `onFocus` events |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLInputElement>) => void) \| undefined | No |  | Prop for `onKeyDown` events |  |
| placeholder | string \| undefined | No |  | Prop for a placeholder |  |
| searchButton | string \| boolean \| undefined | No |  | Pass a boolean to render a search Button with default text. Pass a string to override the text in the search Button |  |
| searchButtonAriaLabel | string \| undefined | No |  | Prop to specify the aria-label of the search button |  |
| searchButtonDataProps | TagProps \| undefined | No |  | Data tag prop bag for searchButton |  |
| searchWidth | string \| undefined | No |  | Prop for specifying an input width length. Leaving the `searchWidth` prop with no value will default the width to '100%' |  |
| tabIndex | number \| undefined | No |  | Input tabindex |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  | [Legacy] Overrides the default tooltip position |  |
| triggerOnClear | boolean \| undefined | No |  | Sets whether the onClick action should be triggered when the Search cross icon is clicked. |  |
| variant | "default" \| "dark" \| undefined | No |  | Prop to specify the styling of the search component |  |
| warning | string \| boolean \| undefined | No |  | Indicate that warning has occurred. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  | Prop to specify the aria-label of the search component |  |

## Examples
### Default

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  return (
    <Search
      placeholder="Search..."
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
}
```


### With Label and Input Hint

**Render**

```tsx
() => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Box m={1}>
      <Search
        label="Search"
        inputHint="Hint text (optional)."
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </Box>
  );
}
```


### With Search Button

**Render**

```tsx
() => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Box m={1}>
      <Search
        onChange={(e) => setValue(e.target.value)}
        value={value}
        searchButton
        searchButtonAriaLabel="search button aria label"
      />
    </Box>
  );
}
```


### With Search Button text override via prop

**Render**

```tsx
() => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Box m={1}>
      <Search
        onChange={(e) => setValue(e.target.value)}
        value={value}
        searchButton="Find"
      />
    </Box>
  );
}
```


### With Search Button text override via locale

**Render**

```tsx
() => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Box m={1}>
      <I18nProvider locale={{ search: { searchButtonText: () => "Find" } }}>
        <Search
          onChange={(e) => setValue(e.target.value)}
          value={value}
          searchButton
        />
      </I18nProvider>
    </Box>
  );
}
```


### Custom Width

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  return (
    <Search
      placeholder="Search..."
      onChange={(e) => setValue(e.target.value)}
      value={value}
      searchWidth="375px"
    />
  );
}
```


### Custom Max Width

**Render**

```tsx
() => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Box m={1}>
      <Search
        onChange={(e) => setValue(e.target.value)}
        value={value}
        searchButton
        maxWidth="50%"
      />
    </Box>
  );
}
```


### Dark Background variant

**Render**

```tsx
() => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Box width="700px" height="108px" p={4} backgroundColor="#000000">
      <Search
        placeholder="Search..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
        variant="dark"
        mb={2}
      />
      <Search
        placeholder="Search..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
        searchButton
        variant="dark"
      />
    </Box>
  );
}
```


### Trigger on Clear

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  return (
    <>
      <Search
        id="test"
        name="test"
        placeholder="Search..."
        triggerOnClear
        onChange={(e) => setValue(e.target.value)}
        value={value}
        searchButton
      />
    </>
  );
}
```

