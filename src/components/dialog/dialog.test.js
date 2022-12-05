import * as React from "react";
import Dialog from "./dialog.component";
import {
  dialogTitle,
  dialogSubtitle,
  alertDialogPreview as dialogPreview,
} from "../../../cypress/locators/dialog";
import Button from "../button";
import Textbox from "../textbox";
import { keyCode } from "../../../cypress/support/helper";
import { buttonDataComponent } from "../../../cypress/locators/button";
import {
  backgroundUILocator,
  getDataElementByValue,
  closeIconButton,
  tooltipPreview,
  getComponent,
} from "../../../cypress/locators/index";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import Toast from "../toast";
import toastComponent from "../../../cypress/locators/toast";
import {
  SIZE,
  CHARACTERS,
} from "../../../cypress/support/component-helper/constants";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const getInput = (index) => cy.get('[data-element="input"]').eq(index);

// eslint-disable-next-line react/prop-types
const DialogComponent = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const ref = React.useRef();
  return (
    <>
      <Dialog
        open={isOpen}
        showCloseIcon
        onCancel={() => setIsOpen(false)}
        focusFirstElement={ref}
        {...props}
      >
        <Button onClick={() => setIsOpen(false)}>Not focused</Button>
        <Button forwardRef={ref} onClick={() => setIsOpen(false)}>
          This should be focused first now
        </Button>

        <Textbox label="Textbox1" value="Textbox1" />
        <Textbox label="Textbox2" value="Textbox2" />
        <Textbox label="Textbox3" value="Textbox3" />
      </Dialog>
    </>
  );
};

const DialogComponentWithToast = () => {
  const toastRef = React.useRef(null);
  const [openToast, setOpenToast] = React.useState(false);
  return (
    <>
      <Toast
        ref={toastRef}
        open={openToast}
        onDismiss={() => setOpenToast(false)}
      />
      <Dialog additionalWrapperRefs={[toastRef]} open>
        <Button onClick={() => setOpenToast(true)}>Open Toast</Button>
      </Dialog>
    </>
  );
};

