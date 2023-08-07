import React from "react";
import { IconButtonProps } from "components/icon-button";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { icon } from "../../locators";
import { IconButtonComponent } from "../../../src/components/icon-button/icon-button-test.stories";
import { CHARACTERS } from "../../support/component-helper/constants";
import { keyCode } from "../../support/helper";

const keyToTrigger = ["Space", "Enter"] as const;

context("Tests for IconButton component", () => {
  describe("check props for IconButton component", () => {
    it("should render IconButton with aria-label prop", () => {
      CypressMountWithProviders(
        <IconButtonComponent aria-label={CHARACTERS.STANDARD} />
      );

      icon()
        .parent()
        .should("have.attr", "aria-label", CHARACTERS.STANDARD)
        .and("be.visible");
    });

    it("should render IconButton with children prop", () => {
      CypressMountWithProviders(<IconButtonComponent />);

      icon().should("be.visible");
    });

    it("should render IconButton with disabled prop", () => {
      CypressMountWithProviders(<IconButtonComponent disabled />);

      icon().parent().should("be.disabled").and("have.attr", "disabled");
    });
  });

  describe("check events for IconButton component", () => {
    it("should call onBlur callback when a blur event is triggered", () => {
      const callback: IconButtonProps["onBlur"] = cy.stub().as("onBlur");
      CypressMountWithProviders(<IconButtonComponent onBlur={callback} />);

      icon().parent().focus().blur();
      cy.get("@onBlur").should("have.been.calledOnce");
    });

    it("should call onFocus callback when a focus event is triggered", () => {
      const callback: IconButtonProps["onFocus"] = cy.stub().as("onFocus");
      CypressMountWithProviders(<IconButtonComponent onFocus={callback} />);

      icon().parent().focus();
      cy.get("@onFocus").should("have.been.calledOnce");
    });

    it("should call onMouseEnter callback when a mouseover event is triggered", () => {
      const callback: IconButtonProps["onMouseEnter"] = cy
        .stub()
        .as("onMouseEnter");
      CypressMountWithProviders(
        <IconButtonComponent onMouseEnter={callback} />
      );

      icon().parent().trigger("mouseover");
      cy.get("@onMouseEnter").should("have.been.calledOnce");
    });

    it("should call onMouseLeave callback when a mouseout event is triggered", () => {
      const callback: IconButtonProps["onMouseLeave"] = cy
        .stub()
        .as("onMouseLeave");
      CypressMountWithProviders(
        <IconButtonComponent onMouseLeave={callback} />
      );

      icon().parent().trigger("mouseover").trigger("mouseout");
      cy.get("@onMouseLeave").should("have.been.calledOnce");
    });

    it("should call onClick callback when a click event is triggered", () => {
      const callback: IconButtonProps["onClick"] = cy.stub().as("onClick");
      CypressMountWithProviders(<IconButtonComponent onClick={callback} />);

      icon().parent().click();
      cy.get("@onClick").should("have.been.calledOnce");
    });

    it.each([...keyToTrigger])(
      "should call onClick callback when a keydown event is triggered with %s",
      (key) => {
        const callback: IconButtonProps["onClick"] = cy.stub().as("onClick");
        CypressMountWithProviders(<IconButtonComponent onClick={callback} />);

        icon().parent().trigger("keydown", keyCode(key));
        cy.get("@onClick").should("have.been.calledOnce");
      }
    );
  });

  describe("check accessibility tests for IconButton component", () => {
    it("should pass accessibility tests for aria-label prop", () => {
      CypressMountWithProviders(
        <IconButtonComponent aria-label={CHARACTERS.STANDARD} />
      );
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for children prop", () => {
      CypressMountWithProviders(<IconButtonComponent />);
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for disabled prop", () => {
      CypressMountWithProviders(<IconButtonComponent disabled />);
      cy.checkAccessibility();
    });
  });

  it("render with the expected border radius when roundness is %s", () => {
    CypressMountWithProviders(<IconButtonComponent />);

    icon().parent().focus();
    icon().parent().should("have.css", "border-radius", "4px");
  });
});
