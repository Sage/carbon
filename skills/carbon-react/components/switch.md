---
name: carbon-component-switch
description: Carbon Switch component props and usage examples.
---

# Switch

## Import
`import Switch from "carbon-react/lib/components/switch";`

## Source
- Export: `./components/switch`
- Props interface: `SwitchProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| checked | boolean | Yes |  |  |  | Checked state of the switch |  |
| onChange | (ev: React.ChangeEvent<HTMLInputElement>) => void | Yes |  |  |  | OnChange event handler |  |
| autoFocus | boolean \| undefined | No |  |  |  | If true, the input will auto-focus on mount |  |
| disabled | boolean \| undefined | No |  |  |  | Disables the switch |  |
| id | string \| undefined | No |  |  |  | The id attribute of the hidden input |  |
| inputHint | React.ReactNode | No |  |  |  | Hint text displayed below the switch |  |
| label | React.ReactNode | No |  |  |  | Accessible text label rendered above the switch |  |
| labelInline | boolean \| undefined | No |  |  |  | When true, the label is displayed inline (beside the switch) rather than above it |  |
| labelSpacing | 1 \| 2 \| undefined | No |  |  |  | Spacing between the label and switch when labelInline is true (multiplier of base spacing unit) |  |
| labelWidth | number \| undefined | No |  |  |  | Label width as a percentage when labelInline is true |  |
| loading | boolean \| undefined | No |  |  |  | Triggers the loading state — hides On/Off text and shows a spinner |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| name | string \| undefined | No |  |  |  | The name attribute of the hidden input |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | OnBlur event handler |  |
| onFocus | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | OnFocus event handler |  |
| processingLabel | string \| undefined | No |  |  |  | Text shown beside the spinner during loading. Defaults to "Processing..." |  |
| processingLabelBelowSwitch | boolean \| undefined | No |  |  |  | When true, the processing label is rendered below the switch rather than to its right |  |
| required | boolean \| undefined | No |  |  |  | Whether the input is required |  |
| size | "small" \| "large" \| undefined | No |  |  |  | Size of the switch track |  |
| value | string \| undefined | No |  |  |  | The value attribute of the hidden input, passed on form submit |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| error | string \| boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| fieldHelp | React.ReactNode | No |  | Yes | Use `inputHint` instead. |  |  |
| fieldHelpInline | boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| helpAriaLabel | string \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| info | string \| boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| isDarkBackground | boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| labelHelp | React.ReactNode | No |  | Yes | Use `inputHint` instead. |  |  |
| reverse | boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| validationMessagePositionTop | boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| validationOnLabel | boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| warning | string \| boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |

## Examples
### Default

**Render**

```tsx
() => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      label="Toggle notifications"
      inputHint="Hint text"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}
```


### Checked

**Render**

```tsx
() => {
  const [checked, setChecked] = useState(true);
  return (
    <Switch
      label="Toggle notifications"
      inputHint="Hint text"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}
```


### Disabled

**Render**

```tsx
() => (
  <Switch
    label="Toggle notifications"
    inputHint="Hint text"
    checked={false}
    disabled
    onChange={() => {}}
  />
)
```


### Disabled (checked)

**Render**

```tsx
() => (
  <Switch
    label="Toggle notifications"
    checked
    disabled
    inputHint="Hint text"
    onChange={() => {}}
  />
)
```


### Required

**Render**

```tsx
() => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      label="Toggle notifications"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
      required
    />
  );
}
```


### Large size

**Render**

```tsx
() => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      label="Toggle notifications"
      inputHint="Hint text"
      size="large"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}
```


### Label inline

**Render**

```tsx
() => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      label="Toggle notifications"
      labelInline
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}
```


### Label inline with hint

**Render**

```tsx
() => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      label="Label"
      inputHint="Hint text"
      labelInline
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}
```


### Loading

**Render**

```tsx
() => (
  <>
    <Switch
      label="Toggle notifications"
      checked={false}
      loading
      onChange={() => {}}
    />

    <Switch
      label="Toggle notifications"
      checked
      loading
      onChange={() => {}}
      ml="8px"
    />

    <Switch
      size="large"
      label="Toggle notifications"
      checked={false}
      loading
      onChange={() => {}}
      ml="8px"
    />

    <Switch
      size="large"
      label="Toggle notifications"
      checked
      loading
      onChange={() => {}}
      ml="8px"
    />
  </>
)
```


### Loading with custom processingLabel

**Render**

```tsx
() => (
  <Switch
    label="Toggle notifications"
    checked={false}
    loading
    processingLabel="Saving changes..."
    onChange={() => {}}
  />
)
```


### Loading with processingLabel below switch

**Render**

```tsx
() => (
  <Switch
    label="Toggle notifications"
    checked={false}
    loading
    processingLabelBelowSwitch
    onChange={() => {}}
  />
)
```

