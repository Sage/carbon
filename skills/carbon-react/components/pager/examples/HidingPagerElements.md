```tsx
export const HidingPagerElements: Story = {
  ...Default,
  args: {
    ...Default.args,
    totalRecords: "100",
    onPagination: () => {},
    showFirstAndLastButtons: false,
    showTotalRecords: false,
    showPageSizeSelection: true,
  },
  name: "Hiding Pager Elements",
};
```