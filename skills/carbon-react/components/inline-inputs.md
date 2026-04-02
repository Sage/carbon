---
name: carbon-component-inline-inputs
description: Carbon InlineInputs component props and usage examples.
---

# InlineInputs

## Import
`import InlineInputs from "carbon-react/lib/components/inline-inputs";`

## Source
- Export: `./components/inline-inputs`
- Props interface: `InlineInputsProps`
- Deprecated: Yes
- Deprecation reason: `InlineInputs` has been deprecated. See the Carbon documentation for migration details.

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| adaptiveLabelBreakpoint | number \| undefined | No |  | Breakpoint for adaptive label (inline label change to top aligned). Enables the adaptive behaviour when set |  |
| children | React.ReactNode | No |  | Children elements | null |
| className | string \| undefined | No |  |  |  |
| gutter | GutterOptions \| undefined | No |  | Gutter prop gets passed down to Row component if false gutter value is "none" | "none" |
| htmlFor | string \| undefined | No |  | The id of the corresponding input control for the label |  |
| inputWidth | number \| undefined | No |  | Width of the inline inputs container in percentage |  |
| label | string \| undefined | No |  | Defines the label text for the heading. |  |
| labelAlign | "left" \| "right" \| undefined | No |  | Inline label alignment |  |
| labelId | string \| undefined | No |  | Custom label id, could be used in combination with aria-labelledby prop of each input, to make them accessible for screen readers. |  |
| labelInline | boolean \| undefined | No |  |  | true |
| labelWidth | number \| undefined | No |  | Width of a label in percentage |  |
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
| required | boolean \| undefined | No |  | Flag to configure component as mandatory. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Render**

```tsx
() => {
  let validationProps = {};
  validationProps = {
    hasWarning: true,
    inputIcon: "warning",
    tooltipMessage: "warning",
  };
  const [decimalValue, setDecimalValue] = useState("0.00");
  const [selectValue, setSelectValue] = useState("");
  const handleDecimalChange = (ev: {
    target: { value: { rawValue: React.SetStateAction<string> } };
  }) => {
    setDecimalValue(ev.target.value.rawValue);
  };
  const handleSelectChange = (ev: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectValue(ev.target.value);
  };
  return (
    <InlineInputs
      label="Inline Inputs"
      labelId="inline-inputs-default"
      gutter="none"
    >
      <Textbox
        aria-labelledby="inline-inputs-default"
        {...validationProps}
        value=""
        onChange={() => {}}
      />
      <Decimal
        aria-labelledby="inline-inputs-default"
        value={decimalValue}
        onChange={handleDecimalChange}
      />
      <Select
        value={selectValue}
        onChange={handleSelectChange}
        aria-labelledby="inline-inputs-default"
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </Select>
    </InlineInputs>
  );
}
```


### Label Align

**Render**

```tsx
() => {
  return (
    <Box>
      {(["right", "left"] as const).map((alignment) => (
        <InlineInputs
          label="My Inline Inputs"
          labelAlign={alignment}
          labelId="inline-inputs-align"
          labelWidth={30}
        >
          <Textbox
            aria-labelledby="inline-inputs-align"
            value=""
            onChange={() => {}}
          />
          <Textbox
            aria-labelledby="inline-inputs-align"
            value=""
            onChange={() => {}}
          />
        </InlineInputs>
      ))}
    </Box>
  );
}
```


### Required

**Render**

```tsx
() => {
  return (
    <InlineInputs
      label="Inline Inputs"
      labelId="inline-inputs-required"
      required
    >
      <Textbox
        aria-labelledby="inline-inputs-required"
        value=""
        onChange={() => {}}
      />
      <Textbox
        aria-labelledby="inline-inputs-required"
        value=""
        onChange={() => {}}
      />
    </InlineInputs>
  );
}
```


### With Adaptive Label Breakpoint

**Render**

```tsx
() => {
  return (
    <Box p={4}>
      <InlineInputs
        label="My Inline Inputs"
        labelId="inline-inputs-adaptive"
        adaptiveLabelBreakpoint={768}
        labelWidth={30}
        gutter="none"
      >
        <Textbox
          aria-labelledby="inline-inputs-adaptive"
          value=""
          onChange={() => {}}
        />
        <Textbox
          aria-labelledby="inline-inputs-adaptive"
          value=""
          onChange={() => {}}
        />
      </InlineInputs>
      <Textbox
        label="My Textbox"
        adaptiveLabelBreakpoint={768}
        value=""
        onChange={() => {}}
      />
    </Box>
  );
}
```

