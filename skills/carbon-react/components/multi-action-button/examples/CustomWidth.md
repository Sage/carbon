```tsx
export const CustomWidth: Story = (args: MultiActionButtonProps) => {
  return (
    <MultiActionButton {...args}>
      <Button href="#">Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </MultiActionButton>
  );
};
```