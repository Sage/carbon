```tsx
export const BothParentAndChildrenSelectable: Story = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({
    one: {
      parent: false,
      subOne: false,
      subTwo: false,
    },
    two: {
      parent: false,
      subOne: false,
      subTwo: false,
    },
    three: {
      parent: false,
      subOne: false,
      subTwo: false,
    },
    four: {
      parent: false,
      subOne: false,
      subTwo: false,
    },
  });
  const handleSelectAllRows = () => {
    const newState = { ...selectedRows };
    Object.keys(selectedRows).forEach((key) => {
      newState[key as SelectedRowsKeyAllRowsInteractive] = {
        parent: !selectAll,
        subOne: !selectAll,
        subTwo: !selectAll,
      };
    });
    setSelectedRows({ ...newState });
    setSelectAll(!selectAll);
  };
  const handleSelectRow = (
    row: SelectedRowsKeyAllRowsInteractive,
    subRow: SubRowKeyAllRowsInteractive,
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
  const selectedCount = Object.values(selectedRows).reduce((acc, values) => {
    const count = Object.keys(values).filter((key) =>
      Boolean(values[key as SubRowKeyAllRowsInteractive]),
    ).length;
    return acc + count;
  }, 0);
  const subRows = (row: SelectedRowsKeyAllRowsInteractive) => {
    return [
      <FlatTableRow key="sub-row-1" selected={selectedRows[row].subOne}>
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
        <FlatTableCell>
          <ActionPopover>
            <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
          </ActionPopover>
        </FlatTableCell>
      </FlatTableRow>,
      <FlatTableRow key="sub-row-2" selected={selectedRows[row].subTwo}>
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
        <FlatTableCell>
          <ActionPopover>
            <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
          </ActionPopover>
        </FlatTableCell>
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
            selected={selectedRows.one.parent}
            expandable
            subRows={subRows("one")}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-1-cell-1 ft-row-1-cell-2 ft-row-1-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.one.parent}
              onChange={() => handleSelectRow("one", "parent")}
            />
            <FlatTableCell id="ft-row-1-cell-1">John Doe</FlatTableCell>
            <FlatTableCell id="ft-row-1-cell-2">London</FlatTableCell>
            <FlatTableCell id="ft-row-1-cell-3">Single</FlatTableCell>
            <FlatTableCell>
              <ActionPopover>
                <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            selected={selectedRows.two.parent}
            expandable
            subRows={subRows("two")}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-2-cell-1 ft-row-2-cell-2 ft-row-2-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.two.parent}
              onChange={() => handleSelectRow("two", "parent")}
            />
            <FlatTableCell id="ft-row-2-cell-1">Jane Doe</FlatTableCell>
            <FlatTableCell id="ft-row-2-cell-2">York</FlatTableCell>
            <FlatTableCell id="ft-row-2-cell-3">Married</FlatTableCell>
            <FlatTableCell>
              <ActionPopover>
                <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            selected={selectedRows.three.parent}
            expandable
            subRows={subRows("three")}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-3-cell-1 ft-row-3-cell-2 ft-row-3-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.three.parent}
              onChange={() => handleSelectRow("three", "parent")}
            />
            <FlatTableCell id="ft-row-3-cell-1">John Smith</FlatTableCell>
            <FlatTableCell id="ft-row-3-cell-2">Edinburgh</FlatTableCell>
            <FlatTableCell id="ft-row-3-cell-3">Single</FlatTableCell>
            <FlatTableCell>
              <ActionPopover>
                <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            selected={selectedRows.four.parent}
            expandable
            subRows={subRows("four")}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-4-cell-1 ft-row-4-cell-2 ft-row-4-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.four.parent}
              onChange={() => handleSelectRow("four", "parent")}
            />
            <FlatTableCell id="ft-row-4-cell-1">Jane Smith</FlatTableCell>
            <FlatTableCell id="ft-row-4-cell-2">Newcastle</FlatTableCell>
            <FlatTableCell id="ft-row-4-cell-3">Married</FlatTableCell>
            <FlatTableCell>
              <ActionPopover>
                <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </>
  );
};
```