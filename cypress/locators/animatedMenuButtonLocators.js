import { FORM } from "./commonLocators";

const ANIMATED_MENU_BUTTON_PREVIEW = '.carbon-animated-menu-button'
const ANIMATED_MENU_BUTTON_LABEL_PREVIEW = '.carbon-animated-menu-button__label'

export const animatedMenuButtonPreview = () => cy.wait(200).iFrame(ANIMATED_MENU_BUTTON_PREVIEW) //possible wait(200) needed
export const animatedMenuButtonDirectionSelect = () => cy.get(FORM).contains('direction').find('select')
export const animatedMenuButtonLabelPreview = () => cy.iFrame(ANIMATED_MENU_BUTTON_LABEL_PREVIEW)
