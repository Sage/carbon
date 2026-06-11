```tsx
export const WithRowspan: Story = () => {
  return (
    <FlatTable title="Table for Row Span">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Parent Name</FlatTableHeader>
          <FlatTableHeader>Child Name</FlatTableHeader>
          <FlatTableHeader>Child Age</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell rowspan="3">Jane Smith</FlatTableCell>
          <FlatTableCell>Tim Smith</FlatTableCell>
          <FlatTableCell>8</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Chris Smith</FlatTableCell>
          <FlatTableCell>8</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Alice Smith</FlatTableCell>
          <FlatTableCell>12</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
```