import { POD_PREVIEW } from '../pod/locators';
import { DLS_ROOT } from '../locators';
import { GRID_COMPONENT } from './locators';

export const pod = index => cy.get(POD_PREVIEW).eq(index);
export const gridPod = index => cy.get(DLS_ROOT)
  .find('div')
  .find(`div:nth-child(${index})`);
export const gridComponent = () => cy.get(GRID_COMPONENT);
