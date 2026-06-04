```tsx
export const WithSortingHeadersAndCustomAccessibleName: Story = {
  render: (args: FlatTableProps) => {
    const headDataItems: HeadDataItems = [
      { name: "client", isActive: true },
      { name: "total", isActive: false },
    ];
    const bodyDataItems: BodyDataItems = [
      { client: "Jason Atkinson", total: 1349 },
      { client: "Monty Parker", total: 849 },
      { client: "Blake Sutton", total: 3840 },
      { client: "Tyler Webb", total: 280 },
    ];
    /* eslint-disable react-hooks/rules-of-hooks */
    const [headData, setHeadData] = useState(headDataItems);
    const [sortType, setSortType] = useState<SortType>("ascending");
    const [sortValue, setSortValue] = useState<SortValue>("client");
    /* eslint-enable react-hooks/rules-of-hooks */

    const sortByNumber = (
      dataToSort: BodyDataItems,
      sortByValue: SortValue,
      type: SortType,
    ) => {
      const sortedData = dataToSort.sort((a, b) => {
        if (type === "ascending") {
          return Number(a[sortByValue]) - Number(b[sortByValue]);
        }
        if (type === "descending") {
          return Number(b[sortByValue]) - Number(a[sortByValue]);
        }
        return 0;
      });
      return sortedData;
    };

    const sortByString = (
      dataToSort: BodyDataItems,
      sortByValue: SortValue,
      type: SortType,
    ) => {
      const sortedData = dataToSort.sort((a, b) => {
        const nameA = String(a[sortByValue]).toUpperCase();
        const nameB = String(b[sortByValue]).toUpperCase();

        if (type === "ascending") {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        }
        if (type === "descending") {
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
        }
        return 0;
      });
      return sortedData;
    };

    const handleClick = (value: SortValue) => {
      const tempHeadData = headData;
      tempHeadData.forEach((item) => {
        item.isActive = false;
        if (item.name === value) {
          item.isActive = !item.isActive;
        }
      });
      setSortValue(value);
      setSortType(sortType === "ascending" ? "descending" : "ascending");
      setHeadData([...tempHeadData]);
    };

    const renderSortedData = (sortByValue: SortValue) => {
      let sortedData = bodyDataItems;
      if (typeof bodyDataItems[0][sortByValue] === "string") {
        sortedData = sortByString(sortedData, sortByValue, sortType);
      }
      if (typeof bodyDataItems[0][sortByValue] === "number") {
        sortedData = sortByNumber(sortedData, sortByValue, sortType);
      }

      return sortedData.map(({ client, total }) => {
        return (
          <FlatTableRow key={client}>
            <FlatTableCell>{client}</FlatTableCell>
            <FlatTableCell>{total}</FlatTableCell>
          </FlatTableRow>
        );
      });
    };

    return (
      <>
        <Typography as="div" role="status" aria-live="polite" screenReaderOnly>
          {`Sort by ${sortValue} (${sortType})`}
        </Typography>
        <FlatTable
          {...args}
          title="Table for sorting headers with custom accessible name"
        >
          <FlatTableHead>
            <FlatTableRow>
              {headData.map(({ name, isActive }) => {
                return (
                  <FlatTableHeader key={name}>
                    <Sort
                      accessibleName={`Sort ${name}s in an ${sortType} order`}
                      onClick={() => handleClick(name)}
                      {...(isActive && { sortType })}
                    >
                      {name}
                    </Sort>
                  </FlatTableHeader>
                );
              })}
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>{renderSortedData(sortValue)}</FlatTableBody>
        </FlatTable>
      </>
    );
  },
  name: "With Sorting Headers and custom accessible name",
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
};
```