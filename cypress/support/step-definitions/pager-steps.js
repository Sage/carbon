import {
  pageSelect,
  maxPages,
  previousArrow,
  nextArrow,
  currentPageInput,
  pageSelectItems,
} from "../../locators/pager";
import DEBUG_FLAG from "..";
import { paginationButtonByIndex } from "../../locators/table";
import { positionOfPaginationButton } from "../helper";

Then("pageSize is set to {string} {word}", (pageSize, item) => {
  pageSelect().should("have.attr", "value", pageSize);
  pageSelectItems().invoke("text").should("contain", item);
});

Then("I am on 1st of {string} pages", (count) => {
  maxPages().should("have.text", ` of ${count}`);
});

Then("pagination {string} button is disabled", (button) => {
  paginationButtonByIndex(positionOfPaginationButton(button))
    .should("be.disabled")
    .and("have.attr", "disabled");
});

Then("I click {string} pagination button", (button) => {
  paginationButtonByIndex(positionOfPaginationButton(button)).click();
});

Then("I click {word} {int} times", (direction, count) => {
  for (let i = 0; i < count; i++) {
    // click force true because element is overlapping
    switch (direction) {
      case "next":
        cy.wait(100, { log: DEBUG_FLAG }); // wait added due to refreshing element
        nextArrow().click({ force: true });
        break;
      case "previous":
        cy.wait(100, { log: DEBUG_FLAG }); // wait added due to refreshing element
        previousArrow().click({ force: true });
        break;
      default:
        throw new Error("Direction can be only next or previous");
    }
  }
});

Then("I press {word} button {int} times", (direction, count) => {
  for (let i = 0; i < count; i++) {
    cy.wait(100, { log: DEBUG_FLAG }); // wait added due to refreshing element
    // click force true because element is overlapping
    paginationButtonByIndex(positionOfPaginationButton(direction)).click({
      force: true,
    });
  }
});

When("I type {string} to input pagination", (pageNumber) => {
  currentPageInput().clear().type(`${pageNumber}{enter}`);
});

When("I click on pagination input", () => {
  currentPageInput().click();
});

Then("pagination input has golden border", () => {
  currentPageInput()
    .parent()
    .should("have.css", "outline-color", "rgb(255, 181, 0)");
});

Then("Current page input is set to {int}", (int) => {
  currentPageInput().should("have.attr", "value", int);
});
