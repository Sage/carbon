```tsx
export const Inverse: Story = ({ ...args }) => {
  return (
    <>
      <Badge id="badge-inverse-small" counter={99} size="small" {...args}>
        <Icon type="alert" color="white" />
      </Badge>
      <Badge id="badge-inverse-medium" counter={99} size="medium" {...args} />
      <Badge id="badge-inverse-large" counter={99} size="large" {...args} />

      <Badge
        id="badge-icon"
        counter={99}
        size="small"
        variant="subtle"
        {...args}
      >
        <Icon type="alert" color="white" />
      </Badge>
      <Badge
        id="badge-subtle-inverse-medium"
        counter={99}
        size="medium"
        variant="subtle"
        {...args}
      />
      <Badge
        id="badge-subtle-inverse-large"
        counter={99}
        size="large"
        variant="subtle"
        {...args}
      />
    </>
  );
};
```