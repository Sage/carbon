```tsx
export const WithCustomCellPaddings: Story = () => {
  return (
    <FlatTable title="Table for Custom Cell Paddings">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader px={1} py={2}>
            Name
          </FlatTableHeader>
          <FlatTableHeader px={2} py={2}>
            Location
          </FlatTableHeader>
          <FlatTableHeader px={3} py={2}>
            Relationship Status
          </FlatTableHeader>
          <FlatTableHeader px={4} py={2}>
            Dependents
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        {[1, 2, 3, 4].map((key) => (
          <FlatTableRow key={key}>
            <FlatTableCell px={key}>John Doe</FlatTableCell>
            <FlatTableCell pl={key}>London</FlatTableCell>
            <FlatTableCell p={key}>Single</FlatTableCell>
            <FlatTableCell pl={key}>5</FlatTableCell>
          </FlatTableRow>
        ))}
      </FlatTableBody>
    </FlatTable>
  );
};
```