import {
  draggableItem,
  draggableItemByPosition,
} from "../../locators/draggable";

Then("Draggable {string} is dragged to {int}", (record, destinationId) => {
  draggableItemByPosition(destinationId).should("contain", record);
});

When("I drag Draggable {string} to {int}", (record, destinationId) => {
  // added new drag&drop method to test react-dnd component
  draggableItem(record).trigger("dragstart");
  draggableItemByPosition(destinationId).trigger("drop").trigger("dragend");
});
