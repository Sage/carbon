import { LOADER } from './locators';
import { BUTTON_DATA_COMPONENT_PREVIEW } from '../button/locators';

export const loader = () => cy.get(LOADER);
export const loaderInsideButton = () => cy.get(BUTTON_DATA_COMPONENT_PREVIEW);
