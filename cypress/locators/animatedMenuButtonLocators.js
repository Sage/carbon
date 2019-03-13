import { iget } from "../support/helper";

const FORM = 'form'
const STORYBOOK_PREVIEW = '#storybook-preview-iframe'
const ANIMATED_MENU_BUTTON_PREVIEW = '.carbon-animated-menu-button'
const ANIMATED_MENU_BUTTON_LABEL_PREVIEW = '.carbon-animated-menu-button__label'

export const animatedMenuButtonPreview = () => cy.wait(500).get(STORYBOOK_PREVIEW).then(($iframe) => { return iget($iframe.contents(), ANIMATED_MENU_BUTTON_PREVIEW); })
export const animatedMenuButtonDirectionSelect = () => cy.get(FORM).contains('direction').find('select')
export const animatedMenuButtonLabelPreview = () => cy.get(STORYBOOK_PREVIEW).then(($iframe) => { return iget($iframe.contents(), ANIMATED_MENU_BUTTON_LABEL_PREVIEW); })
