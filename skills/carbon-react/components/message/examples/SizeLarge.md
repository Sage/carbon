```tsx
export const SizeLarge: Story = {
  render: (args) => (
    <>
      <Message onDismiss={() => {}} {...args}>
        Some custom message
      </Message>
      <Message onDismiss={() => {}} variant="info-subtle" {...args}>
        Some custom message
      </Message>
    </>
  ),
  args: {
    title: "Large",
    size: "large",
    mb: 2,
  },
  parameters: { chromatic: { disableSnapshot: false } },
};
```