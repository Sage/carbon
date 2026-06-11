```tsx
export const CurrentPage: Story = {
  ...Default,
  args: {
    onPagination: () => {},
    totalRecords: 100,
    showPageSizeSelection: true,
    currentPage: 5,
  },
  name: "Current Page",
  parameters: { chromatic: { disableSnapshot: true } },
};
```