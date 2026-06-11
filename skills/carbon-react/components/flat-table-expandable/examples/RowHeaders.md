```tsx
export const RowHeaders: Story = () => {
  const SubRows = [
    <FlatTableRow key="sub-row-1">
      <FlatTableRowHeader>Child one</FlatTableRowHeader>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableRowHeader stickyAlignment="right">2</FlatTableRowHeader>
    </FlatTableRow>,
    <FlatTableRow key="sub-row-2">
      <FlatTableRowHeader>Child two</FlatTableRowHeader>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableRowHeader stickyAlignment="right">1</FlatTableRowHeader>
    </FlatTableRow>,
  ];
  return (
    <FlatTable width="380px" overflowX="auto">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableRowHeader>Name</FlatTableRowHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableRowHeader stickyAlignment="right">
            Dependents
          </FlatTableRowHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableRowHeader>John Doe</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">0</FlatTableRowHeader>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableRowHeader>Jane Doe</FlatTableRowHeader>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">2</FlatTableRowHeader>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableRowHeader>John Smith</FlatTableRowHeader>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">1</FlatTableRowHeader>
        </FlatTableRow>
        <FlatTableRow expandable subRows={SubRows}>
          <FlatTableRowHeader>Jane Smith</FlatTableRowHeader>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">5</FlatTableRowHeader>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
```