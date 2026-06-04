```tsx
export const WithCustomColumnWidth: Story = () => {
  return (
    <FlatTable title="Table for Custom Column Width">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader width={80}>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader width={200}>Notes</FlatTableHeader>
          <FlatTableHeader width={40} px={1}>
            <Icon color="white" type="settings" />
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        {[1, 2, 3, 4].map((key) => (
          <FlatTableRow key={key}>
            <FlatTableCell>John Doe</FlatTableCell>
            <FlatTableCell>London</FlatTableCell>
            <FlatTableCell>
              <Textbox
                placeholder="Notes for John Doe"
                size="small"
                value=""
                onChange={() => {}}
              />
            </FlatTableCell>
            <FlatTableCell px={1}>
              <ActionPopover>
                <ActionPopoverItem onClick={() => {}} icon="graph">
                  Business
                </ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}} icon="email">
                  Email Invoice
                </ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
        ))}
      </FlatTableBody>
    </FlatTable>
  );
};
```