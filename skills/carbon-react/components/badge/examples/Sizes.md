```tsx
export const Sizes: Story = ({ ...args }) => {
  return (
    <>
      <Badge id="badge-small" counter={99} size="small" {...args}>
        <Icon type="alert" color="black" />
      </Badge>
      <Badge id="badge-medium" counter={99} size="medium" {...args} />
      <Badge id="badge-large" counter={99} size="large" {...args} />
    </>
  );
};
```