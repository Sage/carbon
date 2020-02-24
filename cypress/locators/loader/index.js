import { LOADER } from './locators';
import { BUTTON_DATA_COMPONENT_PREVIEW } from '../button/locators';

export const loader = () => cy.iFrame(LOADER);
export const loaderInsideButton = () => cy.iFrame(BUTTON_DATA_COMPONENT_PREVIEW);
