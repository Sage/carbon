import React, { useState, useCallback, useMemo } from "react";

import {
  DuellingPicklist,
  Picklist,
  PicklistItem,
  PicklistDivider,
  PicklistPlaceholder,
  PicklistGroup,
} from ".";

import Dialog from "../dialog/dialog.component";
import { Checkbox } from "../../__experimental__/components/checkbox";
import Search from "../../__experimental__/components/search";
import Button from "../button";
import Typography from "../typography";

export default {
  title: "Design System/DuellingPicklist",
  component: Picklist,
  parameters: {
    info: {
      disable: true,
    },
  },
};

export const Default = () => {
  const mockData = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `Content ${i + 1}`,
        description: `Description ${i + 1}`,
      };
      arr.push(data);
    }
    return arr;
  }, []);

  const allItems = useMemo(() => {
    return mockData.reduce((obj, item) => {
      obj[item.key] = item;
      return obj;
    }, {});
  }, [mockData]);

  const [isEachItemSelected, setIsEachItemSelected] = useState(false);
  const [order] = useState(mockData.map(({ key }) => key));
  const [notSelectedItems, setNotSelectedItems] = useState(allItems);
  const [notSelectedSearch, setNotSelectedSearch] = useState({});
  const [selectedItems, setSelectedItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const isSearchMode = Boolean(searchQuery.length);

  const onAdd = useCallback(
    (item) => {
      const { [item.key]: removed, ...rest } = notSelectedItems;
      setNotSelectedItems(rest);
      setSelectedItems({ ...selectedItems, [item.key]: item });

      const { [item.key]: removed2, ...rest2 } = notSelectedSearch;
      setNotSelectedSearch(rest2);
    },
    [notSelectedItems, notSelectedSearch, selectedItems]
  );

  const onRemove = useCallback(
    (item) => {
      const { [item.key]: removed, ...rest } = selectedItems;
      setSelectedItems(rest);
      setNotSelectedItems({ ...notSelectedItems, [item.key]: item });
      if (isSearchMode && item.title.includes(searchQuery)) {
        setNotSelectedSearch({ ...notSelectedSearch, [item.key]: item });
      }
    },
    [
      isSearchMode,
      notSelectedItems,
      notSelectedSearch,
      searchQuery,
      selectedItems,
    ]
  );

  const handleSearch = useCallback(
    (ev) => {
      setSearchQuery(ev.target.value);
      const tempNotSelectedItems = Object.keys(notSelectedItems).reduce(
        (items, key) => {
          const item = notSelectedItems[key];
          if (item.title.includes(ev.target.value)) {
            items[item.key] = item;
          }
          return items;
        },
        {}
      );
      setNotSelectedSearch(tempNotSelectedItems);
    },
    [notSelectedItems]
  );

  const renderItems = (list, type, handler) =>
    order.reduce((items, key) => {
      const item = list[key];
      if (item) {
        items.push(
          <PicklistItem key={key} type={type} item={item} onChange={handler}>
            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ width: "50%" }}>
                <p style={{ fontWeight: 700, margin: 0, marginLeft: 24 }}>
                  {item.title}
                </p>
              </div>
              <div style={{ width: "50%" }}>
                <p style={{ margin: 0 }}>{item.description}</p>
              </div>
            </div>
          </PicklistItem>
        );
      }
      return items;
    }, []);

  return (
    <>
      <Checkbox
        onChange={() => setIsEachItemSelected(!isEachItemSelected)}
        checked={isEachItemSelected}
        label="Example checkbox"
      />

      <DuellingPicklist
        leftLabel={`List 1 (${Object.keys(notSelectedItems).length})`}
        rightLabel={`List 2 (${Object.keys(selectedItems).length})`}
        leftControls={
          <Search
            tabIndex={isEachItemSelected ? -1 : 0}
            placeholder="Search"
            name="search_name"
            onChange={handleSearch}
            value={searchQuery}
            id="search_id"
          />
        }
        disabled={isEachItemSelected}
      >
        <Picklist
          disabled={isEachItemSelected}
          placeholder={<div>Your own placeholder</div>}
        >
          {renderItems(
            isSearchMode ? notSelectedSearch : notSelectedItems,
            "add",
            onAdd
          )}
        </Picklist>
        <PicklistDivider />
        <Picklist
          disabled={isEachItemSelected}
          placeholder={<PicklistPlaceholder text="Nothing to see here" />}
        >
          {renderItems(selectedItems, "remove", onRemove)}
        </Picklist>
      </DuellingPicklist>
    </>
  );
};

