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
| id | string \| undefined | No |  |  |  | Override the auto-generated id on the button element. |  |
| onBlur | ((ev: React.FocusEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback triggered by blur event on the button. |  |
| onClick | ((ev: React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback triggered by click event on the button. |  |
| onFocus | ((ev: React.FocusEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback triggered by focus event on the button. |  |
| pressed | boolean \| undefined | No |  |  |  | Set the pressed state of the toggle button when used outside of a group. |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  |  |  | ButtonToggle size | "medium" |
| value | string \| undefined | No |  |  |  | An optional string by which to identify the button in an onChange handler on the parent ButtonToggleGroup. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  |  |  | Prop to specify the aria-label of the component |  |
| aria-labelledby | string \| undefined | No |  |  |  | Prop to specify the aria-labelledby property of the component |  |
| buttonIconSize | "small" \| "large" \| undefined | No |  | Yes | `buttonIconSize` is no longer supported. | Sets the size of the buttonIcon |  |

## Examples
### Single

**Render**

```tsx
() => {
  const [isPressed, setIsPressed] = useState(true);

  const handleClick = () => {
    setIsPressed(!isPressed);
  };

  return (
    <ButtonToggle pressed={isPressed} onClick={handleClick}>
      ButtonToggle
    </ButtonToggle>
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

