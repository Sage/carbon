const CHILDREN_TEXTAREA = 'textarea';
const DEMO_COMPONENT = '.demo-component-preview__component-wrapper'
const COMMON_INPUT_LABEL = '.common-input__label'
const BUTTON_SUBTEXT = '.carbon-button__subtext';
const DROPDOWN_LIST_WITH_NO_RESULTS = '[class="carbon-dropdown__list-item carbon-dropdown__list-item--no-results"]';

export const childrenTextArea = () => cy.get(CHILDREN_TEXTAREA);
export const demoButton = () => cy.get(DEMO_COMPONENT).find('button');
export const demoButtonSubtext = () => demoButton().find(BUTTON_SUBTEXT);
export const subtextInput = () => cy.get(COMMON_INPUT_LABEL).contains('subtext').parent().find('input');
export const sizeInput = () => cy.get(COMMON_INPUT_LABEL).contains('size').parent().find('input').first();
export const asInput = () => cy.get(COMMON_INPUT_LABEL).contains('as').parent().find('input').first();
export const disabledCheckbox = () => cy.get(COMMON_INPUT_LABEL).contains('disabled').parent().find('[type="checkbox"]');
export const themeInput = () => cy.get(COMMON_INPUT_LABEL).contains('theme').parent().find('input').first();
export const noResultsDropdown = () => cy.get('ul').find(DROPDOWN_LIST_WITH_NO_RESULTS);

