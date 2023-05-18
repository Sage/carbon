import React from "react";
import PropTypes from "prop-types";
import {
  DialogFullScreenComponent,
  NestedDialog,
  MultipleDialogsInDifferentProviders,
  DialogFullScreenWithHeaderChildren,
  mainDialogTitle,
  nestedDialogTitle,
  DialogFullScreenBackgroundScrollTestComponent,
  DialogFullScreenBackgroundScrollWithOtherFocusableContainers,
} from "../../../src/components/dialog-full-screen/dialog-full-screen-test.stories";
import {
  Default as DefaultDocsStory,
  WithComplexExample,
  WithDisableContentPadding,
  WithHeaderChildren,
  WithHelp,
  WithHideableHeaderChildren,
  WithBox,
  FocusingADifferentFirstElement,
  OtherFocusableContainers,
} from "../../../src/components/dialog-full-screen/dialog-full-screen.stories";
import {
  dialogTitle,
  dialogSubtitle,
  alertDialogPreview as dialogPreview,
} from "../../locators/dialog";
import {
  dialogFullScreenPreview,
  dialogFullScreenChildren,
} from "../../locators/dialog-full-screen";
import {
  closeIconButton,
  openDialogByName,
  portal,
  getDataElementByValue,
  tooltipPreview,
  getComponent,
  getElement,
} from "../../locators/index";
import { buttonDataComponent } from "../../locators/button";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { contentElement } from "../../locators/content/index";
import { keyCode, continuePressingTABKey } from "../../support/helper";
import { CHARACTERS } from "../../support/component-helper/constants";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testAria = "cypress_aria";

DialogFullScreenComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

