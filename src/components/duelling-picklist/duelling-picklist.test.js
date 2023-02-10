import React from "react";
import DuellingPicklist from "./duelling-picklist.component";
import { Picklist } from "./picklist/picklist.component";
import PicklistItem from "./picklist-item/picklist-item.component";
import PicklistPlaceholder from "./picklist-placeholder/picklist-placeholder.component";
import Search from "../search/search.component";

import {
  assignedPicklist,
  unassignedPicklistItems,
  duellingPicklistComponent,
  picklistRightLabel,
  picklistLeftLabel,
  assignedPicklistItems,
  unassignedPicklist,
  addButton,
  removeButton,
  duellingSearchInput,
  checkBox,
  picklistGroup,
} from "../../../cypress/locators/duelling-picklist/index";
import { keyCode } from "../../../cypress/support/helper";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import {
  getDataElementByValue,
  tooltipPreview,
} from "../../../cypress/locators";
import { CHARACTERS } from "../../../cypress/support/component-helper/constants";
import { Grouped, AlternativeSearch } from "./duelling-picklist.stories";
import { ICON } from "../../../cypress/locators/locators";

const specialCharacters = [
  CHARACTERS.STANDARD,
  CHARACTERS.DIACRITICS,
  CHARACTERS.SPECIALCHARACTERS,
];

const DuellingPicklistComponent = ({ ...props }) => {
  const mockData = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      const data = {
        key: i.toString(),
        title: `Content ${i + 1}`,
        description: `Description ${i + 1}`,
      };
      arr.push(data);
    }
    return arr;
  }, []);
  const allItems = React.useMemo(() => {
    return mockData.reduce((obj, item) => {
      obj[item.key] = item;
      return obj;
    }, {});
  }, [mockData]);
  const [isEachItemSelected] = React.useState(false);
  const [order] = React.useState(mockData.map(({ key }) => key));
  const [notSelectedItems, setNotSelectedItems] = React.useState(allItems);
  const [notSelectedSearch, setNotSelectedSearch] = React.useState({});
  const [selectedItems, setSelectedItems] = React.useState({});
  const [searchQuery, setSearchQuery] = React.useState("");
  const isSearchMode = Boolean(searchQuery.length);
  const onAdd = React.useCallback(
    (item) => {
      const { [item.key]: removed, ...rest } = notSelectedItems;
      setNotSelectedItems(rest);
      setSelectedItems({ ...selectedItems, [item.key]: item });
      const { [item.key]: removed2, ...rest2 } = notSelectedSearch;
      setNotSelectedSearch(rest2);
    },
    [notSelectedItems, notSelectedSearch, selectedItems]
  );
  const onRemove = React.useCallback(
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
  const handleSearch = React.useCallback(
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
    <div>
      <DuellingPicklist
        leftLabel={`List 1 (${Object.keys(notSelectedItems).length})`}
        rightLabel={`List 2 (${Object.keys(selectedItems).length})`}
        disabled={isEachItemSelected}
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
        rightControls={
          <Search
            tabIndex={isEachItemSelected ? -1 : 0}
            placeholder="Search"
            name="search_name"
            onChange={handleSearch}
            value={searchQuery}
            id="search_id"
          />
        }
        {...props}
      >
        <Picklist
          disabled={isEachItemSelected}
          placeholder={<PicklistPlaceholder text="Unassigned list empty" />}
        >
          {renderItems(
            isSearchMode ? notSelectedSearch : notSelectedItems,
            "add",
            onAdd
          )}
        </Picklist>
        <Picklist
          disabled={isEachItemSelected}
          placeholder={<PicklistPlaceholder text="Nothing to see here" />}
        >
          {renderItems(selectedItems, "remove", onRemove)}
        </Picklist>
      </DuellingPicklist>
    </div>
  );
};

