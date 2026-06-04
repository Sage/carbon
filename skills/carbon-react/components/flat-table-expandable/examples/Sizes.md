```tsx
export const Sizes: Story = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] =
    useState<SelectedRowsAllRowsInteractive>({
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
  const subRows = (row: SelectedRowsKeyAllRowsInteractive, size: string) => {
    return [
      <FlatTableRow key="sub-row-1" selected={selectedRows[row].subOne}>
        <FlatTableCheckbox
          ariaLabelledBy={`${size}-row-${row}-sub-row-1-cell-1 ${size}-row-${row}-sub-row-1-cell-2 ${size}-row-${row}-sub-row-1-cell-3`}
          onClick={(e) => e.stopPropagation()}
          checked={selectedRows[row].subOne}
          onChange={() => handleSelectRow(row, "subOne")}
        />
        <FlatTableCell id={`${size}-row-${row}-sub-row-1-cell-1`}>
          Child one
        </FlatTableCell>
        <FlatTableCell id={`${size}-row-${row}-sub-row-1-cell-2`}>
          York
        </FlatTableCell>
        <FlatTableCell id={`${size}-row-${row}-sub-row-1-cell-3`}>
          Married
        </FlatTableCell>
      </FlatTableRow>,
      <FlatTableRow key="sub-row-2" selected={selectedRows[row].subTwo}>
        <FlatTableCheckbox
          ariaLabelledBy={`${size}-row-${row}-sub-row-2-cell-1 ${size}-row-${row}-sub-row-2-cell-2 ${size}-row-${row}-sub-row-2-cell-3`}
          onClick={(e) => e.stopPropagation()}
          checked={selectedRows[row].subTwo}
          onChange={() => handleSelectRow(row, "subTwo")}
        />
        <FlatTableCell id={`${size}-row-${row}-sub-row-2-cell-1`}>
          Child two
        </FlatTableCell>
        <FlatTableCell id={`${size}-row-${row}-sub-row-2-cell-2`}>
          Edinburgh
        </FlatTableCell>
        <FlatTableCell id={`${size}-row-${row}-sub-row-2-cell-3`}>
          Single
        </FlatTableCell>
      </FlatTableRow>,
    ];
  };
  const sizes = ["compact", "small", "medium", "large", "extraLarge"] as const;
  return (
    <Box>
      {sizes.map((size, index) => (
        <Box mb={3} key={String(`${index}-${size}`)}>
          <FlatTable size={size} aria-label={`flat-table-${size}`}>
            <FlatTableHead>
              <FlatTableRow>
                <FlatTableCheckbox
                  ariaLabelledBy={`${size}-row-1-cell-1 ${size}-row-1-cell-2 ${size}-row-1-cell-3`}
                  onClick={(e) => e.stopPropagation()}
                  as="th"
                  checked={selectAll}
                  onChange={() => handleSelectAllRows()}
                />
                <FlatTableHeader id={`${size}-row-1-cell-1`}>
                  Name
                </FlatTableHeader>
                <FlatTableHeader id={`${size}-row-1-cell-2`}>
                  Location
                </FlatTableHeader>
                <FlatTableHeader id={`${size}-row-1-cell-3`}>
                  Relationship Status
                </FlatTableHeader>
              </FlatTableRow>
            </FlatTableHead>
            <FlatTableBody>
              <FlatTableRow
                selected={selectedRows.one.parent}
                expandable
                subRows={subRows("one", size)}
              >
                <FlatTableCheckbox
                  ariaLabelledBy={`${size}-row-2-cell-1 ${size}-row-2-cell-2 ${size}-row-2-cell-3`}
                  onClick={(e) => e.stopPropagation()}
                  checked={selectedRows.one.parent}
                  onChange={() => handleSelectRow("one", "parent")}
                />
                <FlatTableCell id={`${size}-row-2-cell-1`}>
                  John Doe
                </FlatTableCell>
                <FlatTableCell id={`${size}-row-2-cell-2`}>
                  London
                </FlatTableCell>
                <FlatTableCell id={`${size}-row-2-cell-3`}>
                  Single
                </FlatTableCell>
              </FlatTableRow>
              <FlatTableRow
                selected={selectedRows.two.parent}
                expandable
                subRows={subRows("two", size)}
              >
                <FlatTableCheckbox
                  ariaLabelledBy={`${size}-row-3-cell-1 ${size}-row-3-cell-2 ${size}-row-3-cell-3`}
                  onClick={(e) => e.stopPropagation()}
                  checked={selectedRows.two.parent}
                  onChange={() => handleSelectRow("two", "parent")}
                />
                <FlatTableCell id={`${size}-row-3-cell-1`}>
                  Jane Doe
                </FlatTableCell>
                <FlatTableCell id={`${size}-row-3-cell-2`}>York</FlatTableCell>
                <FlatTableCell id={`${size}-row-3-cell-3`}>
                  Married
                </FlatTableCell>
              </FlatTableRow>
              <FlatTableRow
                selected={selectedRows.three.parent}
                expandable
                subRows={subRows("three", size)}
              >
                <FlatTableCheckbox
                  ariaLabelledBy={`${size}-row-4-cell-1 ${size}-row-4-cell-2 ${size}-row-4-cell-3`}
                  onClick={(e) => e.stopPropagation()}
                  checked={selectedRows.three.parent}
                  onChange={() => handleSelectRow("three", "parent")}
                />
                <FlatTableCell id={`${size}-row-4-cell-1`}>
                  John Smith
                </FlatTableCell>
                <FlatTableCell id={`${size}-row-4-cell-2`}>
                  Edinburgh
                </FlatTableCell>
                <FlatTableCell id={`${size}-row-4-cell-3`}>
                  Single
                </FlatTableCell>
              </FlatTableRow>
              <FlatTableRow
                selected={selectedRows.four.parent}
                expandable
                subRows={subRows("four", size)}
              >
                <FlatTableCheckbox
                  ariaLabelledBy={`${size}-row-5-cell-1 ${size}-row-5-cell-2 ${size}-row-5-cell-3`}
                  onClick={(e) => e.stopPropagation()}
                  checked={selectedRows.four.parent}
                  onChange={() => handleSelectRow("four", "parent")}
                />
                <FlatTableCell id={`${size}-row-5-cell-1`}>
                  Jane Smith
                </FlatTableCell>
                <FlatTableCell id={`${size}-row-5-cell-2`}>
                  Newcastle
                </FlatTableCell>
                <FlatTableCell id={`${size}-row-5-cell-3`}>
                  Married
                </FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        </Box>
      ))}
    </Box>
  );
};
```