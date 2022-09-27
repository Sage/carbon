import * as React from "react";
import PopoverContainer from "./popover-container.component";
import Button from "../button";
import Portrait from "../portrait";
import { Select, Option } from "../select";

import { getDataElementByValue, getComponent } from "../../../cypress/locators";
import {
  popoverContainerContent,
  popoverContainerTitle,
  popoverCloseIcon,
  popoverSettingsIcon,
  popoverContainerComponent,
} from "../../../cypress/locators/popover-container/index";
import {
  selectListText,
  selectText,
} from "../../../cypress/locators/select/index";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { keyCode } from "../../../cypress/support/helper";

const testData = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];
const testCypress = "test-cypress";

const PopoverContainerComponent = ({ ...props }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const onOpen = () => setIsOpen(isOpen);
  const onClose = () => setIsOpen(!isOpen);

  return (
    <div
      style={{
        height: 150,
        margin: "100px",
      }}
    >
      <PopoverContainer
        title="Cypress is awesome"
        containerAriaLabel="popover-container"
        openButtonAriaLabel="open"
        open={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        {...props}
      >
        Contents
      </PopoverContainer>
    </div>
  );
};

const PopoverContainerWithSelect = () => {
  return (
    <div style={{ height: 100 }}>
      <PopoverContainer
        containerAriaLabel="popover-container"
        openButtonAriaLabel="open"
        title="select example"
      >
        <Select label="my select">
          <Option value="red" text="red" />
          <Option value="green" text="green" />
          <Option value="blue" text="blue" />
        </Select>
      </PopoverContainer>
    </div>
  );
};

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
      ["left", "132px 910px 560px 108px"],
      ["right", "132px 108px 560px 910px"],
    ])(
      "should render Popover Container with position prop set to %s",
      (position, insetValue) => {
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

        popoverContainerContent().should("have.css", "inset", insetValue);
      }
    );

    it.each([
      ["left", "148px 910px 544px 108px"],
      ["right", "148px 108px 544px 910px"],
    ])(
      "should render Popover Container with position prop set to %s when custom open component is used",
      (position, insetValue) => {
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

        popoverContainerContent().should("have.css", "inset", insetValue);
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

    it.each([["Enter"], ["Space"]])(
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

    it.each([["Enter"], ["Space"]])(
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
});
