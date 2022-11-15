import { DATA_CONTENTS, NOTE_COMPONENT, NOTE_STATUS } from "./locators";

// component preview locators
export const noteComponent = () => cy.get(NOTE_COMPONENT);
export const noteHeader = () => noteComponent().find("header");
export const noteContent = () => cy.get(DATA_CONTENTS);
export const noteFooter = () => noteComponent().children().eq(2);
export const noteFooterCreatedBy = () =>
  noteFooter().find("div").children().eq(0);
export const noteFooterChangeTime = () =>
  noteFooter().find("div").children().eq(1);
export const noteStatus = () => cy.get(NOTE_STATUS);
