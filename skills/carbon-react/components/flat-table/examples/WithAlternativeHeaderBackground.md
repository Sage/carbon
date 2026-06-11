```tsx
export const WithAlternativeHeaderBackground: Story = () => {
  return (
    <FlatTable title="Table for Alternative Header Background">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader rowspan="2">Name</FlatTableHeader>
          <FlatTableHeader colspan="2">Location</FlatTableHeader>
          <FlatTableHeader rowspan="2">Relationship Status</FlatTableHeader>
          <FlatTableHeader rowspan="2">Dependents</FlatTableHeader>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableHeader alternativeBgColor>City</FlatTableHeader>
          <FlatTableHeader alternativeBgColor>Country</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>England</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>England</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Scotland</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>England</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
```