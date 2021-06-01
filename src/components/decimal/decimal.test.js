import * as React from "react";
import { mount } from "@cypress/react";
import Decimal from "./decimal.component";

// Decimal locator
const decimalComponent = '[data-component="decimal"]';

describe("Tests for precision for Decimal component", () => {
  // beforeEach(() => {
  //   // before we are inside a hook executing as part of the test
  //   // we can use cy.on methods and create stubs, something
  //   // we could not do from Cypress.on callbacks
  //   const returnValueStub = cy.stub().as('returnValue')

  //   cy.on('window:before:load', (win) => {
  //     let userCallback, ourCallback
  //     Object.defineProperty(win, 'onbeforeunload', {
  //       get() {
  //         return ourCallback
  //       },
  //       set(cb) {
  //         userCallback = cb
  //         console.log('user callback', cb)

  //         ourCallback = (e) => {
  //           console.log('proxy beforeunload event', e)

  //           // prevent the application code from assigning value
  //           Object.defineProperty(e, 'returnValue', {
  //             get() {
  //               return ''
  //             },
  //             set: returnValueStub,
  //           })

  //           const result = userCallback(e)
  //           return result
  //         }

  //         // https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
  //         win.addEventListener('beforeunload', ourCallback)
  //       },
  //     })
  //   })
  // })

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
      cy.get(decimalComponent).find("input").should("have.value", outputValue);

      // cy.get('@returnValue')
      //   .should('have.been.called')
      //   .and('be.calledWithExactly', 'onChange');
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
      cy.get(decimalComponent).find("input").should("have.value", outputValue);
      // cy.storyAction("onChange").should("have.been.called");
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
    // cy.storyAction("onChange").should("have.been.called");
  });
});
