```tsx
export const Grouped: Story = () => {
  const allGroups = {
    groupA: "Group A",
    groupB: "Group B",
    groupC: "Group C",
  };

  const mockData = [
    { key: 1, title: "Content 1", group: "groupA" },
    { key: 2, title: "Content 2", group: "groupA" },
    { key: 3, title: "Content 3", group: "groupA" },
    { key: 4, title: "Content 4", group: "groupB" },
    { key: 5, title: "Content 5", group: "groupC" },
    { key: 6, title: "Content 6", group: "groupC" },
  ];

  type MockData = typeof mockData;
  type GroupKey = keyof typeof allGroups;

  const [notSelectedItems, setNotSelectedItems] = useState<MockData>([
    ...mockData,
  ]);
  const [selectedItems, setSelectedItems] = useState<MockData>([]);

  const onAdd = useCallback(
    (item: ItemGroup) => {
      setSelectedItems([...selectedItems, item]);
      setNotSelectedItems([
        ...notSelectedItems.filter((i) => i.key !== item.key),
      ]);
    },
    [notSelectedItems, selectedItems],
  );

  const onRemove = useCallback(
    (item: ItemGroup) => {
      setNotSelectedItems([...notSelectedItems, item]);
      setSelectedItems([...selectedItems.filter((i) => i.key !== item.key)]);
    },
    [notSelectedItems, selectedItems],
  );

  const addGroup = useCallback(
    (group: GroupKey) => {
      const groupItems = notSelectedItems.filter(
        (item) => item.group === group,
      );
      setNotSelectedItems([
        ...notSelectedItems.filter((item) => item.group !== group),
      ]);
      setSelectedItems([...selectedItems, ...groupItems]);
    },
    [notSelectedItems, selectedItems],
  );

  const removeGroup = useCallback(
    (group: GroupKey) => {
      const groupItems = selectedItems.filter((item) => item.group === group);

      setSelectedItems([
        ...selectedItems.filter((item) => item.group !== group),
      ]);
      setNotSelectedItems([...notSelectedItems, ...groupItems]);
    },
    [notSelectedItems, selectedItems],
  );

  const renderItems = (
    list: MockData,
    type: PicklistItemProps["type"],
    handler: PicklistItemProps["onChange"],
  ) => {
    if (!list) return null;

    list.sort((a, b) => a.key - b.key);

    return list.map((item) => {
      return (
        <PicklistItem key={item.key} type={type} item={item} onChange={handler}>
          <div style={{ display: "flex", width: "100%" }}>
            <p style={{ fontWeight: 500, margin: 0, marginLeft: 24 }}>
              {item.title}
            </p>
          </div>
        </PicklistItem>
      );
    });
  };

  return (
    <DuellingPicklist
      leftLabel={`List 1 (${notSelectedItems.length})`}
      rightLabel={`List 2 (${selectedItems.length})`}
    >
      <Picklist
        placeholder={<PicklistPlaceholder text="Nothing to see here" />}
      >
        {Object.entries(allGroups).map(([key, value]) => {
          const groupItems = notSelectedItems.filter(
            (item) => item.group === key,
          );
          return groupItems.length ? (
            <PicklistGroup
              key={key}
              title={<Typography variant="b">{value}</Typography>}
              type="add"
              onChange={() => addGroup(key as GroupKey)}
            >
              {renderItems(
                groupItems,
                "add",
                onAdd as PicklistItemProps["onChange"],
              )}
            </PicklistGroup>
          ) : null;
        })}
      </Picklist>
      <PicklistDivider />
      <Picklist
        placeholder={<PicklistPlaceholder text="Nothing to see here" />}
      >
        {Object.entries(allGroups).map(([key, value]) => {
          const groupItems = selectedItems.filter((item) => item.group === key);
          return groupItems.length ? (
            <PicklistGroup
              key={key}
              title={<Typography variant="b">{value}</Typography>}
              type="remove"
              onChange={() => removeGroup(key as GroupKey)}
            >
              {renderItems(
                groupItems,
                "remove",
                onRemove as PicklistItemProps["onChange"],
              )}
            </PicklistGroup>
          ) : null;
        })}
      </Picklist>
    </DuellingPicklist>
  );
};
```