import React from "react";
import Search, {
  SearchProps,
} from "../../../src/components/search/search.component";
import { SearchComponent } from "../../../src/components/search/search-test.stories";
import Box from "../../../src/components/box";
import { getDataElementByValue, tooltipPreview } from "../../locators";
import {
  searchDefault,
  searchDefaultInput,
  searchCrossIcon,
  searchButton,
  searchDefaultInnerIcon,
  searchIcon,
  searchFindIcon,
} from "../../locators/search/index";
import { checkGoldenOutline } from "../../support/component-helper/common-steps";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { keyCode } from "../../support/helper";
import {
  VALIDATION,
  CHARACTERS,
} from "../../support/component-helper/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testCypress = CHARACTERS.STANDARD;
const keysToTrigger = ["Enter", "Space"] as const;
const validationTypes: [string, string][] = [
  ["error", VALIDATION.ERROR],
  ["warning", VALIDATION.WARNING],
  ["info", VALIDATION.INFO],
];

context("Test for Search component", () => {
  describe("check props for Search component", () => {
    it.each(testData)(
      "should render Search with placeholder using %s as special characters",
      (placeholder) => {
        CypressMountWithProviders(
          <SearchComponent placeholder={placeholder} />
        );

        searchDefaultInput().should("have.attr", "placeholder", placeholder);
      }
    );

    it("should render Search with defaultValue prop", () => {
      CypressMountWithProviders(<Search defaultValue={testCypress} />);

      searchDefaultInput().should("have.attr", "value", testCypress);
    });

    it("should render Search with value prop", () => {
      CypressMountWithProviders(<SearchComponent value={testCypress} />);

      searchDefaultInput().should("have.attr", "value", testCypress);
    });

    it("should render Search with id prop", () => {
      CypressMountWithProviders(<SearchComponent id={testCypress} />);

      searchDefault().should("have.attr", "id", testCypress);
    });

    it("should render Search with name prop", () => {
      CypressMountWithProviders(<SearchComponent name={testCypress} />);

      searchDefault().should("have.attr", "name", testCypress);
    });

    it("should render Search with aria-label prop", () => {
      CypressMountWithProviders(<SearchComponent aria-label={testCypress} />);

      searchDefaultInput().should("have.attr", "aria-label", testCypress);
    });

    it("should render Search button with aria-label prop", () => {
      CypressMountWithProviders(
        <SearchComponent searchButton searchButtonAriaLabel={testCypress} />
      );

      searchDefaultInput().clear().type(testCypress);
      searchButton().should("have.attr", "aria-label", testCypress);
    });

    it.each([
      [true, "be.visible"],
      [false, "not.exist"],
    ])(
      "should render Search with searchButton prop set to %s",
      (searchButtonBool, assertion) => {
        CypressMountWithProviders(
          <Search searchButton={searchButtonBool} defaultValue={testCypress} />
        );

        searchFindIcon().should(assertion);
      }
    );

    it.each([
      ["34%", "464px"],
      ["70%", "956px"],
    ])(
      "should render Search with searchWidth prop set to %s percentage",
      (widthInPercentage, widthVal) => {
        CypressMountWithProviders(
          <SearchComponent searchWidth={widthInPercentage} />
        );

        searchDefault().then(($el) => {
          cy.wrap($el[0].getBoundingClientRect().width).should(
            "be.approximately",
            parseInt(widthVal),
            2
          );
        });
      }
    );

    it.each(["475px", "250px"])(
      "should render Search with searchWidth prop set to %s",
      (width) => {
        CypressMountWithProviders(<SearchComponent searchWidth={width} />);

        searchDefault().then(($el) => {
          cy.wrap($el[0].getBoundingClientRect().width).should(
            "be.approximately",
            parseInt(width),
            2
          );
        });
      }
    );

    it.each([
      ["10%", "135px"],
      ["34%", "464px"],
      ["70%", "956px"],
      ["100%", "1366px"],
    ])(
      "should render Search with maxWidth prop set to %s",
      (widthInPercentage, widthVal) => {
        CypressMountWithProviders(
          <SearchComponent maxWidth={widthInPercentage} />
        );

        searchDefault().then(($el) => {
          cy.wrap($el[0].getBoundingClientRect().width).should(
            "be.approximately",
            parseInt(widthVal),
            2
          );
        });
      }
    );

    it("when maxWidth has no value it should render as 100%", () => {
      CypressMountWithProviders(<SearchComponent maxWidth="" />);

      return searchDefault().then(($el) => {
        cy.wrap($el[0].getBoundingClientRect().width).should(
          "be.approximately",
          parseInt("1366px"),
          2
        );
      });
    });

    it.each([
      ["default", "rgb(102, 132, 148)"],
      ["dark", "rgb(153, 173, 183)"],
    ] as [SearchProps["variant"], string][])(
      "should render Search with variant prop set to %s",
      (variant, backgroundColor) => {
        CypressMountWithProviders(
          <Box width="700px" height="108px">
            <div
              style={{
                padding: "32px",
                backgroundColor: "#003349",
              }}
            >
              <SearchComponent variant={variant} />
            </div>
          </Box>
        );

        searchDefault().should(
          "have.css",
          "border-bottom-color",
          backgroundColor
        );
      }
    );

    it.each([
      ["default", "rgb(51, 91, 112)"],
      ["dark", "rgb(204, 214, 219)"],
    ] as [SearchProps["variant"], string][])(
      "should render Search with variant prop set to %s on hover",
      (variant, hoverColor) => {
        CypressMountWithProviders(
          <Box width="700px" height="108px">
            <div
              style={{
                padding: "32px",
                backgroundColor: "#003349",
              }}
            >
              <SearchComponent variant={variant} />
            </div>
          </Box>
        );

        searchDefaultInnerIcon().realHover();
        searchDefault().should("have.css", "border-bottom-color", hoverColor);
      }
    );

    it("should render Search with tabIndex prop", () => {
      CypressMountWithProviders(<SearchComponent tabIndex={-5} />);

      searchDefaultInput().should("have.attr", "tabIndex", "-5");
    });

    it.each(validationTypes)(
      "should render Search and set type to %s as string",
      (type, color) => {
        CypressMountWithProviders(
          <SearchComponent {...{ [type]: "Message" }} />
        );

        searchDefaultInput().parent().should("have.css", "border-color", color);

        getDataElementByValue(type).should("be.visible");
      }
    );

    it.each(validationTypes)(
      "should render Search and set type to %s as boolean",
      (type, color) => {
        CypressMountWithProviders(<SearchComponent {...{ [type]: true }} />);

        searchDefaultInput().parent().should("have.css", "border-color", color);
      }
    );

    it("should have the expected border radius styling when no search button enabled", () => {
      CypressMountWithProviders(<SearchComponent />);
      searchDefaultInput().should("have.css", "border-radius", "4px");
      searchDefaultInput().parent().should("have.css", "border-radius", "4px");
    });

    it("should have the expected border radius styling when search button enabled", () => {
      CypressMountWithProviders(<SearchComponent searchButton value="foo" />);
      searchDefaultInput()
        .parent()
        .should("have.css", "border-radius", "4px 0px 0px 4px");
    });

    it.each([
      "top",
      "bottom",
      "left",
      "right",
    ] as SearchProps["tooltipPosition"][])(
      "should render Search with the tooltip in the %s position",
      (tooltipPositionValue) => {
        CypressMountWithProviders(
          <Box width="700px" height="108px">
            <div
              style={{
                padding: "100px",
              }}
            >
              <SearchComponent
                error={testCypress}
                tooltipPosition={tooltipPositionValue}
              />
            </div>
          </Box>
        );

        getDataElementByValue("error").trigger("mouseover");
        tooltipPreview()
          .should("have.text", testCypress)
          .should("have.attr", "data-placement", tooltipPositionValue);
      }
    );

    // threshold prop isn't working
  });

  describe("check functionality for Search component", () => {
    it("should verify proper color for Search icon button", () => {
      CypressMountWithProviders(<SearchComponent searchButton />);

      searchDefaultInput().clear().type(testCypress);
      searchButton().click({ force: true });
      const mintColor = "rgb(0, 126, 69)";
      searchIcon().should("have.css", "background-color", mintColor);
    });

    it("should clear a Search input after click on cross icon", () => {
      CypressMountWithProviders(<SearchComponent />);

      searchDefaultInput().clear().type(testCypress);
      searchCrossIcon().click({ force: true });
      searchDefaultInput().should("be.empty");
    });

    it("should verify that search icon has golden outline", () => {
      CypressMountWithProviders(<SearchComponent searchButton />);

      searchDefaultInput().clear().type(testCypress);
      searchButton().click({ force: true });
      searchButton().then(($el) => {
        checkGoldenOutline($el);
      });
    });

    it("should verify that input has golden outline", () => {
      CypressMountWithProviders(<SearchComponent searchButton />);

      searchDefaultInput()
        .clear()
        .type(testCypress)
        .parent()
        .then(($el) => {
          checkGoldenOutline($el);
        });
    });

    it("should verify that cross icon has golden outline", () => {
      CypressMountWithProviders(<SearchComponent searchButton />);

      searchDefaultInput().clear().type(testCypress).tab();

      searchCrossIcon()
        .parent()
        .then(($el) => {
          checkGoldenOutline($el);
        });
    });
  });

  describe("check events for Search component", () => {
    it("should call onClick callback when a click event is triggered", () => {
      const callback: SearchProps["onClick"] = cy.stub().as("onClick");

      CypressMountWithProviders(
        <Search onClick={callback} defaultValue={testCypress} searchButton />
      );

      searchButton().click();
      cy.get("@onClick").should("have.been.calledOnce");
    });

    it("should call onChange callback when a type event is triggered", () => {
      const callback: SearchProps["onChange"] = cy.stub().as("onChange");

      CypressMountWithProviders(<SearchComponent onChange={callback} />);

      searchDefaultInput().type("1");
      cy.get("@onChange").should("have.been.calledOnce");
    });

    it("should call onFocus callback when a focus event is triggered", () => {
      const callback: SearchProps["onFocus"] = cy.stub().as("onFocus");

      CypressMountWithProviders(<SearchComponent onFocus={callback} />);

      searchDefaultInput().focus();
      cy.get("@onFocus").should("have.been.calledOnce");
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      const callback: SearchProps["onBlur"] = cy.stub().as("onBlur");

      CypressMountWithProviders(<SearchComponent onBlur={callback} />);

      searchDefaultInput().focus().blur();
      cy.get("@onBlur").should("have.been.calledOnce");
    });

    it.each([keysToTrigger[0], keysToTrigger[1]])(
      "should call onKeyDown callback when a keyboard event is triggered",
      (key) => {
        const callback: SearchProps["onKeyDown"] = cy.stub().as("onKeyDown");

        CypressMountWithProviders(<SearchComponent onKeyDown={callback} />);

        searchDefaultInput().trigger("keydown", keyCode(key));
        cy.get("@onKeyDown").should("have.been.calledOnce");
      }
    );
  });

  describe("Accessibility tests for Search", () => {
    it.each(testData)(
      "should check accessibility for Search with placeholder using %s as special characters",
      (placeholder) => {
        CypressMountWithProviders(
          <SearchComponent placeholder={placeholder} />
        );

        cy.checkAccessibility();
      }
    );

    it("should check accessibility for Search with defaultValue prop", () => {
      CypressMountWithProviders(<Search defaultValue={testCypress} />);

      cy.checkAccessibility();
    });

    it("should check accessibility for Search with value prop", () => {
      CypressMountWithProviders(<SearchComponent value={testCypress} />);

      cy.checkAccessibility();
    });

    it("should check accessibility for Search with id prop", () => {
      CypressMountWithProviders(<SearchComponent id={testCypress} />);

      cy.checkAccessibility();
    });

    it("should check accessibility for Search with name prop", () => {
      CypressMountWithProviders(<SearchComponent name={testCypress} />);

      cy.checkAccessibility();
    });

    it("should check accessibility for Search with aria-label prop", () => {
      CypressMountWithProviders(<SearchComponent aria-label={testCypress} />);

      cy.checkAccessibility();
    });

    it("should check accessibility for searchButton", () => {
      CypressMountWithProviders(<SearchComponent searchButton />);

      cy.checkAccessibility();
    });

    it.each(validationTypes)(
      "should check accessibility for Search and set type to %s as boolean",
      (type) => {
        CypressMountWithProviders(<SearchComponent {...{ [type]: true }} />);

        cy.checkAccessibility();
      }
    );

    it("should check accessibility for searchButton with searchButtonAriaLabel", () => {
      CypressMountWithProviders(
        <SearchComponent searchButton searchButtonAriaLabel={testCypress} />
      );

      cy.checkAccessibility();
    });

    it.each(["34%", "70%"])(
      "should check accessibility for Search with searchWidth prop set to %s percentage",
      (widthInPercentage) => {
        CypressMountWithProviders(
          <SearchComponent searchWidth={widthInPercentage} />
        );

        cy.checkAccessibility();
      }
    );

    it.each(["475px", "250px"])(
      "should check accessibility for Search with searchWidth prop set to %s",
      (width) => {
        CypressMountWithProviders(<SearchComponent searchWidth={width} />);

        cy.checkAccessibility();
      }
    );

    it.each(["10%", "34%", "70%", "100%"])(
      "should check accessibility for Search with maxWidth prop set to %s",
      (widthInPercentage) => {
        CypressMountWithProviders(
          <SearchComponent maxWidth={widthInPercentage} />
        );

        cy.checkAccessibility();
      }
    );

    it("should check accessibility for Search with tabIndex prop", () => {
      CypressMountWithProviders(<SearchComponent tabIndex={-5} />);

      cy.checkAccessibility();
    });

    it.each(validationTypes)(
      "should check accessibility for Search and set type to %s as string",
      (type) => {
        CypressMountWithProviders(
          <SearchComponent {...{ [type]: "Message" }} />
        );

        cy.checkAccessibility();
      }
    );

    it.each([
      "top",
      "bottom",
      "left",
      "right",
    ] as SearchProps["tooltipPosition"][])(
      "should check accessibility for Search with the tooltip in the %s position",
      (tooltipPositionValue) => {
        CypressMountWithProviders(
          <Box width="700px" height="108px">
            <div
              style={{
                padding: "100px",
              }}
            >
              <SearchComponent
                error={testCypress}
                tooltipPosition={tooltipPositionValue}
              />
            </div>
          </Box>
        );

        cy.checkAccessibility();
      }
    );

    // FE-4670
    // eslint-disable-next-line
    describe.skip("should render Search component", () => {
      it.each(["default", "dark"] as SearchProps["variant"][])(
        "should check accessibility for Search with variant prop set to %s",
        (variant) => {
          CypressMountWithProviders(
            <Box width="700px" height="108px">
              <div
                style={{
                  padding: "32px",
                  backgroundColor: "#003349",
                }}
              >
                <SearchComponent variant={variant} />
              </div>
            </Box>
          );

          cy.checkAccessibility();
        }
      );
    });
  });
});
