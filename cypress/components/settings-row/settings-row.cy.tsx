import React from "react";
import Link from "../../../src/components/link";
import { SettingsRowComponent } from "../../../src/components/settings-row/settings-row-test.stories";
import * as stories from "../../../src/components/settings-row/settings-row.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { SettingsRowProps } from "../../../src/components/settings-row";
import { getDataElementByValue } from "../../locators";
import {
  settingsRowPreview,
  settingsRowChildren,
  settingsRowDescription,
} from "../../locators/settings-row/index";
import { CHARACTERS } from "../../support/component-helper/constants";
import { checkOutlineCss } from "../../support/component-helper/common-steps";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

context("Tests for SettingsRow component", () => {
  describe("should check SettingsRow component properties", () => {
    it.each(testData)(
      "should check %s as title for SettingsRow component",
      (title) => {
        CypressMountWithProviders(<SettingsRowComponent title={title} />);
        getDataElementByValue("title").should("have.text", title);
      }
    );

    it.each([
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
    ] as SettingsRowProps["headingType"][])(
      "should check HTML heading element is correct when headingType is %s",
      (headingType) => {
        CypressMountWithProviders(
          <SettingsRowComponent
            headingType={headingType}
            title="foo"
            description="bar"
          />
        );

        cy.get(String(headingType)).contains("foo");
      }
    );

    it.each(testData)(
      "should check %s as description for SettingsRow component",
      (description) => {
        CypressMountWithProviders(
          <SettingsRowComponent description={description} />
        );
        settingsRowDescription().should("have.text", description);
      }
    );

    it("should check link as description for SettingsRow component", () => {
      const textDesc = "This is a link";
      const linkDesc = (
        <Link href="https://carbon.sage.com/?path=/docs/setting-row--default-story">
          {textDesc}
        </Link>
      );
      CypressMountWithProviders(
        <SettingsRowComponent description={linkDesc} />
      );
      settingsRowDescription().should("have.text", textDesc);
    });

    it.each([true, false])(
      "should check when divider property is %s for SettingsRow component",
      (bool) => {
        CypressMountWithProviders(<SettingsRowComponent divider={bool} />);
        if (bool) {
          settingsRowPreview().then((elem) => {
            checkOutlineCss(
              elem,
              1,
              "border-bottom",
              "solid",
              "rgb(230, 235, 237)"
            );
            settingsRowPreview().should("have.css", "padding-bottom", "30px");
          });
        } else {
          settingsRowPreview()
            .should(
              "not.have.css",
              "border-bottom",
              "1px solid rgb(230, 235, 237)"
            )
            .and("not.have.css", "padding-bottom", "30px");
        }
      }
    );

    it.each(testData)(
      "should check %s as className for SettingsRow component",
      (className) => {
        CypressMountWithProviders(
          <SettingsRowComponent className={className} />
        );
        settingsRowPreview().should("have.class", className);
      }
    );

    it.each(testData)(
      "should check %s as children for SettingsRow component",
      (children) => {
        CypressMountWithProviders(
          <SettingsRowComponent>{children}</SettingsRowComponent>
        );
        settingsRowChildren().should("have.text", children);
      }
    );
  });
  describe("check accessibility for SettingsRow component", () => {
    it("should pass accessibility tests for SettingsRow Default story", () => {
      CypressMountWithProviders(<stories.Default />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for SettingsRow HeadingType story", () => {
      CypressMountWithProviders(<stories.HeadingType />);

      cy.checkAccessibility();
    });
  });
});
