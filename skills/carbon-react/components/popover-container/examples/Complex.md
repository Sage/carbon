```tsx
export const Complex: Story = () => {
  const [open, setOpen] = useState(defaultOpenState);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Box height={330}>
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
};
```