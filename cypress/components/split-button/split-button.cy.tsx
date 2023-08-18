import React from "react";
import {
  SplitButtonList,
  SplitButtonNestedInDialog,
  WithWrapper,
} from "../../../src/components/split-button/split-button-test.stories";
import { Accordion } from "../../../src/components/accordion";
import SplitButton, {
  SplitButtonProps,
} from "../../../src/components/split-button";
import Button from "../../../src/components/button";
import Box from "../../../src/components/box";
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
const keyToTrigger = ["Enter", "Space", "downarrow", "uparrow"] as const;

context("Tests for SplitButton component", () => {
  describe("when focused", () => {
    it("should have the expected styling when the focusRedesignOptOut is false", () => {
      CypressMountWithProviders(<SplitButtonList />);
      mainButton()
        .focus()
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        )
        .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");
      splitToggleButton()
        .focus()
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        )
        .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");
    });

    it("should have the expected styling when the focusRedesignOptOut is true", () => {
      CypressMountWithProviders(<SplitButtonList />, undefined, undefined, {
        focusRedesignOptOut: true,
      });
      mainButton()
        .focus()
        .should("have.css", "border", "3px solid rgb(255, 188, 25)");
      splitToggleButton()
        .focus()
        .should("have.css", "border", "3px solid rgb(255, 188, 25)");
    });
  });

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

    it.each(["left", "right"] as SplitButtonProps["align"][])(
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
    ] as [SplitButtonProps["iconPosition"], string][])(
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
      const callback: SplitButtonProps["onClick"] = cy.stub().as("onClick");

      CypressMountWithProviders(<SplitButtonList onClick={callback} />);

      splitMainButtonDataComponent(positionOfElement("first")).click();
      cy.get("@onClick").should("have.been.called");
    });

    it("should invoke SplitButton component in a hidden container", () => {
      CypressMountWithProviders(
        <Accordion title="Heading">
          <SplitButtonList />
        </Accordion>
      );

      accordionDefaultTitle().trigger("keydown", keyCode("Enter"));
      getDataElementByValue("dropdown").trigger("mouseover");
      additionalButton(0).should("be.visible");
      additionalButton(1).should("be.visible");
      additionalButton(2).should("be.visible");
      splitToggleButton().should("have.attr", "aria-expanded", "true");
    });
  });

  describe("user interactions with SplitButton", () => {
    describe("clicking the toggle button", () => {
      it("should open the additional buttons", () => {
        CypressMountWithProviders(<SplitButtonList />);

        splitToggleButton().eq(0).trigger("click");
        additionalButton(0).should("be.visible");
        additionalButton(1).should("be.visible");
        additionalButton(2).should("be.visible");
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

        splitToggleButton().eq(0).trigger("mouseover");
        additionalButton(1).focus();
        splitToggleButton().eq(0).tab();
        additionalButton(2).should("be.focused");
        splitToggleButton().eq(0).tab();
        mainButton().should("be.focused");
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

        splitToggleButton().eq(0).trigger("mouseover");
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

    describe("pressing shift and tab while SplitButton is open", () => {
      it("should move focus to previous child button and to main button when start of list reached", () => {
        CypressMountWithProviders(
          <>
            <SplitButtonList />
            <SplitButtonList />
          </>
        );

        splitToggleButton().eq(0).trigger("mouseover");
        additionalButton(1).focus();
        splitToggleButton().eq(0).tab({ shift: true });
        additionalButton(0).should("be.focused");
        splitToggleButton().eq(0).tab({ shift: true });
        splitToggleButton().eq(0).should("be.focused");
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

        splitToggleButton().eq(0).trigger("mouseover");
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

    describe("pressing metaKey + ArrowUp while SplitButton is open", () => {
      it("should move focus to first child button", () => {
        CypressMountWithProviders(
          <>
            <SplitButtonList />
            <SplitButtonList />
          </>
        );

        splitToggleButton().eq(0).trigger("mouseover");
        additionalButton(2).focus();
        additionalButtonsContainer()
          .eq(0)
          .trigger("keydown", { metaKey: true, key: "ArrowUp" });
        additionalButton(0).should("be.focused");
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

        splitToggleButton().eq(0).trigger("mouseover");
        additionalButton(2).focus();
        additionalButtonsContainer()
          .eq(0)
          .trigger("keydown", { ctrlKey: true, key: "ArrowUp" });
        additionalButton(0).should("be.focused");
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

        splitToggleButton().eq(0).trigger("mouseover");
        additionalButton(2).focus();
        additionalButtonsContainer().eq(0).trigger("keydown", keyCode("Home"));
        additionalButton(0).should("be.focused");
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

        splitToggleButton().eq(0).trigger("mouseover");
        additionalButton(0).focus();
        additionalButtonsContainer()
          .eq(0)
          .trigger("keydown", { metaKey: true, key: "ArrowDown" });
        additionalButton(2).should("be.focused");
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

        splitToggleButton().eq(0).trigger("mouseover");
        additionalButton(0).focus();
        additionalButtonsContainer()
          .eq(0)
          .trigger("keydown", { ctrlKey: true, key: "ArrowDown" });
        additionalButton(2).should("be.focused");
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

        splitToggleButton().eq(0).trigger("mouseover");
        additionalButton(0).focus();
        additionalButtonsContainer().eq(0).trigger("keydown", keyCode("End"));
        additionalButton(2).should("be.focused");
      });
    });

    describe("clicking one of the additional buttons", () => {
      it("should close SplitButton", () => {
        CypressMountWithProviders(<SplitButtonList />);

        splitToggleButton().eq(0).click();
        additionalButton(0).click();
        additionalButtonsContainer().should("not.exist");
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
  });

  describe("user interactions with SplitButton when wrapping the child buttons in a custom component", () => {
    describe("clicking the toggle button", () => {
      it("should open the additional buttons", () => {
        CypressMountWithProviders(<WithWrapper />);

        splitToggleButton().eq(0).trigger("click");
        additionalButton(0).should("be.visible");
        additionalButton(1).should("be.visible");
        additionalButton(2).should("be.visible");
      });
    });

    describe("pressing tab while SplitButton is open", () => {
      it("should move focus to next child button and to second SplitButton when end of list reached", () => {
        CypressMountWithProviders(
          <>
            <WithWrapper />
            <WithWrapper />
          </>
        );

        splitToggleButton().eq(0).trigger("mouseover");
        additionalButton(1).focus();
        splitToggleButton().eq(0).tab();
        additionalButton(2).should("be.focused");
        splitToggleButton().eq(0).tab();
        mainButton().should("be.focused");
      });
    });

    describe("pressing ArrowDown while SplitButton is open", () => {
      it("should move focus to next child button and should not loop when last child is focused", () => {
        CypressMountWithProviders(
          <>
            <WithWrapper />
            <WithWrapper />
          </>
        );

        splitToggleButton().eq(0).trigger("mouseover");
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

    describe("pressing shift and tab while SplitButton is open", () => {
      it("should move focus to previous child button and to main button when start of list reached", () => {
        CypressMountWithProviders(
          <>
            <WithWrapper />
            <WithWrapper />
          </>
        );

        splitToggleButton().eq(0).trigger("mouseover");
        additionalButton(1).focus();
        splitToggleButton().eq(0).tab({ shift: true });
        additionalButton(0).should("be.focused");
        splitToggleButton().eq(0).tab({ shift: true });
        splitToggleButton().eq(0).should("be.focused");
      });
    });

    describe("pressing ArrowUp while SplitButton is open", () => {
      it("should move focus to previous child button and should not loop when first child is focused", () => {
        CypressMountWithProviders(
          <>
            <WithWrapper />
            <WithWrapper />
          </>
        );

        splitToggleButton().eq(0).trigger("mouseover");
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

    describe("pressing metaKey + ArrowUp while SplitButton is open", () => {
      it("should move focus to first child button", () => {
        CypressMountWithProviders(
          <>
            <WithWrapper />
            <WithWrapper />
          </>
        );

        splitToggleButton().eq(0).trigger("mouseover");
        additionalButton(2).focus();
        additionalButtonsContainer()
          .eq(0)
          .trigger("keydown", { metaKey: true, key: "ArrowUp" });
        additionalButton(0).should("be.focused");
      });
    });

    describe("pressing ctrlKey + ArrowUp while SplitButton is open", () => {
      it("should move focus to first child button", () => {
        CypressMountWithProviders(
          <>
            <WithWrapper />
            <WithWrapper />
          </>
        );

        splitToggleButton().eq(0).trigger("mouseover");
        additionalButton(2).focus();
        additionalButtonsContainer()
          .eq(0)
          .trigger("keydown", { ctrlKey: true, key: "ArrowUp" });
        additionalButton(0).should("be.focused");
      });
    });

    describe("pressing Home while SplitButton is open", () => {
      it("should move focus to first child button", () => {
        CypressMountWithProviders(
          <>
            <WithWrapper />
            <WithWrapper />
          </>
        );

        splitToggleButton().eq(0).trigger("mouseover");
        additionalButton(2).focus();
        additionalButtonsContainer().eq(0).trigger("keydown", keyCode("Home"));
        additionalButton(0).should("be.focused");
      });
    });

    describe("pressing metaKey + ArrowDown while SplitButton is open", () => {
      it("should move focus to last child button", () => {
        CypressMountWithProviders(
          <>
            <WithWrapper />
            <WithWrapper />
          </>
        );

        splitToggleButton().eq(0).trigger("mouseover");
        additionalButton(0).focus();
        additionalButtonsContainer()
          .eq(0)
          .trigger("keydown", { metaKey: true, key: "ArrowDown" });
        additionalButton(2).should("be.focused");
      });
    });

    describe("pressing ctrlKey + ArrowDown while SplitButton is open", () => {
      it("should move focus to last child button", () => {
        CypressMountWithProviders(
          <>
            <WithWrapper />
            <WithWrapper />
          </>
        );

        splitToggleButton().eq(0).trigger("mouseover");
        additionalButton(0).focus();
        additionalButtonsContainer()
          .eq(0)
          .trigger("keydown", { ctrlKey: true, key: "ArrowDown" });
        additionalButton(2).should("be.focused");
      });
    });

    describe("pressing End while SplitButton is open", () => {
      it("should move focus to last child button", () => {
        CypressMountWithProviders(
          <>
            <WithWrapper />
            <WithWrapper />
          </>
        );

        splitToggleButton().eq(0).trigger("mouseover");
        additionalButton(0).focus();
        additionalButtonsContainer().eq(0).trigger("keydown", keyCode("End"));
        additionalButton(2).should("be.focused");
      });
    });

    describe("clicking one of the additional buttons", () => {
      it("should close SplitButton", () => {
        CypressMountWithProviders(<WithWrapper />);

        splitToggleButton().eq(0).click();
        additionalButton(0).click();
        additionalButtonsContainer().should("not.exist");
      });
    });

    describe("Pressing esc while SplitButton is open", () => {
      it("should close SplitButton", () => {
        CypressMountWithProviders(<WithWrapper />);

        splitToggleButton().eq(0).click();
        additionalButton(1).focus();
        splitToggleButton().eq(0).type("{esc}");
        additionalButtonsContainer().should("not.exist");
      });
    });
  });

  describe.each([...keyToTrigger])(
    "pressing %s key on the main button",
    (key) => {
      it("opens SplitButton list and focuses first button", () => {
        CypressMountWithProviders(<SplitButtonList />);

        splitToggleButton().eq(0).trigger("keydown", keyCode(key));
        additionalButton(0).should("be.focused");
      });
    }
  );

  describe("should check colors for SplitButton component", () => {
    it.each([
      ["primary", "rgb(0, 126, 69)", "rgb(255, 255, 255)", "rgba(0, 0, 0, 0)"],
      ["secondary", "rgba(0, 0, 0, 0)", "rgb(0, 126, 69)", "rgb(0, 126, 69)"],
    ] as [SplitButtonProps["buttonType"], string, string, string][])(
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

  describe("SplitButton border radius tests", () => {
    it("should have the expected border radius on main and toggle buttons", () => {
      CypressMountWithProviders(<SplitButtonList />);
      mainButton().should("have.css", "border-radius", "32px 0px 0px 32px");
      splitToggleButton().should(
        "have.css",
        "border-radius",
        "0px 32px 32px 0px"
      );
    });

    it("should have the expected border radius on children container and buttons", () => {
      CypressMountWithProviders(<SplitButtonList />);

      splitToggleButton().eq(0).click();
      additionalButtonsContainer().should("have.css", "border-radius", "8px");
      additionalButton(0).should(
        "have.css",
        "border-radius",
        "8px 8px 0px 0px"
      );
      additionalButton(1).should("have.css", "border-radius", "0px");
      additionalButton(2).should(
        "have.css",
        "border-radius",
        "0px 0px 8px 8px"
      );
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
      additionalButton(0).should(
        "have.css",
        "border-radius",
        "8px 8px 0px 0px"
      );
      additionalButton(1).should("have.css", "border-radius", "0px");
      additionalButton(2).should(
        "have.css",
        "border-radius",
        "0px 0px 8px 8px"
      );
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
      CypressMountWithProviders(<SplitButtonList />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for SplitButton Default story when the additional buttons are opened", () => {
      CypressMountWithProviders(<SplitButtonList />);

      splitToggleButton().eq(0).trigger("click");

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for SplitButton Disabled story", () => {
      CypressMountWithProviders(<SplitButtonList disabled />);

      cy.checkAccessibility();
    });

    it.each(["primary", "secondary"] as SplitButtonProps["buttonType"][])(
      "should pass accessibility tests for SplitButton ButtonTypes story",
      (buttonType) => {
        CypressMountWithProviders(<SplitButtonList buttonType={buttonType} />);

        cy.checkAccessibility();
      }
    );

    it.each(["primary", "secondary"] as SplitButtonProps["buttonType"][])(
      "should pass accessibility tests for SplitButton ButtonTypes story %s type",
      (buttonType) => {
        CypressMountWithProviders(<SplitButtonList buttonType={buttonType} />);

        splitToggleButton().eq(0).trigger("click");

        cy.checkAccessibility();
      }
    );

    it.each(["primary", "secondary"] as SplitButtonProps["buttonType"][])(
      "should pass accessibility tests for SplitButton ButtonTypes story %s type hover main button",
      (buttonType) => {
        CypressMountWithProviders(<SplitButtonList buttonType={buttonType} />);

        splitMainButtonDataComponent(positionOfElement("first")).realHover();

        cy.checkAccessibility();

        // to reset hover()
        cyRoot().realHover({ position: "topLeft" });
      }
    );

    it.each(["primary", "secondary"] as SplitButtonProps["buttonType"][])(
      "should pass accessibility tests for SplitButton ButtonTypes story %s type hover additional button",
      (buttonType) => {
        CypressMountWithProviders(<SplitButtonList buttonType={buttonType} />);

        splitToggleButton().eq(0).realHover();

        cy.checkAccessibility();

        // to reset hover()
        cyRoot().realHover({ position: "topLeft" });
      }
    );

    it.each(["small", "medium", "large"] as SplitButtonProps["size"][])(
      "should pass accessibility tests for SplitButton Sizes story",
      (size) => {
        CypressMountWithProviders(<SplitButtonList size={size} />);

        cy.checkAccessibility();
      }
    );

    it.each(["left", "right"] as SplitButtonProps["align"][])(
      "should pass accessibility tests for SplitButton Align story",
      (alignment) => {
        CypressMountWithProviders(<SplitButtonList align={alignment} />);

        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should pass accessibility tests for SplitButton Subtext story",
      (subtext) => {
        CypressMountWithProviders(
          <SplitButtonList size="large" subtext={subtext} />
        );

        cy.checkAccessibility();
      }
    );

    it.each(["after", "before"] as SplitButtonProps["iconPosition"][])(
      "should pass accessibility tests for SplitButton WithIcon story",
      (iconPosition) => {
        CypressMountWithProviders(
          <SplitButtonList iconType="add" iconPosition={iconPosition}>
            IconPosition
          </SplitButtonList>
        );

        cy.checkAccessibility();
      }
    );

    it("should pass accessibility tests for SplitButton InOverflowHiddenContainer story", () => {
      CypressMountWithProviders(
        <Accordion title="Heading">
          <Box p={4}>
            <SplitButton size="large" subtext="subtext" text="Split button">
              <Button size="large">Button 1</Button>
              <Button size="large">Button 2</Button>
              <Button size="large">Button 3</Button>
            </SplitButton>
          </Box>
        </Accordion>
      );

      accordionDefaultTitle().click();
      splitToggleButton().eq(0).trigger("click");

      cy.checkAccessibility();
    });
  });
});