context("Testing Dialog component", () => {
  describe("should render Dialog component with props", () => {
    it.each([[0], [1], [100], [1000]])(
      "should render Dialog component with %s as a height parameter",
      (height) => {
        CypressMountWithProviders(<DialogComponent height={`${height}px`} />);

        const { viewportHeight } = Cypress.config();

        let resultHeight;
        if (height >= viewportHeight - 20) {
          resultHeight = viewportHeight - 20;
        } else {
          resultHeight = height;
        }

        dialogPreview()
          .should("have.css", "height")
          .and("contain", resultHeight);
      }
    );

    it.each(specialCharacters)(
      "should render Dialog using %s as a title",
      (title) => {
        CypressMountWithProviders(<DialogComponent title={title} />);

        dialogTitle().should("have.text", title);
      }
    );

    it.each(specialCharacters)(
      "should render Dialog using %s as a subtitle",
      (subtitle) => {
        CypressMountWithProviders(
          <DialogComponent title="Sample dialog" subtitle={subtitle} />
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
        CypressMountWithProviders(<DialogComponent size={size} />);

        dialogPreview()
          .should("have.css", "width")
          .and("contain", `${width}px`);
      }
    );

    it("should not render close icon when ShowCloseIcon is set to false", () => {
      CypressMountWithProviders(<DialogComponent showCloseIcon={false} />);

      closeIconButton().should("not.exist");
    });

    it("should render close icon when ShowCloseIcon is set to true. When you click the CloseIcon the Dialog is closed", () => {
      CypressMountWithProviders(<DialogComponent />);
      dialogPreview().should("exist");
      closeIconButton().click();
      cy.wait(1000);
      dialogPreview().should("not.exist");
    });

    it("should render Dialog with enabledEscKey prop and should be closed after clicking Escape button", () => {
      CypressMountWithProviders(<DialogComponent />);
      dialogPreview().should("exist");
      dialogPreview().trigger("keyup", keyCode("Esc"));
      dialogPreview().should("not.exist");
    });

    it("should render Dialog with disabledEscKey prop and not be closed after clicking Escape button", () => {
      CypressMountWithProviders(<DialogComponent disableEscKey />);

      dialogPreview().should("exist");
      dialogPreview().trigger("keyup", keyCode("Esc"));
      dialogPreview().should("exist");
    });

    it("should call the cancel action after the CloseIcon is clicked", () => {
      const callback = cy.stub();

      CypressMountWithProviders(<DialogComponent onCancel={callback} />);

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
        CypressMountWithProviders(<DialogComponent />);

        dialogPreview().should("exist");
        backgroundUILocator().click(position, { force: true });
        dialogPreview().should("exist");
      }
    );

    it("should render Dialog component with aria-label", () => {
      CypressMountWithProviders(
        <DialogComponent aria-label="aria label for dialog" />
      );
      getComponent("dialog")
        .eq(1)
        .should("have.attr", "aria-label")
        .and("contain", "aria label for dialog");
    });

    it("should render Dialog component with aria-describedby", () => {
      CypressMountWithProviders(
        <DialogComponent aria-describedby="aria description" />
      );

      getComponent("dialog")
        .eq(1)
        .should("have.attr", "aria-describedby")
        .and("contain", "aria description");
    });

    it("should render Dialog component with aria-labelledby", () => {
      CypressMountWithProviders(
        <DialogComponent aria-labelledby="33c4cb62-2e16-91f4-e939-4d2f09987d4c" />
      );

      getComponent("dialog")
        .eq(1)
        .should("have.attr", "aria-labelledby")
        .and("contain", "33c4cb62-2e16-91f4-e939-4d2f09987d4c");
    });

    it("should render Dialog component with className", () => {
      CypressMountWithProviders(
        <DialogComponent className="dialog classname" />
      );
      getComponent("dialog").should("have.class", "dialog classname");
    });

    it("should render Dialog component with role", () => {
      // eslint-disable-next-line jsx-a11y/aria-role
      CypressMountWithProviders(<DialogComponent role="dialog" />);
      getComponent("dialog")
        .eq(1)
        .should("have.attr", "role")
        .and("contain", "dialog");
    });

    it("should render Dialog component with DisableClose", () => {
      CypressMountWithProviders(<DialogComponent disableClose />);
      closeIconButton().should("be.disabled").and("have.attr", "disabled");
    });

    it("should render Dialog component with help", () => {
      CypressMountWithProviders(
        <DialogComponent title="Sample Dialog" help="Some help text" />
      );
      getDataElementByValue("question").trigger("mouseover");
      tooltipPreview().should("have.text", "Some help text");
    });

    it("should render Dialog component using focusFirstElement", () => {
      CypressMountWithProviders(<DialogComponent />);
      buttonDataComponent().eq(1).should("be.focused");
    });

    it("should render Dialog component disabling autofocus", () => {
      CypressMountWithProviders(<DialogComponent disableAutoFocus />);
      buttonDataComponent().eq(1).should("not.be.focused");
    });

    it("should render Dialog component and trap focus in it when the inputs are tabbed through", () => {
      CypressMountWithProviders(
        <DialogComponent focusFirstElement={undefined} />
      );
      cy.get("body").tab();
      closeIconButton().should("be.focused");
      cy.get("body").tab();
      buttonDataComponent().eq(0).should("be.focused");
      cy.get("body").tab();
      buttonDataComponent().eq(1).should("be.focused");
      cy.get("body").tab();
      getInput(0).should("be.focused");
      cy.get("body").tab();
      getInput(1).should("be.focused");
      cy.get("body").tab();
      getInput(2).should("be.focused");
      cy.get("body").tab();
      closeIconButton().should("be.focused");
    });

    it("should render Dialog component and trap focus in it when the inputs are back tabbed through", () => {
      CypressMountWithProviders(
        <DialogComponent focusFirstElement={undefined} />
      );
      cy.get("body").tab();
      closeIconButton().should("be.focused");
      cy.get("body").tab({ shift: true });
      getInput(2).should("be.focused");
      cy.get("body").tab({ shift: true });
      getInput(1).should("be.focused");
      cy.get("body").tab({ shift: true });
      getInput(0).should("be.focused");
      cy.get("body").tab({ shift: true });
      buttonDataComponent().eq(1).should("be.focused");
      cy.get("body").tab({ shift: true });
      buttonDataComponent().eq(0).should("be.focused");
      cy.get("body").tab({ shift: true });
      closeIconButton().should("be.focused");
    });

    it("focuses Toast wrapper when ref passed to additionalWrapperRefs and focuses button that triggered opening on close", () => {
      CypressMountWithProviders(<DialogComponentWithToast />);

      buttonDataComponent().click();
      toastComponent().should("be.focused");
      closeIconButton().click();
      buttonDataComponent().should("be.focused");
      buttonDataComponent().click();
      toastComponent().should("be.focused");
    });
  });
});