context("Testing DialogFullScreen component", () => {
  describe("render DialogFullScreen component and check properties", () => {
    it("should close Dialog Full Screen component after click on closeIcon", () => {
      CypressMountWithProviders(<DialogFullScreenComponent showCloseIcon />);

      closeIconButton().should("exist");
      dialogFullScreenPreview().should("exist");
      closeIconButton().click();
      dialogFullScreenPreview().should("not.exist");
    });

    it.each(specialCharacters)(
      "should render DialogFullScreen using %s as title",
      (title) => {
        CypressMountWithProviders(<DialogFullScreenComponent title={title} />);

        dialogTitle().should("have.text", title);
      }
    );

    it.each(specialCharacters)(
      "should render DialogFullScreen using %s as subtitle",
      (subtitle) => {
        CypressMountWithProviders(
          <DialogFullScreenComponent
            title="Dialog Full Screen Title"
            subtitle={subtitle}
          />
        );

        dialogSubtitle().should("have.text", subtitle);
      }
    );

    it.each(specialCharacters)(
      "should render DialogFullScreen component with %s as a children ",
      (childrenValue) => {
        CypressMountWithProviders(
          <DialogFullScreenComponent>{childrenValue}</DialogFullScreenComponent>
        );

        dialogFullScreenChildren().should("have.text", childrenValue);
      }
    );

    it("should render DialogFullScreen with disabledEscKey prop and not be closed after clicking Escape button", () => {
      CypressMountWithProviders(<DialogFullScreenComponent disableEscKey />);

      dialogFullScreenPreview().should("exist");
      dialogFullScreenPreview().trigger("keyup", keyCode("Esc"));
      dialogFullScreenPreview().should("exist");
    });

    it("should close DialogFullScreen after pressing Escape button", () => {
      CypressMountWithProviders(<DialogFullScreenComponent />);
      dialogFullScreenPreview().should("exist");
      dialogFullScreenPreview().trigger("keyup", keyCode("Esc"));
      dialogFullScreenPreview().should("not.exist");
    });

    it("should call the cancel action after closing the DialogFullScreen", () => {
      const callback = cy.stub();

      CypressMountWithProviders(
        <DialogFullScreenComponent onCancel={callback} />
      );

      closeIconButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should allow to close nested DialogFullScreen and then the main DialogFullScreen window", () => {
      CypressMountWithProviders(<NestedDialog />);

      openDialogByName(`Open ${mainDialogTitle}`).click();

      openDialogByName(`Open ${nestedDialogTitle}`).click();

      dialogPreview().should("exist");

      portal().contains(nestedDialogTitle).should("be.visible");

      dialogFullScreenPreview()
        .contains(mainDialogTitle)
        .should("not.be.visible");

      portal().contains(nestedDialogTitle).trigger("keyup", keyCode("Esc"));

      dialogPreview().should("not.exist");

      dialogFullScreenPreview().contains(mainDialogTitle).should("be.visible");

      dialogFullScreenPreview().trigger("keyup", keyCode("Esc"));

      dialogFullScreenPreview().should("not.exist");
    });

    it("should render nested dialogs with the aria-modal property only set on the top one", () => {
      CypressMountWithProviders(<NestedDialog />);

      openDialogByName(`Open ${mainDialogTitle}`).click();

      getElement("dialog-full-screen")
        .should("have.attr", "aria-modal")
        .and("eq", "true");

      openDialogByName(`Open ${nestedDialogTitle}`).click();

      getElement("dialog-full-screen").should("not.have.attr", "aria-modal");

      getElement("dialog").should("have.attr", "aria-modal").and("eq", "true");
    });

    it("should always place focus on the inner dialog when tabbing with nested dialogs after focus is lost", () => {
      CypressMountWithProviders(<NestedDialog />);

      openDialogByName(`Open ${mainDialogTitle}`).click();

      openDialogByName(`Open ${nestedDialogTitle}`).click();

      dialogPreview().tab();

      // click on the body in order to lose focus
      cy.get("body").click().tab();

      closeIconButton().eq(1).should("be.focused");
    });

    it("should render nested dialogs with the aria-modal property only set on the top one, even when the dialogs are wrapped in separate CarbonProviders", () => {
      cy.mount(<MultipleDialogsInDifferentProviders />);

      openDialogByName("Open Modal 1").click();

      getElement("dialog-full-screen")
        .should("have.attr", "aria-modal")
        .and("eq", "true");

      openDialogByName("Open Modal 2").click();

      getElement("dialog-full-screen").should("not.have.attr", "aria-modal");

      getElement("dialog").should("have.attr", "aria-modal").and("eq", "true");
    });

    it("should render DialogFullScreen component with aria-describedby", () => {
      CypressMountWithProviders(
        <DialogFullScreenComponent aria-describedby={testAria} />
      );

      dialogFullScreenPreview()
        .should("have.attr", "aria-describedby")
        .and("contain", testAria);
    });

    it("should render DialogFullScreen component with aria-label", () => {
      CypressMountWithProviders(
        <DialogFullScreenComponent aria-label={testAria} />
      );
      dialogFullScreenPreview()
        .should("have.attr", "aria-label")
        .and("contain", testAria);
    });

    it("should render DialogFullScreen component with aria-labelledby", () => {
      CypressMountWithProviders(
        <DialogFullScreenComponent aria-labelledby={testAria} />
      );

      dialogFullScreenPreview()
        .should("have.attr", "aria-labelledby")
        .and("contain", testAria);
    });

    it("should render DialogFullScreen component using focusFirstElement", () => {
      CypressMountWithProviders(<DialogFullScreenComponent />);
      cy.contains("This should be focused first now").should("have.focus");
    });

    it("should render Dialog component disabling autofocus", () => {
      CypressMountWithProviders(<DialogFullScreenComponent disableAutoFocus />);
      cy.contains("This should be focused first now").should("not.have.focus");
    });

    it("should render DialogFullScreen component with help", () => {
      CypressMountWithProviders(
        <DialogFullScreenComponent
          title="Sample DialogFullScreen"
          help="Some help text"
        />
      );
      getDataElementByValue("question").trigger("mouseover");
      tooltipPreview().should("have.text", "Some help text");
    });

    it("should render DialogFullScreen component with role", () => {
      // eslint-disable-next-line jsx-a11y/aria-role
      CypressMountWithProviders(<DialogFullScreenComponent role="dialog" />);
      dialogFullScreenPreview()
        .should("have.attr", "role")
        .and("contain", "dialog");
    });

    it("should not render close icon when ShowCloseIcon is set to false", () => {
      CypressMountWithProviders(
        <DialogFullScreenComponent showCloseIcon={false} />
      );

      closeIconButton().should("not.exist");
    });

    it("should render close icon when ShowCloseIcon is set to true. When you click the CloseIcon the Dialog is closed", () => {
      CypressMountWithProviders(<DialogFullScreenComponent showCloseIcon />);

      dialogFullScreenPreview().should("exist");
      closeIconButton().click();
      dialogFullScreenPreview().should("not.exist");
    });

    it("should render Dialog Full Screen with header children", () => {
      CypressMountWithProviders(<DialogFullScreenWithHeaderChildren />);

      getComponent("pill").eq(0).should("have.text", "A pill");

      getComponent("pill").eq(1).should("have.text", "Another pill");
    });

    it("should render Dialog component with content padding disabled", () => {
      CypressMountWithProviders(
        <DialogFullScreenComponent
          title="Dialog Full Screen Title"
          disableContentPadding
        />
      );
      contentElement()
        .should("have.css", "padding-right", "0px")
        .should("have.css", "padding-bottom", "0px");
    });
  });

  describe("should check accessibility for Dialog Full Screen", () => {
    it("should check accessibility for default Dialog Full Screen component", () => {
      CypressMountWithProviders(<DefaultDocsStory />);

      buttonDataComponent()
        .contains("Open DialogFullScreen")
        .click()
        .then(() => cy.checkAccessibility());
    });

    it("should check accessibility for default Dialog Full Screen with complex example", () => {
      CypressMountWithProviders(<WithComplexExample />);

      buttonDataComponent()
        .contains("Open DialogFullScreen")
        .click()
        .then(() => cy.checkAccessibility());
    });

    it("should check accessibility for default Dialog Full Screen with disabled content padding", () => {
      CypressMountWithProviders(<WithDisableContentPadding />);

      buttonDataComponent()
        .contains("Open DialogFullScreen")
        .click()
        .then(() => cy.checkAccessibility());
    });

    it("should check accessibility for default Dialog Full Screen component with header children", () => {
      CypressMountWithProviders(<WithHeaderChildren />);

      buttonDataComponent()
        .contains("Open DialogFullScreen")
        .click()
        .then(() => cy.checkAccessibility());
    });

    it("should check accessibility for default Dialog Full Screen component with help", () => {
      CypressMountWithProviders(<WithHelp />);

      buttonDataComponent()
        .contains("Open DialogFullScreen")
        .click()
        .then(() => cy.checkAccessibility());
    });

    it("should check accessibility for default Dialog Full Screen component with hideable header children", () => {
      CypressMountWithProviders(<WithHideableHeaderChildren />);

      buttonDataComponent()
        .contains("Open DialogFullScreen")
        .click()
        .then(() => cy.checkAccessibility());
    });

    it("should check accessibility for default Dialog Full Screen component with box", () => {
      CypressMountWithProviders(<WithBox />);

      buttonDataComponent()
        .contains("Open DialogFullScreen")
        .click()
        .then(() => cy.checkAccessibility());
    });

    it("should check accessibility for default Dialog Full Screen component using autoFocus", () => {
      CypressMountWithProviders(<FocusingADifferentFirstElement />);

      buttonDataComponent()
        .contains("Open Demo using focusFirstElement")
        .click()
        .then(() => cy.checkAccessibility());
      closeIconButton().click();

      buttonDataComponent()
        .contains("Open Demo using autoFocus")
        .click()
        .then(() => cy.checkAccessibility());
    });

    it("should check accessibility for default Dialog Full Screen component with other focusable containers", () => {
      CypressMountWithProviders(<OtherFocusableContainers />);

      buttonDataComponent()
        .contains("Open DialogFullScreen")
        .click()
        .then(() => cy.checkAccessibility());
    });
  });

  describe("test background scroll when tabbing", () => {
    it("tabbing forward through the dialog and back to the start should not make the background scroll to the bottom", () => {
      CypressMountWithProviders(
        <DialogFullScreenBackgroundScrollTestComponent />
      );

      continuePressingTABKey(3);

      closeIconButton().should("be.focused");

      cy.checkNotInViewport("#bottom-box");
    });

    it("tabbing backward through the dialog and back to the start should not make the background scroll to the bottom", () => {
      CypressMountWithProviders(
        <DialogFullScreenBackgroundScrollTestComponent />
      );

      continuePressingTABKey(2, true);

      closeIconButton().should("be.focused");

      cy.checkNotInViewport("#bottom-box");
    });

    it("tabbing forward through the dialog and other focusable containers back to the start should not make the background scroll to the bottom", () => {
      CypressMountWithProviders(
        <DialogFullScreenBackgroundScrollWithOtherFocusableContainers />
      );

      continuePressingTABKey(6);

      closeIconButton().eq(0).should("be.focused");

      cy.checkNotInViewport("#bottom-box");
    });

    it("tabbing backward through the dialog and other focusable containers back to the start should not make the background scroll to the bottom", () => {
      CypressMountWithProviders(
        <DialogFullScreenBackgroundScrollWithOtherFocusableContainers />
      );

      continuePressingTABKey(7, true);

      closeIconButton().eq(0).should("be.focused");

      cy.checkNotInViewport("#bottom-box");
    });
  });
});
