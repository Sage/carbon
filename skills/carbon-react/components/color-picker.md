---
name: carbon-component-color-picker
description: Carbon ColorPicker component props and usage examples.
---

# ColorPicker

## Import
`import ColorPicker from "carbon-react/lib/components/color-picker";`

## Source
- Export: `./components/color-picker`
- Props interface: `ColorPickerProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| onChange | (ev: ColorPickerChangeEvent) => void | Yes |  | Callback triggered when a colour is selected |  |
| value | "" \| "blue" \| "teal" \| "green" \| "lime" \| "orange" \| "red" \| "pink" \| "purple" \| "gray" \| "slate" | Yes |  \| blue \| teal \| green \| lime \| orange \| red \| pink \| purple \| gray \| slate | The selected colour, or an empty string when no colour is selected |  |
| autoFocus | boolean \| undefined | No |  | If true the Component will be focused when rendered |  |
| colors | ("blue" \| "teal" \| "green" \| "lime" \| "orange" \| "red" \| "pink" \| "purple" \| "gray" \| "slate")[] \| undefined | No |  | Restricts the colours offered to this subset. All colours are offered when omitted. |  |
| disabled | boolean \| undefined | No |  | If true, the component will be disabled |  |
| error | string \| boolean \| undefined | No |  | Indicate that error has occurred. |  |
| flipEnabled | boolean \| undefined | No |  | Use the opposite list placement if the set placement does not fit |  |
| id | string \| undefined | No |  | Id attribute of the input element |  |
| inputHint | string \| undefined | No |  | A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. |  |
| inputWidth | number \| undefined | No |  | The width of the input as a percentage |  |
| label | string \| undefined | No |  | Label content |  |
| labelInline | boolean \| undefined | No |  | When true label is inline |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| maxWidth | string \| undefined | No |  | Prop for specifying the max width of the input. Leaving the `maxWidth` prop with no value will default the width to '100%' |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| name | string \| undefined | No |  | Name attribute of the input element |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | Specify a callback triggered on blur |  |
| onFocus | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | Specify a callback triggered on focus |  |
| onOpen | (() => void) \| undefined | No |  | A custom callback for when the dropdown menu opens |  |
| openOnFocus | boolean \| undefined | No |  | If true the Component opens on focus |  |
| palette | ColorPickerPalette \| undefined | No | muted \| rich | The colour palette to offer. Muted and rich colours cannot be combined in one picker. | "rich" |
| readOnly | boolean \| undefined | No |  | If true, the component will be read-only |  |
| required | boolean \| undefined | No |  | Flag to configure component as mandatory |  |
| size | "small" \| "medium" \| "large" \| undefined | No | small \| medium \| large | Size of an input | "medium" |
| validationMessagePositionTop | boolean \| undefined | No |  | Render the ValidationMessage above the Textbox input when validationRedesignOptIn flag is set |  |
| warning | string \| boolean \| undefined | No |  | Indicate that warning has occurred. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-describedby | string \| undefined | No |  | Prop to specify the aria-describedby property of the component input |  |
| aria-label | string \| undefined | No |  | Prop to specify the aria-label attribute of the component input |  |
| aria-labelledby | string \| undefined | No |  | Prop to specify the aria-labelledby property of the component input |  |

## Examples
### Default

**Args**

```tsx
{
    label: "Select colour",
    inputHint: "Hint text",
  }
```

**Render**

```tsx
(args) => <ControlledColorPicker {...args} />
```


### Rich palette

**Render**

```tsx
() => (
    <ControlledColorPicker label="Rich colour" palette="rich" value="blue" />
  )
```


### Muted palette

**Render**

```tsx
() => (
    <ControlledColorPicker label="Muted colour" palette="muted" value="pink" />
  )
```


### Filtering the available colours

**Render**

```tsx
() => (
    <ControlledColorPicker
      label="Tag colour"
      colors={["blue", "teal", "green", "orange", "red"]}
    />
  )
```


### Sizes

**Render**

```tsx
() => (
    <>
      {(["small", "medium", "large"] as const).map((size) => (
        <ControlledColorPicker
          key={size}
          label={`Select colour (${size})`}
          size={size}
          value="pink"
          palette="muted"
          mb={2}
        />
      ))}
    </>
  )
```


### Validation

**Render**

```tsx
() => (
    <>
      <ControlledColorPicker
        label="Select colour"
        inputHint="Hint text"
        error="Error message (fix is required)"
        value="pink"
        palette="muted"
        required
        mb={2}
      />
      <ControlledColorPicker
        label="Select colour"
        inputHint="Hint text"
        warning="Warning message (fix is optional)"
        value="pink"
        palette="muted"
      />
    </>
  )
```


### Disabled and read only

**Render**

```tsx
() => (
    <>
      <ControlledColorPicker
        label="Disabled"
        value="pink"
        palette="muted"
        disabled
        mb={2}
      />
      <ControlledColorPicker
        label="Read only"
        value="pink"
        palette="muted"
        readOnly
      />
    </>
  )
```

