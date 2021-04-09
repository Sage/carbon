import {
  rows,
  checkboxCell,
  rowByNumber,
  caption,
  tableHeader,
  rowNumbers,
  sortIcon,
  tableBody,
  tableHeaderInIFrame,
  tableAjax,
  paginationButtonByIndexInIFrame,
} from "../../locators/table";
import {
  themeColor,
  tableHeaderSize,
  positionOfElement,
  positionOfPaginationButton,
} from "../helper";

Then("I see {int} records", (records) => {
  if (records === 0) {
    tableBody().should("have.length", 1);
  } else {
    rows().should("have.length", records);
  }
});

Then("I see {int} records for Table Ajax", (records) => {
  if (records === 0) {
    tableAjax().children().should("have.length", 1);
  } else {
    tableAjax()
      .children()
      .should("have.length", records + 1);
  }
});

Then("rows are selectable", () => {
  checkboxCell().should("exist");
});

Then("rows are not selectable", () => {
  checkboxCell().should("not.exist");
});

When("I click row by number {int}", (rowNumber) => {
  rowByNumber(rowNumber).click();
});

When("row number {int} is highlighted", (rowNumber) => {
  rowByNumber(rowNumber).should("have.css", "cursor", "pointer");
});

When("row number {int} is not highlighted", (rowNumber) => {
  rowByNumber(rowNumber).should("not.have.css", "cursor", "pointer");
});

When("{string} Table column can be sorted", (headerName) => {
  if (headerName === "Country") {
    sortIcon(positionOfElement("first"))
      .should("have.attr", "data-element", "sort_up")
      .and("be.visible");
  } else {
    sortIcon(positionOfElement("second"))
      .should("have.attr", "data-element", "sort_up")
      .and("be.visible");
  }
});

When("Country column is sorted in {string} order", (sortOrder) => {
  if (sortOrder === "desc") {
    sortIcon(positionOfElement("first"))
      .should("have.attr", "data-element", "sort_down")
      .and("be.visible");
    rowNumbers(positionOfElement("first")).should("have.text", "Zimbabwe");
    rowNumbers(positionOfElement("third")).should("have.text", "Zambia");
    rowNumbers(positionOfElement("fifth")).should("have.text", "Zaire");
    rowNumbers(positionOfElement("seventh")).should("have.text", "Yemen");
    rowNumbers(positionOfElement("ninth")).should(
      "have.text",
      "Western Sahara"
    );
  } else {
    sortIcon(positionOfElement("first"))
      .should("have.attr", "data-element", "sort_up")
      .and("be.visible");
    rowNumbers(positionOfElement("first")).should("have.text", "Afghanistan");
    rowNumbers(positionOfElement("third")).should("have.text", "Albania");
    rowNumbers(positionOfElement("fifth")).should("have.text", "Algeria");
    rowNumbers(positionOfElement("seventh")).should("have.text", "Andorra");
    rowNumbers(positionOfElement("ninth")).should("have.text", "Angola");
  }
});

When("Code column is sorted in {string} order", (sortOrder) => {
  if (sortOrder === "desc") {
    sortIcon(positionOfElement("first"))
      .should("have.attr", "data-element", "sort_down")
      .and("be.visible");
    rowNumbers(positionOfElement("second")).should("have.text", "ZW");
    rowNumbers(positionOfElement("fourth")).should("have.text", "ZM");
    rowNumbers(positionOfElement("sixth")).should("have.text", "ZR");
    rowNumbers(positionOfElement("eighth")).should("have.text", "YE");
    rowNumbers(positionOfElement("tenth")).should("have.text", "EH");
  } else {
    sortIcon(positionOfElement("first"))
      .should("have.attr", "data-element", "sort_up")
      .and("be.visible");
    rowNumbers(positionOfElement("second")).should("have.text", "AF");
    rowNumbers(positionOfElement("fourth")).should("have.text", "AL");
    rowNumbers(positionOfElement("sixth")).should("have.text", "DZ");
    rowNumbers(positionOfElement("eighth")).should("have.text", "AD");
    rowNumbers(positionOfElement("tenth")).should("have.text", "AO");
  }
});

Then("caption is set to {word}", (text) => {
  caption().should("have.text", text);
});

Then("theme on preview is {string}", (theme) => {
  tableHeader().should("have.css", "background-color", themeColor(theme));
});

When("{int} row has zebra striping", (rowNumber) => {
  rowNumbers(rowNumber).should(
    "have.css",
    "background-color",
    "rgb(250, 251, 251)"
  );
});

Then("Table header size on preview is set to {string}", (size) => {
  tableHeader()
    .eq(positionOfElement("first"))
    .should("have.css", "height", tableHeaderSize(size));
  tableHeader()
    .eq(positionOfElement("second"))
    .should("have.css", "height", tableHeaderSize(size));
});

Then("input type on preview is set to {string}", (type) => {
  switch (type) {
    case "textbox":
      rowNumbers(positionOfElement("first"))
        .find("input")
        .should("have.attr", "data-element", "input");
      break;
    case "textarea":
      rowNumbers(positionOfElement("first")).find("textarea");
      break;
    case "date":
      rowNumbers(positionOfElement("first"))
        .children()
        .should("have.attr", "data-component", "date");
      break;
    default:
      throw new Error("There are only three input type of Table with inputs");
  }
});

Then("I click {string} header in IFrame", (headerName) => {
  if (headerName === "Country") {
    tableHeaderInIFrame().eq(positionOfElement("first")).click();
  } else {
    tableHeaderInIFrame().eq(positionOfElement("second")).click();
  }
});

Then("I click {string} pagination button in IFrame", (button) => {
  paginationButtonByIndexInIFrame(positionOfPaginationButton(button)).click();
});
