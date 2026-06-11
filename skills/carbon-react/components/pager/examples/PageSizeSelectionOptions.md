```tsx
export const PageSizeSelectionOptions: Story = {
  ...Default,
  args: {
    onPagination: () => {},
    totalRecords: 100,
    showPageSizeSelection: true,
    pageSizeSelectionOptions: [
      { id: "15", name: 15 },
      { id: "30", name: 30 },
      { id: "60", name: 60 },
    ],
    pageSize: 15,
  },
  name: "Page Size Selection Options",
  parameters: { chromatic: { disableSnapshot: true } },
};
```