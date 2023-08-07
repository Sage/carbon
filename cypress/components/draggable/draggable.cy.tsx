import React from "react";
import { DraggableContainerProps } from "components/draggable/draggable-container.component";
import {
  draggableItem,
  draggableItemByPosition,
} from "../../locators/draggable";
import * as stories from "../../../src/components/draggable/draggable-test.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";

context("Test for Draggable component", () => {
  describe("check functionality for Draggable component", () => {
    it.each([
      ["One", 1],
      ["One", 2],
      ["One", 3],
      ["One", 4],
      ["Two", 3],
      ["Three", 1],
      ["Four", 2],
    ])(
      "should drag %s and re-order DraggableItem to the %s position",
      (record, destinationId) => {
        CypressMountWithProviders(<stories.DraggableCustom />);

        draggableItem(record).trigger("dragstart");
        draggableItemByPosition(destinationId)
          .trigger("drop")
          .trigger("dragend");
        draggableItemByPosition(destinationId).should("contain", record);
      }
    );

    it("should not change the order of the Draggable when drag outside", () => {
      CypressMountWithProviders(<stories.DraggableDifferentContainers />);

      draggableItem("Five").trigger("dragstart");
      draggableItem("Seven").trigger("drop").trigger("dragend");
      draggableItemByPosition(1).should("contain", "Five");
    });
  });

  describe("check events for Draggable component", () => {
    it("should call getOrder callback when a drag&drop event is triggered", () => {
      const callback: DraggableContainerProps["getOrder"] = cy
        .stub()
        .as("getOrder");
      CypressMountWithProviders(
        <stories.DraggableCustom getOrder={callback} />
      );

      draggableItem("One").trigger("dragstart");
      draggableItemByPosition(3).trigger("drop").trigger("dragend");
      cy.get("@getOrder").should("been.calledOnce");
    });

    it("should call getOrder callback when a drag&drop event is triggered to outside", () => {
      const callback: DraggableContainerProps["getOrder"] = cy
        .stub()
        .as("getOrder");
      CypressMountWithProviders(
        <stories.DraggableDifferentContainers getOrder={callback} />
      );

      draggableItem("Five").trigger("dragstart");
      draggableItem("Seven").trigger("drop").trigger("dragend");
      cy.get("@getOrder").should("to.not.have.been.called");
    });
  });

  describe("accessibility tests for Draggable component", () => {
    it("should pass accessibility tests for Draggable default", () => {
      CypressMountWithProviders(<stories.DraggableCustom />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Draggable with different containers", () => {
      CypressMountWithProviders(<stories.DraggableDifferentContainers />);

      cy.checkAccessibility();
    });
  });
});