const DuellingPicklistComponentPicklistProps = ({ ...props }) => {
  const mockData = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      const data = {
        key: i.toString(),
        title: `Content ${i + 1}`,
        description: `Description ${i + 1}`,
      };
      arr.push(data);
    }
    return arr;
  }, []);
  const allItems = React.useMemo(() => {
    return mockData.reduce((obj, item) => {
      obj[item.key] = item;
      return obj;
    }, {});
  }, [mockData]);
  const [isEachItemSelected] = React.useState(false);
  const [order] = React.useState(mockData.map(({ key }) => key));
  const [notSelectedItems, setNotSelectedItems] = React.useState(allItems);
  const [notSelectedSearch, setNotSelectedSearch] = React.useState({});
  const [selectedItems, setSelectedItems] = React.useState({});
  const [searchQuery] = React.useState("");
  const isSearchMode = Boolean(searchQuery.length);
  const onAdd = React.useCallback(
    (item) => {
      const { [item.key]: removed, ...rest } = notSelectedItems;
      setNotSelectedItems(rest);
      setSelectedItems({ ...selectedItems, [item.key]: item });
      const { [item.key]: removed2, ...rest2 } = notSelectedSearch;
      setNotSelectedSearch(rest2);
    },
    [notSelectedItems, notSelectedSearch, selectedItems]
  );
  const onRemove = React.useCallback(
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
  const renderItems = (list, type, handler) =>
    order.reduce((items, key) => {
      const item = list[key];
      if (item) {
        items.push(
          <PicklistItem
            key={key}
            type={type}
            item={item}
            onChange={handler}
            {...props}
          >
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
    <div>
      <DuellingPicklist
        leftLabel={`List 1 (${Object.keys(notSelectedItems).length})`}
        rightLabel={`List 2 (${Object.keys(selectedItems).length})`}
        disabled={isEachItemSelected}
      >
        <Picklist
          disabled={isEachItemSelected}
          placeholder={<PicklistPlaceholder text="Unassigned list empty" />}
          {...props}
        >
          {renderItems(
            isSearchMode ? notSelectedSearch : notSelectedItems,
            "add",
            onAdd
          )}
        </Picklist>
        <Picklist
          disabled={isEachItemSelected}
          placeholder={<PicklistPlaceholder text="Nothing to see here" />}
        >
          {renderItems(
            isSearchMode ? notSelectedSearch : notSelectedItems,
            "remove",
            onRemove
          )}
        </Picklist>
      </DuellingPicklist>
    </div>
  );
};

context("Testing Duelling-Picklist component", () => {
  describe("should render Duelling-Picklist component", () => {
    it("should verify unassigned picklist has 10 items", () => {
      CypressMountWithProviders(<DuellingPicklistComponent />);

      unassignedPicklistItems().should("have.length", 10);
      picklistLeftLabel().should("have.text", "List 1 (10)");
    });

    it("should verify assigned picklist has 0 items", () => {
      CypressMountWithProviders(<DuellingPicklistComponent />);

      assignedPicklistItems().should("have.length", "0");
      assignedPicklist().find("div").should("have.text", "Nothing to see here");
      picklistRightLabel().should("have.text", "List 2 (0)");
    });

    it("should verify Duelling-Picklist is enabled by default", () => {
      CypressMountWithProviders(<DuellingPicklistComponent />);

      duellingPicklistComponent().should("not.have.attr", "disabled");
    });

    it.each([
      [1, 9, 1],
      [7, 3, 7],
    ])(
      "should verify when %s item(s) are assigned that unassigned picklist has %s items and assigned picklist has %s item(s)",
      (items, leftItems) => {
        CypressMountWithProviders(<DuellingPicklistComponent />);

        for (let i = 0; i < items; i++) {
          addButton(0).click();
        }
        unassignedPicklistItems().should("have.length", leftItems);
        picklistLeftLabel().should("have.text", `List 1 (${leftItems})`);
        assignedPicklistItems().should("have.length", items);
        picklistRightLabel().should("have.text", `List 2 (${items})`);
      }
    );

    it("should verify assigned picklist has 10 items when all items are added", () => {
      CypressMountWithProviders(<DuellingPicklistComponent />);

      for (let i = 0; i < 10; i++) {
        addButton(0).click();
      }
      unassignedPicklistItems().should("have.length", 0);
      unassignedPicklist()
        .find("div")
        .should("have.text", "Unassigned list empty");
      picklistLeftLabel().should("have.text", "List 1 (0)");
      assignedPicklistItems().should("have.length", 10);
      picklistRightLabel().should("have.text", "List 2 (10)");
    });

    it("should verify assigned picklist has 0 items when assigned item is removed", () => {
      CypressMountWithProviders(<DuellingPicklistComponent />);

      addButton(0).click();
      unassignedPicklistItems().should("have.length", 9);
      assignedPicklistItems().should("have.length", 1);
      removeButton(0).click();
      unassignedPicklistItems().should("have.length", 10);
      assignedPicklistItems().should("have.length", 0);
    });

    it.each(["Enter", "Space"])(
      "should verify item is added to assigned picklist when %s key is pressed",
      (pressed) => {
        CypressMountWithProviders(<DuellingPicklistComponent />);

        addButton(0).trigger("keydown", keyCode(pressed));
        unassignedPicklistItems().should("have.length", 9);
        assignedPicklistItems().should("have.length", 1);
      }
    );

    it.each(["Enter", "Space"])(
      "should verify item is removed from assigned picklist when %s key is pressed",
      (pressed) => {
        CypressMountWithProviders(<DuellingPicklistComponent />);

        addButton(0).click();
        unassignedPicklistItems().should("have.length", 9);
        assignedPicklistItems().should("have.length", 1);
        removeButton(0).trigger("keydown", keyCode(pressed));
        unassignedPicklistItems().should("have.length", 10);
        assignedPicklistItems().should("have.length", 0);
      }
    );

    it.each([
      ["Content", 10],
      ["Content 1", 2],
      ["Content 10", 1],
    ])(
      "should verify when %s is enterted into search field that %s results are displayed",
      (searchString, results) => {
        CypressMountWithProviders(<DuellingPicklistComponent />);

        duellingSearchInput().eq(0).type(searchString);
        unassignedPicklistItems().should("have.length", results);
      }
    );

    it("should verify leftControl prop in component generates search field appears above unassigned picklist", () => {
      CypressMountWithProviders(<DuellingPicklistComponent />);

      getDataElementByValue("picklist-left-control")
        .children()
        .should("have.attr", "data-component", "search");
    });

    it("should verify rightControl prop in component generates search field appears above assigned picklist", () => {
      CypressMountWithProviders(<DuellingPicklistComponent />);

      getDataElementByValue("picklist-right-label")
        .children()
        .should("have.attr", "data-component", "search");
    });

    it.each([
      ["disabled", true, "have.attr"],
      ["enabled", false, "not.have.attr"],
    ])(
      "should verify Duelling-Picklist is %s when disabled prop is %s",
      (state, bool, attribute) => {
        CypressMountWithProviders(
          <DuellingPicklistComponent disabled={bool} />
        );

        duellingPicklistComponent().should(attribute, "disabled");
      }
    );

    it("should verify unassigned picklist label is 'Left Label'", () => {
      CypressMountWithProviders(
        <DuellingPicklistComponent leftLabel="Left Label" />
      );

      picklistLeftLabel().should("have.text", "Left Label");
    });

    it("should verify assigned picklist label is 'Right Label'", () => {
      CypressMountWithProviders(
        <DuellingPicklistComponent rightLabel="Right Label" />
      );

      picklistRightLabel().should("have.text", "Right Label");
    });
  });

  describe("should render Duelling-Picklist component to test Picklist props", () => {
    it.each(specialCharacters)(
      "should verify picklist placeholder is set to %s",
      (chars) => {
        CypressMountWithProviders(
          <DuellingPicklistComponentPicklistProps
            placeholder={<PicklistPlaceholder text={chars} />}
          />
        );

        for (let i = 0; i < 10; i++) {
          addButton(0).click();
        }
        unassignedPicklist().find("div").should("have.text", chars);
      }
    );

    it.each([
      ["locked", true, "have.attr", "rgb(242, 245, 246)"],
      ["unlocked", false, "not.have.attr", "rgb(255, 255, 255)"],
    ])(
      "should verify picklist item is %s when locked prop is %s",
      (state, bool, attribute, backColor) => {
        CypressMountWithProviders(
          <DuellingPicklistComponentPicklistProps locked={bool} />
        );

        unassignedPicklistItems().should(
          "have.css",
          "background-color",
          backColor
        );
        unassignedPicklistItems()
          .find(ICON)
          .should(attribute, "data-element", state);
      }
    );

    it("should verify picklist tooltip is 'Item Locked' when locked prop is true", () => {
      CypressMountWithProviders(
        <DuellingPicklistComponentPicklistProps
          locked
          tooltipMessage="Item Locked"
        />
      );

      getDataElementByValue("picklist-item").eq(0).children().eq(1).realHover();
      tooltipPreview().should("have.text", "Item Locked");
    });
  });

  describe("should render Duelling-Picklist with external searchbar and access checkbox", () => {
    it.each([
      ["Content", 20],
      ["Content 1", 11],
      ["Content 10", 1],
    ])(
      "should verify picklist search field can be placed outside the Duelling-Picklist",
      (searchString, results) => {
        CypressMountWithProviders(<AlternativeSearch />);

        getDataElementByValue("input").type(searchString);
        unassignedPicklistItems().should("have.length", results);
      }
    );

    it("should verify Duelling-Picklist is disabled when access checkox is checked", () => {
      CypressMountWithProviders(<AlternativeSearch />);

      checkBox().check();
      duellingPicklistComponent().should("have.attr", "disabled");
    });

    it("should verify Duelling-Picklist is re-enabled when access checkbox is unchecked", () => {
      CypressMountWithProviders(<AlternativeSearch />);

      checkBox().check();
      duellingPicklistComponent().should("have.attr", "disabled");
      checkBox().uncheck();
      duellingPicklistComponent().should("not.have.attr", "disabled");
    });
  });

  describe("should render Duelling-Picklist with items grouped and a picklist divider", () => {
    it("should verify Duelling-Picklist is displayed with divider", () => {
      CypressMountWithProviders(<Grouped />);

      getDataElementByValue("picklist-divider");
    });

    it("should verify Duelling-Picklist is displayed in groups with group label", () => {
      CypressMountWithProviders(<Grouped />);

      picklistGroup().children().eq(0).should("have.text", "Group A");
    });

    it("should verify all items in a group are added to assigned picklist when group add button is clicked", () => {
      CypressMountWithProviders(<Grouped />);

      picklistGroup().children().eq(1).click();
      assignedPicklistItems().should("have.length", "3");
      picklistGroup().eq(2).children().eq(0).should("have.text", "Group A");
    });

    it("should verify all items in a group are removed from assigned picklist when group remove button is clicked", () => {
      CypressMountWithProviders(<Grouped />);

      picklistGroup().children().eq(1).click();
      unassignedPicklistItems().should("have.length", "3");
      assignedPicklistItems().should("have.length", "3");
      picklistGroup().eq(2).children().eq(1).click();
      unassignedPicklistItems().should("have.length", "6");
      assignedPicklistItems().should("have.length", "0");
    });
  });

  describe("check events for Duelling-Picklist component", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onChange when add button clicked", () => {
      CypressMountWithProviders(
        <DuellingPicklistComponentPicklistProps onChange={callback} />
      );

      addButton(0)
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onChange when remove button clicked", () => {
      CypressMountWithProviders(
        <DuellingPicklistComponentPicklistProps onChange={callback} />
      );

      removeButton(0)
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it.each(["Enter", "Space"])(
      "should call onChange when %s key pressed on add button",
      (pressed) => {
        CypressMountWithProviders(
          <DuellingPicklistComponentPicklistProps onChange={callback} />
        );

        addButton(0)
          .trigger("keydown", keyCode(pressed))
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

    it.each(["Enter", "Space"])(
      "should call onChange when %s key pressed on remove button",
      (pressed) => {
        CypressMountWithProviders(
          <DuellingPicklistComponentPicklistProps onChange={callback} />
        );

        removeButton(0)
          .trigger("keydown", keyCode(pressed))
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );
  });
});
