import { draggableItemByText, draggableItemByPosition } from "../../locators/configurableItemsLocatos";
import { dragAndDrop } from "../helper";

When('I drag Configurable Items {string} to {int}', (record, destinationId) => {
    const START_POSITION = 110;
    dragAndDrop(draggableItemByText(record), destinationId, START_POSITION);
})

Then('Configurable Items {string} is dragged to {int}', (record, destinationId) => {
    draggableItemByPosition(destinationId).should('have.text', record);
})
