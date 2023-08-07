import React from "react";
import { PicklistItemProps } from "../../../src/components/duelling-picklist/picklist-item/picklist-item.component";
import {
  DuellingPicklistComponent,
  DuellingPicklistComponentPicklistItemProps,
  DuellingPicklistComponentPicklistProps,
} from "../../../src/components/duelling-picklist/duelling-picklist-test.stories";
import PicklistPlaceholder from "../../../src/components/duelling-picklist/picklist-placeholder/picklist-placeholder.component";
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
} from "../../locators/duelling-picklist/index";
import { keyCode } from "../../support/helper";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { getDataElementByValue, tooltipPreview } from "../../locators";
import { CHARACTERS } from "../../support/component-helper/constants";
import * as stories from "../../../src/components/duelling-picklist/duelling-picklist.stories";
import { ICON } from "../../locators/locators";

const specialCharacters = [
  CHARACTERS.STANDARD,
  CHARACTERS.DIACRITICS,
  CHARACTERS.SPECIALCHARACTERS,
];
const keyToTrigger = ["Space", "Enter"] as const;

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

    it.each([...keyToTrigger])(
      "should verify item is added to assigned picklist when %s key is pressed",
      (pressed) => {
        CypressMountWithProviders(<DuellingPicklistComponent />);

        addButton(0).trigger("keydown", keyCode(pressed));
        unassignedPicklistItems().should("have.length", 9);
        assignedPicklistItems().should("have.length", 1);
      }
    );

    it.each([...keyToTrigger])(
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
    it.each([...specialCharacters])(
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
          <DuellingPicklistComponentPicklistItemProps locked={bool} />
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
        <DuellingPicklistComponentPicklistItemProps
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
        CypressMountWithProviders(<stories.AlternativeSearch />);

        getDataElementByValue("input").type(searchString);
        unassignedPicklistItems().should("have.length", results);
      }
    );

    it("should verify Duelling-Picklist is disabled when access checkox is checked", () => {
      CypressMountWithProviders(<stories.AlternativeSearch />);

      checkBox().check();
      duellingPicklistComponent().should("have.attr", "disabled");
    });

    it("should verify Duelling-Picklist is re-enabled when access checkbox is unchecked", () => {
      CypressMountWithProviders(<stories.AlternativeSearch />);

      checkBox().check();
      duellingPicklistComponent().should("have.attr", "disabled");
      checkBox().uncheck();
      duellingPicklistComponent().should("not.have.attr", "disabled");
    });
  });

  describe("should render Duelling-Picklist with items grouped and a picklist divider", () => {
    it("should verify Duelling-Picklist is displayed with divider", () => {
      CypressMountWithProviders(<stories.Grouped />);

      getDataElementByValue("picklist-divider");
    });

    it("should verify Duelling-Picklist is displayed in groups with group label", () => {
      CypressMountWithProviders(<stories.Grouped />);

      picklistGroup().children().eq(0).should("have.text", "Group A");
    });

    it("should verify all items in a group are added to assigned picklist when group add button is clicked", () => {
      CypressMountWithProviders(<stories.Grouped />);

      picklistGroup().children().eq(1).click();
      assignedPicklistItems().should("have.length", "3");
      picklistGroup().eq(2).children().eq(0).should("have.text", "Group A");
    });

    it("should verify all items in a group are removed from assigned picklist when group remove button is clicked", () => {
      CypressMountWithProviders(<stories.Grouped />);

      picklistGroup().children().eq(1).click();
      unassignedPicklistItems().should("have.length", "3");
      assignedPicklistItems().should("have.length", "3");
      picklistGroup().eq(2).children().eq(1).click();
      unassignedPicklistItems().should("have.length", "6");
      assignedPicklistItems().should("have.length", "0");
    });
  });

  describe("check events for Duelling-Picklist component", () => {
    it("should call onChange when add button clicked", () => {
      const callback: PicklistItemProps["onChange"] = cy.stub().as("onChange");
      CypressMountWithProviders(
        <DuellingPicklistComponentPicklistItemProps onChange={callback} />
      );

      addButton(0).click();
      cy.get("@onChange").should("have.been.calledOnce");
    });

    it("should call onChange when remove button clicked", () => {
      const callback: PicklistItemProps["onChange"] = cy.stub().as("onChange");
      CypressMountWithProviders(
        <DuellingPicklistComponentPicklistItemProps onChange={callback} />
      );

      removeButton(0).click();
      cy.get("@onChange").should("have.been.calledOnce");
    });

    it.each([...keyToTrigger])(
      "should call onChange when %s key pressed on add button",
      (pressed) => {
        const callback: PicklistItemProps["onChange"] = cy
          .stub()
          .as("onChange");
        CypressMountWithProviders(
          <DuellingPicklistComponentPicklistItemProps onChange={callback} />
        );

        addButton(0).trigger("keydown", keyCode(pressed));
        cy.get("@onChange").should("have.been.calledOnce");
      }
    );

    it.each([...keyToTrigger])(
      "should call onChange when %s key pressed on remove button",
      (pressed) => {
        const callback: PicklistItemProps["onChange"] = cy
          .stub()
          .as("onChange");
        CypressMountWithProviders(
          <DuellingPicklistComponentPicklistItemProps onChange={callback} />
        );

        removeButton(0).trigger("keydown", keyCode(pressed));
        cy.get("@onChange").should("have.been.calledOnce");
      }
    );
  });

  describe("Accessibility tests for Duelling-Picklist component", () => {
    it("should pass accessibility tests for Duelling-Picklist default story", () => {
      CypressMountWithProviders(<DuellingPicklistComponent />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Duelling-Picklist AlternativeSearch story", () => {
      CypressMountWithProviders(<stories.AlternativeSearch />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Duelling-Picklist Grouped story", () => {
      CypressMountWithProviders(<stories.Grouped />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Duelling-Picklist InDialog story", () => {
      CypressMountWithProviders(<stories.InDialog />);

      getDataElementByValue("main-text").click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Duelling-Picklist AddItem story", () => {
      CypressMountWithProviders(<stories.AddItem />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Duelling-Picklist RemoveItem story", () => {
      CypressMountWithProviders(<stories.RemoveItem />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Duelling-Picklist Locked story", () => {
      CypressMountWithProviders(<stories.Locked />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Duelling-Picklist CustomTooltipMessage story", () => {
      CypressMountWithProviders(<stories.CustomTooltipMessage />);

      getDataElementByValue("locked").realHover();
      cy.checkAccessibility();
    });

    // FE-5711
    // eslint-disable-next-line jest/no-disabled-tests
    describe.skip("skip", () => {
      it("should pass accessibility tests for Duelling-Picklist disabled", () => {
        CypressMountWithProviders(<DuellingPicklistComponent disabled />);

        cy.checkAccessibility();
      });
    });
  });

  it("should render the items with the expected border radius styling", () => {
    CypressMountWithProviders(<DuellingPicklistComponent />);

    for (let i = 0; i < 5; i++) {
      addButton(i).click();
    }

    unassignedPicklistItems().eq(0).should("have.css", "border-radius", "8px");
    unassignedPicklistItems().eq(1).should("have.css", "border-radius", "8px");
    unassignedPicklistItems().eq(2).should("have.css", "border-radius", "8px");
    unassignedPicklistItems().eq(3).should("have.css", "border-radius", "8px");
    unassignedPicklistItems().eq(4).should("have.css", "border-radius", "8px");

    assignedPicklistItems().eq(0).should("have.css", "border-radius", "8px");
    assignedPicklistItems().eq(1).should("have.css", "border-radius", "8px");
    assignedPicklistItems().eq(2).should("have.css", "border-radius", "8px");
    assignedPicklistItems().eq(3).should("have.css", "border-radius", "8px");
    assignedPicklistItems().eq(4).should("have.css", "border-radius", "8px");
  });
});
