```tsx
export const Variant: Story = {
  render: (args) => (
    <>
      <Message onDismiss={() => {}} variant="success" title="Success" {...args}>
        Some custom message
      </Message>
      <Message onDismiss={() => {}} variant="error" title="Error" {...args}>
        Some custom message
      </Message>
      <Message onDismiss={() => {}} variant="warning" title="Warning" {...args}>
        Some custom message
      </Message>
      <Message onDismiss={() => {}} variant="info" title="Info" {...args}>
        Some custom message
      </Message>
      <Message onDismiss={() => {}} variant="ai" title="AI" {...args}>
        Some custom message
      </Message>
    </>
  ),
  args: {
    mb: 2,
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};
```