import { draggableItem, draggableItemByPosition } from '../../locators/draggable';

Then('Draggable {string} is dragged to {int}', (record, destinationId) => {
  draggableItemByPosition(destinationId).should('contain', record);
});

When('I drag Draggable {string} to {int}', (record, destinationId) => {
  // cy.wait(500, { log: DEBUG_FLAG }); // Give a moment for react-dnd's drag event listeners to setup
  draggableItem(record).trigger('dragstart');
  draggableItemByPosition(destinationId).trigger('drop');
  // cy.wait(500, { log: DEBUG_FLAG }); // Let react-dnd update its internal state (fixes Cannot call hover while not dragging.)
  draggableItemByPosition(destinationId).trigger('dragend');
});
