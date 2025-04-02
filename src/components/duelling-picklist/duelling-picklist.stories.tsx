import React, { useState, useCallback, useMemo } from "react";
import { Meta, StoryObj } from "@storybook/react";

import {
  DuellingPicklist,
  Picklist,
  PicklistItem,
  PicklistItemProps,
  PicklistDivider,
  PicklistPlaceholder,
  PicklistGroup,
} from ".";
import Dialog from "../dialog/dialog.component";
import Search, { SearchEvent } from "../search";
import { Checkbox } from "../checkbox";
import Box from "../box";
import Button from "../button";
import Typography from "../typography";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import isChromatic from "../../../.storybook/isChromatic";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const defaultOpenState = isChromatic();

const meta: Meta<typeof DuellingPicklist> = {
  title: "Duelling Picklist",
  component: DuellingPicklist,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof DuellingPicklist>;

type Item = { key: string; title: string; description: string };
type AllItems = { [key: string]: Item };

export const Default = () => {
  const mockData: Item[] = useMemo(() => {
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
    return mockData.reduce(
      (obj, item) => {
        obj[item.key] = item;
        return obj;
      },
      {} as { [key: string]: Item },
    );
  }, [mockData]);

  const [isEachItemSelected, setIsEachItemSelected] = useState(false);
  const [order] = useState(mockData.map(({ key }) => key));
  const [notSelectedItems, setNotSelectedItems] = useState<AllItems>(allItems);
  const [notSelectedSearch, setNotSelectedSearch] = useState<AllItems>({});
  const [selectedItems, setSelectedItems] = useState<AllItems>({});
  const [searchQuery, setSearchQuery] = useState("");
  const isSearchMode = Boolean(searchQuery.length);

  const onAdd = useCallback(
    (item: Item) => {
      const { [item.key]: removed, ...rest } = notSelectedItems;
      setNotSelectedItems(rest);
      setSelectedItems({ ...selectedItems, [item.key]: item });
      const { [item.key]: removed2, ...rest2 } = notSelectedSearch;
      setNotSelectedSearch(rest2);
    },
    [notSelectedItems, notSelectedSearch, selectedItems],
  );

  const onRemove = useCallback(
    (item: Item) => {
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
    ],
  );

  const handleSearch = useCallback(
    (ev: SearchEvent) => {
      setSearchQuery(ev.target.value);
      const tempNotSelectedItems = Object.keys(notSelectedItems).reduce(
        (items, key) => {
          const item = notSelectedItems[key];
          if (item.title.includes(ev.target.value)) {
            items[item.key] = item;
          }
          return items;
        },
        {} as AllItems,
      );
      setNotSelectedSearch(tempNotSelectedItems);
    },
    [notSelectedItems],
  );

  const renderItems = (
    list: AllItems,
    type: PicklistItemProps["type"],
    handler: PicklistItemProps["onChange"],
  ) =>
    order.reduce((items, key) => {
      const item = list[key];
      if (item) {
        items.push(
          <PicklistItem key={key} type={type} item={item} onChange={handler}>
            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ width: "50%" }}>
                <p style={{ fontWeight: 500, margin: 0, marginLeft: 24 }}>
                  {item.title}
                </p>
              </div>
              <div style={{ width: "50%" }}>
                <p style={{ margin: 0 }}>{item.description}</p>
              </div>
            </div>
          </PicklistItem>,
        );
      }
      return items;
    }, [] as JSX.Element[]);

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
            onAdd as PicklistItemProps["onChange"],
          )}
        </Picklist>
        <PicklistDivider />
        <Picklist
          disabled={isEachItemSelected}
          placeholder={<PicklistPlaceholder text="Nothing to see here" />}
        >
          {renderItems(
            selectedItems,
            "remove",
            onRemove as PicklistItemProps["onChange"],
          )}
        </Picklist>
      </DuellingPicklist>
    </>
  );
};

Default.storyName = "Default";

