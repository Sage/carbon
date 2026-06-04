```tsx
export const WithOnClick: Story = ({ ...args }) => {
  const counter = 9;
  return (
    <Badge
      id="badge-onclick"
      counter={counter}
      onClick={() => {}}
      aria-label={`Remove ${counter} filters.`}
      {...args}
    >
      <Button aria-describedby="badge-onclick" buttonType="secondary">
        Filter
      </Button>
    </Badge>
  );
};
```