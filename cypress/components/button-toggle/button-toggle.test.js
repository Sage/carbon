import React from "react";
import ButtonToggle from "../../../src/components/button-toggle";
import { ButtonToggleComponent } from "../../../src/components/button-toggle/button-toggle-test.stories";
import {
  buttonToggleLabelPreview,
  buttonTogglePreview,
  buttonToggleInput,
} from "../../locators/button-toggle";
import { icon } from "../../locators";
import { positionOfElement } from "../../../cypress/support/helper";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { SIZE, CHARACTERS } from "../../support/component-helper/constants";
import { useJQueryCssValueAndAssert } from "../../support/component-helper/common-steps";

context("Testing Button-Toggle component", () => {
  describe("should render Button-Toggle component", () => {
    it("should render Button-Toggle with aria-label prop", () => {
      CypressMountWithProviders(
        <ButtonToggleComponent aria-label="cypress-aria" />
      );

      buttonToggleInput().should("have.attr", "aria-label", "cypress-aria");
    });

    it("should render Button-Toggle with aria-labelledby prop", () => {
      CypressMountWithProviders(
        <ButtonToggleComponent aria-labelledby={CHARACTERS.STANDARD} />
      );

      buttonToggleInput().should(
        "have.attr",
        "aria-labelledby",
        CHARACTERS.STANDARD
      );
    });

    it.each([
      [true, "have.attr", "checked"],
      [false, "not.have.attr", "unchecked"],
    ])(
      "should check when checked prop is %s that Button-Toggle  is %s",
      (state, attribute, checked) => {
        CypressMountWithProviders(<ButtonToggleComponent checked={state} />);

        buttonToggleInput().should(attribute, checked);
      }
    );

    it("should render Button-Toggle with data-component prop set to cypress_data", () => {
      CypressMountWithProviders(
        <ButtonToggleComponent data-component={CHARACTERS.STANDARD} />
      );

      buttonToggleInput()
        .parent()
        .should("have.attr", "data-component", CHARACTERS.STANDARD);
    });

    it("should render Button-Toggle with data-element prop set to cypress_data", () => {
      CypressMountWithProviders(
        <ButtonToggleComponent data-element={CHARACTERS.STANDARD} />
      );

      buttonToggleInput()
        .parent()
        .should("have.attr", "data-element", CHARACTERS.STANDARD);
    });

    it("should render Button-Toggle with data-role prop set to cypress_data", () => {
      CypressMountWithProviders(
        <ButtonToggleComponent data-role={CHARACTERS.STANDARD} />
      );

      buttonToggleInput()
        .parent()
        .should("have.attr", "data-role", CHARACTERS.STANDARD);
    });

    it("should render Button-Toggle with name prop set to cypress_data", () => {
      CypressMountWithProviders(
        <ButtonToggleComponent name={CHARACTERS.STANDARD} />
      );

      buttonToggleInput().should("have.attr", "name", CHARACTERS.STANDARD);
    });

    it.each([
      [SIZE.SMALL, 32],
      [SIZE.MEDIUM, 40],
      [SIZE.LARGE, 48],
    ])(
      "should check when prop is %s that Button-Toggle height is %s",
      (size, height) => {
        CypressMountWithProviders(
          <ButtonToggleComponent size={size}> {size}</ButtonToggleComponent>
        );

        buttonTogglePreview().then(($el) => {
          useJQueryCssValueAndAssert($el, "height", height);
        });
      }
    );

    it.each(["add", "share", "tick"])(
      "should check that Button-Toggle has %s icon",
      (type) => {
        CypressMountWithProviders(
          <ButtonToggleComponent buttonIcon={type} buttonIconSize="large">
            {" "}
            {type}
          </ButtonToggleComponent>
        );

        icon().should("have.attr", "type", type);
      }
    );

    it.each([SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE])(
      "should check that Button-Toggle icon size is %s",
      (iconSize) => {
        CypressMountWithProviders(
          <ButtonToggleComponent buttonIcon="tick" buttonIconSize={iconSize}>
            {" "}
            {iconSize}
          </ButtonToggleComponent>
        );

        icon()
          .should("have.attr", "font-size", iconSize)
          .and("have.attr", "type", "tick");
      }
    );

    it.each([
      [true, "-1px"],
      [false, "8px"],
    ])(
      "should render Button-Toggle when Grouped prop is %s with margin-left value of %s",
      (state, margin) => {
        CypressMountWithProviders(<ButtonToggleComponent grouped={state} />);

        buttonTogglePreview()
          .eq(positionOfElement("second"))
          .should("have.css", "margin-left", margin);
      }
    );

    it.each([
      CHARACTERS.STANDARD,
      CHARACTERS.DIACRITICS,
      CHARACTERS.SPECIALCHARACTERS,
    ])(
      "should check Button-Toggle text is %s when Children prop is set to %s",
      (labelText) => {
        CypressMountWithProviders(<ButtonToggle>{labelText}</ButtonToggle>);

        buttonToggleLabelPreview(positionOfElement("first")).should(
          "have.text",
          labelText
        );
      }
    );

    it("should render Button-Toggle with Value set to cypress_data", () => {
      CypressMountWithProviders(
        <ButtonToggleComponent value={CHARACTERS.STANDARD} />
      );

      buttonToggleInput().should("have.attr", "value", CHARACTERS.STANDARD);
    });
  });

  describe("should render Button-Toggle component for event tests", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should render Button-Toggle disabled", () => {
      CypressMountWithProviders(<ButtonToggleComponent disabled />);

      buttonToggleInput().should("have.attr", "disabled");
      buttonTogglePreview()
        .eq(positionOfElement("first"))
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).not.to.have.been.called;
        });
    });

    it("should call onChange callback when a click event is triggered", () => {
      CypressMountWithProviders(<ButtonToggleComponent onChange={callback} />);

      buttonTogglePreview()
        .eq(positionOfElement("first"))
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onFocus callback when a focus event is triggered", () => {
      CypressMountWithProviders(<ButtonToggleComponent onFocus={callback} />);

      buttonToggleInput()
        .eq(positionOfElement("first"))
        .focus()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(<ButtonToggleComponent onBlur={callback} />);

      buttonToggleInput().eq(positionOfElement("first")).focus();

      buttonToggleInput()
        .eq(positionOfElement("first"))
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });

  describe("Accessibility tests for Button-Toggle component", () => {
    it("should pass accessibility tests for Button-Toggle default story", () => {
      CypressMountWithProviders(<ButtonToggleComponent />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Button-Toggle disabled", () => {
      CypressMountWithProviders(<ButtonToggleComponent disabled />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Button-Toggle grouped", () => {
      CypressMountWithProviders(<ButtonToggleComponent grouped />);

      cy.checkAccessibility();
    });

    it.each([
      [SIZE.SMALL, 32],
      [SIZE.MEDIUM, 40],
      [SIZE.LARGE, 48],
    ])("should pass accessibility tests for Button-Toggle %s", (size) => {
      CypressMountWithProviders(
        <ButtonToggleComponent size={size}> {size}</ButtonToggleComponent>
      );

      cy.checkAccessibility();
    });

    it.each(["add", "share", "tick"])(
      "should pass accessibility tests for Button-Toggle with %s icon",
      (type) => {
        CypressMountWithProviders(
          <ButtonToggleComponent buttonIcon={type} buttonIconSize="large">
            {" "}
            {type}
          </ButtonToggleComponent>
        );

        cy.checkAccessibility();
      }
    );
  });

  it("has the expected border-radius styling", () => {
    CypressMountWithProviders(
      <ButtonToggleComponent>Foo</ButtonToggleComponent>
    );

    buttonToggleLabelPreview(0).should("have.css", "border-radius", "32px");
    buttonToggleLabelPreview(1).should("have.css", "border-radius", "32px");
    buttonToggleLabelPreview(2).should("have.css", "border-radius", "32px");
  });
});
