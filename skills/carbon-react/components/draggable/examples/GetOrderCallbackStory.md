```tsx
export const GetOrderCallbackStory: Story = () => (
  <DraggableContainer getOrder={() => {}}>
    <DraggableItem key="1" id={1}>
      <Checkbox
        label="Draggable Label One"
        checked={false}
        onChange={() => {}}
      />
    </DraggableItem>
    <DraggableItem key="2" id={2}>
      <Checkbox
        label="Draggable Label Two"
        checked={false}
        onChange={() => {}}
      />
    </DraggableItem>
    <DraggableItem key="3" id={3}>
      <Checkbox
        label="Draggable Label Three"
        checked={false}
        onChange={() => {}}
      />
    </DraggableItem>
    <DraggableItem key="4" id={4}>
      <Checkbox
        label="Draggable Label Four"
        checked={false}
        onChange={() => {}}
      />
    </DraggableItem>
  </DraggableContainer>
);
```