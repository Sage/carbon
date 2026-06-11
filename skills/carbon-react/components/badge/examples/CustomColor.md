```tsx
export const CustomColor: Story = ({ ...args }) => {
  const counter = 9;
  return (
    <Badge
      id="badge-custom-color"
      counter={counter}
      onClick={() => {}}
      aria-label={`Remove ${counter} filters.`}
      color="--colorsSemanticNegative500"
      {...args}
    >
      <Button
        aria-describedby="badge-custom-color"
        buttonType="secondary"
        destructive
      >
        Filter
      </Button>
    </Badge>
  );
};
```