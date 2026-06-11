```tsx
export const ComponentsAsChildrenStory: Story = () => (
  <DraggableContainer>
    <DraggableItem key="1" id={1}>
      <Checkbox
        label="checkbox one"
        mb={0}
        checked={false}
        onChange={() => {}}
      />
    </DraggableItem>
    <DraggableItem key="2" id={2}>
      <Checkbox
        label="checkbox two"
        mb={0}
        checked={false}
        onChange={() => {}}
      />
    </DraggableItem>
    <DraggableItem key="3" id={3}>
      <Checkbox
        label="checkbox three"
        mb={0}
        checked={false}
        onChange={() => {}}
      />
    </DraggableItem>
    <DraggableItem key="4" id={4}>
      <Checkbox
        label="checkbox four"
        mb={0}
        checked={false}
        onChange={() => {}}
      />
    </DraggableItem>
  </DraggableContainer>
);
```