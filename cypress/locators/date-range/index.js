import {
  LABEL_PREVIEW,
} from './locators';
import { LABEL } from '../locators';

// component preview locators
export const labelPreview = index => cy.get(LABEL_PREVIEW)
  .find(`:nth-child(${index})`).find(LABEL);
