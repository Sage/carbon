```tsx
export const WithCloseButton: Story = {
  render: (args) => (
    <Message onDismiss={() => {}} {...args}>
      Some custom message
    </Message>
  ),
};
```