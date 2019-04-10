// knobs locators
const SLIDE_INDEX_SELECT = 'select[name="slideIndex"]';
const ENABLE_SLIDE_SELECTOR_CHECKBOX = '#enableSlideSelector';
const ENABLE_PREVIOUS_BUTTON_CHECKBOX = '#enablePreviousButton';
const ENABLE_NTEXT_BUTTON_CHECKBOX = '#enableNextButton';
const TRANSION_SELECT = 'select[name="transition"]';
export const slideIndexSelect = () => cy.get(SLIDE_INDEX_SELECT);
export const enableSlideSelectorCheckbox = () => cy.get(ENABLE_SLIDE_SELECTOR_CHECKBOX);
export const enablePreviousButtonCheckbox = () => cy.get(ENABLE_PREVIOUS_BUTTON_CHECKBOX);
export const enableNextButtonCheckbox = () => cy.get(ENABLE_NTEXT_BUTTON_CHECKBOX);
export const transitionSelect = () => cy.get(TRANSION_SELECT);

// component preview locators
const CAROUSEL = '.carbon-carousel__transition';
const SLIDE = 'div[data-element="visible-slide"]';
const PREVIOUS_ARROW_BUTTON = '.carbon-carousel__previous-button';
const NEXT_ARROW_BUTTON = '.carbon-carousel__next-button';
const CAROUSEL_SLIDE_SELECTOR = '.carbon-carousel__selector'
export const slide = () => cy.iFrame(SLIDE);
export const carousel = () => cy.iFrame(CAROUSEL).find('div');
export const previousArrowButton = () => cy.iFrame(PREVIOUS_ARROW_BUTTON);
export const nextArrowButton = () => cy.iFrame(NEXT_ARROW_BUTTON);
export const slideSelector = () => cy.iFrame(CAROUSEL_SLIDE_SELECTOR);
export const slideSelectorIndex = (index) => slideSelector().children(`:nth-child(${index + 1})`); // +1 because nodes are indexed from 1
export const newSlide = (transition = 'slide', direction = 'right') => {
    let selector;
    switch (transition) {
        case 'slide':
            switch (direction) {
                case 'right':
                    selector = `.${transition}-next-enter-active`;
                    break;
                case 'left':
                    selector = `.${transition}-previous-enter-active`;
                    break;
                default:
                    throw 'right or left only allowed'
            }
            break;
        case 'fade':
            selector = `.carousel-transition-${transition}-enter-active`;
            break;
        default:
            throw 'fade or slide only allowed'
    }
    return cy.iFrame(selector);
}
