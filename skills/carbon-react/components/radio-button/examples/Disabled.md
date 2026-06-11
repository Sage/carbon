```tsx
export const Disabled: Story = {
  ...WithLegend,
  args: {
    ...WithLegend.args,
    id: "disabled",
    disabled: true,
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};
```