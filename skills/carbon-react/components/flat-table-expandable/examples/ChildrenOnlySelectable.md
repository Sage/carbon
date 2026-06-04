```tsx
export const ChildrenOnlySelectable: Story = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] =
    useState<SelectedRowsChildrenOnlySelectableStory>({
      one: {
        subOne: false,
        subTwo: false,
      },
      two: {
        subOne: false,
        subTwo: false,
      },
      three: {
        subOne: false,
        subTwo: false,
      },
      four: {
        subOne: false,
        subTwo: false,
      },
    });
  const [highlightedRow, setHighlightedRow] = useState("");
  const handleSelectAllRows = () => {
    const newState = { ...selectedRows };
    Object.keys(selectedRows).forEach((key) => {
      newState[key as SelectedRowsChildrenOnlySelectableStoryKey] = {
        subOne: !selectAll,
        subTwo: !selectAll,
      };
    });
    setSelectedRows({ ...newState });
    setSelectAll(!selectAll);
  };
  const handleSelectRow = (
    row: SelectedRowsChildrenOnlySelectableStoryKey,
    subRow: SubRowsShapeChildrenOnlySelectableStoryKey,
  ) => {
    if (selectedRows[row][subRow]) {
      setSelectAll(false);
    }
    setSelectedRows({
      ...selectedRows,
      [row]: {
        ...selectedRows[row],
        [subRow]: !selectedRows[row][subRow],
      },
    });
  };
  const handleHighlightRow = (id: string) => {
    if (highlightedRow === id) {
      setHighlightedRow("");
    } else {
      setHighlightedRow(id);
    }
  };
  const selectedCount = Object.values(selectedRows).reduce((acc, values) => {
    const count = Object.keys(values).filter((key) =>
      Boolean(values[key as SubRowsShapeChildrenOnlySelectableStoryKey]),
    ).length;
    return acc + count;
  }, 0);
  const subRows = (row: SelectedRowsChildrenOnlySelectableStoryKey) => {
    return [
      <FlatTableRow
        key="sub-row-1"
        selected={selectedRows[row].subOne}
        onClick={() => handleHighlightRow(`${row}.subOne`)}
        highlighted={highlightedRow === `${row}.subOne`}
      >
        <FlatTableCheckbox
          ariaLabelledBy={`ft-row-${row}-sub-row-1-cell-1 ft-row-${row}-sub-row-1-cell-2 ft-row-${row}-sub-row-1-cell-3`}
          onClick={(e) => e.stopPropagation()}
          checked={selectedRows[row].subOne}
          onChange={() => handleSelectRow(row, "subOne")}
        />
        <FlatTableCell id={`ft-row-${row}-sub-row-1-cell-1`}>
          Child one
        </FlatTableCell>
        <FlatTableCell id={`ft-row-${row}-sub-row-1-cell-2`}>
          York
        </FlatTableCell>
        <FlatTableCell id={`ft-row-${row}-sub-row-1-cell-3`}>
          Married
        </FlatTableCell>
        <FlatTableCell>2</FlatTableCell>
      </FlatTableRow>,
      <FlatTableRow
        key="sub-row-2"
        selected={selectedRows[row].subTwo}
        onClick={() => handleHighlightRow(`${row}.subTwo`)}
        highlighted={highlightedRow === `${row}.subTwo`}
      >
        <FlatTableCheckbox
          ariaLabelledBy={`ft-row-${row}-sub-row-2-cell-1 ft-row-${row}-sub-row-2-cell-2 ft-row-${row}-sub-row-2-cell-3`}
          onClick={(e) => e.stopPropagation()}
          checked={selectedRows[row].subTwo}
          onChange={() => handleSelectRow(row, "subTwo")}
        />
        <FlatTableCell id={`ft-row-${row}-sub-row-2-cell-1`}>
          Child two
        </FlatTableCell>
        <FlatTableCell id={`ft-row-${row}-sub-row-2-cell-2`}>
          Edinburgh
        </FlatTableCell>
        <FlatTableCell id={`ft-row-${row}-sub-row-2-cell-3`}>
          Single
        </FlatTableCell>
        <FlatTableCell>1</FlatTableCell>
      </FlatTableRow>,
    ];
  };
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
            highlighted={highlightedRow === "one"}
            expandable
            subRows={subRows("one")}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-1-cell-1 ft-row-1-cell-2 ft-row-1-cell-3"
              onClick={(e) => e.stopPropagation()}
              selectable={false}
              checked={false}
              onChange={() => {}}
            />
            <FlatTableCell id="ft-row-1-cell-1">John Doe</FlatTableCell>
            <FlatTableCell id="ft-row-1-cell-2">London</FlatTableCell>
            <FlatTableCell id="ft-row-1-cell-3">Single</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            onClick={() => handleHighlightRow("two")}
            highlighted={highlightedRow === "two"}
            expandable
            subRows={subRows("two")}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-2-cell-1 ft-row-2-cell-2 ft-row-2-cell-3"
              onClick={(e) => e.stopPropagation()}
              selectable={false}
              checked={false}
              onChange={() => {}}
            />
            <FlatTableCell id="ft-row-2-cell-1">Jane Doe</FlatTableCell>
            <FlatTableCell id="ft-row-2-cell-2">York</FlatTableCell>
            <FlatTableCell id="ft-row-2-cell-3">Married</FlatTableCell>
            <FlatTableCell>2</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            onClick={() => handleHighlightRow("three")}
            highlighted={highlightedRow === "three"}
            expandable
            subRows={subRows("three")}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-3-cell-1 ft-row-3-cell-2 ft-row-3-cell-3"
              onClick={(e) => e.stopPropagation()}
              selectable={false}
              checked={false}
              onChange={() => {}}
            />
            <FlatTableCell id="ft-row-3-cell-1">John Smith</FlatTableCell>
            <FlatTableCell id="ft-row-3-cell-2">Edinburgh</FlatTableCell>
            <FlatTableCell id="ft-row-3-cell-3">Single</FlatTableCell>
            <FlatTableCell>1</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            onClick={() => handleHighlightRow("four")}
            highlighted={highlightedRow === "four"}
            expandable
            subRows={subRows("four")}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-4-cell-1 ft-row-4-cell-2 ft-row-4-cell-3"
              onClick={(e) => e.stopPropagation()}
              selectable={false}
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
    </>
  );
};
```