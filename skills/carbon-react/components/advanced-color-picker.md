---
name: carbon-component-advanced-color-picker
description: Carbon AdvancedColorPicker component props and usage examples.
---

# AdvancedColorPicker

## Import
`import AdvancedColorPicker from "carbon-react/lib/components/advanced-color-picker";`

## Source
- Export: `./components/advanced-color-picker`
- Props interface: `AdvancedColorPickerProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| availableColors | AdvancedColor[] | Yes |  | Prop for `availableColors` containing array of objects of colors |  |
| name | string | Yes |  | Specifies the name prop to be applied to each color in the group |  |
| onChange | (ev: React.ChangeEvent<HTMLInputElement>) => void | Yes |  | Prop for `onChange` event |  |
| selectedColor | string | Yes |  | Prop for `selectedColor` containing pre-selected color for `controlled` use |  |
| m | SpacingProperty | No |  |  |  |
| margin | SpacingProperty | No |  |  |  |
| marginBottom | SpacingProperty | No |  |  |  |
| marginLeft | SpacingProperty | No |  |  |  |
| marginRight | SpacingProperty | No |  |  |  |
| marginTop | SpacingProperty | No |  |  |  |
| marginX | SpacingProperty | No |  |  |  |
| marginY | SpacingProperty | No |  |  |  |
| mb | SpacingProperty | No |  |  |  |
| ml | SpacingProperty | No |  |  |  |
| mr | SpacingProperty | No |  |  |  |
| mt | SpacingProperty | No |  |  |  |
| mx | SpacingProperty | No |  |  |  |
| my | SpacingProperty | No |  |  |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | Prop for `onBlur` event |  |
| onClose | ((ev: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement> \| KeyboardEvent) => void) \| undefined | No |  | Prop for `onClose` event |  |
| onOpen | ((ev: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>) => void) \| undefined | No |  | Prop for `onOpen` event |  |
| open | boolean \| undefined | No |  | Prop for `open` status | false |
| restoreFocusOnClose | boolean \| undefined | No |  | Enables the automatic restoration of focus to the element that invoked the modal when the modal is closed. | true |
| role | string \| undefined | No |  | The ARIA role to be applied to the component container |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-describedby | string \| undefined | No |  | Prop to specify the aria-describedby property of the component |  |
| aria-label | string \| undefined | No |  | Prop to specify the aria-label of the component. To be used only when the title prop is not defined, and the component is not labelled by any internal element. |  |
| aria-labelledby | string \| undefined | No |  | Prop to specify the aria-labelledby property of the component To be used when the title prop is a custom React Node, or the component is labelled by an internal element other than the title. |  |

## Examples
### Default

**Render**

```tsx
() => {
  const [open, setOpen] = useState(defaultOpenState);
  const [color, setColor] = useState("orchid");
  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setColor(target.value);
  };
  return (
    <AdvancedColorPicker
      name="advancedPicker"
      availableColors={[
        { value: "#FFFFFF", label: "white" },
        { value: "transparent", label: "transparent" },
        { value: "#000000", label: "black" },
        { value: "#A3CAF0", label: "blue" },
        { value: "#FD9BA3", label: "pink" },
        { value: "#B4AEEA", label: "purple" },
        { value: "#ECE6AF", label: "goldenrod" },
        { value: "#EBAEDE", label: "orchid" },
        { value: "#EBC7AE", label: "desert" },
        { value: "#AEECEB", label: "turquoise" },
        { value: "#AEECD6", label: "mint" },
      ]}
      selectedColor={color}
      onChange={onChange}
      onOpen={() => {
        setOpen(!open);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onBlur={() => {}}
      open={open}
    />
  );
}
```


### With Restore Focus Close

**Render**

```tsx
() => {
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);

  const [color, setColor] = useState("orchid");
  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setColor(target.value);
  };
  return (
    <>
      <AdvancedColorPicker
        restoreFocusOnClose={false}
        name="advancedPicker"
        availableColors={[
          { value: "#FFFFFF", label: "white" },
          { value: "transparent", label: "transparent" },
          { value: "#000000", label: "black" },
          { value: "#A3CAF0", label: "blue" },
          { value: "#FD9BA3", label: "pink" },
          { value: "#B4AEEA", label: "purple" },
          { value: "#ECE6AF", label: "goldenrod" },
          { value: "#EBAEDE", label: "orchid" },
          { value: "#EBC7AE", label: "desert" },
          { value: "#AEECEB", label: "turquoise" },
          { value: "#AEECD6", label: "mint" },
        ]}
        selectedColor={color}
        onChange={onChange}
        onOpen={() => {
          setOpen(!open);
          setShowMessage(false);
        }}
        onClose={() => {
          setOpen(false);
          setShowMessage(true);
          setTimeout(() => messageRef.current?.focus(), 1);
        }}
        onBlur={() => {}}
        open={open}
        mb={showMessage ? 5 : 0}
      />
      {showMessage && (
        <Message
          ref={messageRef}
          variant="error"
          onDismiss={() => setShowMessage(false)}
        >
          Some custom message
        </Message>
      )}
    </>
  );
}
```

