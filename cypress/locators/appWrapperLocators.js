import { iget } from "../support/helper";

const STORYBOOK_PREVIEW = '#storybook-preview-iframe'
const APP_WRAPPER_PREVIEW = '.carbon-app-wrapper'

export const appWrapperPreview =() => cy.get(STORYBOOK_PREVIEW).then(($iframe) => { return iget($iframe.contents(), APP_WRAPPER_PREVIEW); })

