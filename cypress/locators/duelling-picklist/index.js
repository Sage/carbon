import {
  DUELLING_PICKLIST_COMPONENT,
  PICKLIST,
  PICKLIST_ITEMS,
  PICKLIST_LEFT_LABEL,
  PICKLIST_RIGHT_LABEL,
} from "./locators";
import { SEARCH_COMPONENT } from "../search/locators";
import CHECKBOX from "../checkbox/locators";

// component preview locators
export const duellingPicklistComponent = () =>
  cy.get(DUELLING_PICKLIST_COMPONENT);
export const picklist = () => cy.get(PICKLIST);
export const unassignedPicklist = () => picklist().eq(0);
export const unassignedPicklistItems = () =>
  unassignedPicklist().find(PICKLIST_ITEMS);
export const assignedPicklist = () => picklist().eq(1);
export const assignedPicklistItems = () =>
  assignedPicklist().find(PICKLIST_ITEMS);
export const picklistRightLabel = () => cy.get(PICKLIST_RIGHT_LABEL);
export const picklistLeftLabel = () => cy.get(PICKLIST_LEFT_LABEL);
export const addButton = (index) =>
  unassignedPicklistItems().eq(index).find("button");
export const removeButton = () => assignedPicklist().find("button");
export const duellingSearchInput = () => cy.get(SEARCH_COMPONENT).find("input");
export const checkBox = () => cy.get(CHECKBOX);
