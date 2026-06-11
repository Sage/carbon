```tsx
export const WithStickyHeadRowSpanAndColspan: Story = () => {
  return (
    <FlatTable
      hasStickyHead
      height="380px"
      width="310px"
      overflowX="auto"
      title="Table for Sticky Header with Row and Column spans"
    >
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader rowspan={2}>Name</FlatTableHeader>
          <FlatTableRowHeader rowspan={2}>Code</FlatTableRowHeader>
          <FlatTableHeader colspan={2}>Jun 21</FlatTableHeader>
          <FlatTableHeader rowspan={2} />
          <FlatTableHeader colspan={2}>YTD</FlatTableHeader>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableHeader>Debit</FlatTableHeader>
          <FlatTableHeader>Credit</FlatTableHeader>
          <FlatTableHeader>Debit</FlatTableHeader>
          <FlatTableHeader>Credit</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
```