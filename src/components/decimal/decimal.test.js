import * as React from "react";
import { mount } from "@cypress/react";
import Decimal from "./decimal.component";

// Decimal locator
const decimalComponent = '[data-component="decimal"]';

context("Tests for Decimal component", () => {
  describe("check props for Decimal component", () => {
    it("should input value and get proper output", () => {
      // and mount the story using @cypress/react library
      mount(<Decimal />);

      // test data
      const iterable = new Map([
        [2, "2.00"],
        [2.1, "2.10"],
        [2.123, "2.123"],
      ]);

      // then run our tests
      for (const [inputValue, outputValue] of iterable) {
        cy.get(decimalComponent)
          .type(inputValue)
          .find("input")
          .blur({ force: true });
        cy.get(decimalComponent)
          .find("input")
          .should("have.value", outputValue);
      }
    });

    it("should input value and get proper output with precision set to 5", () => {
      // and mount the story using @cypress/react library
      mount(<Decimal precision={5} />);

      // test data
      const iterable = new Map([
        [2, "2.00000"],
        [2.1, "2.10000"],
        [2.123, "2.12300"],
      ]);

      // then run our tests
      for (const [inputValue, outputValue] of iterable) {
        cy.get(decimalComponent)
          .type(inputValue)
          .find("input")
          .blur({ force: true });
        cy.get(decimalComponent)
          .find("input")
          .should("have.value", outputValue);
      }
    });

    it("should render Decimal with readOnly prop", () => {
      // and mount the story using @cypress/react library
      mount(<Decimal readOnly />);

      const inputValue = "test";

      // then run our tests
      cy.get(decimalComponent)
        .type(inputValue)
        .find("input")
        .blur({ force: true });
      cy.get(decimalComponent)
        .find("input")
        .should("not.have.value", inputValue)
        .and("have.attr", "readOnly");
    });
  });

  describe("check events for Decimal component", () => {
    it("should return onChange event", () => {
      // use cy.stub for mock the onChange callback
      const callback = cy.stub().as("eventCallback");
      // and mount the story using @cypress/react library
      mount(<Decimal onChange={callback} />);

      const inputValue = "123";

      // then run our tests
      cy.get(decimalComponent)
        .type(inputValue)
        .find("input")
        .blur({ force: true });

      // first approach with .then
      // .then(() => {
      //   expect(callback).to.have.been.calledThrice
      // });

      // second approach for Events
      cy.get("@eventCallback").should("be.calledThrice");
      // cy.get('@eventCallback').should('be.calledWith', [
      //   {
      //     "target": {
      //       "value": {
      //         "rawValue": "1",
      //         "formattedValue": "1.00"
      //       }
      //     }
      //   }
      // ])
    });

    it("should return onBlur event", () => {
      // use cy.stub for mock the onChange callback
      const callback = cy.stub();
      // and mount the story using @cypress/react library
      mount(<Decimal onBlur={callback} />);

      const inputValue = "test";

      // then run our tests
      cy.get(decimalComponent)
        .type(inputValue)
        .find("input")
        .blur({ force: true })
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });
});
