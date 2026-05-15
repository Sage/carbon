---
name: carbon-component-button-toggle
description: Carbon ButtonToggle component props and usage examples.
---

# ButtonToggle

## Import
`import { ButtonToggle } from "carbon-react/lib/components/button-toggle";`

## Source
- Export: `./components/button-toggle`
- Props interface: `ButtonToggleProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| allowDeselect | boolean \| undefined | No |  |  |  | Allow a selected button to be deselected. |  |
| buttonIcon | IconType \| undefined | No |  |  |  | Icon rendered within the button. Will not be rendered if size is small. |  |
| children | React.ReactNode | No |  |  |  | Content to display within the button. |  |
| disabled | boolean \| undefined | No |  |  |  | Disable the ButtonToggle. |  |
| onBlur | ((ev: React.FocusEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback triggered by blur event on the button. |  |
| onClick | ((ev: React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback triggered by click event on the button. |  |
| onFocus | ((ev: React.FocusEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback triggered by focus event on the button. |  |
| value | string \| undefined | No |  |  |  | An optional string by which to identify the button in d an onChange handler on the parent ButtonToggleGroup. |  |
| data-component | string \| undefined | No |  |  |  |  |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  |  |  | Prop to specify the aria-label of the component |  |
| aria-labelledby | string \| undefined | No |  |  |  | Prop to specify the aria-labelledby property of the component |  |
| buttonIconSize | "small" \| "large" \| undefined | No |  | Yes | `buttonIconSize` is no longer supported. | Sets the size of the buttonIcon |  |
| pressed | boolean \| undefined | No |  | Yes | Please control the state of selected buttons through ButtonToggleGroup. | Set the pressed state of the toggle button. |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  | Yes | Please set the size of the component through the ButtonToggleGroup `size` prop. | ButtonToggle size. |  |

## Examples
### Default

**Args**

```tsx
{
    "aria-label": "Button Toggle Group",
    value: "default-2",
  }
```

**Render**

```tsx
ControlledButtonToggleGroup
```


### WithLabelAndHint

**Args**

```tsx
{
    id: "with-label",
    label: "Label",
    inputHint: "Hint Text",
    value: "with-label-2",
  }
