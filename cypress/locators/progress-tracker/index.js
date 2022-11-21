import PROGRESS_TRACKER from "./locators";

// component preview locators
export const progressTrackerComponent = () => cy.get(PROGRESS_TRACKER);
export const progressTrackerLine = (index = 1) =>
  progressTrackerComponent().children().eq(index).find("span");
export const progressTrackerMinVal = (index = 0) =>
  progressTrackerComponent().children().eq(index).find("span").eq(0);
export const progressTrackerMaxVal = (index = 0) =>
  progressTrackerComponent().children().eq(index).find("span").eq(1);
