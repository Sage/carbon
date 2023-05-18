import React from "react";
import * as stories from "../../../src/components/dialog/dialog-test.stories";
import * as defaultStories from "../../../src/components/dialog/dialog.stories";
import {
  dialogTitle,
  dialogSubtitle,
  alertDialogPreview as dialogPreview,
  openPreviewButton,
} from "../../locators/dialog";
import { textEditorInput, textEditorToolbar } from "../../locators/text-editor";
import { formFooterComponent } from "../../locators/form";
import { keyCode, continuePressingTABKey } from "../../support/helper";
import { buttonDataComponent } from "../../locators/button";
import {
  backgroundUILocator,
  getDataElementByValue,
  closeIconButton,
  tooltipPreview,
  getComponent,
} from "../../locators/index";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import toastComponent from "../../locators/toast";
import { SIZE, CHARACTERS } from "../../support/component-helper/constants";
import { useJQueryCssValueAndAssert } from "../../support/component-helper/common-steps";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const getInput = (index) => cy.get('[data-element="input"]').eq(index);

context("Testing Dialog component", () => {
  describe("should render Dialog component with props", () => {
    it.each([0, 1, 100, 1000])(
      "should render Dialog component with %s as a height parameter",
      (height) => {
        CypressMountWithProviders(
          <stories.DialogComponent height={`${height}px`} />
        );

        const { viewportHeight } = Cypress.config();

        let resultHeight;
        if (height >= viewportHeight - 20) {
          resultHeight = viewportHeight - 20;
        } else {
          resultHeight = height;
        }

        dialogPreview().then(($el) => {
          useJQueryCssValueAndAssert($el, "height", resultHeight);
        });
      }
    );

    it.each(specialCharacters)(
      "should render Dialog using %s as a title",
      (title) => {
        CypressMountWithProviders(<stories.DialogComponent title={title} />);

        dialogTitle().should("have.text", title);
      }
    );

    it.each(specialCharacters)(
      "should render Dialog using %s as a subtitle",
      (subtitle) => {
        CypressMountWithProviders(
          <stories.DialogComponent title="Sample dialog" subtitle={subtitle} />
        );

        dialogSubtitle().should("have.text", subtitle);
      }
    );

    it.each([
      [SIZE.EXTRASMALL, 300],
      [SIZE.SMALL, 380],
      [SIZE.MEDIUMSMALL, 540],
      [SIZE.MEDIUM, 750],
      [SIZE.MEDIUMLARGE, 850],
      [SIZE.LARGE, 960],
      [SIZE.EXTRALARGE, 1080],
    ])(
      "should render Dialog component with %s as a size and has width property set to %s",
      (size, width) => {
        CypressMountWithProviders(<stories.DialogComponent size={size} />);

        dialogPreview().then(($el) => {
          useJQueryCssValueAndAssert($el, "width", width);
        });
      }
    );

    it("should not render close icon when ShowCloseIcon is set to false", () => {
      CypressMountWithProviders(
        <stories.DialogComponent showCloseIcon={false} />
      );

      closeIconButton().should("not.exist");
    });

    it("should render close icon when ShowCloseIcon is set to true. When you click the CloseIcon the Dialog is closed", () => {
      CypressMountWithProviders(<stories.DialogComponent />);
      dialogPreview().should("exist");
      closeIconButton().click();
      cy.wait(1000);
      dialogPreview().should("not.exist");
    });

    it("should render Dialog with enabledEscKey prop and should be closed after clicking Escape button", () => {
      CypressMountWithProviders(<stories.DialogComponent />);
      dialogPreview().should("exist");
      dialogPreview().trigger("keyup", keyCode("Esc"));
      dialogPreview().should("not.exist");
    });

    it("should render Dialog with disabledEscKey prop and not be closed after clicking Escape button", () => {
      CypressMountWithProviders(<stories.DialogComponent disableEscKey />);

      dialogPreview().should("exist");
      dialogPreview().trigger("keyup", keyCode("Esc"));
      dialogPreview().should("exist");
    });

    it("should call the cancel action after the CloseIcon is clicked", () => {
      const callback = cy.stub();

      CypressMountWithProviders(
        <stories.DialogComponent onCancel={callback} />
      );

      closeIconButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it.each([["top"], ["topRight"], ["right"]])(
      "should remain open Dialog opened after click on background outside at the %s position",
      (position) => {
        CypressMountWithProviders(<stories.DialogComponent />);

        dialogPreview().should("exist");
        backgroundUILocator().click(position, { force: true });
        dialogPreview().should("exist");
      }
    );

    it("should render Dialog component with aria-label", () => {
      CypressMountWithProviders(
        <stories.DialogComponent aria-label="aria label for dialog" />
      );
      getComponent("dialog")
        .eq(1)
        .should("have.attr", "aria-label")
        .and("contain", "aria label for dialog");
    });

    it("should render Dialog component with aria-describedby", () => {
      CypressMountWithProviders(
        <stories.DialogComponent aria-describedby="aria description" />
      );

      getComponent("dialog")
        .eq(1)
        .should("have.attr", "aria-describedby")
        .and("contain", "aria description");
    });

    it("should render Dialog component with aria-labelledby", () => {
      CypressMountWithProviders(
        <stories.DialogComponent aria-labelledby="33c4cb62-2e16-91f4-e939-4d2f09987d4c" />
      );

      getComponent("dialog")
        .eq(1)
        .should("have.attr", "aria-labelledby")
        .and("contain", "33c4cb62-2e16-91f4-e939-4d2f09987d4c");
    });

    it("should render Dialog component with className", () => {
      CypressMountWithProviders(
        <stories.DialogComponent className="dialog classname" />
      );
      getComponent("dialog").should("have.class", "dialog classname");
    });

    it("should render Dialog component with role", () => {
      // eslint-disable-next-line jsx-a11y/aria-role
      CypressMountWithProviders(<stories.DialogComponent role="dialog" />);
      getComponent("dialog")
        .eq(1)
        .should("have.attr", "role")
        .and("contain", "dialog");
    });

    it("should render Dialog component with DisableClose", () => {
      CypressMountWithProviders(<stories.DialogComponent disableClose />);
      closeIconButton().should("be.disabled").and("have.attr", "disabled");
    });

    it("should render Dialog component with help", () => {
      CypressMountWithProviders(
        <stories.DialogComponent title="Sample Dialog" help="Some help text" />
      );
      getDataElementByValue("question").trigger("mouseover");
      tooltipPreview().should("have.text", "Some help text");
    });

    it("should render Dialog component using focusFirstElement", () => {
      CypressMountWithProviders(<stories.DialogComponent />);
      buttonDataComponent().eq(1).should("be.focused");
    });

    it("should render Dialog component disabling autofocus", () => {
      CypressMountWithProviders(<stories.DialogComponent disableAutoFocus />);
      buttonDataComponent().eq(1).should("not.be.focused");
    });

    it("should render Dialog component and trap focus in it when the inputs are tabbed through", () => {
      CypressMountWithProviders(
        <stories.DialogComponent focusFirstElement={undefined} />
      );
      cy.get("body").tab();
      closeIconButton().should("be.focused");
      cy.focused().tab();
      buttonDataComponent().eq(0).should("be.focused");
      cy.focused().tab();
      buttonDataComponent().eq(1).should("be.focused");
      cy.focused().tab();
      getInput(0).should("be.focused");
      cy.focused().tab();
      getInput(1).should("be.focused");
      cy.focused().tab();
      getInput(2).should("be.focused");
      cy.focused().tab();
      closeIconButton().should("be.focused");
    });

    it("should render Dialog component and trap focus in it when text editor and other inputs are tabbed through", () => {
      CypressMountWithProviders(<stories.DialogComponentWithTextEditor />);
      cy.get("body").tab();
      closeIconButton().should("be.focused");
      cy.focused().tab();
      getInput(0).should("be.focused");
      cy.focused().tab();
      getInput(1).should("be.focused");
      cy.focused().tab();
      textEditorInput().should("be.focused");
      cy.focused().tab();
      textEditorToolbar("bold").should("be.focused");
      cy.focused().tab();
      getInput(2).should("be.focused");
    });

    it("should render Dialog component and trap focus in it when the inputs are back tabbed through", () => {
      CypressMountWithProviders(
        <stories.DialogComponent focusFirstElement={undefined} />
      );
      dialogPreview().should("be.focused");
      cy.focused().tab({ shift: true });
      getInput(2).should("be.focused");
      cy.focused().tab({ shift: true });
      getInput(1).should("be.focused");
      cy.focused().tab({ shift: true });
      getInput(0).should("be.focused");
      cy.focused().tab({ shift: true });
      buttonDataComponent().eq(1).should("be.focused");
      cy.focused().tab({ shift: true });
      buttonDataComponent().eq(0).should("be.focused");
      cy.focused().tab({ shift: true });
      closeIconButton().should("be.focused");
    });

    it("should render Dialog component and trap focus in it when the text editor and other inputs are back tabbed through", () => {
      CypressMountWithProviders(<stories.DialogComponentWithTextEditor />);
      cy.get("body").tab();
      closeIconButton().should("be.focused");
      // needs to shift and tab twice on the body to gain focus else it loses it to the text editor pane
      cy.get("body").tab({ shift: true }).tab({ shift: true });
      getInput(2).should("be.focused");
      cy.focused().tab({ shift: true });
      textEditorToolbar("bold").should("be.focused");
      cy.focused().tab({ shift: true });
      textEditorInput().should("be.focused");
      cy.focused().tab({ shift: true });
      getInput(1).should("be.focused");
      cy.focused().tab({ shift: true });
      getInput(0).should("be.focused");
      cy.focused().tab({ shift: true });
      closeIconButton().should("be.focused");
    });

    it("focuses Toast wrapper when ref passed to additionalWrapperRefs and focuses button that triggered opening on close", () => {
      CypressMountWithProviders(<stories.DialogComponentWithToast />);

      buttonDataComponent().click();
      toastComponent().should("be.focused");
      closeIconButton().click();
      buttonDataComponent().should("be.focused");
      buttonDataComponent().click();
      toastComponent().should("be.focused");
    });

    it("focuses Toast close button when tab is pressed after non-focusable content has been selected", () => {
      CypressMountWithProviders(<stories.DialogComponentWithToast />);

      buttonDataComponent().click();
      cy.get("body").click().tab();
      closeIconButton().should("be.focused");
    });
  });

  describe("Accessibility tests for Dialog component", () => {
    it("should pass accessibility tests for Dialog default story", () => {
      CypressMountWithProviders(<stories.DialogComponent />);

      cy.checkAccessibility();
    });

    it.each([0, 1, 100, 1000])(
      "should pass accessibility tests for Dialog component with %s as a height parameter",
      (height) => {
        CypressMountWithProviders(
          <stories.DialogComponent height={`${height}px`} />
        );

        cy.checkAccessibility();
      }
    );

    it.each(specialCharacters)(
      "should pass accessibility tests for Dialog using %s as a title",
      (title) => {
        CypressMountWithProviders(<stories.DialogComponent title={title} />);

        cy.checkAccessibility();
      }
    );

    it.each(specialCharacters)(
      "should pass accessibility tests for Dialog using %s as a subtitle",
      (subtitle) => {
        CypressMountWithProviders(
          <stories.DialogComponent title="Sample dialog" subtitle={subtitle} />
        );

        cy.checkAccessibility();
      }
    );

    it.each([
      SIZE.EXTRASMALL,
      SIZE.SMALL,
      SIZE.MEDIUMSMALL,
      SIZE.MEDIUM,
      SIZE.MEDIUMLARGE,
      SIZE.LARGE,
      SIZE.EXTRALARGE,
    ])(
      "should pass accessibility tests for Dialog component with %s as a size",
      (size) => {
        CypressMountWithProviders(<stories.DialogComponent size={size} />);

        cy.checkAccessibility();
      }
    );

    it("should pass accessibility tests for ShowCloseIcon is set to false", () => {
      CypressMountWithProviders(
        <stories.DialogComponent showCloseIcon={false} />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Dialog component with DisableClose", () => {
      CypressMountWithProviders(<stories.DialogComponent disableClose />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Dialog component with help", () => {
      CypressMountWithProviders(
        <stories.DialogComponent title="Sample Dialog" help="Some help text" />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Dialog component using focusFirstElement", () => {
      CypressMountWithProviders(<stories.DialogComponent />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Dialog component disabling autofocus", () => {
      CypressMountWithProviders(<stories.DialogComponent disableAutoFocus />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Dialog component with Toast", () => {
      CypressMountWithProviders(<stories.DialogComponentWithToast />);

      buttonDataComponent()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          cy.checkAccessibility();
        });
    });

    it("should pass accessibility tests for Dialog Editable story", () => {
      CypressMountWithProviders(<defaultStories.Editable />);

      openPreviewButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          cy.checkAccessibility();
        });
    });

    it("should pass accessibility tests for Dialog WithHelp story", () => {
      CypressMountWithProviders(<defaultStories.WithHelp />);

      openPreviewButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          cy.checkAccessibility();
        });
    });

    it("should pass accessibility tests for Dialog DynamicContent story", () => {
      CypressMountWithProviders(<defaultStories.DynamicContent />);

      openPreviewButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          cy.checkAccessibility();
        });
    });

    it("should pass accessibility tests for Dialog FocusingADifferentFirstElement story", () => {
      CypressMountWithProviders(
        <defaultStories.FocusingADifferentFirstElement />
      );

      getComponent("button")
        .eq(0)
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          cy.checkAccessibility();
        });
    });

    it("should pass accessibility tests for Dialog OverridingContentPadding story", () => {
      CypressMountWithProviders(<defaultStories.OverridingContentPadding />);

      openPreviewButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          cy.checkAccessibility();
        });
    });

    it("should pass accessibility tests for Dialog OtherFocusableContainers story", () => {
      CypressMountWithProviders(<defaultStories.OtherFocusableContainers />);

      openPreviewButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          cy.checkAccessibility();
        });
    });

    it("should pass accessibility tests for Dialog Responsive story", () => {
      CypressMountWithProviders(<defaultStories.Responsive />);

      openPreviewButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          cy.checkAccessibility();
        });
    });
  });

  describe("Accessibility tests for Dialog component", () => {
    it("should pass accessibility tests for Dialog default story", () => {
      CypressMountWithProviders(<stories.DialogComponent />);

      cy.checkAccessibility();
    });

    it.each([0, 1, 100, 1000])(
      "should pass accessibility tests for Dialog component with %s as a height parameter",
      (height) => {
        CypressMountWithProviders(
          <stories.DialogComponent height={`${height}px`} />
        );

        cy.checkAccessibility();
      }
    );

    it.each(specialCharacters)(
      "should pass accessibility tests for Dialog using %s as a title",
      (title) => {
        CypressMountWithProviders(<stories.DialogComponent title={title} />);

        cy.checkAccessibility();
      }
    );

    it.each(specialCharacters)(
      "should pass accessibility tests for Dialog using %s as a subtitle",
      (subtitle) => {
        CypressMountWithProviders(
          <stories.DialogComponent title="Sample dialog" subtitle={subtitle} />
        );

        cy.checkAccessibility();
      }
    );

    it.each([
      SIZE.EXTRASMALL,
      SIZE.SMALL,
      SIZE.MEDIUMSMALL,
      SIZE.MEDIUM,
      SIZE.MEDIUMLARGE,
      SIZE.LARGE,
      SIZE.EXTRALARGE,
    ])(
      "should pass accessibility tests for Dialog component with %s as a size",
      (size) => {
        CypressMountWithProviders(<stories.DialogComponent size={size} />);

        cy.checkAccessibility();
      }
    );

    it("should pass accessibility tests for ShowCloseIcon is set to false", () => {
      CypressMountWithProviders(
        <stories.DialogComponent showCloseIcon={false} />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Dialog component with DisableClose", () => {
      CypressMountWithProviders(<stories.DialogComponent disableClose />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Dialog component with help", () => {
      CypressMountWithProviders(
        <stories.DialogComponent title="Sample Dialog" help="Some help text" />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Dialog component using focusFirstElement", () => {
      CypressMountWithProviders(<stories.DialogComponent />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Dialog component disabling autofocus", () => {
      CypressMountWithProviders(<stories.DialogComponent disableAutoFocus />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Dialog component with Toast", () => {
      CypressMountWithProviders(<stories.DialogComponentWithToast />);

      buttonDataComponent()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          cy.checkAccessibility();
        });
    });

    it("should pass accessibility tests for Dialog Editable story", () => {
      CypressMountWithProviders(<defaultStories.Editable />);

      openPreviewButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          cy.checkAccessibility();
        });
    });

    it("should pass accessibility tests for Dialog WithHelp story", () => {
      CypressMountWithProviders(<defaultStories.WithHelp />);

      openPreviewButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          cy.checkAccessibility();
        });
    });

    it("should pass accessibility tests for Dialog DynamicContent story", () => {
      CypressMountWithProviders(<defaultStories.DynamicContent />);

      openPreviewButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          cy.checkAccessibility();
        });
    });

    it("should pass accessibility tests for Dialog FocusingADifferentFirstElement story", () => {
      CypressMountWithProviders(
        <defaultStories.FocusingADifferentFirstElement />
      );

      getComponent("button")
        .eq(0)
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          cy.checkAccessibility();
        });
    });

    it("should pass accessibility tests for Dialog OverridingContentPadding story", () => {
      CypressMountWithProviders(<defaultStories.OverridingContentPadding />);

      openPreviewButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          cy.checkAccessibility();
        });
    });

    it("should pass accessibility tests for Dialog OtherFocusableContainers story", () => {
      CypressMountWithProviders(<defaultStories.OtherFocusableContainers />);

      openPreviewButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          cy.checkAccessibility();
        });
    });

    it("should pass accessibility tests for Dialog Responsive story", () => {
      CypressMountWithProviders(<defaultStories.Responsive />);

      openPreviewButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          cy.checkAccessibility();
        });
    });
  });

  it("should have the expected border radius styling", () => {
    CypressMountWithProviders(<stories.Default stickyFooter title="foo" />);
    dialogPreview().should("have.css", "border-radius", "16px");
    formFooterComponent().should(
      "have.css",
      "border-radius",
      "0px 0px 16px 16px"
    );
  });

  describe("test background scroll when tabbing", () => {
    it("tabbing forward through the dialog and back to the start should not make the background scroll to the bottom", () => {
      CypressMountWithProviders(
        <stories.DialogBackgroundScrollTestComponent />
      );

      continuePressingTABKey(3);

      closeIconButton().should("be.focused");

      cy.checkNotInViewport("#bottom-box");
    });

    it("tabbing backward through the dialog and back to the start should not make the background scroll to the bottom", () => {
      CypressMountWithProviders(
        <stories.DialogBackgroundScrollTestComponent />
      );

      continuePressingTABKey(2, true);

      closeIconButton().should("be.focused");

      cy.checkNotInViewport("#bottom-box");
    });

    it("tabbing forward through the dialog and other focusable containers back to the start should not make the background scroll to the bottom", () => {
      CypressMountWithProviders(
        <stories.DialogBackgroundScrollWithOtherFocusableContainers />
      );

      continuePressingTABKey(6);

      closeIconButton().eq(0).should("be.focused");

      cy.checkNotInViewport("#bottom-box");
    });

    it("tabbing backward through the dialog and other focusable containers back to the start should not make the background scroll to the bottom", () => {
      CypressMountWithProviders(
        <stories.DialogBackgroundScrollWithOtherFocusableContainers />
      );

      continuePressingTABKey(7, true);

      closeIconButton().eq(0).should("be.focused");

      cy.checkNotInViewport("#bottom-box");
    });
  });
});
