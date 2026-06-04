```tsx
export const DisabledPageSize: Story = {
  ...Default,
  args: { ...Default.args, totalRecords: "100", onPagination: () => {} },
  name: "Disabled Page Size",
  parameters: { chromatic: { disableSnapshot: true } },
};
```