import { draggableRecordByPosition, draggableRecordByText } from '../../locators/draggable-context';
import { dragAndDrop } from '../helper';

When('I drag Draggable Context {string} to {int}', (record, destinationId) => {
  const startPosition = 20;
  dragAndDrop(draggableRecordByText(record), destinationId, startPosition);
});

Then('Draggable Context {string} is dragged to {int}', (record, destinationId) => {
  draggableRecordByPosition(destinationId).invoke('text').should('contain', record);
});
