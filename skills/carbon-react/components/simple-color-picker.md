---
name: carbon-component-simple-color-picker
description: Carbon SimpleColorPicker component props and usage examples.
---

# SimpleColorPicker

## Import
`import { SimpleColorPicker } from "carbon-react/lib/components/simple-color-picker";`

## Source
- Export: `./components/simple-color-picker`
- Props interface: `SimpleColorPickerProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| legend | string | Yes |  | The content for the Legend |  |
| name | string | Yes |  | The name to apply to the input. |  |
| onChange | (ev: React.ChangeEvent<HTMLInputElement>) => void | Yes |  | Prop for `onChange` events |  |
| value | string | Yes |  | The currently selected color. |  |
| children | React.ReactNode | No |  | The SimpleColor components to be rendered in the group |  |
| childWidth | string \| number \| undefined | No |  | prop that represents childWidth |  |
| error | string \| boolean \| undefined | No |  | Indicate that error has occurred. |  |
| info | string \| boolean \| undefined | No |  | [Legacy] Indicate additional information. |  |
| m | SpacingProperty | No |  |  |  |
| margin | SpacingProperty | No |  |  |  |
| marginBottom | SpacingProperty | No |  |  |  |
| marginLeft | SpacingProperty | No |  |  |  |
| marginRight | SpacingProperty | No |  |  |  |
| marginTop | SpacingProperty | No |  |  |  |
| marginX | SpacingProperty | No |  |  |  |
| marginY | SpacingProperty | No |  |  |  |
| maxWidth | string \| number \| undefined | No |  | prop that sets max-width in css |  |
| mb | SpacingProperty | No |  |  |  |
| ml | SpacingProperty | No |  |  |  |
| mr | SpacingProperty | No |  |  |  |
| mt | SpacingProperty | No |  |  |  |
| mx | SpacingProperty | No |  |  |  |
| my | SpacingProperty | No |  |  |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | Prop for `onBlur` events |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLInputElement>) => void) \| undefined | No |  | Prop for `onKeyDown` events |  |
| required | boolean \| undefined | No |  | Flag to configure component as mandatory |  |
| validationOnLegend | boolean \| undefined | No |  | When true, validation icon will be placed on legend instead of being placed by the input |  |
| warning | string \| boolean \| undefined | No |  | Indicate that warning has occurred. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Render**

```tsx
() => {
  const [state, setState] = useState("transparent");
  const colors = [
    { color: "transparent", label: "transparent" },
    { color: "#0073C1", label: "blue" },
    { color: "#582C83", label: "purple" },
    { color: "#E96400", label: "orange" },
    { color: "#99ADB6", label: "gray" },
    { color: "#C7384F", label: "flush mahogany" },
    { color: "#004500", label: "dark green" },
    { color: "#FFB500", label: "yellow" },
    { color: "#335C6D", label: "dark blue" },
    { color: "#00DC00", label: "light blue" },
  ];

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <SimpleColorPicker
      name="picker-default-example"
      legend="Legend"
      onChange={onChange}
      value={state}
    >
      {colors.map(({ color, label }) => (
        <SimpleColor value={color} key={color} aria-label={label} />
      ))}
    </SimpleColorPicker>
  );
}
```


### Disabled

**Render**

```tsx
() => {
  const [state, setState] = useState("transparent");

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <SimpleColorPicker
      name="picker-disabled-example"
      legend="Legend"
      onChange={onChange}
      value={state}
    >
      {[
        { color: "transparent", label: "transparent" },
        { color: "#0073C1", label: "blue" },
        { color: "#582C83", label: "purple" },
      ].map(({ color, label }) => (
        <SimpleColor value={color} key={color} aria-label={label} disabled />
      ))}
    </SimpleColorPicker>
  );
}
```


### Required

**Render**

```tsx
() => {
  const [state, setState] = useState("transparent");

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <SimpleColorPicker
      legend="Legend"
      required
      onChange={onChange}
      value={state}
      name="picker-required-example"
    >
      {[
        { color: "transparent", label: "transparent" },
        { color: "#0073C1", label: "blue" },
        { color: "#582C83", label: "purple" },
      ].map(({ color, label }) => (
        <SimpleColor value={color} key={color} aria-label={label} />
      ))}
    </SimpleColorPicker>
  );
}
```


### With Margin

**Render**

```tsx
() => {
  const [state, setState] = useState("transparent");

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  const colors = [
    { color: "transparent", label: "transparent" },
    { color: "#0073C1", label: "blue" },
    { color: "#582C83", label: "purple" },
  ];

  return (
    <SimpleColorPicker
      name="with-margin"
      legend="Legend"
      onChange={onChange}
      value={state}
      m={4}
    >
      {colors.map(({ color, label }) => (
        <SimpleColor value={color} key={color} aria-label={label} />
      ))}
    </SimpleColorPicker>
  );
}
```