export const AlternativeSearch: Story = () => {
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
    }, {} as AllItems);
  }, [mockData]);

  const [isEachItemSelected, setIsEachItemSelected] = useState(false);
  const [order] = useState(mockData.map(({ key }) => key));
  const [notSelectedItems, setNotSelectedItems] = useState<AllItems>(allItems);
  const [notSelectedSearch, setNotSelectedSearch] = useState<AllItems>({});
  const [selectedItems, setSelectedItems] = useState<AllItems>({});
  const [searchQuery, setSearchQuery] = useState("");
  const isSearchMode = Boolean(searchQuery.length);

  const onAdd = useCallback(
    (item: Item) => {
      const { [item.key]: removed, ...rest } = notSelectedItems;
      setNotSelectedItems(rest);
      setSelectedItems({ ...selectedItems, [item.key]: item });
      const { [item.key]: removed2, ...rest2 } = notSelectedSearch;
      setNotSelectedSearch(rest2);
    },
    [notSelectedItems, notSelectedSearch, selectedItems],
  );

  const onRemove = useCallback(
    (item: Item) => {
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
    ],
  );

  const handleSearch = useCallback(
    (ev: SearchEvent) => {
      setSearchQuery(ev.target.value);
      const tempNotSelectedItems = Object.keys(notSelectedItems).reduce(
        (items, key) => {
          const item = notSelectedItems[key];
          if (item.title.includes(ev.target.value)) {
            items[item.key] = item;
          }
          return items;
        },
        {} as AllItems,
      );
      setNotSelectedSearch(tempNotSelectedItems);
    },
    [notSelectedItems],
  );

  const renderItems = (
    list: AllItems,
    type: PicklistItemProps["type"],
    handler: PicklistItemProps["onChange"],
  ) =>
    order.reduce((items, key) => {
      const item = list[key];
      if (item) {
        items.push(
          <PicklistItem key={key} type={type} item={item} onChange={handler}>
            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ width: "50%" }}>
                <p style={{ fontWeight: 500, margin: 0, marginLeft: 24 }}>
                  {item.title}
                </p>
              </div>
              <div style={{ width: "50%" }}>
                <p style={{ margin: 0 }}>{item.description}</p>
              </div>
            </div>
          </PicklistItem>,
        );
      }
      return items;
    }, [] as JSX.Element[]);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Checkbox
          onChange={() => setIsEachItemSelected(!isEachItemSelected)}
          checked={isEachItemSelected}
          label="Example checkbox"
        />
        <Box width="calc(50% + 80px)">
          <Search
            tabIndex={isEachItemSelected ? -1 : 0}
            placeholder="Search"
            name="search_name"
            onChange={handleSearch}
            value={searchQuery}
            id="search_id"
          />
        </Box>
      </Box>
      <DuellingPicklist
        leftLabel={`List 1 (${Object.keys(notSelectedItems).length})`}
        rightLabel={`List 2 (${Object.keys(selectedItems).length})`}
        disabled={isEachItemSelected}
      >
        <Picklist
          disabled={isEachItemSelected}
          placeholder={<div>Your own placeholder</div>}
        >
          {renderItems(
            isSearchMode ? notSelectedSearch : notSelectedItems,
            "add",
            onAdd as PicklistItemProps["onChange"],
          )}
        </Picklist>
        <Picklist
          disabled={isEachItemSelected}
          placeholder={<PicklistPlaceholder text="Nothing to see here" />}
        >
          {renderItems(
            selectedItems,
            "remove",
            onRemove as PicklistItemProps["onChange"],
          )}
        </Picklist>
      </DuellingPicklist>
    </>
  );
};
AlternativeSearch.storyName = "Alternative Search Placement";

type ItemGroup = { key: number; title: string; group: string };

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
Grouped.storyName = "Grouped";

export const InDialog: Story = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(defaultOpenState);
  return (
    <Box {...(defaultOpenState ? { height: 900 } : {})}>
      <Button onClick={() => setIsDialogOpen(true)}>
        Open Duelling Picklist
      </Button>
      <Dialog
        open={isDialogOpen}
        onCancel={() => setIsDialogOpen(false)}
        title="Duelling Picklist"
        size="large"
      >
        <Default />
      </Dialog>
    </Box>
  );
};
InDialog.storyName = "In Dialog";

export const AddItem: Story = () => (
  <ul>
    <PicklistItem type="add" item={1} onChange={() => null}>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "50%" }}>
          <p style={{ fontWeight: 500, margin: 0, marginLeft: 24 }}>
            Title for Item
          </p>
        </div>
      </div>
    </PicklistItem>
  </ul>
);
AddItem.storyName = "Add Item";

export const RemoveItem: Story = () => (
  <ul>
    <PicklistItem type="remove" item={1} onChange={() => null}>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "50%" }}>
          <p style={{ fontWeight: 500, margin: 0, marginLeft: 24 }}>
            Title for Item
          </p>
        </div>
      </div>
    </PicklistItem>
  </ul>
);
RemoveItem.storyName = "Remove Item";

export const Locked: Story = () => (
  <ul>
    <PicklistItem type="add" item={1} onChange={() => null} locked>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "50%" }}>
          <p style={{ fontWeight: 500, margin: 0, marginLeft: 24 }}>
            Title for Item
          </p>
        </div>
      </div>
    </PicklistItem>
  </ul>
);
Locked.storyName = "Locked";

export const CustomTooltipMessage: Story = () => (
  <ul>
    <PicklistItem
      type="add"
      item={1}
      onChange={() => null}
      locked
      tooltipMessage="This is a custom locked tooltip message"
    >
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "50%" }}>
          <p style={{ fontWeight: 500, margin: 0, marginLeft: 24 }}>
            Title for Item
          </p>
        </div>
      </div>
    </PicklistItem>
  </ul>
);
CustomTooltipMessage.storyName = "Custom Tooltip Message";
CustomTooltipMessage.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};
