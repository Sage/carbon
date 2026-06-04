```tsx
export const FlexDirectionStory: Story = () => (
  <DraggableContainer flexDirection="row-reverse">
    <DraggableItem key="1" id={1}>
      Some first content goes here
    </DraggableItem>
    <DraggableItem key="2" id={2}>
      Some second content goes here
    </DraggableItem>
    <DraggableItem key="3" id={3}>
      Some third content goes here
    </DraggableItem>
    <DraggableItem key="4" id={4}>
      Some fourth content goes here
    </DraggableItem>
  </DraggableContainer>
);
```