```


### With Icon

**Render**

```tsx
({ ...args }: ButtonToggleGroupProps) => {
  const [value, setValue] = useState("icon-left");

  const handleOnChange = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setValue(selectedValue as string);
  };

  return (
    <ButtonToggleGroup
      {...args}
      id="icon"
      value={value}
      onChange={handleOnChange}
      mb={2}
    >
      <ButtonToggle value="icon-left">
        <Icon aria-hidden type="placeholder" />
        Button with Left Icon
      </ButtonToggle>
      <ButtonToggle value="icon-right">
        Button with Right Icon
        <Icon aria-hidden type="placeholder" />
      </ButtonToggle>
    </ButtonToggleGroup>
  );
}
```


### Loading

**Render**

```tsx
({ ...args }: ButtonToggleGroupProps) => {
  const [value, setValue] = useState("");

  const handleOnChange = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    if (selectedValue === "loading-2") return;
    setValue(selectedValue as string);
  };

  return (
    <ButtonToggleGroup
      {...args}
      id="loading"
      value={value}
      onChange={handleOnChange}
      mb={2}
    >
      <ButtonToggle value="loading-1">Button 1</ButtonToggle>
      <ButtonToggle value="loading-2" aria-busy="true">
        <Loader
          variant="inline"
          loaderType="ring"
          size="extra-small"
          showLabel={false}
        />
      </ButtonToggle>
      <ButtonToggle value="loading-3">Button 3</ButtonToggle>
    </ButtonToggleGroup>
  );
}
```


### Sizes

**Render**

```tsx
({ ...args }: ButtonToggleGroupProps) => {
  const [valueSmall, setValueSmall] = useState("small-2");
  const [valueMedium, setValueMedium] = useState("medium-2");
  const [valueLarge, setValueLarge] = useState("large-2");

  const handleOnChangeSmall = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setValueSmall(selectedValue as string);
  };

  const handleOnChangeMedium = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setValueMedium(selectedValue as string);
  };

  const handleOnChangeLarge = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setValueLarge(selectedValue as string);
  };

  return (
    <>
      <ButtonToggleGroup
        {...args}
        id="small"
        label="Small"
        value={valueSmall}
        onChange={handleOnChangeSmall}
        size="small"
        mb={2}
      >
        <ButtonToggle value="small-1">Button 1</ButtonToggle>
        <ButtonToggle value="small-2">Button 2</ButtonToggle>
        <ButtonToggle value="small-3">Button 3</ButtonToggle>
      </ButtonToggleGroup>

      <ButtonToggleGroup
        {...args}
        id="medium"
        label="Medium"
        value={valueMedium}
        onChange={handleOnChangeMedium}
        size="medium"
        mb={2}
      >
        <ButtonToggle value="medium-1">
          <Icon aria-hidden type="placeholder" />
          Button 1
        </ButtonToggle>
        <ButtonToggle value="medium-2">
          <Icon aria-hidden type="placeholder" />
          Button 2
        </ButtonToggle>
        <ButtonToggle value="medium-3">
          <Icon aria-hidden type="placeholder" />
          Button 3
        </ButtonToggle>
      </ButtonToggleGroup>

      <ButtonToggleGroup
        {...args}
        id="large"
        label="Large"
        value={valueLarge}
        onChange={handleOnChangeLarge}
        size="large"
      >
        <ButtonToggle value="large-1">
          <Icon aria-hidden type="placeholder" />
          Button 1
        </ButtonToggle>
        <ButtonToggle value="large-2">
          <Icon aria-hidden type="placeholder" />
          Button 2
        </ButtonToggle>
        <ButtonToggle value="large-3">
          <Icon aria-hidden type="placeholder" />
          Button 3
        </ButtonToggle>
      </ButtonToggleGroup>
    </>
  );
}
```


### Icon Only

**Render**

```tsx
({ ...args }: ButtonToggleGroupProps) => {
  const [valueMedium, setValueMedium] = useState("medium-2");
  const [valueLarge, setValueLarge] = useState("large-2");

  const handleOnChangeMedium = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setValueMedium(selectedValue as string);
  };

  const handleOnChangeLarge = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setValueLarge(selectedValue as string);
  };

  return (
    <>
      <ButtonToggleGroup
        {...args}
        id="medium"
        label="Medium"
        value={valueMedium}
        onChange={handleOnChangeMedium}
        size="medium"
        mb={2}
      >
        <ButtonToggle value="medium-1">
          <Icon ariaLabel="Placeholder 1" type="placeholder" />
        </ButtonToggle>
        <ButtonToggle value="medium-2">
          <Icon ariaLabel="Placeholder 2" type="placeholder" />
        </ButtonToggle>
        <ButtonToggle value="medium-3">
          <Icon ariaLabel="Placeholder 3" type="placeholder" />
        </ButtonToggle>
      </ButtonToggleGroup>

      <ButtonToggleGroup
        {...args}
        id="large"
        label="Large"
        value={valueLarge}
        onChange={handleOnChangeLarge}
        size="large"
      >
        <ButtonToggle value="large-1">
          <Icon ariaLabel="Placeholder 1" type="placeholder" />
        </ButtonToggle>
        <ButtonToggle value="large-2">
          <Icon ariaLabel="Placeholder 2" type="placeholder" />
        </ButtonToggle>
        <ButtonToggle value="large-3">
          <Icon ariaLabel="Placeholder 3" type="placeholder" />
        </ButtonToggle>
      </ButtonToggleGroup>
    </>
  );
}
```


### AllowDeselect

**Args**

```tsx
{
    id: "allow-deselect",
    value: "allow-deselect-2",
    allowDeselect: true,
  }
```


### FullWidth

**Args**

```tsx
{
    id: "full-width",
    value: "full-width-2",
    fullWidth: true,
  }
```


### Disabled

**Args**

```tsx
{
    id: "disabled",
    label: "Disabled",
    inputHint: "Hint Text",
    value: "disabled-2",
    disabled: true,
  }
```

