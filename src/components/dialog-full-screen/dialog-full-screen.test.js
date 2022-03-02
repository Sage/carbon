import * as React from "react";
import PropTypes from "prop-types";
import DialogFullScreen from "./dialog-full-screen.component";
import Dialog from "../dialog/dialog.component";
import Button from "../button";
import Form from "../form";
import {
  dialogTitle,
  dialogSubtitle,
  alertDialogPreview as dialogPreview,
} from "../../../cypress/locators/dialog";
import {
  dialogFullScreenPreview,
  dialogFullScreenChildren,
} from "../../../cypress/locators/dialog-full-screen";
import {
  closeIconButton,
  openMainDialogButton,
  openNestedDialogButton,
} from "../../../cypress/locators/index";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

const specialCharacters = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];
const DialogFullScreenComponent = ({ children, ...props }) => {
  const isOpen = React.useState(true);
  const setIsOpenToFalse = React.useState(false);
  return (
    <>
      <DialogFullScreen
        open={isOpen}
        showCloseIcon
        onCancel={() => setIsOpenToFalse}
        title="title"
        {...props}
      >
        <Form>{children}</Form>
      </DialogFullScreen>
    </>
  );
};

const NestedDialog = () => {
  const [mainDialogOpen, setMainDialogOpen] = React.useState(false);
  const [nestedDialogOpen, setNestedDialogOpen] = React.useState(false);

  const handleMainDialogOpen = () => {
    setMainDialogOpen(true);
  };

  const handleMainDialogCancel = () => {
    setMainDialogOpen(false);
  };

  const handleNestedDialogOpen = () => {
    setNestedDialogOpen(true);
  };

  const handleNestedDialogCancel = () => {
    setNestedDialogOpen(false);
  };

  return (
    <>
      <Button onClick={handleMainDialogOpen}>Open Main Dialog</Button>
      <DialogFullScreen
        open={mainDialogOpen}
        onCancel={handleMainDialogCancel}
        title="Main Dialog"
      >
        <Button onClick={handleNestedDialogOpen}>Open Nested Dialog</Button>
        <Dialog
          open={nestedDialogOpen}
          onCancel={handleNestedDialogCancel}
          title="Nested Dialog"
        >
          Nested Dialog Content
        </Dialog>
      </DialogFullScreen>
    </>
  );
};

DialogFullScreenComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

context("Testing Dialog-Full-Screen component", () => {
  describe("Should render dialog-full-screen component", () => {
    it("open default Dialog Full Screen Test component using showCloseIcon object name, click closeIcon, confirm dialog is not visible", () => {
      CypressMountWithProviders(
        <DialogFullScreenComponent showCloseIcon focusFirstElement />
      );

      closeIconButton().should("exist");

      dialogFullScreenPreview().should("exist");

      closeIconButton().click();

      dialogFullScreenPreview().should("not.exist");
    });

    it.each(specialCharacters)(
      "should check Dialog-full-screen % title",
      (title) => {
        CypressMountWithProviders(<DialogFullScreenComponent title={title} />);

        dialogTitle().should("have.text", title);
      }
    );

    it.each(specialCharacters)(
      "should check Dialog-full-screen % subtitle ",
      (subtitle) => {
        CypressMountWithProviders(
          <DialogFullScreenComponent title="title" subtitle={subtitle} />
        );

        dialogSubtitle().should("have.text", subtitle);
      }
    );

    it.each(specialCharacters)(
      "should render DialogFullScreen component with %s as a children",
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
      dialogFullScreenPreview().get("body").type("{esc}");
      cy.wait(1000);
      dialogFullScreenPreview().should("exist");
    });

    it("should render DialogFullScreen with enabledEscKey prop and should be closed after clicking Escape button", () => {
      CypressMountWithProviders(
        <DialogFullScreenComponent focusFirstElement />
      );
      dialogFullScreenPreview().should("exist");
      dialogFullScreenPreview().get("body").type("{esc}");
      cy.wait(1000);
      dialogFullScreenPreview().should("not.exist");
    });

    it("When the CloseIcon is clicked, the cancel action is called in the Actions tab ", () => {
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

    it(
      "Verify that nested dialog is closed by pressing Esc key." +
        "Open Dialog Full Screen > click 'Open Main Dialog' > click 'Open Nested Dialog' and ensure the Dialog is visible." +
        "Hit Escape > then Dialog is not visible and Dialog Full Screen is visible > hit Escape > the Dialog Full Screen is not visible ",
      () => {
        CypressMountWithProviders(<NestedDialog title="title" />);

        openMainDialogButton().click();
        cy.wait(500);

        openNestedDialogButton().click();
        cy.wait(500);

        dialogPreview().should("exist");

        cy.get(".carbon-portal")
          .eq(1)
          .find("h1")
          .contains("Nested Dialog")
          .should("be.visible");

        dialogFullScreenPreview()
          .contains("Main Dialog")
          .should("not.be.visible");

        cy.get(".carbon-portal")
          .find("h1")
          .contains("Nested Dialog")
          .get("body")
          .type("{esc}");
        cy.wait(1000);

        dialogPreview().should("not.exist");

        dialogFullScreenPreview().contains("Main Dialog").should("be.visible");

        dialogFullScreenPreview().get("body").type("{esc}");
        cy.wait(1000);

        dialogFullScreenPreview().should("not.exist");
      }
    );
  });
});
