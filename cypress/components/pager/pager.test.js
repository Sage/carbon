import React from "react";
import { selectListWrapper } from "../../locators/select/index";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { keyCode } from "../../../cypress/support/helper";
import { checkGoldenOutline } from "../../support/component-helper/common-steps";
import { CHARACTERS } from "../../support/component-helper/constants";

import {
  PagerComponent,
  PagerComponentResponsive,
  PagerInForm,
} from "../../../src/components/pager/pager-test.stories";

import {
  pageSelect,
  maxPages,
  previousArrow,
  nextArrow,
  firstArrow,
  lastArrow,
  currentPageWrapper,
  currentPageLabelWrapper,
  currentPageInput,
  pagerSummary,
  pageSelectElement,
  showLabelBefore,
  pageSizeLabelAfter,
  currentPageSection,
  pager,
} from "../../locators/pager/index";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const recordsDiff = [
  {
    id: "12",
    name: 12,
  },
  {
    id: "135",
    name: 135,
  },
  {
    id: "819",
    name: 819,
  },
];

context("Test for Pager component", () => {
  describe("check props for Pager component", () => {
    it.each([[2], [5], [7]])(
      "should render Pager with currentPage prop set to %s",
      (currentPage) => {
        CypressMountWithProviders(<PagerComponent currentPage={currentPage} />);
        currentPageInput().should("have.attr", "value", currentPage);
      }
    );

    it.each([[50], [100], [235]])(
      "should render Pager with totalRecords prop set to %s",
      (totalRecords) => {
        CypressMountWithProviders(
          <PagerComponent totalRecords={totalRecords} />
        );
        pagerSummary().should("have.text", `${totalRecords} items`);
      }
    );

    it.each([
      [1, 100],
      [10, 10],
      [25, 4],
      [100, 1],
    ])(
      "should render Pager with pageSize prop set to %s",
      (pageSizeVal, pageSizeOf) => {
        CypressMountWithProviders(
          <PagerComponent pageSize={pageSizeVal} showPageSizeSelection />
        );

        pageSelect().should("have.attr", "value", pageSizeVal);
        maxPages().should("have.text", `of ${pageSizeOf}`);
      }
    );

    it("should render Pager with pageSizeSelectionOptions prop", () => {
      CypressMountWithProviders(
        <PagerComponent
          pageSizeSelectionOptions={recordsDiff}
          showPageSizeSelection
        />
      );
      recordsDiff.forEach(($el, index) => {
        selectListWrapper()
          .children()
          .find("li")
          .eq(index)
          .should("have.text", $el.name);
      });
    });

    it.each([
      [true, "be.visible"],
      [false, "not.exist"],
    ])(
      "should render Pager with showPageSizeSelection prop set to %s",
      (bool, assertion) => {
        CypressMountWithProviders(
          <PagerComponent showPageSizeSelection={bool} />
        );
        pageSelectElement().should(assertion);
      }
    );

    it.each([
      [true, "be.visible"],
      [false, "not.exist"],
    ])(
      "should render Pager with showPageSizeLabelBefore prop set to %s",
      (boolVal, assertion) => {
        CypressMountWithProviders(
          <PagerComponent
            showPageSizeLabelBefore={boolVal}
            showPageSizeSelection
          />
        );

        showLabelBefore().should(assertion);
        pageSelectElement().should("be.visible");
      }
    );

    it.each([
      [true, "be.visible"],
      [false, "not.exist"],
    ])(
      "should render Pager with showPageSizeLabelAfter prop set to %s",
      (boolVal, assertion) => {
        CypressMountWithProviders(
          <PagerComponent
            showPageSizeLabelAfter={boolVal}
            showPageSizeSelection
          />
        );

        pageSizeLabelAfter().should(assertion);
        pageSelectElement().should("be.visible");
      }
    );

    it.each([
      [true, "be.visible"],
      [false, "not.be.visible"],
    ])(
      "should render Pager with showTotalRecords prop set to %s",
      (boolVal, assertion) => {
        CypressMountWithProviders(
          <PagerComponent showTotalRecords={boolVal} />
        );

        pagerSummary().should(assertion);
      }
    );

    it.each([
      [true, "be.visible"],
      [false, "not.exist"],
    ])(
      "should render Pager with showFirstAndLastButtons prop set to %s",
      (boolVal, assertion) => {
        CypressMountWithProviders(
          <PagerComponent showFirstAndLastButtons={boolVal} />
        );

        firstArrow().should(assertion);
        lastArrow().should(assertion);
      }
    );

    it.each([
      [true, "be.visible"],
      [false, "not.exist"],
    ])(
      "should render Pager with showPreviousAndNextButtons prop set to %s",
      (boolVal, assertion) => {
        CypressMountWithProviders(
          <PagerComponent showPreviousAndNextButtons={boolVal} />
        );

        previousArrow().should(assertion);
        nextArrow().should(assertion);
      }
    );

    it.each([
      [true, "be.visible"],
      [false, "not.exist"],
    ])(
      "should render Pager with showPageCount prop set to %s",
      (boolVal, assertion) => {
        CypressMountWithProviders(<PagerComponent showPageCount={boolVal} />);

        currentPageSection().should(assertion);
      }
    );

    it.each([
      ["default", "rgb(250, 251, 251)"],
      ["alternate", "rgb(237, 241, 242)"],
    ])(
      "should render Pager with variant prop set to %s",
      (variant, backgroundColor) => {
        CypressMountWithProviders(<PagerComponent variant={variant} />);

        pager().then(($el) => {
          expect($el.css("background-color")).to.equals(backgroundColor);
          expect($el.css("border-color")).to.equals("rgb(204, 214, 219)");
        });
      }
    );

    it.each([
      [true, "not.be.visible"],
      [false, "be.visible"],
    ])(
      "pager links are rendered as intended when hideDisabledElements is set to %s and currentPage is 1",
      (boolVal, assertion) => {
        CypressMountWithProviders(
          <PagerComponent currentPage={1} hideDisabledElements={boolVal} />
        );

        firstArrow().should(assertion);
        previousArrow().should(assertion);
      }
    );

    it.each([
      [true, "not.be.visible"],
      [false, "be.visible"],
    ])(
      "pager links are rendered as intended when hideDisabledElements is set to %s and currentPage is 10",
      (boolVal, assertion) => {
        CypressMountWithProviders(
          <PagerComponent currentPage={10} hideDisabledElements={boolVal} />
        );

        nextArrow().should(assertion);
        lastArrow().should(assertion);
      }
    );

    it("both pager links are rendered when hideDisabledElements is set to true, but currenPage is above 1", () => {
      CypressMountWithProviders(
        <PagerComponent currentPage={7} hideDisabledElements />
      );
      firstArrow().should("be.visible");
      previousArrow().should("be.visible");
    });

    it.each([
      [false, "not.exist"],
      [true, "be.visible"],
    ])(
      "when interactivePageNumber is %s, standard pager nav number input rendered correctly",
      (boolVal, assertion) => {
        CypressMountWithProviders(
          <PagerComponent currentPage={1} interactivePageNumber={boolVal} />
        );

        currentPageWrapper().should(assertion);
      }
    );

    it.each([
      [true, "not.exist"],
      [false, "be.visible"],
    ])(
      "when interactivePageNumber is %s, pager nav label is rendered correctly",
      (boolVal, assertion) => {
        CypressMountWithProviders(
          <PagerComponent currentPage={1} interactivePageNumber={boolVal} />
        );

        currentPageLabelWrapper().should(assertion);
      }
    );

    it("when interactivePageNumber is false, pager nav label is rendered with correct styling", () => {
      CypressMountWithProviders(
        <PagerComponent currentPage={1} interactivePageNumber={false} />
      );

      currentPageLabelWrapper()
        .should("have.css", "padding", "9px 12px")
        .and("have.css", "margin", "4px 0px");
    });
  });

  describe("check funtionality for Pager component", () => {
    it.each([[-1], [-10], [-100], testData[0], testData[1]])(
      "should set totalRecords out of scope to %s",
      (totalRecords) => {
        CypressMountWithProviders(
          <PagerComponent totalRecords={totalRecords} />
        );
        pagerSummary().should("have.text", `${totalRecords} items`);
        maxPages().should("have.text", "of 1");
      }
    );

    it("should disable nextArrow and lastArrow buttons after clicking on lastArrow button", () => {
      CypressMountWithProviders(<PagerComponent currentPage={3} />);

      lastArrow().click();
      nextArrow().should("have.attr", "disabled");
      lastArrow().should("have.attr", "disabled");
    });

    it("should disable firstArrow and previousArrow buttons after clicking on firstArrow button", () => {
      CypressMountWithProviders(<PagerComponent currentPage={3} />);

      firstArrow().click();
      firstArrow().should("have.attr", "disabled");
      previousArrow().should("have.attr", "disabled");
    });

    it("should disable firstArrow and previousArrow buttons after clicking on previousArrow button", () => {
      CypressMountWithProviders(<PagerComponent currentPage={2} />);

      previousArrow().click();
      firstArrow().should("have.attr", "disabled");
      previousArrow().should("have.attr", "disabled");
    });

    it("should disable firstArrow and previousArrow buttons after clicking on nextArrow button", () => {
      CypressMountWithProviders(<PagerComponent currentPage={9} />);

      nextArrow().click();
      nextArrow().should("have.attr", "disabled");
      lastArrow().should("have.attr", "disabled");
    });

    it("should show current page input has golden border", () => {
      CypressMountWithProviders(<PagerComponent />);

      currentPageInput()
        .click()
        .parent()
        .then(($el) => {
          checkGoldenOutline($el);
        });
    });

    it.each([
      [1001, "be.visible", "be.visible", "be.visible"],
      [901, "be.visible", "not.exist", "be.visible"],
      [701, "not.exist", "not.exist", "not.be.visible"],
      [601, "not.exist", "not.exist", "not.be.visible"],
      [450, "not.exist", "not.exist", "not.be.visible"],
    ])(
      "should render Pager in %s px width",
      (
        viewportWidth,
        showItemsAssertion,
        firstAndLastArrowsAssertion,
        totalRecordsAssetion
      ) => {
        cy.viewport(viewportWidth, 768);

        CypressMountWithProviders(<PagerComponentResponsive />);

        showLabelBefore().should(showItemsAssertion);
        pagerSummary().should(totalRecordsAssetion);
        firstArrow().should(firstAndLastArrowsAssertion);
        lastArrow().should(firstAndLastArrowsAssertion);
        nextArrow().should("be.visible");
        previousArrow().should("be.visible");
        currentPageSection().should("be.visible");
      }
    );
  });

  describe("check events for Pager component", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onPagination callback when a select event is triggered", () => {
      CypressMountWithProviders(
        <PagerComponent
          onPagination={callback}
          showPageSizeSelection
          currentPage={5}
        />
      );

      pageSelect().click();
      selectListWrapper()
        .find("li")
        .contains("25")
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onNext callback when a click event is triggered", () => {
      CypressMountWithProviders(<PagerComponent onNext={callback} />);

      nextArrow()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it.each([["Enter"], ["Space"]])(
      "should call onNext callback when a keyboard event is triggered",
      (key) => {
        CypressMountWithProviders(<PagerComponent onNext={callback} />);

        nextArrow()
          .trigger("keydown", keyCode(key))
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

    it("should call onPrevious callback when a click event is triggered", () => {
      CypressMountWithProviders(
        <PagerComponent onPrevious={callback} currentPage={5} />
      );

      previousArrow()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it.each([["Enter"], ["Space"]])(
      "should call onPrevious callback when a keyboard event is triggered",
      (key) => {
        CypressMountWithProviders(
          <PagerComponent onPrevious={callback} currentPage={5} />
        );

        previousArrow()
          .trigger("keydown", keyCode(key))
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

    it("should call onFirst callback when a click event is triggered", () => {
      CypressMountWithProviders(
        <PagerComponent onFirst={callback} currentPage={5} />
      );

      firstArrow()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it.each([["Enter"], ["Space"]])(
      "should call onFirst callback when a keyboard event is triggered",
      (key) => {
        CypressMountWithProviders(
          <PagerComponent onFirst={callback} currentPage={5} />
        );

        firstArrow()
          .trigger("keydown", keyCode(key))
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

    it("should call onLast callback when a click event is triggered", () => {
      CypressMountWithProviders(<PagerComponent onLast={callback} />);

      lastArrow()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it.each([["Enter"], ["Space"]])(
      "should call onLast callback when a keyboard event is triggered",
      (key) => {
        CypressMountWithProviders(<PagerComponent onLast={callback} />);

        lastArrow()
          .trigger("keydown", keyCode(key))
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );
  });

  describe("when inside a form component", () => {
    it("should have no bottom margin", () => {
      CypressMountWithProviders(<PagerInForm />);

      currentPageWrapper().should("have.css", "margin-bottom", "0px");
    });
  });

  describe("Accessibility tests for Pager component", () => {
    it.each([2, 5, 7])(
      "should render Pager with currentPage prop set to %s for accessibility tests",
      (currentPage) => {
        CypressMountWithProviders(<PagerComponent currentPage={currentPage} />);
        cy.checkAccessibility();
      }
    );

    it.each([50, 100, 235])(
      "should render Pager with totalRecords prop set to %s for accessibility tests",
      (totalRecords) => {
        CypressMountWithProviders(
          <PagerComponent totalRecords={totalRecords} />
        );
        cy.checkAccessibility();
      }
    );

    it.each([1, 10, 25, 100])(
      "should render Pager with pageSize prop set to %s for accessibility tests",
      (pageSizeVal) => {
        CypressMountWithProviders(
          <PagerComponent pageSize={pageSizeVal} showPageSizeSelection />
        );
        cy.checkAccessibility();
      }
    );
    it("should render Pager with pageSizeSelectionOptions prop for accessibility tests", () => {
      CypressMountWithProviders(
        <PagerComponent
          pageSizeSelectionOptions={recordsDiff}
          showPageSizeSelection
        />
      );
      cy.checkAccessibility();
    });

    it.each([true, false])(
      "should render Pager with showPageSizeSelection prop set to %s for accessibility tests",
      (bool) => {
        CypressMountWithProviders(
          <PagerComponent showPageSizeSelection={bool} />
        );
        cy.checkAccessibility();
      }
    );

    it.each([true, false])(
      "should render Pager with showPageSizeLabelAfter prop set to %s for accessibility tests",
      (boolVal) => {
        CypressMountWithProviders(
          <PagerComponent
            showPageSizeLabelAfter={boolVal}
            showPageSizeSelection
          />
        );
        cy.checkAccessibility();
      }
    );

    it.each([true, false])(
      "should render Pager with showTotalRecords prop set to %s for accessibility tests",
      (boolVal) => {
        CypressMountWithProviders(
          <PagerComponent showTotalRecords={boolVal} />
        );
        cy.checkAccessibility();
      }
    );

    it.each([true, false])(
      "should render Pager with showFirstAndLastButtons prop set to %s for accessibility tests",
      (boolVal) => {
        CypressMountWithProviders(
          <PagerComponent showFirstAndLastButtons={boolVal} />
        );
        cy.checkAccessibility();
      }
    );

    it.each([true, false])(
      "should render Pager with showPreviousAndNextButtons prop set to %s for accessibility tests",
      (boolVal) => {
        CypressMountWithProviders(
          <PagerComponent showPreviousAndNextButtons={boolVal} />
        );
        cy.checkAccessibility();
      }
    );

    it.each([true, false])(
      "should render Pager with showPageCount prop set to %s for accessibility tests",
      (boolVal) => {
        CypressMountWithProviders(<PagerComponent showPageCount={boolVal} />);
        cy.checkAccessibility();
      }
    );

    it.each(["default", "alternate"])(
      "should render Pager with variant prop set to %s for accessibility tests",
      (variant) => {
        CypressMountWithProviders(<PagerComponent variant={variant} />);
        cy.checkAccessibility();
      }
    );

    it.each([true, false])(
      "pager links are rendered as intended when hideDisabledElements is set to %s and currentPage is 1 for accessibility tests",
      (boolVal) => {
        CypressMountWithProviders(
          <PagerComponent currentPage={1} hideDisabledElements={boolVal} />
        );
        cy.checkAccessibility();
      }
    );

    it.each([true, false])(
      "pager links are rendered as intended when hideDisabledElements is set to %s and currentPage is 10 for accessibility tests",
      (boolVal) => {
        CypressMountWithProviders(
          <PagerComponent currentPage={10} hideDisabledElements={boolVal} />
        );
        cy.checkAccessibility();
      }
    );

    it("both pager links are rendered when hideDisabledElements is set to true, but currenPage is above 1 for accessibility tests", () => {
      CypressMountWithProviders(
        <PagerComponent currentPage={7} hideDisabledElements />
      );
      cy.checkAccessibility();
    });

    it.each([-1, -10, -100, testData[0], testData[1]])(
      "should set totalRecords out of scope to %s for accessibility tests",
      (totalRecords) => {
        CypressMountWithProviders(
          <PagerComponent totalRecords={totalRecords} />
        );
        cy.checkAccessibility();
      }
    );

    it("should disable nextArrow and lastArrow buttons after clicking on lastArrow button for accessibility tests", () => {
      CypressMountWithProviders(<PagerComponent currentPage={3} />);
      lastArrow().click();
      cy.checkAccessibility();
    });

    it("should disable firstArrow and previousArrow buttons after clicking on firstArrow button for accessibility tests", () => {
      CypressMountWithProviders(<PagerComponent currentPage={3} />);
      firstArrow().click();
      cy.checkAccessibility();
    });

    it("should disable firstArrow and previousArrow buttons after clicking on previousArrow button for accessibility tests", () => {
      CypressMountWithProviders(<PagerComponent currentPage={2} />);
      previousArrow().click();
      cy.checkAccessibility();
    });

    it("should disable firstArrow and previousArrow buttons after clicking on nextArrow button for accessibility tests", () => {
      CypressMountWithProviders(<PagerComponent currentPage={9} />);
      nextArrow().click();
      cy.checkAccessibility();
    });

    it.each([1001, 901, 701, 601, 45])(
      "should render Pager in %s px width for accessibility tests",
      (viewportWidth) => {
        cy.viewport(viewportWidth, 768);
        CypressMountWithProviders(<PagerComponentResponsive />);
        cy.checkAccessibility();
      }
    );

    it.each([true, false])(
      "should render Pager with showPageSizeLabelBefore prop set to %s for accessibility tests",
      (boolVal) => {
        CypressMountWithProviders(
          <PagerComponent
            showPageSizeLabelBefore={boolVal}
            showPageSizeSelection
          />
        );
        cy.checkAccessibility();
      }
    );

    it.each([false, true])(
      "should render Pager with interactivePageNumber prop set to %s for accessibility tests",
      (boolVal) => {
        CypressMountWithProviders(
          <PagerComponent currentPage={1} interactivePageNumber={boolVal} />
        );

        cy.checkAccessibility();
      }
    );
  });
});
