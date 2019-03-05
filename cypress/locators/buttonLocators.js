const CHILDREN_TEXTAREA = 'textarea';
const DEMO_COMPONENT = '.demo-component-preview__component-wrapper'
const COMMON_INPUT_LABEL = '.common-input__label'
const BUTTON_SUBTEXT = '.carbon-button__subtext';

export const childrenTextArea = () => cy.get(CHILDREN_TEXTAREA);
export const demoButton = () => cy.get(DEMO_COMPONENT).find('button');
export const demoButtonSubtext = () => demoButton().find(BUTTON_SUBTEXT);
export const subtextInput = () => cy.get(COMMON_INPUT_LABEL).contains('subtext').parent().find('input');
export const sizeInput = () => cy.get(COMMON_INPUT_LABEL).contains('size').parent().find('input').first();
