```tsx
export const Required: Story = {
  ...Default,
  args: {
    ...Default.args,
    required: true,
  },
};
```