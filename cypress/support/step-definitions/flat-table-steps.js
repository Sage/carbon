import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

import {
  flatTable,
  flatTableWrapper,
  flatTableHeaderCells,
  flatTableBodyRowByPosition,
  flatTableCell,
  flatTableClickableRow,
  flatTableSortable,
  flatTableBodyRows,
  flatTableCaption,
  flatTableSubrowByPosition,
  flatTableSubrows,
  flatTablePageSizeSelect,
  flatTablePageSelectListPosition,
  flatTableSubrowFirstCell,
  pageSelectInput,
} from "../../locators/flat-table";
import { relLink } from "../../locators/link";

import DEBUG_FLAG from "../e2e";
import { keyCode, positionOfElement } from "../helper";
import { icon } from "../../locators";
import { selectOption } from "../../locators/select";

const gold = "rgb(255, 181, 0)";

const checkFocus = (elements) => {
  // get Window reference from element
  const win = elements[0].ownerDocument.defaultView;
  // use getComputedStyle to read the pseudo selector
  const after = win.getComputedStyle(elements[0], "after");
  // read the value of the `content` CSS property
  const contentValue = after.getPropertyValue("border");
  expect(contentValue).to.eq(`2px solid ${gold}`);
};

Then("FlatTable body rows are sticky", () => {
  cy.wait(500);
  for (let i = 0; i <= 3; i++) {
    const color = "rgb(204, 214, 219)";
    flatTableClickableRow(i)
      .find("th")
      .should("have.css", "border-right-color", color)
      .and("have.css", "border-left-color", color)
      .and("have.css", "border-bottom-color", color)
      .and("have.css", "position", "sticky")
      .and("be.visible");
  }
});

Then("FlatTable header first cell is sticky", () => {
  cy.wait(500);
  flatTableHeaderCells()
    .first()
    .should("have.css", "position", "sticky")
    .and("be.visible");
});

Then("FlatTable has sticky header", () => {
  flatTable()
    .find("thead")
    .should("have.css", "position", "sticky")
    .and("be.visible");
});

Then("First/Last {int} header cells {word} visible", (count, state) => {
  if (state === "are") {
    for (let i = 6; i > 6 - count; i--) {
      flatTableHeaderCells().eq(i).should("be.visible");
    }
  } else {
    for (let i = 1; i <= count; i++) {
      flatTableHeaderCells().eq(i).should("not.be.visible");
    }
  }
});

When("I scroll table content to bottom right", () => {
  cy.viewport(625, 450);
  flatTableWrapper().scrollTo("100%", "100%");
});

Then("First/Last {int} FlatTable rows {word} visible", (count, state) => {
  if (state === "are") {
    for (let i = 8; i > 8 - count; i--) {
      flatTableBodyRowByPosition(i).should("be.visible");
    }
  } else {
    for (let i = 0; i < count; i++) {
      flatTableBodyRowByPosition(i).should("not.be.visible");
    }
  }
});

Then("I click on {int} body row", (index) => {
  flatTableBodyRowByPosition(index).click({ force: true });
});

Then(
  "I focus {int} row and focused row element has golden border on focus",
  (index) => {
    cy.wait(500, { log: DEBUG_FLAG }); // wait was added due to changing animation
    flatTableBodyRowByPosition(index).focus().then(checkFocus);
  }
);

Then("press Enter key on the row element", () => {
  flatTableBodyRowByPosition(2)
    .focus()
    .trigger("keydown", { key: "Enter", force: true });
});

Then("I click on {string} header {int} times", (position, times) => {
  for (let i = 0; i < times; i++) {
    flatTableSortable().eq(positionOfElement(position)).click();
  }
});

