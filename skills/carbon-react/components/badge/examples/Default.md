```tsx
export const Default: Story = ({ ...args }) => {
  return (
    <>
      <Badge id="badge-default-1" counter={9} {...args} />
      <Badge id="badge-default-2" counter={99} {...args} />
      <Badge id="badge-default-3" counter="99+" {...args} />
      <Badge id="badge-default-4" counter="999+" {...args} />
    </>
  );
};
```