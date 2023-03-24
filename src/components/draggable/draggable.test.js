/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from "react";
import DraggableContainer from "./draggable-container.component";
import DraggableItem from "./draggable-item.component";
import { Checkbox } from "../checkbox";
import Box from "../box";

import {
  draggableItem,
  draggableItemByPosition,
} from "../../../cypress/locators/draggable";

import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

const DraggableCustom = ({ getOrder, ...props }) => {
  const handleUpdate = (items) => {
    console.log(items);
    if (getOrder) {
      getOrder();
    }
  };

  return (
    <DraggableContainer {...props} getOrder={handleUpdate}>
      <DraggableItem key="1" id={1}>
        <Checkbox label="Draggable Label One" />
      </DraggableItem>
      <DraggableItem key="2" id={2}>
        <Checkbox label="Draggable Label Two" />
      </DraggableItem>
      <DraggableItem key="3" id={3}>
        <Checkbox label="Draggable Label Three" />
      </DraggableItem>
      <DraggableItem key="4" id={4}>
        <Checkbox label="Draggable Label Four" />
      </DraggableItem>
    </DraggableContainer>
  );
};

const DraggableDifferentContainers = ({ getOrder, ...props }) => {
  const handleUpdate = (items) => {
    console.log(items);
    if (getOrder) {
      getOrder();
    }
  };

  return (
    <Box>
      <DraggableContainer mb={9} getOrder={handleUpdate} {...props}>
        <DraggableItem key="4" id={4}>
          <Checkbox label="Draggable Label Four" />
        </DraggableItem>
        <DraggableItem key="5" id={5}>
          <Checkbox label="Draggable Label Five" />
        </DraggableItem>
        <DraggableItem key="6" id={6}>
          <Checkbox label="Draggable Label Six" />
        </DraggableItem>
      </DraggableContainer>
      <DraggableContainer mt={9}>
        <DraggableItem key="7" id={7}>
          <Checkbox label="Draggable Label Seven" />
        </DraggableItem>
      </DraggableContainer>
    </Box>
  );
};

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
        CypressMountWithProviders(<DraggableCustom />);

        draggableItem(record).trigger("dragstart");
        draggableItemByPosition(destinationId)
          .trigger("drop")
          .trigger("dragend");
        draggableItemByPosition(destinationId).should("contain", record);
      }
    );

    it("should not change the order of the Draggable when drag outside", () => {
      CypressMountWithProviders(<DraggableDifferentContainers />);

      draggableItem("Five").trigger("dragstart");
      draggableItem("Seven").trigger("drop").trigger("dragend");
      draggableItemByPosition(1).should("contain", "Five");
    });
  });

  describe("check events for Draggable component", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call getOrder callback when a drag&drop event is triggered", () => {
      CypressMountWithProviders(<DraggableCustom getOrder={callback} />);

      draggableItem("One").trigger("dragstart");
      draggableItemByPosition(3)
        .trigger("drop")
        .trigger("dragend")
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call getOrder callback when a drag&drop event is triggered to outside", () => {
      CypressMountWithProviders(
        <DraggableDifferentContainers getOrder={callback} />
      );

      draggableItem("Five").trigger("dragstart");
      draggableItem("Seven")
        .trigger("drop")
        .trigger("dragend")
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.not.have.been.called;
        });
    });
  });

  describe("accessibility tests for Draggable component", () => {
    it("should pass accessibility tests for Draggable default", () => {
      CypressMountWithProviders(<DraggableCustom />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Draggable with different containers", () => {
      CypressMountWithProviders(<DraggableDifferentContainers />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Draggable with getOrder callback", () => {
      const callback = cy.stub();

      CypressMountWithProviders(
        <DraggableDifferentContainers getOrder={callback} />
      );

      cy.checkAccessibility();
    });
  });
});
