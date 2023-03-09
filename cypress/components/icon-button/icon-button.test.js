import React from "react";
import IconButton from "../../../src/components/icon-button";
import Icon from "../../../src/components/icon";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { icon } from "../../locators";

import { CHARACTERS } from "../../support/component-helper/constants";
import { keyCode } from "../../../cypress/support/helper";

const IconButtonComponent = ({ ...props }) => {
  return (
    <IconButton aria-label="icon-button" onClick={() => {}} {...props}>
      <Icon type="home" />
    </IconButton>
  );
};

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
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(<IconButtonComponent onBlur={callback} />);

      icon()
        .parent()
        .focus()
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onFocus callback when a focus event is triggered", () => {
      CypressMountWithProviders(<IconButtonComponent onFocus={callback} />);

      icon()
        .parent()
        .focus()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onMouseEnter callback when a mouseover event is triggered", () => {
      CypressMountWithProviders(
        <IconButtonComponent onMouseEnter={callback} />
      );

      icon()
        .parent()
        .trigger("mouseover")
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onMouseLeave callback when a mouseout event is triggered", () => {
      CypressMountWithProviders(
        <IconButtonComponent onMouseLeave={callback} />
      );

      icon()
        .parent()
        .trigger("mouseover")
        .trigger("mouseout")
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onClick callback when a click event is triggered", () => {
      CypressMountWithProviders(<IconButtonComponent onClick={callback} />);

      icon()
        .parent()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it.each(["Space", "Enter"])(
      "should call onClick callback when a keydown event is triggered with %s",
      (key) => {
        CypressMountWithProviders(<IconButtonComponent onClick={callback} />);

        icon()
          .parent()
          .trigger("keydown", keyCode(key))
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );
  });
});
