import * as React from "react";
import PropTypes from "prop-types";
import Alert from ".";
import Button from "../button/button.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

import {
  alertChildren,
  alertDataComponent,
  alertDialogPreview,
  dialogTitle,
} from "../../../cypress/locators/dialog";
import { dialogSubtitle } from "../../../cypress/locators/confirm";
import {
  pressESCKeyOntoFocusedElement,
  closeIconButton,
} from "../../../cypress/locators/index";

const specialCharacters = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];
const sizes = [
  ["extra-small", 300],
  ["small", 380],
  ["medium-small", 540],
  ["medium", 750],
  ["medium-large", 850],
  ["large", 960],
  ["extra-large", 1080],
];

const AlertComponent = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>Open Alert</Button>
      <Alert
        onCancel={() => setIsOpen(!isOpen)}
        open={isOpen}
        data-component="alert"
        ariaRole="alertdialog"
        {...props}
      >
        {children}
      </Alert>
    </>
  );
};

/* 
  added propType (we could specify what exactly we need)
  when building the component with handlers
*/
AlertComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

context("Testing Alert component", () => {
  describe("should render Alert component", () => {
    it.each(specialCharacters)(
      "should render Alert component with %s as a title",
      (titleValue) => {
        CypressMountWithProviders(
          <AlertComponent title={titleValue}>Alert</AlertComponent>
        );

        dialogTitle().should("have.text", titleValue);
      }
    );

    it.each(specialCharacters)(
      "should render Alert component with %s as a subtitle",
      (subtitleValue) => {
        CypressMountWithProviders(
          <AlertComponent title="title" subtitle={subtitleValue}>
            Alert
          </AlertComponent>
        );

        dialogSubtitle().should("have.text", subtitleValue);
      }
    );

    it.each(specialCharacters)(
      "should render Alert component with %s as a children",
      (childrenValue) => {
        CypressMountWithProviders(
          <AlertComponent title="title">{childrenValue}</AlertComponent>
        );

        alertChildren().should("have.text", childrenValue);
      }
    );

    it("should render Alert with disabledEscKey prop and not be closed after click on close button", () => {
      CypressMountWithProviders(
        <AlertComponent title="title" disableEscKey>
          Alert
        </AlertComponent>
      );

      pressESCKeyOntoFocusedElement();
      alertDataComponent().should("have.attr", "data-state", "open");
      alertDialogPreview().should("be.visible");
    });

    it("should render Alert and could be closed after click on close button", () => {
      CypressMountWithProviders(
        <AlertComponent title="title">Alert</AlertComponent>
      );

      closeIconButton().click();
      alertDataComponent().should("have.attr", "data-state", "closed");
      alertDialogPreview().should("not.exist");
    });

    it.each([250, 500, 650])(
      "should render Alert component with %s as a height parameter",
      (height) => {
        CypressMountWithProviders(
          <AlertComponent title="title" height={`${height}px`}>
            Alert
          </AlertComponent>
        );

        const { viewportHeight } = Cypress.config();

        let resultHeight;
        if (height >= viewportHeight - 20) {
          resultHeight = viewportHeight - 20;
        } else {
          resultHeight = height;
        }

        alertDialogPreview()
          .should("have.css", "height")
          .and("contain", resultHeight);
      }
    );

    it.each(sizes)(
      "should render Alert component with %s as a size and has width property set to %s",
      (size, width) => {
        CypressMountWithProviders(
          <AlertComponent title="title" size={size}>
            Alert
          </AlertComponent>
        );

        alertDialogPreview().should("have.css", "width").and("contain", width);
      }
    );
  });

  describe("check events for Alert component", () => {
    it("should call onCancel callback when a click event is triggered", () => {
      const callback = cy.stub();

      CypressMountWithProviders(
        <AlertComponent title="title" onCancel={callback} />
      );

      closeIconButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });
});
