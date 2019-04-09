import { draggableRecordByPosition } from "./../../locators/draggableContextLocators"
import { dragAndDropForDraggableRecord } from "../helper"

When('I drag {string} to {int}', (record, position) => {
    dragAndDropForDraggableRecord(record, position)
})

Then('{string} is dragged to {int}', (record, position) => {
    draggableRecordByPosition(position).should('have.text', record)
})
