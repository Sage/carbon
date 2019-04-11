import { draggableRecordByPosition, draggableRecordByText } from "./../../locators/draggableContextLocators"
import { dragAndDrop } from "../helper"

When('I drag Draggable Context {string} to {int}', (record, destinationId) => {
    const START_POSITION = 130
    dragAndDrop(draggableRecordByText(record), destinationId, START_POSITION)
})

Then('Draggable Context {string} is dragged to {int}', (record, destinationId) => {
    draggableRecordByPosition(destinationId).should('have.text', record)
})
