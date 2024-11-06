// eslint-disable @typescript-eslint/no-unused-vars
import React, { useState, useCallback, useMemo } from "react";

import {
  DuellingPicklist,
  Picklist,
  PicklistItem,
  PicklistItemProps,
  PicklistDivider,
  PicklistPlaceholder,
} from ".";
import Search from "../search";
import { Checkbox } from "../checkbox";

export default {
  title: "Duelling Picklist/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

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
    (item) => {
      const { [item.key]: removed, ...rest } = notSelectedItems;
      setNotSelectedItems(rest);
      setSelectedItems({ ...selectedItems, [item.key]: item });
      const { [item.key]: removed2, ...rest2 } = notSelectedSearch;
      setNotSelectedSearch(rest2);
    },
    [notSelectedItems, notSelectedSearch, selectedItems],
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
    ],
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
            onAdd,
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

Default.storyName = "default";
