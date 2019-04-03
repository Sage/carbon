import { knobsTab } from "../locators/commonLocators"
import { draggableRecordByText } from "../locators/draggableContextLocators"
import { DEBUG_FLAG } from ".";

export function visitComponentUrl(component, suffix = 'default', iFrameOnly = false) {
    cy.visit(prepareUrl(component, suffix, iFrameOnly))
    if(!iFrameOnly) knobsTab().click()
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
            .trigger('mousemove', { clientY: i, force: true, log: DEBUG_FLAG })
            .wait(100, { log: DEBUG_FLAG })
    }
    draggableRecord
        .trigger('mouseup', { force: true })
}

function prepareUrl(component, suffix, iFrameOnly){
    let url = Cypress.env('localhost')
    iFrameOnly ? url += Cypress.env('iframe') : url+= Cypress.env('story')
    return url + component.toLowerCase().replace(/ /g, '-') + Cypress.env(suffix)
}
