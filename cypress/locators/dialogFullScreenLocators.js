//component preview locators
const DIALOG_FULL_SCREEN_CHILDREN = '.carbon-dialog-full-screen__content'
const DIALOG_FULL_SCREEN = '.carbon-dialog-full-screen__dialog'
export const dialogFullScreenChildren = () => cy.iFrame(DIALOG_FULL_SCREEN_CHILDREN)
export const dialogFullScreenPreview = () => cy.iFrame(DIALOG_FULL_SCREEN) 
