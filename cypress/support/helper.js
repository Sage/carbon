import { knobsTab } from "../locators/commonLocators"
import { draggableRecordByText } from "../locators/draggableContextLocators"

export function visitComponentUrl(url, openKnobs = true) {
    cy.visit(Cypress.env(url))
    if (openKnobs) knobsTab().click()
}

export function dragAndDropForDraggableRecord(record, position) {
    const ROW_HIGHT = 35
    const START_HIGHT = 130
    const TEN_PIXEL_MOVE = 10
    const draggableRecord = draggableRecordByText(record)

    draggableRecord
        .trigger('mousedown', { force: true })
        .wait(500) //required for correct drag&drop headless browser (500ms)
        .trigger('mousemove', { force: true })
        .wait(100) //required for correct drag&drop headless browser (100ms)

    //put row record on top of page, then move down every TEN_PIXEL_MOVE
    for (let i = 0; i < START_HIGHT + (position * ROW_HIGHT); i += TEN_PIXEL_MOVE) {
        draggableRecord
            .trigger('mousemove', { clientY: i, force: true, log: false })
            .wait(100, { log: false })
    }
    draggableRecord
        .trigger('mouseup', { force: true })
}
