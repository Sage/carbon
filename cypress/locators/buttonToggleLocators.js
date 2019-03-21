import { FORM } from "./commonLocators";

const LABEL_PREVIEW = "#story-root > div > div > label"
const ICON_NAME_PREVIEW = '.carbon-icon'
const ICON_PREVIEW = '.carbon-button-toggle__button-icon'
const BUTTON_TOGGLE_PREVIEW = '.carbon-button-toggle'

export const buttonToggleLabelPreview = () => cy.iFrame(LABEL_PREVIEW)
export const buttonIconSelect = () => cy.get(FORM).contains('buttonIcon').find('select')
export const buttonToggleIconNamePreview = () => cy.iFrame(ICON_NAME_PREVIEW)
export const buttonIconSizeSelect = () => cy.get(FORM).contains('buttonIconSize').find('select')
export const buttonToggleIconPreview = () => cy.iFrame(ICON_PREVIEW)
export const buttonTogglePreview = () => cy.iFrame(BUTTON_TOGGLE_PREVIEW)
export const buttonToggleGroupedCheckbox = () =>cy.get(FORM).contains('grouped').find('input')
