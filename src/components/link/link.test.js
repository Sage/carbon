import * as React from "react";
import Link from "./link.component";

import {
  icon,
  tooltipPreview,
  link,
  getDataElementByValue,
  body,
} from "../../../cypress/locators";
import { skipLink } from "../../../cypress/locators/link/index";
import { keyCode } from "../../../cypress/support/helper";
import { CHARACTERS } from "../../../cypress/support/component-helper/constants";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testCypress = "test-cypress";

const LinkComponent = ({ ...props }) => {
  return (
    <div
      style={{
        margin: "100px",
      }}
    >
      <Link href="#foo" target="_blank" rel="noreferrer noopener" {...props}>
        This is a link
      </Link>
    </div>
  );
};

context("Test for Link component", () => {
  describe("check props for Link component", () => {
    it.each(testData)(
      "should render Link className using %s special characters",
      (className) => {
        CypressMountWithProviders(<LinkComponent className={className} />);

        link().should("have.attr", "class").and("contain", className);
      }
    );

    it("should render Link disabled", () => {
      CypressMountWithProviders(<LinkComponent disabled />);

      link().should("have.attr", "disabled");
      link().children().should("have.css", "color", "rgba(0, 0, 0, 0.3)");
    });

    it("should render Link with icon prop", () => {
      CypressMountWithProviders(<LinkComponent icon="add" />);

      getDataElementByValue("add").should("be.visible");
    });

    it.each([
      ["left", 0],
      ["right", 1],
    ])(
      "should render Link with iconAlign prop set to %s",
      (iconAlign, iconPosition) => {
        CypressMountWithProviders(
          <LinkComponent icon="add" iconAlign={iconAlign} />
        );

        link().find("span").eq(iconPosition).should("be.visible");
      }
    );

    it("should render Link with href prop", () => {
      CypressMountWithProviders(<LinkComponent href={testCypress} />);

      link().children().should("have.attr", "href", testCypress);
    });

    it("should render Link with tooltipMessage prop", () => {
      CypressMountWithProviders(
        <LinkComponent icon="add" tooltipMessage={testCypress} />
      );

      icon().realHover();
      tooltipPreview().should("have.text", testCypress);
    });

    it.each([["top"], ["bottom"], ["left"], ["right"]])(
      "should render Link with tooltipPosition prop set to %s",
      (tooltipPosition) => {
        CypressMountWithProviders(
          <LinkComponent
            icon="add"
            tooltipMessage={testCypress}
            tooltipPosition={tooltipPosition}
          />
        );

        icon().realHover();
        tooltipPreview()
          .should("be.visible")
          .and("have.attr", "data-placement", tooltipPosition);
      }
    );

    it.each([["_blank"], ["_self"], ["_parent"], ["_top"]])(
      "should render Link with target prop set to %s",
      (target) => {
        CypressMountWithProviders(<LinkComponent target={target} />);

        link().children().should("have.attr", "target", target);
      }
    );

    it("should render Link with ariaLabel prop", () => {
      CypressMountWithProviders(<LinkComponent ariaLabel={testCypress} />);

      link().children().should("have.attr", "aria-label", testCypress);
    });

    it.each([["noopener"], ["noreferrer"], ["opener"]])(
      "should render Link with rel prop set to %s",
      (rel) => {
        CypressMountWithProviders(<LinkComponent rel={rel} />);

        link().children().should("have.attr", "rel", rel);
      }
    );

    it("should render Link with isSkipLink prop", () => {
      CypressMountWithProviders(<LinkComponent isSkipLink />);

      body().tab();
      skipLink()
        .should("be.visible")
        .and("have.css", "background-color", "rgb(255, 255, 255)")
        .and("have.css", "font-size", "16px")
        .and("have.css", "padding-left", "24px")
        .and("have.css", "padding-right", "24px");
    });
  });

  it.each([
    ["default", "rgb(0, 126, 69)"],
    ["negative", "rgb(203, 55, 74)"],
    ["neutral", "rgba(0, 0, 0, 0.9)"],
  ])(
    "should render Link with variant prop set to %s",
    (variant, defaultColor) => {
      CypressMountWithProviders(<LinkComponent variant={variant} />);

      link().children().should("have.css", "color", defaultColor);
    }
  );

  it.each([
    ["default", "rgb(0, 103, 56)"],
    ["negative", "rgb(162, 44, 59)"],
    ["neutral", "rgb(0, 103, 56)"],
  ])(
    "should render Link with correct hover state with variant prop set to %s",
    (variant, hoverColor) => {
      CypressMountWithProviders(<LinkComponent variant={variant} />);

      link().children().realHover().should("have.css", "color", hoverColor);
    }
  );

  it.each([
    ["default", "rgb(25, 142, 89)"],
    ["negative", "rgb(208, 75, 92)"],
    ["neutral", "rgb(25, 142, 89)"],
  ])(
    "should render Link with correct hover state with isDarkBackground prop set with %s variant",
    (variant, hoverColor) => {
      CypressMountWithProviders(
        <LinkComponent variant={variant} isDarkBackground />
      );

      link().children().realHover().should("have.css", "color", hoverColor);
    }
  );

  it("should render Link with correct focus state", () => {
    CypressMountWithProviders(<LinkComponent />);

    link()
      .children()
      .focus()
      .should("have.css", "background-color", "rgb(255, 218, 128)")
      .and("have.css", "color", "rgba(0, 0, 0, 0.9)");
  });

  describe("check events for Link component", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onClick callback when a click event is triggered", () => {
      CypressMountWithProviders(<LinkComponent onClick={callback} />);

      link()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onKeyDown callback when a blur event is triggered", () => {
      CypressMountWithProviders(<LinkComponent onKeyDown={callback} />);

      link()
        .trigger("keydown", keyCode("rightarrow"))
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onMouseDown callback when a keydown event is triggered", () => {
      CypressMountWithProviders(<LinkComponent onMouseDown={callback} />);

      link()
        .trigger("mousedown")
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });
});
