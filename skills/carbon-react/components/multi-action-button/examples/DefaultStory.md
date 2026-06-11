```tsx
export const DefaultStory: Story = {
  render: (args: MultiActionButtonProps) => {
    return (
      <MultiActionButton {...args}>
        <Button href="#">Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </MultiActionButton>
    );
  },
  args: { text: "Multi Action Button" },
  name: "Default",
  parameters: { chromatic: { disableSnapshot: true } },
};
```