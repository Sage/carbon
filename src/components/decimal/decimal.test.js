import * as React from "react";
import { mount } from "@cypress/react";
import Decimal from "./decimal.component";

import {
  fieldHelpPreview,
  getDataElementByValue,
  tooltipPreview,
} from "../../../cypress/locators/index";

// Decimal locator
const decimalComponent = '[data-component="decimal"]';

context("Tests for Decimal component", () => {
  describe("check props for Decimal component", () => {
    it("should input value and get proper output", () => {
      const input = [
        [0, "1", "1"],
        [0, "134^", "134^"],
        [0, "1234567789", "1,234,567,789"],
        [0, ",,,,,", ",,,,,"],
        [0, ".....", "....."],
        [0, "abc,.123,.!@.00", "abc,.123,.!@.00"],
        [0, "1,234$", "1,234$"],

        [1, "1", "1.0"],
        [1, "1.2", "1.2"],
        [1, "1.23", "1.23"],

        [2, "2", "2.00"],
        [2, "2.1", "2.10"],
        [2, "2.12", "2.12"],
        [2, "2.123", "2.123"],

        [3, "2.1", "2.100"],
        [3, "2.12", "2.120"],
        [3, "2.123", "2.123"],
        [3, "2.1234", "2.1234"],

        [4, "1.1234", "1.1234"],
        [4, "2", "2.0000"],
        [4, "234556654", "234,556,654.0000"],
        [4, "%^%^%<<,,,", "%^%^%<<,,,"],

        [5, "1", "1.00000"],
        [5, "1.12345", "1.12345"],
        [5, "1a.23", "1a.23"],

        [6, "2.123456", "2.123456"],
        [6, "2.1", "2.100000"],
        [6, "2a.12", "2a.12"],
        [6, "1,232.123", "1,232.123000"],

        [7, "1", "1.0000000"],
        [7, "2344.1234567", "2,344.1234567"],
        [7, "88652344.1234567", "88,652,344.1234567"],

        [8, "1", "1.00000000"],
        [8, "1.2", "1.20000000"],
        [8, "1.23", "1.23000000"],

        [9, "2", "2.000000000"],
        [9, "2.1", "2.100000000"],
        [9, "1222.12", "1,222.120000000"],
        [9, "2.123000000", "2.123000000"],

        [10, "2.1", "2.1000000000"],
        [10, "2.12", "2.1200000000"],
        [10, "1222.123", "1,222.1230000000"],
        [10, "2.12345", "2.1234500000"],

        [11, "1", "1.00000000000"],
        [11, "2345", "2,345.00000000000"],
        [11, "17899536472345", "17,899,536,472,345.00000000000"],

        [12, "1", "1.000000000000"],
        [12, "1.12345", "1.123450000000"],
        [12, "1a.23", "1a.23"],

        [13, "2", "2.0000000000000"],
        [13, "2.1", "2.1000000000000"],
        [13, "2a.12", "2a.12"],
        [13, "1232.123", "1,232.1230000000000"],

        [14, "2.1", "2.10000000000000"],
        [14, "2.12", "2.12000000000000"],
        [14, "2.123", "2.12300000000000"],
        [14, "1222.1234", "1,222.12340000000000"],

        [15, "1", "1.000000000000000"],
        [15, "2332.78", "2,332.780000000000000"],
        [15, "1a3.55", "1a3.55"],
        [15, "1.12345", "1.123450000000000"],
        [15, "1a.23", "1a.23"],
      ];

      input.map((item) => {
        // and mount the story using @cypress/react library
        mount(<Decimal precision={item[0]} />);

        // then run our tests
        cy.get(decimalComponent)
          .type(item[1])
          .find("input")
          .blur({ force: true });
        cy.get(decimalComponent).find("input").should("have.value", item[2]);
        return this;
      });
    });

    it("should input value and get proper output for different locales", () => {
      const input = [
        ["en", "1,1,1,1,1.1", "11,111.100"],
        ["en", "1,1,1222,12,1.1", "111,222,121.100"],
        ["en", "1,,1,,1", "1,,1,,1"],

        ["es-ES", "1.1.1.1.1.1,1", "111.111,100"],
        ["es-ES", "2.123", "2123,000"],
        ["es-ES", "21.21.111.1,013", "21.211.111,013"],
        ["es-ES", "2.,12.,1", "2.,12.,1"],

        ["fr", "11111,25", "11 111,250"],
        ["fr", "1  1  1  1  1,25", "1  1  1  1  1,25"],

        ["pt-PT", "1111,2", "1111,200"],
        ["pt-PT", "111 11,25", "11 111,250"],

        ["no-NO", "1 1 11,21", "1 111,210"],
        ["no-No", "111 1 1,2", "11 111,250"],
        ["no-NO", "1  1  1  1  1,25", "1  1  1  1  1,25"],
      ];

      input.map((item) => {
        // and mount the story using @cypress/react library
        mount(<Decimal locale={item[0]} precision={3} />);

        // then run our tests
        cy.get(decimalComponent)
          .type(item[1])
          .find("input")
          .blur({ force: true });
        cy.get(decimalComponent)
          .invoke("val")
          .then(($el) => {
            for (let number = 0; number < $el.length; number++) {
              expect(
                $el.replace(/(\s)|(&nbsp;)|(\u00a0)/g, " ").charCodeAt(number)
              ).to.equals(input.charCodeAt(number));
            }
          });
        return this;
      });
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

  describe("check Decimal input", () => {
    const testData = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];

    it("check label renders proper specific values", () => {
      // and mount the story using @cypress/react library
      testData.forEach((element) => {
        mount(<Decimal fieldHelp={element} />);

        // then run our tests
        fieldHelpPreview().should("have.text", element);
      });
    });

    it("check fieldHelp renders proper specific values", () => {
      // and mount the story using @cypress/react library
      testData.forEach((element) => {
        mount(<Decimal label={element} />);

        // then run our tests
        getDataElementByValue("label").should("have.text", element);
      });
    });

    it("check tooltip renders proper specific values", () => {
      // and mount the story using @cypress/react library
      testData.forEach((element) => {
        mount(<Decimal label="Label" labelHelp={element} />);

        // then run our tests
        getDataElementByValue("question").trigger("mouseover");
        tooltipPreview().should("have.text", element);
      });
    });

    it("check Decimal component accepts specific values", () => {
      // and mount the story using @cypress/react library
      mount(<Decimal />);

      testData.forEach((element) => {
        // then run our tests
        cy.get(decimalComponent)
          .type(element)
          .find("input")
          .blur({ force: true });
        cy.get(decimalComponent)
          .invoke("val")
          .then(($el) => {
            for (let number = 0; number < $el.length; number++) {
              expect(
                $el.replace(/(\s)|(&nbsp;)|(\u00a0)/g, " ").charCodeAt(number)
              ).to.equals(element.charCodeAt(number));
            }
          });
      });
    });

    it("check Decimal component accepts white spaces", () => {
      // and mount the story using @cypress/react library
      mount(<Decimal />);

      // then run our tests
      cy.get(decimalComponent).type("   ").find("input").blur({ force: true });
      cy.get(decimalComponent)
        .find("input")
        .should("have.attr", "value", "   ");
    });
  });

  describe("check events for Decimal component", () => {
    it("should return onChange event", () => {
      // use cy.stub for mock the onChange callback
      const callback = cy.stub().as("eventCallback");
      // and mount the story using @cypress/react library
      mount(<Decimal onChange={callback} />);

      const inputValue = "123";
      const iterable = [
        ["1", "1.00"],
        ["12", "12.00"],
        ["123", "123.00"],
      ];

      // then run our tests
      cy.get(decimalComponent)
        .type(inputValue)
        .find("input")
        .blur({ force: true })

        // first approach with .then
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledThrice;
          iterable.map((item, index) => {
            expect(
              callback.getCalls()[index].args[0].target.value.rawValue
            ).to.equals(item[0]);
            expect(
              callback.getCalls()[index].args[0].target.value.formattedValue
            ).to.equals(item[1]);
            return this;
          });
        });
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
          expect(
            callback.getCalls()[0].args[0].target.value.rawValue
          ).to.equals(inputValue);
          expect(
            callback.getCalls()[0].args[0].target.value.formattedValue
          ).to.equals(inputValue);
        });
    });
  });
});
