import {
  DUELLING_PICKLIST_COMPONENT, PICKLIST, PICKLIST_ITEMS, PICKLIST_LEFT_LABEL,
  PICKLIST_RIGHT_LABEL, ADD_ELEMENT, REMOVE_ELEMENT, PICKLIST_ID,
} from './locators';
import { SEARCH_COMPONENT } from '../search/locators';

// component preview locators
export const duellingPicklistComponent = () => cy.iFrame(DUELLING_PICKLIST_COMPONENT);
export const picklist = () => cy.iFrame(PICKLIST_ID).find(PICKLIST);
export const unassignedPicklist = () => picklist().eq(0);
export const unassignedPicklistItems = () => unassignedPicklist().find(PICKLIST_ITEMS);
export const assignedPicklist = () => picklist().eq(1);
export const assignedPicklistItems = () => assignedPicklist().find(PICKLIST_ITEMS);
export const picklistRightLabel = () => cy.iFrame(PICKLIST_RIGHT_LABEL);
export const picklistLeftLabel = () => cy.iFrame(PICKLIST_LEFT_LABEL);
export const addButton = index => unassignedPicklistItems().eq(index).find(ADD_ELEMENT);
export const removeButton = () => assignedPicklist().find(REMOVE_ELEMENT);
export const duellingSearchInput = () => cy.iFrame(PICKLIST_ID).find(SEARCH_COMPONENT).find('input');
