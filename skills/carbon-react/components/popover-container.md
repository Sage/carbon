---
name: carbon-component-popover-container
description: Carbon PopoverContainer component props and usage examples.
---

# PopoverContainer

## Import
`import PopoverContainer from "carbon-react/lib/components/popover-container";`

## Source
- Export: `./components/popover-container`
- Props interface: `PopoverContainerProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ariaDescribedBy | string \| undefined | No |  |  |  | The id of the element that describe the dialog. |  |
| children | React.ReactNode | No |  |  |  | The content of the popover-container |  |
| closeButtonAriaLabel | string \| undefined | No |  |  |  | Close button aria label |  |
| closeButtonDataProps | Pick<TagProps, "data-element" \| "data-role"> \| undefined | No |  |  |  | Data tag prop bag for close Button |  |
| containerAriaLabel | string \| undefined | No |  |  |  | Container aria label |  |
| disableAnimation | boolean \| undefined | No |  |  |  | Disables the animation for the component |  |
| hasFullWidth | boolean \| undefined | No |  |  |  | Flag to enable fullWidth Button styles |  |
| offset | number \| undefined | No |  |  |  | The popover offset from the reference element |  |
| onClose | ((ev: React.KeyboardEvent<HTMLElement> \| React.MouseEvent<HTMLElement> \| React.FocusEvent<HTMLElement> \| Event) => void) \| undefined | No |  |  |  | Callback fires when close icon clicked |  |
| onOpen | ((ev: React.KeyboardEvent<HTMLElement> \| React.MouseEvent<HTMLElement>) => void) \| undefined | No |  |  |  | Callback fires when open component is clicked |  |
| open | boolean \| undefined | No |  |  |  | if `true` the popover-container is open |  |
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left |  |
| position | Position \| undefined | No |  |  |  | Sets rendering position of dialog. Please note the 'center' position is deprecated. |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top and bottom |  |
| renderCloseComponent | ((args: RenderCloseProps) => JSX.Element) \| undefined | No |  |  |  | A function that will render the close component. Please note that tabIndex is deprecated and no longer required for the close button. `({data-element, tabIndex, onClick, ref, aria-label}) => ()` |  |
| renderOpenComponent | ((args: RenderOpenProps) => JSX.Element) \| undefined | No |  |  |  | A function that will render the open component. Please note that tabIndex is deprecated and no longer required for the open button. `({isOpen, data-element, onClick, ref, aria-label}) => ()` |  |
| shouldCoverButton | boolean \| undefined | No |  |  |  | if `true` the popover-container will cover open button |  |
| title | string \| undefined | No |  |  |  | Sets the popover container dialog header name |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| borderRadius | BoxProps["borderRadius"] | No |  | Yes | the `borderRadius` prop is being deprecated and will be removed in a future release. | Sets the border radius of the popover container |  |
| openButtonAriaLabel | string \| undefined | No |  | Yes | Accessible label passed to custom open button renderers. The default open button is named by its visible text. Please note this prop is no longer passed as the default button has text. If you are using an icon only button, set the aria-label on your custom button instead. |  |  |

## Examples
### Default

**Render**

```tsx
() => {
  return (
    <Box height={100}>
      <PopoverContainer containerAriaLabel="popover-container">
        Contents
      </PopoverContainer>
    </Box>
  );
}
```


### Title

**Render**

```tsx
() => {
  const [open, setOpen] = useState(defaultOpenState);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Box height="100px">
      <PopoverContainer
        title="With a title"
        open={open}
        onClose={onClose}
        onOpen={onOpen}
      >
        Contents
      </PopoverContainer>
    </Box>
  );
}
```


### Right Position

**Render**

```tsx
() => {
  const [open, setOpen] = useState(defaultOpenState);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Box height="150px" display="flex" justifyContent="flex-end">
      <PopoverContainer
        title="Right Aligned"
        position="left"
        open={open}
        onClose={onClose}
        onOpen={onOpen}
      >
        Contents
      </PopoverContainer>
    </Box>
  );
}
```


### Center Position

**Render**

```tsx
() => {
  const [open, setOpen] = useState(defaultOpenState);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Box height="150px" display="flex" justifyContent="center">
      <PopoverContainer
        title="Center Aligned"
        position="center"
        open={open}
        onClose={onClose}
        onOpen={onOpen}
      >
        Contents
      </PopoverContainer>
    </Box>
  );
}
```


### Border Radius

**Render**

```tsx
() => {
  const [open, setOpen] = useState(defaultOpenState);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Box height="100px">
      <PopoverContainer
        title="Border Radius"
        borderRadius="borderRadius000 borderRadius000 borderRadius200 borderRadius200"
        open={open}
        onClose={onClose}
        onOpen={onOpen}
      >
        Contents
      </PopoverContainer>
    </Box>
  );
}
```


### Offset

**Render**

```tsx
() => {
  const [open, setOpen] = useState(defaultOpenState);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Box height="100px">
      <PopoverContainer
        title="Offset"
        offset={0}
        open={open}
        onClose={onClose}
        onOpen={onOpen}
      >
        Contents
      </PopoverContainer>
    </Box>
  );
}
```


### Cover Button

**Render**

```tsx
() => {
  const [open, setOpen] = useState(defaultOpenState);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Box height="100px">
      <PopoverContainer
        title="Cover Button"
        shouldCoverButton
        open={open}
        onClose={onClose}
        onOpen={onOpen}
      >
        Content
      </PopoverContainer>
    </Box>
  );
}
```


### Render Props

**Render**

```tsx
() => {
  return (
    <Box height="250px">
      <PopoverContainer
        title="Custom Open &amp; Close Button"
        renderOpenComponent={({
          isOpen,
          "data-element": dataElement,
          onClick,
          ref,
          "aria-label": ariaLabel,
          id,
          "aria-expanded": ariaExpanded,
          "aria-haspopup": ariaHasPopup,
        }) => (
          <Button
            data-element={dataElement}
            aria-label={ariaLabel}
            aria-haspopup={ariaHasPopup}
            aria-expanded={ariaExpanded}
            ref={ref}
            id={id}
            onClick={onClick}
          >
            Open
            <Icon type={isOpen ? "cross" : "tick"} size="small" />
          </Button>
        )}
        renderCloseComponent={({
          "data-element": dataElement,
          onClick,
          ref,
          "aria-label": ariaLabel,
        }) => (
          <Button
            data-element={dataElement}
            aria-label={ariaLabel}
            ref={ref}
            onClick={onClick}
          >
            Close
          </Button>
        )}
      >
        Content
      </PopoverContainer>
    </Box>
  );
}
```


### Controlled

**Render**

```tsx
() => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Box margin={2} height="280px">
      <Button onClick={onOpen}>Open Popover</Button>
      <Button onClick={onClose} ml={2}>
        Close Popover
      </Button>
      <br />
      <PopoverContainer
        title="Controlled"
        open={open}
        onOpen={onOpen}
        onClose={onClose}
      >
        Contents
      </PopoverContainer>
    </Box>
  );
}
```


### Complex

**Render**

```tsx
() => {
  const [open, setOpen] = useState(defaultOpenState);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Box height="400px">
      <PopoverContainer
        title="Popover Container Title"
        open={open}
        onOpen={onOpen}
        onClose={onClose}
      >
        <Link href="#example">This is example link text</Link>
        <Box p="25px 0 15px 0">
          <Button>Small</Button>
          <Button ml={2}>Compact</Button>
        </Box>
        <Box mt="4px" mb="4px">
          <Select
            name="simple"
            id="simple"
            label="color"
            labelInline
            value=""
            onChange={() => {}}
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
        </Box>
        <DraggableContainer>
          <DraggableItem key="1" id={1}>
            <Checkbox
              name="one"
              label="Draggable Label One"
              checked
              onChange={() => {}}
            />
          </DraggableItem>
          <DraggableItem key="2" id={2}>
            <Checkbox
              name="two"
              label="Draggable Label Two"
              checked
              onChange={() => {}}
            />
          </DraggableItem>
          <DraggableItem key="3" id={3}>
            <Checkbox
              name="three"
              label="Draggable Label Three"
              checked
              onChange={() => {}}
            />
          </DraggableItem>
          <DraggableItem key="4" id={4}>
            <Checkbox
              name="four"
              label="Draggable Label Four"
              checked
              onChange={() => {}}
            />
          </DraggableItem>
        </DraggableContainer>
      </PopoverContainer>
    </Box>
  );
}
```


### Disable Animation

**Render**

```tsx
() => {
  return (
    <Box height="200px">
      <PopoverContainer
        title="Disabled Animation Popover Container"
        disableAnimation
      >
        Contents
      </PopoverContainer>
    </Box>
  );
}
```


### Focus Button Programmatically

**Render**

```tsx
() => {
  const [isPopOverOpen, setIsPopOverOpen] = useState(defaultOpenState);
  const ref = useRef<PopoverContainerHandle>(null);

  const handleCancel = () => {
    setIsPopOverOpen(false);
    ref.current?.focusButton();
  };

  return (
    <Box margin={2} height="500px">
      <PopoverContainer
        p={0}
        ref={ref}
        containerAriaLabel="popover with form"
        open={isPopOverOpen}
        onOpen={() => setIsPopOverOpen(true)}
        onClose={() => setIsPopOverOpen(false)}
        renderOpenComponent={({ ref, ...props }) => (
          <Button size="small" variantType="primary" ref={ref} {...props}>
            <Icon type="settings" />
            Popover
          </Button>
        )}
        renderCloseComponent={() => <></>}
      >
        <Form
          height="400px"
          onSubmit={() => {}}
          leftSideButtons={
            <Button onClick={() => handleCancel()}>Cancel</Button>
          }
          saveButton={
            <Button variantType="primary" type="submit">
              Save
            </Button>
          }
          stickyFooter
        >
          <Box m={2}>
            <Textbox label="Textbox" onChange={() => {}} value="" />
            <Textbox label="Textbox" onChange={() => {}} value="" />
            <Textbox label="Textbox" onChange={() => {}} value="" />
            <Textbox label="Textbox" onChange={() => {}} value="" />
            <Textbox label="Textbox" onChange={() => {}} value="" />
            <Textbox label="Textbox" onChange={() => {}} value="" />
          </Box>
        </Form>
      </PopoverContainer>
    </Box>
  );
}
```

