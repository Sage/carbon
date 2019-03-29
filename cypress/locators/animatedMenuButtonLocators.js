import { FORM } from "./commonLocators";

//knobs locators
export const animatedMenuButtonDirectionSelect = () => cy.get(FORM).contains('direction').find('select')

//component preview locators
const ANIMATED_MENU_BUTTON_PREVIEW = '.carbon-animated-menu-button'
const ANIMATED_MENU_BUTTON_LABEL_PREVIEW = '.carbon-animated-menu-button__label'
export const animatedMenuButtonPreview = () => cy.iFrame(ANIMATED_MENU_BUTTON_PREVIEW)
export const animatedMenuButtonLabelPreview = () => cy.iFrame(ANIMATED_MENU_BUTTON_LABEL_PREVIEW)
