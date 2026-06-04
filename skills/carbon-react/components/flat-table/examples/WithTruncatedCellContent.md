```tsx
export const WithTruncatedCellContent: Story = () => {
  return (
    <FlatTable title="Table for Truncated Cell Content">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Notes</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        {[1, 2, 3, 4].map((key) => (
          <FlatTableRow key={key}>
            <FlatTableCell width={60} pr={0} truncate>
              John Doe
            </FlatTableCell>
            <FlatTableCell width={50} pr={0} truncate title="Alternate Title">
              London
            </FlatTableCell>
            <FlatTableCell>
              <Textbox
                size="small"
                aria-label="textbox"
                value=""
                onChange={() => {}}
              />
            </FlatTableCell>
          </FlatTableRow>
        ))}
      </FlatTableBody>
    </FlatTable>
  );
};
```