export const Grouped = () => {
  const mockData = {
    groupA: [
      {
        key: 1,
        title: "Content 1",
      },
      {
        key: 2,
        title: "Content 2",
      },
      {
        key: 3,
        title: "Content 3",
      },
    ],
    groupB: [
      {
        key: 4,
        title: "Content 4",
      },
    ],
    groupC: [
      {
        key: 5,
        title: "Content 5",
      },
      {
        key: 6,
        title: "Content 6",
      },
    ],
  };

  const [notSelectedItems, setNotSelectedItems] = useState(mockData);
  const [selectedItems, setSelectedItems] = useState({});

  const getItemGroup = useCallback(
    (item) => {
      let group;
      for (const [key, value] of Object.entries(mockData)) {
        if (value.filter((data) => data.key === item.key).length > 0)
          group = key;
      }
      return group;
    },
    [mockData]
  );

  const onAdd = useCallback(
    (item) => {
      const itemGroup = getItemGroup(item);
      const { [itemGroup]: group, ...rest } = notSelectedItems;
      const itemIndex = group.indexOf(item);
      group.splice(itemIndex, 1);

      if (group.length > 0) {
        setNotSelectedItems({
          ...rest,
          [itemGroup]: group,
        });
      } else {
        setNotSelectedItems({
          ...rest,
        });
      }

      if (selectedItems[itemGroup]) {
        setSelectedItems({
          ...selectedItems,
          [itemGroup]: [...selectedItems[itemGroup], item],
        });
      } else {
        setSelectedItems({
          ...selectedItems,
          [itemGroup]: [item],
        });
      }
    },
    [notSelectedItems, selectedItems, getItemGroup]
  );

  const onRemove = useCallback(
    (item) => {
      const itemGroup = getItemGroup(item);
      const { [itemGroup]: group, ...rest } = selectedItems;
      const itemIndex = group.indexOf(item);
      group.splice(itemIndex, 1);

      if (group.length > 0) {
        setSelectedItems({
          ...rest,
          [itemGroup]: group,
        });
      } else {
        setSelectedItems({
          ...rest,
        });
      }

      if (notSelectedItems[itemGroup]) {
        setNotSelectedItems({
          ...notSelectedItems,
          [itemGroup]: [...notSelectedItems[itemGroup], item],
        });
      } else {
        setNotSelectedItems({
          ...notSelectedItems,
          [itemGroup]: [item],
        });
      }
    },
    [notSelectedItems, selectedItems, getItemGroup]
  );

  const addGroup = useCallback(
    (group) => {
      const { [group]: removed, ...rest } = notSelectedItems;
      setNotSelectedItems(rest);
      setSelectedItems({ ...selectedItems, [group]: mockData[group] });
    },
    [mockData, notSelectedItems, selectedItems]
  );

  const removeGroup = useCallback(
    (group) => {
      const { [group]: removed, ...rest } = selectedItems;
      setSelectedItems(rest);
      setNotSelectedItems({ ...notSelectedItems, [group]: mockData[group] });
    },
    [mockData, notSelectedItems, selectedItems]
  );

  const renderItems = (list, type, handler) => {
    if (!list) return null;

    list.sort((a, b) => a.key - b.key);

    return list.map((item) => {
      return (
        <PicklistItem key={item.key} type={type} item={item} onChange={handler}>
          <div style={{ display: "flex", width: "100%" }}>
            <p style={{ fontWeight: 700, margin: 0, marginLeft: 24 }}>
              {item.title}
            </p>
          </div>
        </PicklistItem>
      );
    });
  };

  const getTotalItems = (items) => {
    let total = 0;
    const groups = Object.values(items);

    groups.forEach((item) => {
      total += item.length;
    });

    return total;
  };

  return (
    <>
      <DuellingPicklist
        leftLabel={`List 1 (${getTotalItems(notSelectedItems)})`}
        rightLabel={`List 2 (${getTotalItems(selectedItems)})`}
      >
        <Picklist
          placeholder={<PicklistPlaceholder text="Nothing to see here" />}
        >
          {notSelectedItems.groupA && (
            <PicklistGroup
              title={<Typography variant="b">Group A</Typography>}
              type="add"
              onChange={() => addGroup("groupA")}
            >
              {renderItems(notSelectedItems.groupA, "add", onAdd)}
            </PicklistGroup>
          )}
          {notSelectedItems.groupB && (
            <PicklistGroup
              title={<Typography variant="b">Group B</Typography>}
              type="add"
              onChange={() => addGroup("groupB")}
            >
              {renderItems(notSelectedItems.groupB, "add", onAdd)}
            </PicklistGroup>
          )}
          {notSelectedItems.groupC && (
            <PicklistGroup
              title={<Typography variant="b">Group C</Typography>}
              type="add"
              onChange={() => addGroup("groupC")}
            >
              {renderItems(notSelectedItems.groupC, "add", onAdd)}
            </PicklistGroup>
          )}
        </Picklist>
        <PicklistDivider />
        <Picklist
          placeholder={<PicklistPlaceholder text="Nothing to see here" />}
        >
          {selectedItems.groupA && (
            <PicklistGroup
              title={<Typography variant="b">Group A</Typography>}
              type="remove"
              onChange={() => removeGroup("groupA")}
            >
              {renderItems(selectedItems.groupA, "remove", onRemove)}
            </PicklistGroup>
          )}
          {selectedItems.groupB && (
            <PicklistGroup
              title={<Typography variant="b">Group B</Typography>}
              type="remove"
              onChange={() => removeGroup("groupB")}
            >
              {renderItems(selectedItems.groupB, "remove", onRemove)}
            </PicklistGroup>
          )}
          {selectedItems.groupC && (
            <PicklistGroup
              title={<Typography variant="b">Group C</Typography>}
              type="remove"
              onChange={() => removeGroup("groupC")}
            >
              {renderItems(selectedItems.groupC, "remove", onRemove)}
            </PicklistGroup>
          )}
        </Picklist>
      </DuellingPicklist>
    </>
  );
};

export const InDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>
        Open Duelling Picklist
      </Button>

      <Dialog
        open={isDialogOpen}
        onCancel={() => setIsDialogOpen(false)}
        title="Dueling Picklist"
        size="large"
      >
        <Default />
      </Dialog>
    </>
  );
};

Default.story = {
  name: "default",
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};

Grouped.story = {
  name: "grouped",
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};

InDialog.story = {
  name: "in dialog",
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};
