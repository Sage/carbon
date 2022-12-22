import React from "react";
import Pager from "./pager.component";

import {
  pageSelect,
  maxPages,
  previousArrow,
  nextArrow,
  firstArrow,
  lastArrow,
  currentPageWrapper,
  currentPageInput,
  pagerSummary,
  pageSelectElement,
  showLabelBefore,
  pageSizeLabelAfter,
  currentPageSection,
  pager,
} from "../../../cypress/locators/pager/index";
import { selectListWrapper } from "../../../cypress/locators/select/index";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { keyCode } from "../../../cypress/support/helper";
import useMediaQuery from "../../hooks/useMediaQuery";
import { checkGoldenOutline } from "../../../cypress/support/component-helper/common-steps";
import { CHARACTERS } from "../../../cypress/support/component-helper/constants";
import Form from "../form";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const records = [
  {
    id: "1",
    name: 1,
  },
  {
    id: "10",
    name: 10,
  },
  {
    id: "25",
    name: 25,
  },
  {
    id: "50",
    name: 50,
  },
  {
    id: "100",
    name: 100,
  },
];

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

const PagerComponent = ({ ...props }) => {
  return (
    <Pager
      currentPage="1"
      onPagination={() => {}}
      pageSizeSelectionOptions={records}
      totalRecords="100"
      {...props}
    />
  );
};

const PagerComponentResponsive = () => {
  const query1 = useMediaQuery("(max-width: 1000px)");
  const query2 = useMediaQuery("(max-width: 900px)");
  const query3 = useMediaQuery("(max-width: 800px)");
  const query4 = useMediaQuery("(max-width: 700px)");
  const query5 = useMediaQuery("(max-width: 600px)");

  const responsiveProps = () => {
    if (query5) {
      return {
        showPageSizeSelection: false,
        showTotalRecords: false,
        showFirstAndLastButtons: false,
      };
    }

    if (query4) {
      return {
        showFirstAndLastButtons: false,
        showTotalRecords: false,
        showPageSizeLabelBefore: false,
        showPageSizeLabelAfter: false,
      };
    }

    if (query3) {
      return {
        showFirstAndLastButtons: false,
        showTotalRecords: false,
        showPageSizeLabelBefore: false,
        showPageSizeLabelAfter: false,
      };
    }

    if (query2) {
      return {
        showFirstAndLastButtons: false,
        showTotalRecords: false,
      };
    }

    if (query1) {
      return {
        showPageSizeSelection: true,
        showFirstAndLastButtons: false,
      };
    }

    return {
      showPageSizeSelection: true,
    };
  };

  return (
    <Pager
      totalRecords={1000}
      pageSize={10}
      currentPage={1}
      onPagination={() => {}}
      {...responsiveProps()}
      pageSizeSelectionOptions={records}
    />
  );
};

const PagerInForm = () => {
  return (
    <Form>
      <PagerComponent />
    </Form>
  );
};

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
});
