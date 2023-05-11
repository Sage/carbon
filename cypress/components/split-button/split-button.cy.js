import React from "react";
import {
  SplitButtonList,
  SplitButtonNestedInDialog,
} from "../../../src/components/split-button/split-button-test.stories";
import { Accordion } from "../../../src/components/accordion";
import * as stories from "../../../src/components/split-button/split-button.stories";
import SplitButton from "../../../src/components/split-button";
import Button from "../../../src/components/button";
import { buttonSubtextPreview } from "../../locators/button";
import { keyCode, positionOfElement } from "../../support/helper";
import { cyRoot, icon, getDataElementByValue } from "../../locators";

import {
  splitToggleButton,
  additionalButton,
  additionalButtonsContainer,
  splitMainButtonDataComponent,
  mainButton,
  splitMainButton,
} from "../../locators/split-button";
import { accordionDefaultTitle } from "../../locators/accordion";
import { alertDialogPreview } from "../../locators/dialog";
import { CHARACTERS } from "../../support/component-helper/constants";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

context("Tests for SplitButton component", () => {
  describe("check props for SplitButton component", () => {
    it.each(testData)(
      "should render SplitButton text using %s as special characters",
      (text) => {
        CypressMountWithProviders(<SplitButtonList text={text} />);

        getDataElementByValue("main-text").should("have.text", text);
      }
    );

    it.each(testData)(
      "should render SplitButton subtext with %s as special characters",
      (subtext) => {
        CypressMountWithProviders(
          <SplitButtonList size="large" subtext={subtext} />
        );

        buttonSubtextPreview().should("have.text", subtext);
      }
    );

    it("should check SplitButton data element prop", () => {
      CypressMountWithProviders(
        <SplitButtonList data-element="split-button-cypress-element" />
      );

      splitMainButton().should(
        "have.attr",
        "data-element",
        "split-button-cypress-element"
      );
    });

    it("should check SplitButton data role prop", () => {
      CypressMountWithProviders(
        <SplitButtonList data-role="split-button-cypress-role" />
      );

      splitMainButton().should(
        "have.attr",
        "data-role",
        "split-button-cypress-role"
      );
    });

    it.each(["left", "right"])(
      "should align the SplitButton to the %s",
      (alignment) => {
        CypressMountWithProviders(<SplitButtonList align={alignment} />);

        splitMainButton().should("have.css", `margin-${alignment}`);
      }
    );

    it("should check SplitButton is disabled", () => {
      CypressMountWithProviders(<SplitButtonList disabled />);

      mainButton().trigger("mouseover", { force: true });
      splitMainButton()
        .children()
        .should("be.disabled")
        .and("have.attr", "disabled");
    });

    it.each([
      ["after", "left"],
      ["before", "right"],
    ])(
      "should set position to %s for icon in a SplitButton",
      (iconPosition, margin) => {
        CypressMountWithProviders(
          <SplitButtonList iconType="add" iconPosition={iconPosition}>
            IconPosition
          </SplitButtonList>
        );

        icon().should("have.css", `margin-${margin}`, "8px");
      }
    );

    it("should invoke SplitButton component and expands", () => {
      CypressMountWithProviders(<SplitButtonList />);

      getDataElementByValue("dropdown").trigger("mouseover");
      additionalButton(0).should("be.visible");
      additionalButton(1).should("be.visible");
      additionalButton(2).should("be.visible");
      splitToggleButton().should("have.attr", "aria-expanded", "true");
    });

    it("should click a main element of SplitButton component", () => {
      const callback = cy.stub();

      CypressMountWithProviders(<SplitButtonList onClick={callback} />);

      splitMainButtonDataComponent(positionOfElement("first"))
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.called;
        });
    });

    it("should invoke SplitButton component in a hidden container", () => {
      CypressMountWithProviders(
        <Accordion title="Heading">
          <SplitButtonList />
        </Accordion>
      );

      accordionDefaultTitle()
        .trigger("keydown", keyCode("Enter"))
        .then(() => {
          getDataElementByValue("dropdown").trigger("mouseover");
          additionalButton(0).should("be.visible");
          additionalButton(1).should("be.visible");
          additionalButton(2).should("be.visible");
          splitToggleButton().should("have.attr", "aria-expanded", "true");
        });
    });
  });

  describe("clicking the toggle button", () => {
    it("should open the additional buttons", () => {
      CypressMountWithProviders(<SplitButtonList />);

      splitToggleButton()
        .eq(0)
        .trigger("click")
        .then(() => {
          additionalButton(0).should("be.visible");
          additionalButton(1).should("be.visible");
          additionalButton(2).should("be.visible");
        });
    });
  });

  describe("pressing tab while SplitButton is open", () => {
    it("should move focus to next child button and to second SplitButton when end of list reached", () => {
      CypressMountWithProviders(
        <>
          <SplitButtonList />
          <SplitButtonList />
        </>
      );

      splitToggleButton()
        .eq(0)
        .trigger("mouseover")
        .then(() => {
          additionalButton(1).focus();
          splitToggleButton().eq(0).tab();
          additionalButton(2).should("be.focused");
          splitToggleButton().eq(0).tab();
          mainButton(1).should("be.focused");
        });
    });
  });

  describe("pressing ArrowDown while SplitButton is open", () => {
    it("should move focus to next child button and should not loop when last child is focused", () => {
      CypressMountWithProviders(
        <>
          <SplitButtonList />
          <SplitButtonList />
        </>
      );

      splitToggleButton()
        .eq(0)
        .trigger("mouseover")
        .then(() => {
          additionalButton(0).focus();
          additionalButtonsContainer()
            .eq(0)
            .trigger("keydown", keyCode("downarrow"));
          additionalButton(1).should("be.focused");
          additionalButtonsContainer()
            .eq(0)
            .trigger("keydown", keyCode("downarrow"));
          additionalButton(2).should("be.focused");
          additionalButtonsContainer()
            .eq(0)
            .trigger("keydown", keyCode("downarrow"));
          additionalButton(2).should("be.focused");
        });
    });
  });

  describe("pressing shift and tab while SplitButton is open", () => {
    it("should move focus to previous child button and to main button when start of list reached", () => {
      CypressMountWithProviders(
        <>
          <SplitButtonList />
          <SplitButtonList />
        </>
      );

      splitToggleButton()
        .eq(0)
        .trigger("mouseover")
        .then(() => {
          additionalButton(1).focus();
          splitToggleButton().eq(0).tab({ shift: true });
          additionalButton(0).should("be.focused");
          splitToggleButton().eq(0).tab({ shift: true });
          splitToggleButton().eq(0).should("be.focused");
        });
    });
  });

  describe("pressing ArrowUp while SplitButton is open", () => {
    it("should move focus to previous child button and should not loop when first child is focused", () => {
      CypressMountWithProviders(
        <>
          <SplitButtonList />
          <SplitButtonList />
        </>
      );

      splitToggleButton()
        .eq(0)
        .trigger("mouseover")
        .then(() => {
          additionalButton(2).focus();
          additionalButtonsContainer()
            .eq(0)
            .trigger("keydown", keyCode("uparrow"));
          additionalButton(1).should("be.focused");
          additionalButtonsContainer()
            .eq(0)
            .trigger("keydown", keyCode("uparrow"));
          additionalButton(0).should("be.focused");
          additionalButtonsContainer()
            .eq(0)
            .trigger("keydown", keyCode("uparrow"));
          additionalButton(0).should("be.focused");
        });
    });
  });

  describe("pressing metaKey + ArrowUp while SplitButton is open", () => {
    it("should move focus to first child button", () => {
      CypressMountWithProviders(
        <>
          <SplitButtonList />
          <SplitButtonList />
        </>
      );

      splitToggleButton()
        .eq(0)
        .trigger("mouseover")
        .then(() => {
          additionalButton(2).focus();
          additionalButtonsContainer()
            .eq(0)
            .trigger("keydown", { metaKey: true, key: "ArrowUp" });
          additionalButton(0).should("be.focused");
        });
    });
  });

  describe("pressing ctrlKey + ArrowUp while SplitButton is open", () => {
    it("should move focus to first child button", () => {
      CypressMountWithProviders(
        <>
          <SplitButtonList />
          <SplitButtonList />
        </>
      );

      splitToggleButton()
        .eq(0)
        .trigger("mouseover")
        .then(() => {
          additionalButton(2).focus();
          additionalButtonsContainer()
            .eq(0)
            .trigger("keydown", { ctrlKey: true, key: "ArrowUp" });
          additionalButton(0).should("be.focused");
        });
    });
  });

  describe("pressing Home while SplitButton is open", () => {
    it("should move focus to first child button", () => {
      CypressMountWithProviders(
        <>
          <SplitButtonList />
          <SplitButtonList />
        </>
      );

      splitToggleButton()
        .eq(0)
        .trigger("mouseover")
        .then(() => {
          additionalButton(2).focus();
          additionalButtonsContainer()
            .eq(0)
            .trigger("keydown", keyCode("Home"));
          additionalButton(0).should("be.focused");
        });
    });
  });

  describe("pressing metaKey + ArrowDown while SplitButton is open", () => {
    it("should move focus to last child button", () => {
      CypressMountWithProviders(
        <>
          <SplitButtonList />
          <SplitButtonList />
        </>
      );

      splitToggleButton()
        .eq(0)
        .trigger("mouseover")
        .then(() => {
          additionalButton(0).focus();
          additionalButtonsContainer()
            .eq(0)
            .trigger("keydown", { metaKey: true, key: "ArrowDown" });
          additionalButton(2).should("be.focused");
        });
    });
  });

  describe("pressing ctrlKey + ArrowDown while SplitButton is open", () => {
    it("should move focus to last child button", () => {
      CypressMountWithProviders(
        <>
          <SplitButtonList />
          <SplitButtonList />
        </>
      );

      splitToggleButton()
        .eq(0)
        .trigger("mouseover")
        .then(() => {
          additionalButton(0).focus();
          additionalButtonsContainer()
            .eq(0)
            .trigger("keydown", { ctrlKey: true, key: "ArrowDown" });
          additionalButton(2).should("be.focused");
        });
    });
  });

  describe("pressing End while SplitButton is open", () => {
    it("should move focus to last child button", () => {
      CypressMountWithProviders(
        <>
          <SplitButtonList />
          <SplitButtonList />
        </>
      );

      splitToggleButton()
        .eq(0)
        .trigger("mouseover")
        .then(() => {
          additionalButton(0).focus();
          additionalButtonsContainer().eq(0).trigger("keydown", keyCode("End"));
          additionalButton(2).should("be.focused");
        });
    });
  });

  describe("clicking one of the additional buttons", () => {
    it("should close SplitButton", () => {
      CypressMountWithProviders(<SplitButtonList />);

      splitToggleButton()
        .eq(0)
        .click()
        .then(() => {
          additionalButton(0).click();

          additionalButtonsContainer().should("not.exist");
        });
    });
  });

  describe("Pressing esc while SplitButton is open", () => {
    it("should close SplitButton", () => {
      CypressMountWithProviders(<SplitButtonList />);

      splitToggleButton().eq(0).click();
      additionalButton(1).focus();
      splitToggleButton().eq(0).type("{esc}");
      additionalButtonsContainer().should("not.exist");
    });
  });

  describe.each(["Enter", "Space", "downarrow", "uparrow"])(
    "pressing %s key on the main button",
    (key) => {
      it("opens SplitButton list and focuses first button", () => {
        CypressMountWithProviders(<SplitButtonList />);

        splitToggleButton()
          .eq(0)
          .trigger("keydown", keyCode(key))
          .then(() => {
            additionalButton(0).should("be.focused");
          });
      });
    }
  );
  // https://github.com/cypress-io/cypress/issues/21511
  describe("should check colors for SplitButton component", () => {
    it.each([
      ["primary", "rgb(0, 126, 69)", "rgb(255, 255, 255)", "rgba(0, 0, 0, 0)"],
      ["secondary", "rgba(0, 0, 0, 0)", "rgb(0, 126, 69)", "rgb(0, 126, 69)"],
    ])(
      "check %s type of SplitButton uses %s as background color and %s as color and %s as border color",
      (buttonType, backgroundColor, color, borderColor) => {
        CypressMountWithProviders(<SplitButtonList buttonType={buttonType} />);

        mainButton().as("button");

        cy.get("@button").should(
          "have.css",
          "background-color",
          backgroundColor
        );
        cy.get("@button").should("have.css", "color", color);
        cy.get("@button").should("have.css", "border-color", borderColor);
      }
    );
  });

  describe("when SplitButton is nested inside of a Dialog component", () => {
    it("should not close the Dialog when SplitButton is closed by pressing an escape key", () => {
      CypressMountWithProviders(<SplitButtonNestedInDialog />);

      splitToggleButton().eq(0).click();
      additionalButtonsContainer().should("exist");

      additionalButton(1).focus();
      splitToggleButton().eq(0).type("{esc}");
      additionalButtonsContainer().should("not.exist");
      alertDialogPreview().should("exist");

      splitToggleButton().eq(0).type("{esc}");
      alertDialogPreview().should("not.exist");
    });
  });

  it("should have the expected border radius and focus styling on main and toggle buttons", () => {
    CypressMountWithProviders(<SplitButtonList />);
    mainButton().should("have.css", "border-radius", "32px 0px 0px 32px");
    mainButton()
      .focus()
      .should("have.css", "border", "3px solid rgb(255, 181, 0)");
    splitToggleButton().should(
      "have.css",
      "border-radius",
      "0px 32px 32px 0px"
    );
    splitToggleButton()
      .focus()
      .should("have.css", "border", "3px solid rgb(255, 181, 0)");
  });

  it("should have the expected border radius on children container and buttons", () => {
    CypressMountWithProviders(<SplitButtonList />);

    splitToggleButton().eq(0).click();
    additionalButtonsContainer().should("have.css", "border-radius", "8px");
    additionalButton(0).should("have.css", "border-radius", "8px 8px 0px 0px");
    additionalButton(1).should("have.css", "border-radius", "0px");
    additionalButton(2).should("have.css", "border-radius", "0px 0px 8px 8px");
  });

  it("should have the expected border radius when some children buttons have href prop", () => {
    CypressMountWithProviders(
      <SplitButton text="default text">
        <Button href="#">Button 1</Button>
        <Button>Button 2</Button>
        <Button href="#">Button 3</Button>
      </SplitButton>
    );

    splitToggleButton().eq(0).click();
    additionalButton(0).should("have.css", "border-radius", "8px 8px 0px 0px");
    additionalButton(1).should("have.css", "border-radius", "0px");
    additionalButton(2).should("have.css", "border-radius", "0px 0px 8px 8px");
  });

  it("should have the expected border radius when there is only on one child button", () => {
    CypressMountWithProviders(
      <SplitButton text="default text">
        <Button>Button 1</Button>
      </SplitButton>
    );

    splitToggleButton().eq(0).click();
    additionalButton(0).should("have.css", "border-radius", "8px");
  });
});