When("{string} column is sorted in {string} order", (position, sortOrder) => {
  const valueOne = "Tyler Webb";
  const valueTwo = "Monty Parker";
  const valueThree = "Jason Atkinson";
  const valueFour = "Blake Sutton";
  const totalOne = "280";
  const totalTwo = "1349";
  const totalThree = "849";
  const totalFour = "3840";
  if (position === "first" && sortOrder === "desc") {
    icon().should("have.attr", "data-element", "sort_down").and("be.visible");
    flatTableCell(positionOfElement("first"))
      .should("have.text", valueOne)
      .and("be.visible");
    flatTableCell(positionOfElement("third"))
      .should("have.text", valueTwo)
      .and("be.visible");
    flatTableCell(positionOfElement("fifth"))
      .should("have.text", valueThree)
      .and("be.visible");
    flatTableCell(positionOfElement("seventh"))
      .should("have.text", valueFour)
      .and("be.visible");
  } else if (position === "first" && sortOrder === "asc") {
    icon().should("have.attr", "data-element", "sort_up").and("be.visible");
    flatTableCell(positionOfElement("first"))
      .should("have.text", valueFour)
      .and("be.visible");
    flatTableCell(positionOfElement("third"))
      .should("have.text", valueThree)
      .and("be.visible");
    flatTableCell(positionOfElement("fifth"))
      .should("have.text", valueTwo)
      .and("be.visible");
    flatTableCell(positionOfElement("seventh"))
      .should("have.text", valueOne)
      .and("be.visible");
  } else if (position === "second" && sortOrder === "desc") {
    icon().should("have.attr", "data-element", "sort_down").and("be.visible");
    flatTableCell(positionOfElement("second"))
      .should("have.text", totalFour)
      .and("be.visible");
    flatTableCell(positionOfElement("fourth"))
      .should("have.text", totalTwo)
      .and("be.visible");
    flatTableCell(positionOfElement("sixth"))
      .should("have.text", totalThree)
      .and("be.visible");
    flatTableCell(positionOfElement("eighth"))
      .should("have.text", totalOne)
      .and("be.visible");
  } else {
    icon().should("have.attr", "data-element", "sort_up").and("be.visible");
    flatTableCell(positionOfElement("second"))
      .should("have.text", totalOne)
      .and("be.visible");
    flatTableCell(positionOfElement("fourth"))
      .should("have.text", totalThree)
      .and("be.visible");
    flatTableCell(positionOfElement("sixth"))
      .should("have.text", totalTwo)
      .and("be.visible");
    flatTableCell(positionOfElement("eighth"))
      .should("have.text", totalFour)
      .and("be.visible");
  }
});

Then("{string} header has focus", (position) => {
  flatTableSortable()
    .eq(positionOfElement(position))
    .should("have.css", "outline-color", gold);
});

Then("I focus {string} header cell", (position) => {
  flatTableSortable().eq(positionOfElement(position)).focus();
});

Then(
  "I press {string} on {string} header {int} time(s)",
  (key, position, count) => {
    for (let i = 0; i < count; i++) {
      if (key === "Enter") {
        flatTableSortable()
          .eq(positionOfElement(position))
          .focus()
          .trigger("keydown", { key: "Enter", force: true });
      } else if (key === "Space") {
        flatTableSortable()
          .eq(positionOfElement(position))
          .focus()
          .trigger("keydown", { key: " ", force: true });
      } else {
        throw new Error("Only Enter or Space key can be applied");
      }
    }
  }
);

When("I click on the first row", () => {
  flatTableBodyRows().first().click();
});

Then("The whole row is highlighted", () => {
  flatTableBodyRows()
    .first()
    .children()
    .should("have.css", "background-color", "rgb(230, 235, 237)");
});

Then("Flat table caption is set to {word}", (text) => {
  flatTableCaption().should("have.text", text);
});

When("I click on the {word} cell in the first row", (position) => {
  flatTableCell(positionOfElement(position)).click();
});

Then("The subrows are visible", () => {
  flatTableSubrows().should("be.visible");
});

Then("The subrows are not visible", () => {
  flatTableSubrows().should("not.exist");
});

When("I click on the first cell", () => {
  flatTableCell(0).click();
});

Then("The first cell in the third content row has focus", () => {
  flatTableCell(8).should("have.css", "outline-color", gold);
});

Then("The {word} content row has focus", (position) => {
  flatTableBodyRowByPosition(positionOfElement(position))
    .should("have.focus")
    .then(checkFocus);
});

Then("The {word} subrow action popover has focus", (position) => {
  flatTableSubrowByPosition(positionOfElement(position))
    .find('[data-element="action-popover-button"]')
    .should("have.focus")
    .and("have.css", "outline", `${gold} solid 3px`);
});

When("I have a large viewport", () => {
  cy.viewport(700, 345);
});

When("I have a small viewport", () => {
  cy.viewport(700, 240);
});

When("pageSize select list is opened", () => {
  flatTablePageSizeSelect().click();
});

Then("pageSizeSelectList is visible at the {word}", (position) => {
  flatTablePageSelectListPosition()
    .should("have.attr", "data-floating-placement", position)
    .and("be.visible");
});

Then("{int} row/rows is/are visible", (int) => {
  flatTableBodyRows().should("have.length", int).and("be.visible");
});

Then("I type {int} in pagination input", (value) => {
  pageSelectInput().type(value, { force: true });
});

Then("Pagination input should have {int} value", (value) => {
  pageSelectInput().should("have.value", value);
});

When("I press downarrow onto pagination select list", () => {
  pageSelectInput().trigger("keydown", {
    ...keyCode("downarrow"),
    force: true,
  });
});

When("I click onto pagination select list option", () => {
  selectOption(0).click();
});

Then(
  "The first table cell of {string} subrow should have {word} padding left value",
  (position, value) => {
    flatTableSubrowFirstCell(positionOfElement(position)).should(
      "have.css",
      "padding-left",
      value
    );
  }
);

Then("The link is clickable", () => {
  relLink().click();
});
