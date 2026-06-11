```tsx
export const WrappingRowHeaders: Story = () => {
  const FlatTableRowHeaderWrapper = ({
    children,
    ...rest
  }: FlatTableRowHeaderProps) => (
    <FlatTableRowHeader {...rest}>{children}</FlatTableRowHeader>
  );
  FlatTableRowHeaderWrapper.displayName = FlatTableRowHeader.displayName;

  return (
    <FlatTable
      width="310px"
      overflowX="auto"
      title="Table for wrapping row headers"
    >
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableRowHeaderWrapper>Location</FlatTableRowHeaderWrapper>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeaderWrapper>London</FlatTableRowHeaderWrapper>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>
            <ActionPopover>
              <ActionPopoverItem onClick={() => {}} icon="edit">
                Edit
              </ActionPopoverItem>
            </ActionPopover>
          </FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableRowHeaderWrapper>York</FlatTableRowHeaderWrapper>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>
            <ActionPopover>
              <ActionPopoverItem onClick={() => {}} icon="edit">
                Edit
              </ActionPopoverItem>
            </ActionPopover>
          </FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableRowHeaderWrapper>Edinburgh</FlatTableRowHeaderWrapper>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>
            <ActionPopover>
              <ActionPopoverItem onClick={() => {}} icon="edit">
                Edit
              </ActionPopoverItem>
            </ActionPopover>
          </FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableRowHeaderWrapper>Newcastle</FlatTableRowHeaderWrapper>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>
            <ActionPopover>
              <ActionPopoverItem onClick={() => {}} icon="edit">
                Edit
              </ActionPopoverItem>
            </ActionPopover>
          </FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
```