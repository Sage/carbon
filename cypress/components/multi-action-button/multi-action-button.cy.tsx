import React from "react";
import { MultiActionButtonProps } from "components/multi-action-button";
import {
  MultiActionButtonList,
  MultiActionButtonWithOneChild,
  MultiActionNestedInDialog,
  MultiActionWithHrefChildren,
  WithWrapper,
} from "../../../src/components/multi-action-button/multi-action-button-test.stories";
import { Accordion } from "../../../src/components/accordion/accordion.component";
import * as stories from "../../../src/components/multi-action-button/multi-action-button.stories";

import { buttonSubtextPreview } from "../../locators/button";
import { keyCode } from "../../support/helper";
import {
  multiActionButtonList,
  multiActionButtonListContainer,
  multiActionButtonText,
  multiActionButton,
  multiActionButtonComponent,
} from "../../locators/multi-action-button";
import { accordionDefaultTitle } from "../../locators/accordion";
import { alertDialogPreview } from "../../locators/dialog";
import { SIZE, CHARACTERS } from "../../support/component-helper/constants";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { assertCssValueIsApproximately } from "../../support/component-helper/common-steps";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const keysToTrigger = ["Enter", "Space", "downarrow"] as const;

context("Tests for MultiActionButton component", () => {
  describe("when focused", () => {
    it("should have the expected styling when the focusRedesignOptOut is false", () => {
      CypressMountWithProviders(<MultiActionButtonList />);

      multiActionButton()
        .eq(0)
        .focus()
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        );
    });

    it("should have the expected styling when the focusRedesignOptOut is true", () => {
      CypressMountWithProviders(
        <MultiActionButtonList />,
        undefined,
        undefined,
        {
          focusRedesignOptOut: true,
        }
      );
      multiActionButton()
        .eq(0)
        .focus()
        .should("have.css", "border", "3px solid rgb(255, 188, 25)");
    });
  });

  describe("check props for MultiActionButton component", () => {
    it.each(testData)(
      "should render Multi Action Button text using %s as special characters",
      (text) => {
        CypressMountWithProviders(<MultiActionButtonList text={text} />);

        multiActionButtonText().should("have.text", text);
      }
    );

    it("should check Multi Action Button data element prop", () => {
      CypressMountWithProviders(
        <MultiActionButtonList data-element="multi-action-button-cypress-element" />
      );

      multiActionButtonComponent().should(
        "have.attr",
        "data-element",
        "multi-action-button-cypress-element"
      );
    });

    it("should check Multi Action Button data role prop", () => {
      CypressMountWithProviders(
        <MultiActionButtonList data-role="multi-action-button-cypress-role" />
      );

      multiActionButtonComponent().should(
        "have.attr",
        "data-role",
        "multi-action-button-cypress-role"
      );
    });

    it.each(testData)(
      "should render Multi Action Button subtext with %s as special characters",
      (subtext) => {
        CypressMountWithProviders(
          <MultiActionButtonList size="large" subtext={subtext} />
        );

        buttonSubtextPreview().should("have.text", subtext);
      }
    );

    it.each([
      [SIZE.SMALL, 32],
      [SIZE.MEDIUM, 40],
      [SIZE.LARGE, 48],
    ] as [MultiActionButtonProps["size"], number][])(
      "should render Multi Action Button with %s size",
      (size, height) => {
        CypressMountWithProviders(<MultiActionButtonList size={size} />);

        multiActionButtonComponent().then(($el) => {
          assertCssValueIsApproximately($el, "height", height);
        });
      }
    );

    it.each(["left", "right"] as MultiActionButtonProps["align"][])(
      "should align the button to the %s",
      (alignment) => {
        CypressMountWithProviders(<MultiActionButtonList align={alignment} />);

        multiActionButtonComponent().should("have.css", `margin-${alignment}`);
      }
    );

    it("should check Multi Action Button is disabled", () => {
      CypressMountWithProviders(
        <MultiActionButtonList disabled text="Multi Action Button" />
      );

      multiActionButtonComponent().trigger("mouseover", { force: true });
      multiActionButtonComponent()
        .children()
        .should("be.disabled")
        .and("have.attr", "disabled");
    });

    it("should invoke Multi Action Button component and expands and contains three items", () => {
      CypressMountWithProviders(<MultiActionButtonList />);

      multiActionButtonComponent().trigger("mouseover");
      multiActionButtonList()
        .eq(0)
        .should("have.text", "Example Button")
        .and("be.visible");
      multiActionButtonList()
        .eq(1)
        .should("have.text", "Example Button with long text")
        .and("be.visible");
      multiActionButtonList()
        .eq(2)
        .should("have.text", "Short")
        .and("be.visible");
    });

    it("should render Multi Action Button with specific background colour when hovering", () => {
      CypressMountWithProviders(<MultiActionButtonList />);

      multiActionButtonComponent().trigger("mouseover");
      multiActionButton().should(
        "have.css",
        "background-color",
        "rgb(0, 77, 42)"
      );
    });

    it("should invoke Multi Action Button component in a hidden container", () => {
      CypressMountWithProviders(
        <Accordion title="Heading">
          <MultiActionButtonList />
        </Accordion>
      );

      accordionDefaultTitle().trigger("keydown", keyCode("Enter"));
      multiActionButtonComponent().children().trigger("mouseover");
      multiActionButtonList()
        .eq(0)
        .should("have.text", "Example Button")
        .and("be.visible");
      multiActionButtonList()
        .eq(1)
        .should("have.text", "Example Button with long text")
        .and("be.visible");
      multiActionButtonList()
        .eq(2)
        .should("have.text", "Short")
        .and("be.visible");
    });

    it("when width is passed, should render Button with justify-content: space-between", () => {
      CypressMountWithProviders(<MultiActionButtonList width="70%" />);

      multiActionButton().should(
        "have.css",
        "justify-content",
        "space-between"
      );
    });

    it("when width is passed, should render Button parent with specified width (70% / 945px)", () => {
      CypressMountWithProviders(<MultiActionButtonList width="70%" />);

      multiActionButton().then(($el) => {
        assertCssValueIsApproximately($el, "width", 956);
      });
    });
  });

  describe("when nested inside of a Dialog component", () => {
    it("should not close the Dialog when Multi Action Button is closed by pressing an escape key", () => {
      CypressMountWithProviders(<MultiActionNestedInDialog />);
      multiActionButtonComponent().trigger("mouseover");
      multiActionButtonList()
        .eq(0)
        .should("have.text", "Example Button")
        .and("be.visible");

      multiActionButton().trigger("keyup", keyCode("Esc"));
      multiActionButtonListContainer().should("not.exist");
      alertDialogPreview().should("exist");

      multiActionButton().trigger("keyup", keyCode("Esc"));
      alertDialogPreview().should("not.exist");
    });
  });

  describe("user interactions with MultiActionutton", () => {
    describe("pressing ArrowUp while MultiActionButton is open", () => {
      it("should move focus to previous child button and should not loop to last button when first is focused", () => {
        CypressMountWithProviders(
          <>
            <MultiActionButtonList />
            <MultiActionButtonList />
          </>
        );

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(2).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("uparrow"));
        multiActionButtonList().eq(1).should("be.focused");
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("uparrow"));
        multiActionButtonList().eq(0).should("be.focused");
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("uparrow"));
        multiActionButtonList().eq(0).should("be.focused");
      });
    });

    describe("pressing shift and tab while MultiActionButton is open", () => {
      it("should move focus to previous child button and focus the main button when pressed and first button is focused", () => {
        CypressMountWithProviders(
          <>
            <MultiActionButtonList />
            <MultiActionButtonList />
          </>
        );

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(1).focus();
        multiActionButton().eq(0).tab({ shift: true });
        multiActionButtonList().eq(0).should("be.focused");
        multiActionButton().eq(0).tab({ shift: true });
        multiActionButton().eq(0).should("be.focused");
      });
    });

    describe("pressing ArrowDown while MultiActionButton is open", () => {
      it("should move focus to next child button and should not loop to first button when last is focused", () => {
        CypressMountWithProviders(
          <>
            <MultiActionButtonList />
            <MultiActionButtonList />
          </>
        );

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(0).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("downarrow"));
        multiActionButtonList().eq(1).should("be.focused");
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("downarrow"));
        multiActionButtonList().eq(2).should("be.focused");
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("downarrow"));
        multiActionButtonList().eq(2).should("be.focused");
      });
    });

    describe("pressing tab while MultiActionButton is open", () => {
      it("should move focus to next child button and to second MultiActionButton when end of list reached", () => {
        CypressMountWithProviders(
          <>
            <MultiActionButtonList />
            <MultiActionButtonList />
          </>
        );

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(1).focus();
        multiActionButton().eq(0).tab();
        multiActionButtonList().eq(2).should("be.focused");
        multiActionButton().eq(0).tab();
        multiActionButton().eq(1).should("be.focused");
      });
    });

    describe("pressing metaKey + ArrowUp while MultiActionButton is open", () => {
      it("should move focus to first child button", () => {
        CypressMountWithProviders(
          <>
            <MultiActionButtonList />
            <MultiActionButtonList />
          </>
        );

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(2).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", { metaKey: true, key: "ArrowUp" });
        multiActionButtonList().eq(0).should("be.focused");
      });
    });

    describe("pressing ctrlKey + ArrowUp while MultiActionButton is open", () => {
      it("should move focus to first child button", () => {
        CypressMountWithProviders(
          <>
            <MultiActionButtonList />
            <MultiActionButtonList />
          </>
        );

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(2).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", { ctrlKey: true, key: "ArrowUp" });
        multiActionButtonList().eq(0).should("be.focused");
      });
    });

    describe("pressing Home while MultiActionButton is open", () => {
      it("should move focus to first child button", () => {
        CypressMountWithProviders(
          <>
            <MultiActionButtonList />
            <MultiActionButtonList />
          </>
        );

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(2).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("Home"));
        multiActionButtonList().eq(0).should("be.focused");
      });
    });

    describe("pressing metaKey + ArrowDown while MultiActionButton is open", () => {
      it("should move focus to last child button", () => {
        CypressMountWithProviders(
          <>
            <MultiActionButtonList />
            <MultiActionButtonList />
          </>
        );

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(0).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", { metaKey: true, key: "ArrowDown" });
        multiActionButtonList().eq(2).should("be.focused");
      });
    });

    describe("pressing ctrlKey + ArrowDown while MultiActionButton is open", () => {
      it("should move focus to last child button", () => {
        CypressMountWithProviders(
          <>
            <MultiActionButtonList />
            <MultiActionButtonList />
          </>
        );

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(0).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", { ctrlKey: true, key: "ArrowDown" });
        multiActionButtonList().eq(2).should("be.focused");
      });
    });

    describe("pressing End while MultiActionButton is open", () => {
      it("should move focus to last child button", () => {
        CypressMountWithProviders(
          <>
            <MultiActionButtonList />
            <MultiActionButtonList />
          </>
        );

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(0).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("End"));
        multiActionButtonList().eq(2).should("be.focused");
      });
    });

    describe("pressing esc while MultiActionButton is open", () => {
      it("should close MultiActionButton", () => {
        CypressMountWithProviders(<MultiActionButtonList />);

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(1).focus();
        multiActionButtonComponent().type("{esc}");
        multiActionButtonListContainer().should("not.exist");
      });
    });

    describe("clicking one of the additional buttons", () => {
      it("should close MultiActionButton", () => {
        CypressMountWithProviders(<MultiActionButtonList />);

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(0).click();
        multiActionButtonListContainer().should("not.exist");
      });
    });
  });

  describe("user interactions with MultiActionutton when wrapping the child buttons in a custom component", () => {
    describe("pressing ArrowUp while MultiActionButton is open", () => {
      it("should move focus to previous child button and should not loop to last button when first is focused", () => {
        CypressMountWithProviders(
          <>
            <WithWrapper />
            <WithWrapper />
          </>
        );

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(2).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("uparrow"));
        multiActionButtonList().eq(1).should("be.focused");
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("uparrow"));
        multiActionButtonList().eq(0).should("be.focused");
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("uparrow"));
        multiActionButtonList().eq(0).should("be.focused");
      });
    });

    describe("pressing shift and tab while MultiActionButton is open", () => {
      it("should move focus to previous child button and focus the main button when pressed and first button is focused", () => {
        CypressMountWithProviders(
          <>
            <WithWrapper />
            <WithWrapper />
          </>
        );

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(1).focus();
        multiActionButton().eq(0).tab({ shift: true });
        multiActionButtonList().eq(0).should("be.focused");
        multiActionButton().eq(0).tab({ shift: true });
        multiActionButton().eq(0).should("be.focused");
      });
    });

    describe("pressing ArrowDown while MultiActionButton is open", () => {
      it("should move focus to next child button and should not loop to first button when last is focused", () => {
        CypressMountWithProviders(
          <>
            <WithWrapper />
            <WithWrapper />
          </>
        );

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(0).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("downarrow"));
        multiActionButtonList().eq(1).should("be.focused");
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("downarrow"));
        multiActionButtonList().eq(2).should("be.focused");
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("downarrow"));
        multiActionButtonList().eq(2).should("be.focused");
      });
    });

    describe("pressing tab while MultiActionButton is open", () => {
      it("should move focus to next child button and to second MultiActionButton when end of list reached", () => {
        CypressMountWithProviders(
          <>
            <WithWrapper />
            <WithWrapper />
          </>
        );

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(1).focus();
        multiActionButton().eq(0).tab();
        multiActionButtonList().eq(2).should("be.focused");
        multiActionButton().eq(0).tab();
        multiActionButton().eq(1).should("be.focused");
      });
    });

    describe("pressing metaKey + ArrowUp while MultiActionButton is open", () => {
      it("should move focus to first child button", () => {
        CypressMountWithProviders(
          <>
            <WithWrapper />
            <WithWrapper />
          </>
        );

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(2).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", { metaKey: true, key: "ArrowUp" });
        multiActionButtonList().eq(0).should("be.focused");
      });
    });

    describe("pressing ctrlKey + ArrowUp while MultiActionButton is open", () => {
      it("should move focus to first child button", () => {
        CypressMountWithProviders(
          <>
            <WithWrapper />
            <WithWrapper />
          </>
        );

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(2).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", { ctrlKey: true, key: "ArrowUp" });
        multiActionButtonList().eq(0).should("be.focused");
      });
    });

    describe("pressing Home while MultiActionButton is open", () => {
      it("should move focus to first child button", () => {
        CypressMountWithProviders(
          <>
            <WithWrapper />
            <WithWrapper />
          </>
        );

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(2).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("Home"));
        multiActionButtonList().eq(0).should("be.focused");
      });
    });

    describe("pressing metaKey + ArrowDown while MultiActionButton is open", () => {
      it("should move focus to last child button", () => {
        CypressMountWithProviders(
          <>
            <WithWrapper />
            <WithWrapper />
          </>
        );

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(0).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", { metaKey: true, key: "ArrowDown" });
        multiActionButtonList().eq(2).should("be.focused");
      });
    });

    describe("pressing ctrlKey + ArrowDown while MultiActionButton is open", () => {
      it("should move focus to last child button", () => {
        CypressMountWithProviders(
          <>
            <WithWrapper />
            <WithWrapper />
          </>
        );

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(0).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", { ctrlKey: true, key: "ArrowDown" });
        multiActionButtonList().eq(2).should("be.focused");
      });
    });

    describe("pressing End while MultiActionButton is open", () => {
      it("should move focus to last child button", () => {
        CypressMountWithProviders(
          <>
            <WithWrapper />
            <WithWrapper />
          </>
        );

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(0).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("End"));
        multiActionButtonList().eq(2).should("be.focused");
      });
    });

    describe("pressing esc while MultiActionButton is open", () => {
      it("should close MultiActionButton", () => {
        CypressMountWithProviders(<WithWrapper />);

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(1).focus();
        multiActionButtonComponent().type("{esc}");
        multiActionButtonListContainer().should("not.exist");
      });
    });

    describe("clicking one of the additional buttons", () => {
      it("should close MultiActionButton", () => {
        CypressMountWithProviders(<WithWrapper />);

        multiActionButton().eq(0).trigger("mouseover");
        multiActionButtonList().eq(0).click();
        multiActionButtonListContainer().should("not.exist");
      });
    });
  });

  describe.each([...keysToTrigger])(
    "pressing %s key on the main button",
    (key) => {
      it("opens MultiActionButton list and focuses first button", () => {
        CypressMountWithProviders(<MultiActionButtonList />);

        multiActionButton().eq(0).trigger("keydown", keyCode(key));
        multiActionButtonList().eq(0).should("be.focused");
      });
    }
  );

  describe("clicking the main button", () => {
    it("should open the additional buttons", () => {
      CypressMountWithProviders(<MultiActionButtonList />);

      multiActionButton().eq(0).trigger("click");
      multiActionButtonList().should("be.visible");
    });
  });

  describe("should check colors for MultiActionButton component", () => {
    it.each([
      ["primary", "rgb(0, 126, 69)", "rgb(255, 255, 255)", "rgba(0, 0, 0, 0)"],
      ["secondary", "rgba(0, 0, 0, 0)", "rgb(0, 126, 69)", "rgb(0, 126, 69)"],
      ["tertiary", "rgba(0, 0, 0, 0)", "rgb(0, 126, 69)", "rgba(0, 0, 0, 0)"],
    ] as [MultiActionButtonProps["buttonType"], string, string, string][])(
      "check %s type of Multi action button uses %s as background color and %s as color and %s as border color",
      (buttonType, backgroundColor, color, borderColor) => {
        CypressMountWithProviders(
          <MultiActionButtonList buttonType={buttonType} />
        );

        multiActionButtonComponent().children().as("button");

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

  describe("check accessibility for MultiActionButton component", () => {
    it("should pass accessibility tests for MultiActionButton", () => {
      CypressMountWithProviders(<MultiActionButtonList />);

      cy.checkAccessibility();
    });

    // TODO: test passes even when it shouldn't, see FE-6267
    it("should pass accessibility tests for MultiActionButton when open", () => {
      CypressMountWithProviders(<MultiActionButtonList />);

      multiActionButton().eq(0).trigger("keydown", keyCode("Enter"));

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for MultiActionButton disabled prop", () => {
      CypressMountWithProviders(<MultiActionButtonList disabled />);

      cy.checkAccessibility();
    });

    it.each([
      SIZE.SMALL,
      SIZE.MEDIUM,
      SIZE.LARGE,
    ] as MultiActionButtonProps["size"][])(
      "should pass accessibility tests for MultiActionButton size prop set to %s",
      (size) => {
        CypressMountWithProviders(<MultiActionButtonList size={size} />);

        cy.checkAccessibility();
      }
    );

    it("should pass accessibility tests for MultiActionButton width prop", () => {
      CypressMountWithProviders(<MultiActionButtonList width="70%" />);

      cy.checkAccessibility();
    });

    it.each([
      "primary",
      "secondary",
      "tertiary",
    ] as MultiActionButtonProps["buttonType"][])(
      "should pass accessibility tests for MultiActionButton buttonType prop",
      (type) => {
        CypressMountWithProviders(<MultiActionButtonList buttonType={type} />);

        cy.checkAccessibility();
      }
    );

    it("should pass accessibility tests for MultiActionButton ChildButtonTypes story", () => {
      CypressMountWithProviders(<stories.ChildButtonTypes />);

      cy.checkAccessibility();
    });

    it.each(["left", "right"] as MultiActionButtonProps["align"][])(
      "should pass accessibility tests for MultiActionButton Alignment story",
      (alignment) => {
        CypressMountWithProviders(<MultiActionButtonList align={alignment} />);

        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should pass accessibility tests for MultiActionButton Subtext story",
      (subtext) => {
        CypressMountWithProviders(
          <MultiActionButtonList size="large" subtext={subtext} />
        );

        cy.checkAccessibility();
      }
    );

    it("should pass accessibility tests for MultiActionButton InOverflowHiddenContainer story", () => {
      CypressMountWithProviders(<stories.InOverflowHiddenContainer />);

      accordionDefaultTitle().click();
      multiActionButton().eq(0).trigger("click");

      cy.checkAccessibility();
    });
  });

  describe("check border radius for MultiActionButton component", () => {
    it("should have the expected border radius on main button", () => {
      CypressMountWithProviders(<MultiActionButtonList />);
      multiActionButton().should("have.css", "border-radius", "32px");
    });

    it("should have the expected border radius on children container and buttons", () => {
      CypressMountWithProviders(<MultiActionButtonList />);

      multiActionButton().eq(0).trigger("mouseover");
      multiActionButtonListContainer().should(
        "have.css",
        "border-radius",
        "8px"
      );
      multiActionButtonList()
        .eq(0)
        .should("have.css", "border-radius", "8px 8px 0px 0px");
      multiActionButtonList().eq(1).should("have.css", "border-radius", "0px");
      multiActionButtonList()
        .eq(2)
        .should("have.css", "border-radius", "0px 0px 8px 8px");
    });

    it("should have the expected border radius when some children buttons have href prop", () => {
      CypressMountWithProviders(<MultiActionWithHrefChildren />);

      multiActionButton().eq(0).trigger("mouseover");
      multiActionButtonList()
        .eq(0)
        .should("have.css", "border-radius", "8px 8px 0px 0px");
      multiActionButtonList().eq(1).should("have.css", "border-radius", "0px");
      multiActionButtonList()
        .eq(2)
        .should("have.css", "border-radius", "0px 0px 8px 8px");
    });

    it("should have the expected border radius when there is only on one child button", () => {
      CypressMountWithProviders(<MultiActionButtonWithOneChild />);

      multiActionButton().eq(0).trigger("mouseover");
      multiActionButtonList().eq(0).should("have.css", "border-radius", "8px");
    });
  });
});
