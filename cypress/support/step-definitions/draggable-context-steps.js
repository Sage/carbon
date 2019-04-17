import { draggableRecordByPosition, draggableRecordByText } from '../../locators/draggable-context-locators';
import { dragAndDrop } from '../helper';

When('I drag Draggable Context {string} to {int}', (record, destinationId) => {
  const startPosition = 130;
  dragAndDrop(draggableRecordByText(record), destinationId, startPosition);
});

Then('Draggable Context {string} is dragged to {int}', (record, destinationId) => {
  draggableRecordByPosition(destinationId).should('have.text', record);
});
