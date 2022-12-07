import React from "react";
import Link from "../link";
import SettingsRow from "./settings-row.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { getDataElementByValue } from "../../../cypress/locators";
import {
  settingsRowPreview,
  settingsRowChildren,
  settingsRowDescription,
} from "../../../cypress/locators/settings-row/index";
import { CHARACTERS } from "../../../cypress/support/component-helper/constants";
import { checkOutlineCss } from "../../../cypress/support/component-helper/common-steps";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const SettingsRowComponent = ({ ...props }) => {
  return <SettingsRow title="title" description="description" {...props} />;
};

context("Tests for SettingsRow component", () => {
  describe("should check SettingsRow component properties", () => {
    it.each(testData)(
      "should check %s as title for SettingsRow component",
      (title) => {
        CypressMountWithProviders(<SettingsRowComponent title={title} />);
        getDataElementByValue("title").should("have.text", title);
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
            expect(elem.css("padding-bottom")).to.equals("30px");
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
});
