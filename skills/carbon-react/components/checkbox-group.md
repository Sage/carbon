---
name: carbon-component-checkbox-group
description: Carbon CheckboxGroup component props and usage examples.
---

# CheckboxGroup

## Import
`import { CheckboxGroup } from "carbon-react/lib/components/checkbox";`

## Source
- Export: `./components/checkbox`
- Props interface: `CheckboxGroupProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  |  |  | The Checkboxes to be rendered in the group |  |
| disabled | boolean \| undefined | No |  |  |  | Flag to disable the CheckboxGroup. |  |
| error | string \| undefined | No |  |  |  | Error message to be displayed when validation fails. |  |
| id | string \| undefined | No |  |  |  | Unique identifier for the component. Will use a randomly generated GUID if none is provided. |  |
| inline | boolean \| undefined | No |  |  |  | When true, Checkbox children are inline. |  |
| legend | string \| undefined | No |  |  |  | The content for the CheckboxGroup Legend |  |
| legendHint | string \| undefined | No |  |  |  | Content for the hint text below the legend. |  |
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
| required | boolean \| undefined | No |  |  |  | Flag to configure CheckboxGroup as mandatory |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  |  |  | Size of the CheckboxGroup. | "medium" |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| info | string \| boolean \| undefined | No |  | Yes | Information validation is no longer supported on this component. | [Legacy] Indicate additional information. |  |
| labelSpacing | 1 \| 2 \| undefined | No |  | Yes | Custom spacing for labels is no longer supported on this component. | Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) |  |
| legendAlign | "left" \| "right" \| undefined | No |  | Yes | Right legend alignment is no longer supported. | [Legacy] Alignment of the legend. |  |
| legendHelp | string \| undefined | No |  | Yes | The `legendHelp` prop is deprecated and will be removed in a future release. Please use the `legendHint` prop instead. | The content for the RadioButtonGroup hint text, will only be rendered when `validationRedesignOptIn` is true. |  |
| legendInline | boolean \| undefined | No |  | Yes | Inline legends are no longer supported on this component. | [Legacy] When true, legend is placed in line with the Checkboxes. |  |
| legendSpacing | 1 \| 2 \| undefined | No |  | Yes | Custom spacing for legends is no longer supported on this component. | [Legacy] Spacing between legend and field for inline legend, number multiplied by base spacing unit (8) |  |
| legendWidth | number \| undefined | No |  | Yes | Inline legends are no longer supported on this component. | [Legacy] Percentage width of legend (only when legend is inline) |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  | Yes | Tooltips are no longer supported on this component. | Overrides the default tooltip position |  |
| validationMessagePositionTop | boolean \| undefined | No |  | Yes | The `validationMessagePositionTop` prop is deprecated and will be removed in a future release. | Render the ValidationMessage above the CheckboxGroup | true |
| warning | string \| undefined | No |  | Yes | The `warning` state is deprecated and will be removed in a future release. | Warning message to be displayed when validation warning occurs. |  |

## Examples
### Validation

**Args**

```tsx
{
    legendHint: "Hint Text",
  }
```

**Render**

```tsx
(args) => (
    <Box m={2} display="flex" gap={4}>
      <Box display="flex" flexDirection="column" gap={2}>
        <ControlledCheckboxGroup
          legend="With Error Small"
          error="Error Message"
          size="small"
          required
          {...args}
        />
        <ControlledCheckboxGroup
          legend="With Warning Small"
          warning="Warning Message"
          size="small"
          {...args}
        />
        <ControlledCheckboxGroup
          legend="With Error at Bottom Small"
          error="Error Message"
          validationMessagePositionTop={false}
          size="small"
          {...args}
        />
        <ControlledCheckboxGroup
          legend="With Warning at Bottom Small"
          warning="Warning Message"
          validationMessagePositionTop={false}
          size="small"
          {...args}
        />
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <ControlledCheckboxGroup
          legend="With Error"
          error="Error Message"
          required
          {...args}
        />
        <ControlledCheckboxGroup
          legend="With Warning"
          warning="Warning Message"
          {...args}
        />
        <ControlledCheckboxGroup
          legend="With Error at Bottom"
          error="Error Message"
          validationMessagePositionTop={false}
          {...args}
        />
        <ControlledCheckboxGroup
          legend="With Warning at Bottom"
          warning="Warning Message"
          validationMessagePositionTop={false}
          {...args}
        />
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <ControlledCheckboxGroup
          legend="With Error Large"
          error="Error Message"
          size="large"
          required
          {...args}
        />
        <ControlledCheckboxGroup
          legend="With Warning Large"
          warning="Warning Message"
          size="large"
          {...args}
        />
        <ControlledCheckboxGroup
          legend="With Error at Bottom Large"
          error="Error Message"
          validationMessagePositionTop={false}
          size="large"
          {...args}
        />
        <ControlledCheckboxGroup
          legend="With Warning at Bottom Large"
          warning="Warning Message"
          validationMessagePositionTop={false}
          size="large"
          {...args}
        />
      </Box>
    </Box>
  )
```


### ValidationInline

**Args**

```tsx
{
    ...Validation.args,
    inline: true,
  }
```


### In Tabs

**Render**

```tsx
() => {
  return (
    <Tabs>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label="Tab with Error" />
        <Tab id="tab-2" controls="tab-panel-2" label="Tab with Warning" />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        <ControlledCheckboxGroup
          legend="With Error"
          error="Error Message"
          required
        />
      </TabPanel>
      <TabPanel id="tab-panel-2" tabId="tab-2">
        <ControlledCheckboxGroup
          legend="With Warning"
          warning="Warning Message"
          required
        />
      </TabPanel>
    </Tabs>
  );
}
```


### Default

**Render**

```tsx
ControlledCheckboxGroup
```


### WithLegend

**Args**

```tsx
{
    legend: "Legend",
  }
```


### WithLegendHint

**Args**

```tsx
{
    ...WithLegend.args,
    legendHint: "Legend Hint",
  }
```


### Inline

**Args**

```tsx
{
    ...WithLegend.args,
    inline: true,
  }
```


### Sizes

**Render**

```tsx
() => {
  const [valuesBySize, setValuesBySize] = useState<
    Record<"small" | "medium" | "large", string[]>
  >({
    small: [],
    medium: [],
    large: [],
  });

  const handleChange =
    (size: "small" | "medium" | "large") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = event.target;
      setValuesBySize((prev) => ({
        ...prev,
        [size]: checked
          ? [...prev[size], value]
          : prev[size].filter((val) => val !== value),
      }));
    };

  const sizeConfigs: Array<{
    size: "small" | "medium" | "large";
    legend: string;
  }> = [
    { size: "small", legend: "Small Checkbox Group" },
    { size: "medium", legend: "Medium Checkbox Group" },
    { size: "large", legend: "Large Checkbox Group" },
  ];

  const options = ["1", "2", "3"];

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-around">
      {sizeConfigs.map(({ size, legend }) => (
        <CheckboxGroup key={size} legend={legend} size={size}>
          {options.map((option) => {
            const value = `${size}-${option}`;
            return (
              <Checkbox
                key={value}
                value={value}
                label={`Checkbox ${option}`}
                checked={valuesBySize[size].includes(value)}
                onChange={handleChange(size)}
              />
            );
          })}
        </CheckboxGroup>
      ))}
    </Box>
  );
}
```


### Required

**Args**

```tsx
{
    ...WithLegend.args,
    required: true,
  }
```


### Disabled

**Args**

```tsx
{
    ...WithLegendHint.args,
    required: true,
    disabled: true,
  }
```

