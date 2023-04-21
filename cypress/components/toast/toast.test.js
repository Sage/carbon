import React from "react";
import { ToastComponent } from "../../../src/components/toast/toast-test.stories";
import { TOAST_COLORS } from "../../../src/components/toast/toast.config";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { checkGoldenOutline } from "../../support/component-helper/common-steps";
import toastComponent from "../../locators/toast";
import { pressESCKey, pressTABKey } from "../../../cypress/support/helper";
import { closeIconButton, getComponent } from "../../locators/index";
import { CHARACTERS } from "../../support/component-helper/constants";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testData = CHARACTERS.STANDARD;
const colorTypes = [
  ["rgb(203, 55, 74)"],
  ["rgb(51, 91, 112)"],
  ["rgb(0, 138, 33)"],
  ["rgb(239, 103, 0)"],
];

context("Testing Toast component", () => {
  describe("should render Toast component", () => {
    it.each(specialCharacters)(
      "should render Toast component with %s as a children",
      (childrenValue) => {
        CypressMountWithProviders(
          <ToastComponent>{childrenValue}</ToastComponent>
        );

        toastComponent().children().should("have.text", childrenValue);
      }
    );

    it("should close Toast component by pressing ESC key", () => {
      CypressMountWithProviders(<ToastComponent />);

      pressESCKey();
      toastComponent().should("not.exist");
    });

    it("should render Toast component with focus", () => {
      CypressMountWithProviders(<ToastComponent />);

      toastComponent().should("be.focused");
    });

    it("should render Toast component with not focused close icon", () => {
      CypressMountWithProviders(<ToastComponent disableAutoFocus />);

      closeIconButton().should("not.be.focused");
    });

    it.each([
      [true, 0],
      [false, 30],
    ])(
      "should render Toast component with isCenter prop set to %s",
      (isCenter, margin) => {
        CypressMountWithProviders(<ToastComponent isCenter={isCenter} />);

        toastComponent().should("have.css", "margin-right", `${margin}px`);
      }
    );

    it("should render Toast component with className prop", () => {
      CypressMountWithProviders(<ToastComponent className={testData} />);

      toastComponent().should("have.class", testData);
    });

    it("should render Toast component with id prop", () => {
      CypressMountWithProviders(<ToastComponent id={testData} />);

      toastComponent().should("have.attr", "id", testData);
    });

    it("should render Toast component with data-component prop", () => {
      CypressMountWithProviders(<ToastComponent data-component={testData} />);

      getComponent(testData).should("exist");
    });

    it.each([
      [TOAST_COLORS[0], colorTypes[0]],
      [TOAST_COLORS[1], colorTypes[1]],
      [TOAST_COLORS[2], colorTypes[2]],
      [TOAST_COLORS[3], colorTypes[3]],
    ])("should render Toast component with %s variant", (variant, color) => {
      CypressMountWithProviders(<ToastComponent variant={variant} />);

      toastComponent().should("have.css", "border").and("contain", color);
    });

    it.each([
      [true, "be.visible"],
      [false, "not.exist"],
    ])(
      "should render Toast component with open prop set to %s",
      (bool, assertion) => {
        CypressMountWithProviders(<ToastComponent open={bool} />);

        toastComponent().should(assertion);
      }
    );

    it.each([
      [1, 1000],
      [15, 15000],
      [25, 25000],
    ])(
      "should render Toast component with timeout prop set to %s",
      (timeout, numberForTick) => {
        const now = new Date();
        cy.clock(now);

        CypressMountWithProviders(<ToastComponent timeout={timeout} />);

        toastComponent().should("be.visible");
        cy.tick(numberForTick);
        toastComponent().should("not.exist");
      }
    );

    it("should render Toast component with targetPortalId prop", () => {
      CypressMountWithProviders(<ToastComponent targetPortalId={testData} />);

      toastComponent()
        .parent()
        .parent()
        .parent()
        .parent()
        .should("have.attr", "id", testData);
    });

    it("should render Toast component with maxWidth prop", () => {
      CypressMountWithProviders(<ToastComponent maxWidth="250px" />);

      toastComponent().should("have.css", "maxWidth", "250px");
    });

    it("should render Toast component with notice variant", () => {
      CypressMountWithProviders(<ToastComponent variant="notice" open />);

      toastComponent()
        .then((toast) => {
          expect(toast.css("background-color")).to.equals("rgb(51, 91, 112)");
          expect(toast.css("box-shadow")).to.equals(
            "rgba(0, 20, 29, 0.1) 0px 10px 30px 0px, rgba(0, 20, 29, 0.1) 0px 30px 60px 0px"
          );
        })
        .and("be.visible");
    });

    it("should render Toast component with notice variant with focused close icon", () => {
      CypressMountWithProviders(<ToastComponent variant="notice" open />);

      pressTABKey(1);
      closeIconButton().then(($el) => {
        checkGoldenOutline($el);
      });
    });
  });

  describe("check events for Toast component", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onDismiss callback when a click event is triggered", () => {
      CypressMountWithProviders(<ToastComponent onDismiss={callback} />);

      closeIconButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onDismiss callback when a Esc key event is triggered", () => {
      CypressMountWithProviders(<ToastComponent onDismiss={callback} />);

      pressESCKey();
      toastComponent().then(() => {
        // eslint-disable-next-line no-unused-expressions
        expect(callback).to.have.been.calledOnce;
      });
    });
  });

  describe("should render Toast component and check accessibility issues", () => {
    it.each([
      TOAST_COLORS[0],
      TOAST_COLORS[1],
      TOAST_COLORS[2],
      TOAST_COLORS[3],
    ])(
      "should render Toast component with %s variant and check accessibility",
      (variant) => {
        CypressMountWithProviders(<ToastComponent variant={variant} />);

        cy.checkAccessibility();
      }
    );

    it("should render Toast component with notice variant and check accessibility", () => {
      CypressMountWithProviders(<ToastComponent variant="notice" open />);

      cy.checkAccessibility();
    });

    it("should render Toast component with maxWidth prop and check accessibility", () => {
      CypressMountWithProviders(<ToastComponent maxWidth="250px" />);

      cy.checkAccessibility();
    });
  });

  it("render with the expected border radius", () => {
    CypressMountWithProviders(<ToastComponent open />);

    toastComponent().should("have.css", "border-radius", "8px");
  });
});
