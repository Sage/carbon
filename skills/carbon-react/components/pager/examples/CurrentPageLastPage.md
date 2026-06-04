```tsx
export const CurrentPageLastPage: Story = {
  ...Default,
  args: {
    onPagination: () => {},
    totalRecords: 100,
    showPageSizeSelection: true,
    currentPage: 10,
  },
  name: "Current Page Last Page",
  parameters: { chromatic: { disableSnapshot: true } },
};
```