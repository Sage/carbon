import * as React from "react";
import Dialog from "./dialog.component";
import { dialogTitle, dialogSubtitle, alertDialogPreview as dialogPreview } from "../../../cypress/locators/dialog";
import { backgroundUILocator, closeIconButton } from "../../../cypress/locators/index";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

const specialCharacters = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];

// eslint-disable-next-line react/prop-types
const DialogComponent = ({ children, ...props }) => {
  const isOpen = React.useState(true);
  const setIsOpenToFalse = React.useState(false);
  return (
    <>
      <Dialog
        open={isOpen}
        showCloseIcon
        onCancel={() => setIsOpenToFalse}
        title="title"
        {...props}
      >
        {children}
      </Dialog>
    </>
  );
};

context("Testing Dialog component", () => {
  describe("Should render dialog component", () => {

    it.each([
      [0],
      [1],
      [100],
      [1000],
    ])("should render Dialog component with % as a height parameter", (height) => {
      CypressMountWithProviders(
        <DialogComponent height={`${height}px`} />
      );

      const { viewportHeight } = Cypress.config();

      let resultHeight;
      if (height >= viewportHeight - 20) {
        resultHeight = viewportHeight - 20;
      } else {
        resultHeight = height;
      }

      dialogPreview().should("have.css", "height").and("contain", resultHeight);
    });

    it.each(specialCharacters)(
      "should check Dialog % title", (title) => {
        CypressMountWithProviders(
          <DialogComponent title={title} />
        );

        dialogTitle().should("have.text", title);
      });

    it.each(specialCharacters)(
      "should check Dialog % subtitle", (subtitle) => {
        CypressMountWithProviders(
          <DialogComponent subtitle={subtitle} />
        );

        dialogSubtitle().should("have.text", subtitle);
      });

    it.each([
      ["extra-small", "300"],
      ["small", "380"],
      ["medium-small", "540"],
      ["medium", "750"],
      ["medium-large", "850"],
      ["large", "960"],
      ["extra-large", "1080"]
    ])("should render Dialog component with %s as a size and has width property set to %s", (size, width) => {
      CypressMountWithProviders(
        <DialogComponent size={size} />
      );

      dialogPreview().should("have.css", "width").and("contain", width);
    });

    it("When ShowCloseIcon is set to false, CloseIcon is not displayed", () => {
      CypressMountWithProviders(
        <DialogComponent showCloseIcon={false} />
      );

      closeIconButton().should("not.exist");
    });

    it("When ShowCloseIcon is set to true, CloseIcon should be displayed. When you click the CloseIcon the Dialog is closed", () => {
      CypressMountWithProviders(
        <DialogComponent showCloseIcon focusFirstElement/>
      );

      closeIconButton().should("exist");
      dialogPreview().should("exist");
      closeIconButton().click();
      cy.wait(1000);
      dialogPreview().should("not.exist");
    });

    it("should render Dialog with enabledEscKey prop and should be closed after clicking Escape button", () => {
      CypressMountWithProviders(
        <DialogComponent focusFirstElement/>
      );
      dialogPreview().should("exist");
      dialogPreview().get('body').type("{esc}");
      cy.wait(1000);
      dialogPreview().should("not.exist");
    });

    it("should render Dialog with disabledEscKey prop and not be closed after clicking Escape button", () => {
      CypressMountWithProviders(
        <DialogComponent disableEscKey focusFirstElement/>
      );

      dialogPreview().should("exist");
      dialogPreview().get('body').type("{esc}");
      dialogPreview().should("exist");
    });

    it("When the CloseIcon is clicked, the cancel action is called in the Actions tab ", () => {
      const callback = cy.stub();

      CypressMountWithProviders(
        <DialogComponent onCancel={callback} />
      );

      closeIconButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it.each([
      ["top"],
      ["topRight"],
      ["right"]
    ])("Click on background outside Dialog at %s position, Dialog should remain open", (position) => {
      CypressMountWithProviders(
        <DialogComponent />
      );

      dialogPreview().should("exist");
      backgroundUILocator().click(position, { force: true });
      dialogPreview().should("exist");
    });
  });

});