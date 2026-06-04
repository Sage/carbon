```tsx
export const SmallScreenBreakpoint: Story = () => {
  const shouldShowExtraLinks = useMediaQuery("(min-width: 375px)");

  return (
    <Pager
      smallScreenBreakpoint="705px"
      totalRecords={1000}
      showPageSizeSelection
      showFirstAndLastButtons={shouldShowExtraLinks}
      pageSize={10}
      currentPage={1}
      onPagination={() => {}}
      pageSizeSelectionOptions={[
        { id: "10", name: 10 },
        { id: "25", name: 25 },
        { id: "50", name: 50 },
        { id: "100", name: 100 },
      ]}
    />
  );
};
```