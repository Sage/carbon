```tsx
export const SubtleVariant: Story = ({ ...args }) => {
  return (
    <>
      <Badge id="badge-subtle-small" counter={99} size="small" {...args}>
        <Icon type="alert" color="black" />
      </Badge>
      <Badge id="badge-subtle-medium" counter={99} size="medium" {...args} />
      <Badge id="badge-subtle-large" counter={99} size="large" {...args} />
    </>
  );
};
```