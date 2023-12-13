import React from "react";
import PopoverContainer, {
  PopoverContainerProps,
} from "../../../src/components/popover-container";
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
import { keyCode, pressESCKey } from "../../support/helper";
import { CHARACTERS } from "../../support/component-helper/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testCypress = "test-cypress";
const keyToTrigger = ["Space", "Enter"] as const;

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
      ["left", 124, 671, 568, 347],
      ["right", 124, 347, 568, 671],
    ] as [PopoverContainerProps["position"], number, number, number, number][])(
      "when position prop is %s, Popover Container has correct absolute positioning",
      (position, top, right, bottom, left) => {
        CypressMountWithProviders(
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <PopoverContainerComponent position={position} />
          </div>
        );

        popoverContainerContent().should("have.css", "position", "absolute");
        popoverContainerContent().should(($element) => {
          expect(parseInt($element.css("top"))).to.be.approximately(top, 2);
          expect(parseInt($element.css("right"))).to.be.approximately(right, 2);
          expect(parseInt($element.css("bottom"))).to.be.approximately(
            bottom,
            2
          );
          expect(parseInt($element.css("left"))).to.be.approximately(left, 2);
        });
      }
    );

    it.each([
      ["left", 145, 662, 547, 356],
      ["right", 145, 356, 547, 662],
    ] as [PopoverContainerProps["position"], number, number, number, number][])(
      "when position prop set to %s and a custom open component is used, Popover Container has correct absolute positioning",
      (position, top, right, bottom, left) => {
        CypressMountWithProviders(
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <PopoverContainerComponent
              position={position}
              renderOpenComponent={({
                onClick,
              }: {
                onClick: (ev: React.MouseEvent<HTMLElement>) => void;
              }) => <Portrait onClick={onClick} />}
            />
          </div>
        );

        popoverContainerContent().should("have.css", "position", "absolute");
        popoverContainerContent().should(($element) => {
          expect(parseInt($element.css("top"))).to.be.approximately(top, 2);
          expect(parseInt($element.css("right"))).to.be.approximately(right, 2);
          expect(parseInt($element.css("bottom"))).to.be.approximately(
            bottom,
            2
          );
          expect(parseInt($element.css("left"))).to.be.approximately(left, 2);
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

          cy.wrap(position.bottom).should("be.lessThan", bottomValueMin);
          cy.wrap(position.top).should("be.lessThan", yAndTopValueMin);
          cy.wrap(position.y).should("be.lessThan", yAndTopValueMin);
        });
      }
    );

    it.each([...keyToTrigger])(
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

    it.each([...keyToTrigger])(
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

    it("should close Popover Container using escape keyboard key", () => {
      CypressMountWithProviders(
        <PopoverContainer title="Cypress is awesome">Contents</PopoverContainer>
      );

      popoverSettingsIcon().click();
      pressESCKey();
      popoverContainerContent().should("not.exist");
    });

    it("should not close Popover Container when an option is selected from Select component inside", () => {
      CypressMountWithProviders(<PopoverContainerWithSelect />);
      popoverSettingsIcon().click();
      selectText().click();
      selectListText("green").click();
      popoverContainerContent().should("be.visible");
    });

    it("should not close Popover Container when the escape key is pressed and the Select List is open", () => {
      CypressMountWithProviders(<PopoverContainerWithSelect />);
      popoverSettingsIcon().click();
      selectText().click();
      selectListText("red").trigger("keydown", keyCode("downarrow"));
      pressESCKey();
      selectListText("red").should("not.be.visible");
      popoverContainerContent().should("be.visible");
    });

    it("should close Popover Container when the escape key is pressed with focus on the Select component", () => {
      CypressMountWithProviders(<PopoverContainerWithSelect />);
      popoverSettingsIcon().click();
      selectText().click();
      pressESCKey();
      pressESCKey();
      popoverContainerContent().should("not.exist");
    });
  });

  describe("check events for Popover Container component", () => {
    it("should call onOpen callback when a click event is triggered", () => {
      const callback: PopoverContainerProps["onOpen"] = cy.stub().as("onOpen");
      CypressMountWithProviders(<PopoverContainer onOpen={callback} />);

      popoverSettingsIcon().click();
      cy.get("@onOpen").should("have.been.calledOnce");
    });

    it.each([...keyToTrigger])(
      "should call onOpen callback when a keyboard event is triggered by %s key",
      (key) => {
        const callback: PopoverContainerProps["onOpen"] = cy
          .stub()
          .as("onOpen");
        CypressMountWithProviders(<PopoverContainer onOpen={callback} />);

        popoverSettingsIcon().trigger("keydown", keyCode(key));
        cy.get("@onOpen").should("have.been.calledOnce");
      }
    );

    it("should call onClose callback when a click event is triggered", () => {
      const callback: PopoverContainerProps["onClose"] = cy
        .stub()
        .as("onClose");
      CypressMountWithProviders(
        <PopoverContainerComponent onClose={callback} open />
      );

      popoverCloseIcon().click();
      cy.get("@onClose").should("have.been.calledOnce");
    });

    it.each([...keyToTrigger])(
      "should call onClose callback when a keyboard event is triggered",
      (key) => {
        const callback: PopoverContainerProps["onClose"] = cy
          .stub()
          .as("onClose");
        CypressMountWithProviders(
          <PopoverContainerComponent onClose={callback} open />
        );

        popoverCloseIcon().trigger("keydown", keyCode(key));
        cy.get("@onClose").should("have.been.calledOnce");
      }
    );

    it("should call onClose callback when the escape is pressed", () => {
      const callback: PopoverContainerProps["onClose"] = cy
        .stub()
        .as("onClose");
      CypressMountWithProviders(
        <PopoverContainerComponent onClose={callback} open />
      );

      pressESCKey();
      cy.get("@onClose").should("have.been.calledOnce");
    });

    it("should call onClose callback when a click event is triggered outside the container", () => {
      const callback: PopoverContainerProps["onClose"] = cy
        .stub()
        .as("onClose");
      CypressMountWithProviders(
        <PopoverContainerComponent onClose={callback} open />
      );

      cy.root().click();
      cy.get("@onClose").should("have.been.calledOnce");
    });

    it("should not call onClose callback when a click event is triggered outside the container and the container is closed", () => {
      const callback: PopoverContainerProps["onClose"] = cy
        .stub()
        .as("onClose");
      CypressMountWithProviders(
        <PopoverContainerComponent onClose={callback} open={false} />
      );

      cy.root().click();
      cy.get("@onClose").should("not.have.been.called");
    });
  });

  describe("Accessibility tests for Popover Container component", () => {
    it("should pass accessibility tests for Popover Container Default story", () => {
      CypressMountWithProviders(<stories.Default />);

      popoverSettingsIcon().click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Popover Container Title story", () => {
      CypressMountWithProviders(<stories.Title />);

      popoverSettingsIcon().click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Popover Container Position story", () => {
      CypressMountWithProviders(<stories.Position />);

      popoverSettingsIcon().click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Popover Container CoverButton story", () => {
      CypressMountWithProviders(<stories.CoverButton />);

      popoverSettingsIcon().click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Popover Container RenderProps story", () => {
      CypressMountWithProviders(<stories.RenderProps />);

      popoverSettingsIcon().click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Popover Container Controlled story", () => {
      CypressMountWithProviders(<stories.Controlled />);

      popoverSettingsIcon().click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Popover Container Complex story", () => {
      CypressMountWithProviders(<stories.Complex />);

      popoverSettingsIcon().click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Popover Container Filter story", () => {
      CypressMountWithProviders(<stories.Filter />);

      popoverSettingsIcon().click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Popover Container Filter story with filter button clicked", () => {
      CypressMountWithProviders(<stories.Filter />);

      popoverSettingsIcon().click();
      cy.get(`[role="checkbox"]`).eq(0).check();
      cy.get(`[role="checkbox"]`).eq(1).check();
      cy.get(`[role="checkbox"]`).eq(2).check();
      getDataElementByValue("main-text").eq(1).click();
      getComponent("pill").eq(0).should("be.visible");
      getComponent("pill").eq(1).should("be.visible");
      getComponent("pill").eq(2).should("be.visible");
      cy.checkAccessibility();
    });
  });

  describe("Border Radius tests for Popover Container component", () => {
    it("should render with the expected border radius styling", () => {
      CypressMountWithProviders(<PopoverContainerComponent title="Foo" open />);

      popoverContainerContent().should("have.css", "border-radius", "8px");
    });
  });
});
