```tsx
export const WithChildren: Story = ({ ...args }) => {
  return (
    <Badge id="badge-button" counter={99} {...args}>
      <Button buttonType="secondary" aria-describedby="badge-button">
        Filter
      </Button>
    </Badge>
  );
};
```