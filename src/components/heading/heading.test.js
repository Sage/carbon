import * as React from "react";
import Heading from "./heading.component";
import Pill from "../../components/pill";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

import {
  headingPreview,
  headingTitle,
  subheaderPreview,
  dividerPreview,
  separatorPreview,
} from "../../../cypress/locators/heading";

import { pillPreview } from "../../../cypress/locators/pill";

import { getDataElementByValue, getComponent } from "../../../cypress/locators";

import { CHARACTERS } from "../../../cypress/support/component-helper/constants";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testData = ["https://carbon.sage.com/"];

const HeadingComponent = ({ ...props }) => {
  return (
    <Heading
      title="This is a Title"
      subheader="This is a subheader"
      {...props}
    />
  );
};

context("Testing Heading component", () => {
  describe("should render Heading component", () => {
    it.each(specialCharacters)(
      "should check children as %s for Heading component",
      (children) => {
        CypressMountWithProviders(
          <HeadingComponent> {children} </HeadingComponent>
        );
        headingPreview().contains(children);
      }
    );

    it.each(specialCharacters)(
      "should check title as %s for Heading component",
      (titleText) => {
        CypressMountWithProviders(<HeadingComponent title={titleText} />);
        headingTitle().should("have.text", titleText);
      }
    );

    it.each(specialCharacters)(
      "should check titleId as %s for Heading component",
      (titleId) => {
        CypressMountWithProviders(<HeadingComponent titleId={titleId} />);
        headingTitle().should("have.id", titleId);
      }
    );

    it.each(specialCharacters)(
      "should check subheader as %s for Heading component",
      (subheader) => {
        CypressMountWithProviders(<HeadingComponent subheader={subheader} />);
        subheaderPreview().should("have.text", subheader);
      }
    );

    it.each(specialCharacters)(
      "should check subtitleId as %s for Heading component",
      (subtitleId) => {
        CypressMountWithProviders(<HeadingComponent subtitleId={subtitleId} />);
        subheaderPreview().should("have.id", subtitleId);
      }
    );

    it.each(specialCharacters)(
      "should check help text as %s for Heading component",
      (helpText) => {
        CypressMountWithProviders(<HeadingComponent help={helpText} />);
        getComponent("help").realHover();
        getDataElementByValue("tooltip")
          .should("be.visible")
          .contains(helpText);
      }
    );

    it.each(testData)(
      "should check %s as help link for Heading component",
      (helpLink) => {
        CypressMountWithProviders(<HeadingComponent helpLink={helpLink} />);

        getComponent("help").should("have.attr", "href", helpLink);
      }
    );

    it.each(testData)(
      "should check %s as back link for Heading component",
      (backLink) => {
        CypressMountWithProviders(<HeadingComponent backLink={backLink} />);

        getComponent("link").children().should("have.attr", "href", backLink);
      }
    );

    it.each(specialCharacters)(
      "should check helpAriaLabel as %s for Heading component",
      (ariaLabel) => {
        CypressMountWithProviders(
          <HeadingComponent help="This is a Title" helpAriaLabel={ariaLabel} />
        );
        getComponent("help").should("have.attr", "aria-label", ariaLabel);
      }
    );

    it.each(specialCharacters)(
      "should check pill for Heading component",
      (pillText) => {
        CypressMountWithProviders(
          <HeadingComponent pills={<Pill>{pillText}</Pill>} />
        );
        pillPreview().should("have.text", pillText);
      }
    );

    it.each([true, false])(
      "should check when divider is %s for Heading component",
      (boolVal) => {
        CypressMountWithProviders(<HeadingComponent divider={boolVal} />);
        if (boolVal === true) {
          dividerPreview().should(
            "have.css",
            "background",
            "rgb(204, 214, 219) none repeat scroll 0% 0% / auto padding-box border-box"
          );
        } else {
          dividerPreview().should("not.exist");
        }
      }
    );

    it.each([true, false])(
      "should check when separator is %s for Heading component",
      (boolVal) => {
        CypressMountWithProviders(<HeadingComponent separator={boolVal} />);
        if (boolVal === true) {
          separatorPreview().should("have.css", "border-width", "2px 1px 1px");
        } else {
          separatorPreview().should("not.exist");
        }
      }
    );
  });
});
