```tsx
export const WithCustomRowBackgroundColor: Story = () => {
  return (
    <FlatTable title="Table for Custom Row Backgroun Colour">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableRowHeader>No.</FlatTableRowHeader>
          <FlatTableHeader />
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow bgColor="#B1D345">
          <FlatTableRowHeader>1</FlatTableRowHeader>
          <FlatTableCheckbox
            ariaLabelledBy="ft-row-1-cell-1 ft-row-1-cell-2 ft-row-1-cell-3"
            checked={false}
            onChange={() => {}}
          />
          <FlatTableCell id="ft-row-1-cell-1">John Doe</FlatTableCell>
          <FlatTableCell id="ft-row-1-cell-2">London</FlatTableCell>
          <FlatTableCell id="ft-row-1-cell-3">Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableRowHeader>2</FlatTableRowHeader>
          <FlatTableCheckbox
            ariaLabelledBy="ft-row-2-cell-1 ft-row-2-cell-2 ft-row-2-cell-3"
            checked={false}
            onChange={() => {}}
          />
          <FlatTableCell id="ft-row-2-cell-1">Jane Doe</FlatTableCell>
          <FlatTableCell id="ft-row-2-cell-2">York</FlatTableCell>
          <FlatTableCell id="ft-row-2-cell-3">Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow bgColor="#B1D345">
          <FlatTableRowHeader>3</FlatTableRowHeader>
          <FlatTableCheckbox
            ariaLabelledBy="ft-row-3-cell-1 ft-row-3-cell-2 ft-row-3-cell-3"
            checked={false}
            onChange={() => {}}
          />
          <FlatTableCell id="ft-row-3-cell-1">John Smith</FlatTableCell>
          <FlatTableCell id="ft-row-3-cell-2">Edinburgh</FlatTableCell>
          <FlatTableCell id="ft-row-3-cell-3">Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableRowHeader>4</FlatTableRowHeader>
          <FlatTableCheckbox
            ariaLabelledBy="ft-row-4-cell-1 ft-row-4-cell-2 ft-row-4-cell-3"
            checked={false}
            onChange={() => {}}
          />
          <FlatTableCell id="ft-row-4-cell-1">Jane Smith</FlatTableCell>
          <FlatTableCell id="ft-row-4-cell-2">Newcastle</FlatTableCell>
          <FlatTableCell id="ft-row-4-cell-3">Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
```