describe("check accessibility for SplitButton component", () => {
  it("should pass accessibility tests for SplitButton Default story", () => {
    CypressMountWithProviders(<stories.Default />);

    cy.checkAccessibility();
  });

  it("should pass accessibility tests for SplitButton Default story when the additional buttons are opened", () => {
    CypressMountWithProviders(<stories.Default />);

    splitToggleButton().eq(0).trigger("click");

    cy.checkAccessibility();
  });

  it("should pass accessibility tests for SplitButton Disabled story", () => {
    CypressMountWithProviders(<stories.Disabled />);

    cy.checkAccessibility();
  });

  it("should pass accessibility tests for SplitButton ButtonTypes story", () => {
    CypressMountWithProviders(<stories.ButtonTypes />);

    cy.checkAccessibility();
  });

  it("should pass accessibility tests for SplitButton ButtonTypes story Primary type", () => {
    CypressMountWithProviders(<stories.ButtonTypes />);

    splitToggleButton().eq(0).trigger("click");

    cy.checkAccessibility();
  });

  it("should pass accessibility tests for SplitButton ButtonTypes story Primary type hover main button", () => {
    CypressMountWithProviders(<stories.ButtonTypes />);

    splitMainButtonDataComponent(positionOfElement("first")).realHover();

    cy.checkAccessibility();

    // to reset hover()
    cyRoot().realHover({ position: "topLeft" });
  });

  it("should pass accessibility tests for SplitButton ButtonTypes story Primary type hover additional button", () => {
    CypressMountWithProviders(<stories.ButtonTypes />);

    splitToggleButton().eq(0).realHover();

    cy.checkAccessibility();

    // to reset hover()
    cyRoot().realHover({ position: "topLeft" });
  });

  it("should pass accessibility tests for SplitButton ButtonTypes story Secondary type hover main button", () => {
    CypressMountWithProviders(<stories.ButtonTypes />);

    splitMainButtonDataComponent(positionOfElement("third")).realHover();

    cy.checkAccessibility();

    // to reset hover()
    cyRoot().realHover({ position: "topLeft" });
  });

  it("should pass accessibility tests for SplitButton ButtonTypes story Secondary type hover additional button", () => {
    CypressMountWithProviders(<stories.ButtonTypes />);

    splitToggleButton().eq(1).realHover();

    cy.checkAccessibility();

    // to reset hover()
    cyRoot().realHover({ position: "topLeft" });
  });

  it("should pass accessibility tests for SplitButton Sizes story", () => {
    CypressMountWithProviders(<stories.Sizes />);

    cy.checkAccessibility();
  });

  it("should pass accessibility tests for SplitButton Align story", () => {
    CypressMountWithProviders(<stories.Align />);

    cy.checkAccessibility();
  });

  it("should pass accessibility tests for SplitButton Subtext story", () => {
    CypressMountWithProviders(<stories.Subtext />);

    cy.checkAccessibility();
  });

  it("should pass accessibility tests for SplitButton WithIcon story", () => {
    CypressMountWithProviders(<stories.WithIcon />);

    cy.checkAccessibility();
  });

  it("should pass accessibility tests for SplitButton InOverflowHiddenContainer story", () => {
    CypressMountWithProviders(<stories.InOverflowHiddenContainer />);

    accordionDefaultTitle().click();
    splitToggleButton().eq(0).trigger("click");

    cy.checkAccessibility();
  });
});
