---
name: carbon-component-checkbox-group
description: Carbon CheckboxGroup component props and usage examples.
---

# CheckboxGroup

## Import
`import { CheckboxGroup } from "carbon-sage/lib/components/checkbox";`

## Source
- Export: `./components/checkbox`
- Props interface: `CheckboxGroupProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | The Checkboxes to be rendered in the group |  |
| error | string \| boolean \| undefined | No |  | Indicate that error has occurred. |  |
| id | string \| undefined | No |  | Unique identifier for the component. Will use a randomly generated GUID if none is provided. |  |
| info | string \| boolean \| undefined | No |  | [Legacy] Indicate additional information. |  |
| inline | boolean \| undefined | No |  | When true, Checkboxes are inline |  |
| labelSpacing | 1 \| 2 \| undefined | No |  | Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) |  |
| legend | string \| undefined | No |  | The content for the CheckboxGroup Legend |  |
| legendAlign | "left" \| "right" \| undefined | No |  | [Legacy] Text alignment of legend when inline | "left" |
| legendHelp | string \| undefined | No |  | The content for the CheckboxGroup hint text, will only be rendered when `validationRedesignOptIn` is true. |  |
| legendInline | boolean \| undefined | No |  | [Legacy] When true, legend is placed inline with the checkboxes |  |
| legendSpacing | 1 \| 2 \| undefined | No |  | [Legacy] Spacing between legend and field for inline legend, number multiplied by base spacing unit (8) |  |
| legendWidth | number \| undefined | No |  | [Legacy] Percentage width of legend (only when legend is inline) |  |
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
| required | boolean \| undefined | No |  | Flag to configure component as mandatory |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  | [Legacy] Overrides the default tooltip |  |
| validationMessagePositionTop | boolean \| undefined | No |  | Render the ValidationMessage above the Checkbox inputs when validationRedesignOptIn flag is set | true |
| warning | string \| boolean \| undefined | No |  | Indicate that warning has occurred. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Args**

```tsx
{
    legend: "What fruits do you have?",
  }
```

**Render**

```tsx
(args) => (
    <CheckboxGroup {...args}>
      {["Apple", "Banana", "Cherry", "Date"].map((label) => (
        <Checkbox
          key={label}
          name="fruits"
          label={label}
          value={label}
          checked={false}
          onChange={() => {}}
        />
      ))}
    </CheckboxGroup>
  )
```


### WithLegendHelp

**Args**

```tsx
{
    legend: "What fruits do you have?",
    legendHelp: "Legend Help",
  }
```

**Render**

```tsx
(args) => (
    <CarbonProvider validationRedesignOptIn>
      <ControlledCheckboxGroup {...args} />
    </CarbonProvider>
  )
```


### RequiredGroup

**Args**

```tsx
{
    ...Default.args,
    required: true,
  }
```


### Inline

**Args**

```tsx
{
    inline: true,
    required: true,
    legend: "What fruits do you have?",
  }
```

**Render**

```tsx
(args) => (
    <CarbonProvider validationRedesignOptIn>
      <ControlledCheckboxGroup {...args} />
    </CarbonProvider>
  )
```


### LegacyInlineLegend

**Args**

```tsx
{
    ...Default.args,
    legendInline: true,
    legendWidth: 20,
    legendAlign: "left",
    legendSpacing: 2,
  }
```

