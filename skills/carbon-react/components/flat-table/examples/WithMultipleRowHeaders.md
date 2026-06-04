```tsx
export const WithMultipleRowHeaders: Story = () => {
  return (
    <FlatTable
      width="680px"
      overflowX="auto"
      title="Table for Multiple Row Headers"
    >
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Sticky Column</FlatTableHeader>
          <FlatTableRowHeader>Sticky Column</FlatTableRowHeader>
          <FlatTableHeader>Scrollable Column</FlatTableHeader>
          <FlatTableHeader>Scrollable Column</FlatTableHeader>
          <FlatTableHeader>Scrollable Column</FlatTableHeader>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Column
          </FlatTableRowHeader>
          <FlatTableHeader>Sticky Column</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
```