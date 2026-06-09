---
name: carbon-component-fieldset
description: Carbon Fieldset component props and usage examples.
---

# Fieldset

## Import
`import Fieldset from "carbon-react/lib/components/fieldset";`

## Source
- Export: `./components/fieldset`
- Props interface: `FieldsetProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Inputs rendered within the fieldset. |  |
| error | string \| undefined | No |  | Error message to be displayed when validation fails. |  |
| id | string \| undefined | No |  | Set an id value on the fieldset. |  |
| labelWeight | "bold" \| "regular" \| undefined | No |  | Set the label weight of the children input's label. | "regular" |
| legend | string \| undefined | No |  | The content for the fieldset legend. |  |
| legendHint | string \| undefined | No |  | Content for an additional hint text below the legend. |  |
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
| orientation | "horizontal" \| "vertical" \| undefined | No |  | Set the orientation of the fieldset's children. | "vertical" |
| required | boolean \| undefined | No |  | If true, an asterisk will be added to the legend and all inputs within the fieldset will be required. |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  | Set the size of the component. | "medium" |
| validationMessagePositionTop | boolean \| undefined | No |  | Specifies whether the validation message should be displayed above the input. | true |
| warning | string \| undefined | No |  | Warning message to be displayed when validation warning occurs. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Args**

```tsx
{
    legend: "Fieldset Legend",
  }
```

**Render**

```tsx
(args) => (
    <Fieldset {...args}>
      <Textbox label="Input 1" value="Input Text" onChange={() => {}} />
      <Textbox label="Input 2" value="Input Text" onChange={() => {}} />
      <Textbox label="Input 3" value="Input Text" onChange={() => {}} />
    </Fieldset>
  )
```


### WithLegendHint

**Args**

```tsx
{
    ...Default.args,
    legendHint: "Fieldset LegendHint",
  }
```


### HorizontalOrientation

**Args**

```tsx
{
    ...Default.args,
    orientation: "horizontal",
  }
```


### Sizes

**Args**

```tsx
{
    mb: 4,
  }
```

**Render**

```tsx
(args) => (
    <>
      <Fieldset legend="Small Fieldset" size="small" {...args}>
        <Textbox label="Input 1" value="Input Text" onChange={() => {}} />
        <Textbox label="Input 2" value="Input Text" onChange={() => {}} />
        <Textbox label="Input 3" value="Input Text" onChange={() => {}} />
      </Fieldset>
      <Fieldset legend="Medium Fieldset" size="medium" {...args}>
        <Textbox label="Input 1" value="Input Text" onChange={() => {}} />
        <Textbox label="Input 2" value="Input Text" onChange={() => {}} />
        <Textbox label="Input 3" value="Input Text" onChange={() => {}} />
      </Fieldset>
      <Fieldset legend="Large Fieldset" size="large" {...args}>
        <Textbox label="Input 1" value="Input Text" onChange={() => {}} />
        <Textbox label="Input 2" value="Input Text" onChange={() => {}} />
        <Textbox label="Input 3" value="Input Text" onChange={() => {}} />
      </Fieldset>
    </>
  )
```


### HorizontalSizes

**Args**

```tsx
{
    ...Sizes.args,
    orientation: "horizontal",
  }
```


### LabelFontWeight

**Args**

```tsx
{
    ...Default.args,
    labelWeight: "bold",
  }
```


### Required

**Args**

```tsx
{
    ...Default.args,
    required: true,
  }
```

