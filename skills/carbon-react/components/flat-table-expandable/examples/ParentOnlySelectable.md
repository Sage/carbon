```tsx
export const ParentOnlySelectable: Story = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });
  const [highlightedRow, setHighlightedRow] = useState("");
  const handleSelectAllRows = () => {
    const newState = { ...selectedRows };
    Object.keys(selectedRows).forEach((key) => {
      newState[key as SelectedRowsParentOnlySelectableStoryKey] = !selectAll;
    });
    setSelectedRows(newState);
    setSelectAll(!selectAll);
  };
  const handleSelectRow = (id: SelectedRowsParentOnlySelectableStoryKey) => {
    if (selectedRows[id]) {
      setSelectAll(false);
    }
    setSelectedRows({ ...selectedRows, [id]: !selectedRows[id] });
  };
  const selectedCount = Object.keys(selectedRows).filter((key) =>
    Boolean(selectedRows[key as SelectedRowsParentOnlySelectableStoryKey]),
  ).length;
  const handleHighlightRow = (id: string) => {
    if (highlightedRow === id) {
      setHighlightedRow("");
    } else {
      setHighlightedRow(id);
    }
  };
  const SubRows = [
    <FlatTableRow key="sub-row-1">
      <FlatTableCheckbox
        ariaLabelledBy="ft-row--sub-row-1-cell-1 ft-row--sub-row-1-cell-2 ft-row--sub-row-1-cell-3"
        onClick={(e) => e.stopPropagation()}
        selectable={false}
        checked={selectedRows.one}
        onChange={() => handleSelectRow("one")}
      />
      <FlatTableCell id="ft-row--sub-row-1-cell-1">Child one</FlatTableCell>
      <FlatTableCell id="ft-row--sub-row-1-cell-2">York</FlatTableCell>
      <FlatTableCell id="ft-row--sub-row-1-cell-3">Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="sub-row-2">
      <FlatTableCheckbox
        ariaLabelledBy="ft-row--sub-row-2-cell-1 ft-row--sub-row-2-cell-2 ft-row--sub-row-2-cell-3"
        onClick={(e) => e.stopPropagation()}
        selectable={false}
        checked={selectedRows.one}
        onChange={() => handleSelectRow("one")}
      />
      <FlatTableCell id="ft-row--sub-row-2-cell-1">Child two</FlatTableCell>
      <FlatTableCell id="ft-row--sub-row-2-cell-2">Edinburgh</FlatTableCell>
      <FlatTableCell id="ft-row--sub-row-2-cell-3">Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
  ];
  return (
    <>
      <BatchSelection
        disabled={selectedCount === 0}
        selectedCount={selectedCount}
      >
        <IconButton aria-label="download as csv" onClick={() => {}}>
          <Icon type="csv" />
        </IconButton>
        <IconButton aria-label="bin" onClick={() => {}}>
          <Icon type="bin" />
        </IconButton>
        <IconButton aria-label="download as pdf" onClick={() => {}}>
          <Icon type="pdf" />
        </IconButton>
      </BatchSelection>
      <FlatTable>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableCheckbox
              ariaLabelledBy="ft-header-1 ft-header-2 ft-header-3 ft-header-4"
              onClick={(e) => e.stopPropagation()}
              as="th"
              checked={selectAll}
              onChange={() => handleSelectAllRows()}
            />
            <FlatTableHeader id="ft-header-1">Name</FlatTableHeader>
            <FlatTableHeader id="ft-header-2">Location</FlatTableHeader>
            <FlatTableHeader id="ft-header-3">
              Relationship Status
            </FlatTableHeader>
            <FlatTableHeader id="ft-header-4">Dependents</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow
            onClick={() => handleHighlightRow("one")}
            selected={selectedRows.one}
            highlighted={highlightedRow === "one"}
            expandable
            subRows={SubRows}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-1-cell-1 ft-row-1-cell-2 ft-row-1-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.one}
              onChange={() => handleSelectRow("one")}
            />
            <FlatTableCell id="ft-row-1-cell-1">John Doe</FlatTableCell>
            <FlatTableCell id="ft-row-1-cell-2">London</FlatTableCell>
            <FlatTableCell id="ft-row-1-cell-3">Single</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            onClick={() => handleHighlightRow("two")}
            selected={selectedRows.two}
            highlighted={highlightedRow === "two"}
            expandable
            subRows={SubRows}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-2-cell-1 ft-row-2-cell-2 ft-row-2-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.two}
              onChange={() => handleSelectRow("two")}
            />
            <FlatTableCell id="ft-row-2-cell-1">Jane Doe</FlatTableCell>
            <FlatTableCell id="ft-row-2-cell-2">York</FlatTableCell>
            <FlatTableCell id="ft-row-2-cell-3">Married</FlatTableCell>
            <FlatTableCell>2</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            onClick={() => handleHighlightRow("three")}
            selected={selectedRows.three}
            highlighted={highlightedRow === "three"}
            expandable
            subRows={SubRows}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-3-cell-1 ft-row-3-cell-2 ft-row-3-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.three}
              onChange={() => handleSelectRow("three")}
            />
            <FlatTableCell id="ft-row-3-cell-1">John Smith</FlatTableCell>
            <FlatTableCell id="ft-row-3-cell-2">Edinburgh</FlatTableCell>
            <FlatTableCell id="ft-row-3-cell-3">Single</FlatTableCell>
            <FlatTableCell>1</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            onClick={() => handleHighlightRow("four")}
            selected={selectedRows.four}
            highlighted={highlightedRow === "four"}
            expandable
            subRows={SubRows}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-4-cell-1 ft-row-4-cell-2 ft-row-4-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.four}
              onChange={() => handleSelectRow("four")}
            />
            <FlatTableCell id="ft-row-4-cell-1">Jane Smith</FlatTableCell>
            <FlatTableCell id="ft-row-4-cell-2">Newcastle</FlatTableCell>
            <FlatTableCell id="ft-row-4-cell-3">Married</FlatTableCell>
            <FlatTableCell>5</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </>
  );
};
```