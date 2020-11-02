import React, { useState, useCallback, useMemo } from "react";

import { dlsThemeSelector } from "../../../.storybook/theme-selectors";
import {
  DuellingPicklist,
  Picklist,
  PicklistItem,
  PicklistDivider,
  PicklistPlaceholder,
} from ".";

import Dialog from "../dialog/dialog.component";
import { Checkbox } from "../../__experimental__/components/checkbox";
import Search from "../../__experimental__/components/search";
import Button from "../button";

export default {
  title: "Test/DuellingPicklist",
  component: Picklist,
  parameters: {
    themeSelector: dlsThemeSelector,
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
  },
};

export const Basic = () => {
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
        <Basic />
      </Dialog>
    </>
  );
};

Basic.story = {
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};

InDialog.story = {
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};
