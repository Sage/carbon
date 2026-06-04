```tsx
export const RowHeadersWithCustomPaddings: Story = () => {
  const SubRows = [
    <FlatTableRow key="sub-row-1">
      <FlatTableRowHeader px={8}>Child one</FlatTableRowHeader>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="sub-row-2">
      <FlatTableRowHeader pl={5}>
        <Icon type="individual" /> Child two
      </FlatTableRowHeader>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
  ];
  return (
    <Box>
      <FlatTable width="380px" overflowX="auto">
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableRowHeader px={8}>Name</FlatTableRowHeader>
            <FlatTableHeader>Location</FlatTableHeader>
            <FlatTableHeader>Relationship Status</FlatTableHeader>
            <FlatTableHeader>Dependents</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow expandable subRows={SubRows} expanded>
            <FlatTableRowHeader>John Doe</FlatTableRowHeader>
            <FlatTableCell>London</FlatTableCell>
            <FlatTableCell>Single</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandable subRows={SubRows} expanded>
            <FlatTableRowHeader>Jane Doe</FlatTableRowHeader>
            <FlatTableCell>York</FlatTableCell>
            <FlatTableCell>Married</FlatTableCell>
            <FlatTableCell>2</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandable subRows={SubRows}>
            <FlatTableRowHeader>John Smith</FlatTableRowHeader>
            <FlatTableCell>Edinburgh</FlatTableCell>
            <FlatTableCell>Single</FlatTableCell>
            <FlatTableCell>1</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow expandable subRows={SubRows}>
            <FlatTableRowHeader>Jane Smith</FlatTableRowHeader>
            <FlatTableCell>Newcastle</FlatTableCell>
            <FlatTableCell>Married</FlatTableCell>
            <FlatTableCell>5</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </Box>
  );
};
```