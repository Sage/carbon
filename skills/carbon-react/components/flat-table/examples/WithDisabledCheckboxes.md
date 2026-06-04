```tsx
export const WithDisabledCheckboxes: Story = () => {
  const initialRowState = {
    one: false,
    two: false,
    three: false,
    four: false,
  };

  const [selectedRows, setSelectedRows] =
    useState<SelectedRows>(initialRowState);

  const [disabledRows, setDisabledRows] =
    useState<SelectedRows>(initialRowState);

  const handleSelectRow = (id: SelectedRow) => {
    setSelectedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const performMockAction = () => {
    setDisabledRows(selectedRows);
    setSelectedRows(initialRowState);
    setTimeout(() => setDisabledRows(initialRowState), 2_000);
  };

  const selectedCount = Object.keys(selectedRows).filter((key) =>
    Boolean(selectedRows[key as SelectedRow]),
  ).length;

  const disabledCount = Object.keys(disabledRows).filter((key) =>
    Boolean(disabledRows[key as SelectedRow]),
  ).length;

  return (
    <main>
      <BatchSelection selectedCount={selectedCount}>
        <Button
          variantType="subtle"
          aria-label="csv"
          onClick={performMockAction}
          disabled={disabledCount > 0}
          iconType="csv"
        />
        <Button
          variantType="subtle"
          aria-label="delete"
          onClick={performMockAction}
          disabled={disabledCount > 0}
          iconType="bin"
        />
        <Button
          variantType="subtle"
          aria-label="pdf"
          onClick={performMockAction}
          disabled={disabledCount > 0}
          iconType="pdf"
        />
      </BatchSelection>
      <FlatTable title="Table with Disabled Checkboxes" mt={1}>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>
              <Typography screenReaderOnly>Select rows</Typography>
            </FlatTableHeader>
            <FlatTableHeader>Name</FlatTableHeader>
            <FlatTableHeader>Location</FlatTableHeader>
            <FlatTableHeader>Relationship Status</FlatTableHeader>
            <FlatTableHeader>Dependents</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow selected={selectedRows.one}>
            <FlatTableCheckbox
              ariaLabelledBy="ft-dc-row-1-cell-1 ft-dc-row-1-cell-2 ft-dc-row-1-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.one}
              onChange={() => handleSelectRow("one")}
              disabled={disabledRows.one}
            />
            <FlatTableCell id="ft-dc-row-1-cell-1">John Doe</FlatTableCell>
            <FlatTableCell id="ft-dc-row-1-cell-2">London</FlatTableCell>
            <FlatTableCell id="ft-dc-row-1-cell-3">Single</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow selected={selectedRows.two}>
            <FlatTableCheckbox
              ariaLabelledBy="ft-dc-row-2-cell-1 ft-dc-row-2-cell-2 ft-dc-row-2-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.two}
              onChange={() => handleSelectRow("two")}
              disabled={disabledRows.two}
            />
            <FlatTableCell id="ft-dc-row-2-cell-1">Jane Doe</FlatTableCell>
            <FlatTableCell id="ft-dc-row-2-cell-2">York</FlatTableCell>
            <FlatTableCell id="ft-dc-row-2-cell-3">Married</FlatTableCell>
            <FlatTableCell>2</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow selected={selectedRows.three}>
            <FlatTableCheckbox
              ariaLabelledBy="ft-dc-row-3-cell-1 ft-dc-row-3-cell-2 ft-dc-row-3-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.three}
              onChange={() => handleSelectRow("three")}
              disabled={disabledRows.three}
            />
            <FlatTableCell id="ft-dc-row-3-cell-1">John Smith</FlatTableCell>
            <FlatTableCell id="ft-dc-row-3-cell-2">Edinburgh</FlatTableCell>
            <FlatTableCell id="ft-dc-row-3-cell-3">Single</FlatTableCell>
            <FlatTableCell>1</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow selected={selectedRows.four}>
            <FlatTableCheckbox
              ariaLabelledBy="ft-dc-row-4-cell-1 ft-dc-row-4-cell-2 ft-dc-row-4-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.four}
              onChange={() => handleSelectRow("four")}
              disabled={disabledRows.four}
            />
            <FlatTableCell id="ft-dc-row-4-cell-1">Jane Smith</FlatTableCell>
            <FlatTableCell id="ft-dc-row-4-cell-2">Newcastle</FlatTableCell>
            <FlatTableCell id="ft-dc-row-4-cell-3">Married</FlatTableCell>
            <FlatTableCell>5</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </main>
  );
};
```