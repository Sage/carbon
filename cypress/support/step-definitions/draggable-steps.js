import { draggableItem, draggableItemByPosition } from '../../locators/draggable';

Then('Draggable {string} is dragged to {int}', (record, destinationId) => {
  draggableItemByPosition(destinationId).should('contain', record);
});

When('I drag Draggable {string} to {int}', (record, destinationId) => {
  draggableItem(record).trigger('dragstart');
  draggableItemByPosition(destinationId).trigger('drop').trigger('dragend');
});
