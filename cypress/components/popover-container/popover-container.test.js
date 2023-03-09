import React from "react";
import PopoverContainer from "../../../src/components/popover-container";
import Button from "../../../src/components/button";
import Portrait from "../../../src/components/portrait";
import {
  PopoverContainerComponent,
  PopoverContainerWithSelect,
} from "../../../src/components/popover-container/popover-container-test.stories";
import * as stories from "../../../src/components/popover-container/popover-container.stories";

import { getDataElementByValue, getComponent } from "../../locators";
import {
  popoverContainerContent,
  popoverContainerTitle,
  popoverCloseIcon,
  popoverSettingsIcon,
  popoverContainerComponent,
} from "../../locators/popover-container/index";
import { selectListText, selectText } from "../../locators/select/index";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { keyCode } from "../../../cypress/support/helper";
import { CHARACTERS } from "../../support/component-helper/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testCypress = "test-cypress";

context("Test for Popover Container component", () => {
  describe("check props for Popover Container component", () => {
    it.each(testData)(
      "should render Popover Container with title using %s special characters",
      (title) => {
        CypressMountWithProviders(<PopoverContainerComponent title={title} />);

        popoverContainerTitle().should("have.text", title);
      }
    );

    it.each([
      [true, "be.visible"],
      [false, "not.exist"],
    ])(
      "should render Popover Container with open prop set to %s",
      (boolean, assertion) => {
        CypressMountWithProviders(<PopoverContainerComponent open={boolean} />);

        popoverContainerContent().should(assertion);
      }
    );

    it.each([
      ["left", 123, 918, 568, 100],
      ["right", 123, 100, 568, 918],
    ])(
      "should render Popover Container with position prop set to %s",
      (position, inset0, inset1, inset2, inset3) => {
        CypressMountWithProviders(
          <div
            style={{
              float: position,
              clear: position,
            }}
          >
            <PopoverContainerComponent position={position} />
          </div>
        );

        popoverContainerContent().then(($el) => {
          const inset = $el.css("inset").split(" ");
          expect(parseInt(inset[0])).to.be.within(inset0 - 1, inset0 + 1);
          expect(parseInt(inset[1])).to.be.within(inset1 - 1, inset1 + 1);
          expect(parseInt(inset[2])).to.be.within(inset2 - 1, inset2 + 1);
          expect(parseInt(inset[3])).to.be.within(inset3 - 1, inset3 + 1);
        });
      }
    );

    it.each([
      ["left", 140, 918, 552, 100],
      ["right", 140, 100, 552, 918],
    ])(
      "should render Popover Container with position prop set to %s when custom open component is used",
      (position, inset0, inset1, inset2, inset3) => {
        CypressMountWithProviders(
          <div
            style={{
              float: position,
              clear: position,
            }}
          >
            <PopoverContainerComponent
              position={position}
              renderOpenComponent={({ onClick }) => (
                <Portrait onClick={onClick} />
              )}
            />
          </div>
        );

        popoverContainerContent().then(($el) => {
          const inset = $el.css("inset").split(" ");
          expect(parseInt(inset[0])).to.be.within(inset0 - 1, inset0 + 1);
          expect(parseInt(inset[1])).to.be.within(inset1 - 1, inset1 + 1);
          expect(parseInt(inset[2])).to.be.within(inset2 - 1, inset2 + 1);
          expect(parseInt(inset[3])).to.be.within(inset3 - 1, inset3 + 1);
        });
      }
    );

    it("should render Popover Container with ariaDescribedBy", () => {
      CypressMountWithProviders(
        <PopoverContainerComponent ariaDescribedBy={testCypress} />
      );

      popoverContainerContent().should(
        "have.attr",
        "aria-describedby",
        testCypress
      );
    });

    it("should render Popover Container with openButtonAriaLabel", () => {
      CypressMountWithProviders(
        <PopoverContainerComponent openButtonAriaLabel={testCypress} />
      );

      popoverContainerComponent()
        .children()
        .children()
        .should("have.attr", "aria-label", testCypress);
    });

    it("should render Popover Container with closeButtonAriaLabel", () => {
      CypressMountWithProviders(
        <PopoverContainerComponent closeButtonAriaLabel={testCypress} />
      );

      popoverCloseIcon().should("have.attr", "aria-label", testCypress);
    });

    it("should render Popover Container with containerAriaLabel", () => {
      CypressMountWithProviders(
        <PopoverContainerComponent containerAriaLabel={testCypress} />
      );

      popoverContainerContent().should("have.attr", "aria-label", testCypress);
    });

    it("should render Popover Container with renderOpenComponent", () => {
      CypressMountWithProviders(
        <PopoverContainerComponent
          open={false}
          renderOpenComponent={() => (
            <Button
              buttonType="primary"
              iconPosition="after"
              iconType="filter_new"
              size="medium"
            >
              Test
            </Button>
          )}
        />
      );

      getComponent("button").contains("Test").should("be.visible");
      getDataElementByValue("filter_new").should("be.visible");
      popoverContainerContent().should("not.exist");
    });

    it("should render Popover Container with renderCloseComponent", () => {
      CypressMountWithProviders(
        <PopoverContainerComponent
          renderCloseComponent={() => (
            <Button
              buttonType="secondary"
              iconPosition="before"
              iconType="close"
              size="small"
            >
              Test
            </Button>
          )}
        />
      );

      getComponent("button").contains("Test").should("be.visible");
      getDataElementByValue("close").should("be.visible");
      popoverContainerContent().should("be.visible");
    });

    it.each([
      [true, 93, 170],
      [false, 117, 194],
    ])(
      "should render Popover Container with shouldCoverButton prop set to %s",
      (boolean, yAndTopValueMin, bottomValueMin) => {
        CypressMountWithProviders(
          <div
            style={{
              height: 330,
            }}
          >
            <PopoverContainerComponent shouldCoverButton={boolean} />
          </div>
        );

        popoverContainerContent().then(($el) => {
          const position = $el[0].getBoundingClientRect();

          expect(position.bottom).to.be.lessThan(bottomValueMin);
          expect(position.top).to.be.lessThan(yAndTopValueMin);
          expect(position.y).to.be.lessThan(yAndTopValueMin);
        });
      }
    );

    it.each(["Enter", "Space"])(
      "should open Popover Container using %s keyboard key",
      (key) => {
        CypressMountWithProviders(
          <PopoverContainer title="Cypress is awesome">
            Contents
          </PopoverContainer>
        );

        popoverSettingsIcon().trigger("keydown", keyCode(key));
        popoverContainerContent().should("be.visible");
      }
    );

    it.each(["Enter", "Space"])(
      "should close Popover Container using %s keyboard key",
      (key) => {
        CypressMountWithProviders(
          <PopoverContainer title="Cypress is awesome">
            Contents
          </PopoverContainer>
        );

        popoverSettingsIcon().click();
        popoverCloseIcon().trigger("keydown", keyCode(key));
        popoverContainerContent().should("not.exist");
      }
    );

    it("should not close Popover Container when an option is selected from Select component inside", () => {
      CypressMountWithProviders(<PopoverContainerWithSelect />);
      popoverSettingsIcon().click();
      selectText().click();
      selectListText("green").click();
      popoverContainerContent().should("be.visible");
    });
  });

  describe("check events for Popover Container component", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onOpen callback when a click event is triggered", () => {
      CypressMountWithProviders(<PopoverContainer onOpen={callback} />);

      popoverSettingsIcon()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it.each([["Enter"], ["Space"]])(
      "should call onOpen callback when a keyboard event is triggered",
      (key) => {
        CypressMountWithProviders(<PopoverContainer onOpen={callback} />);

        popoverSettingsIcon()
          .trigger("keydown", keyCode(key))
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

    it("should call onClose callback when a click event is triggered", () => {
      CypressMountWithProviders(
        <PopoverContainerComponent onClose={callback} open />
      );

      popoverCloseIcon()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it.each([["Enter"], ["Space"]])(
      "should call onClose callback when a keyboard event is triggered",
      (key) => {
        CypressMountWithProviders(
          <PopoverContainerComponent onClose={callback} open />
        );

        popoverCloseIcon()
          .trigger("keydown", keyCode(key))
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );
  });

  describe("Accessibility tests for Popover Container component", () => {
    it("should pass accessibilty tests for Popover Container Default story", () => {
      CypressMountWithProviders(<stories.Default />);

      popoverSettingsIcon().click();
      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for Popover Container Title story", () => {
      CypressMountWithProviders(<stories.Title />);

      popoverSettingsIcon().click();
      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for Popover Container Position story", () => {
      CypressMountWithProviders(<stories.Position />);

      popoverSettingsIcon().click();
      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for Popover Container CoverButton story", () => {
      CypressMountWithProviders(<stories.CoverButton />);

      popoverSettingsIcon().click();
      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for Popover Container RenderProps story", () => {
      CypressMountWithProviders(<stories.RenderProps />);

      popoverSettingsIcon().click();
      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for Popover Container Controlled story", () => {
      CypressMountWithProviders(<stories.Controlled />);

      popoverSettingsIcon().click();
      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for Popover Container Complex story", () => {
      CypressMountWithProviders(<stories.Complex />);

      popoverSettingsIcon().click();
      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for Popover Container Filter story", () => {
      CypressMountWithProviders(<stories.Filter />);

      popoverSettingsIcon().click();
      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for Popover Container Filter story with filter button clicked", () => {
      CypressMountWithProviders(<stories.Filter />);

      popoverSettingsIcon().click();
      cy.get(`[role="checkbox"]`).eq(0).check();
      cy.get(`[role="checkbox"]`).eq(1).check();
      cy.get(`[role="checkbox"]`).eq(2).check();
      getDataElementByValue("main-text")
        .eq(1)
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          cy.checkAccessibility();
        });
    });
  });
});
