```tsx
export const Required: Story = {
  ...WithLegend,
  args: {
    ...WithLegend.args,
    id: "required",
    required: true,
  },
};
```