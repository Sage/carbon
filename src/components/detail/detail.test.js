import * as React from "react";
import { mount } from "@cypress/react";
import Detail from "./detail.component";

import {
  childrenPreview,
  footnotePreview,
} from "../../../cypress/locators/detail/index";

import { icon } from "../../../cypress/locators";

const testData = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];

context("Tests for Detail component", () => {
  describe("check Detail component text input", () => {
    it.each(testData)(
      "check Detail children on preview is %s children value",
      (childrenValue) => {
        // and mount the story using @cypress/react library
        mount(<Detail>{childrenValue}</Detail>);

        // then run our tests
        childrenPreview().should("have.text", childrenValue);
      }
    );

    it.each(testData)(
      "check Detail footnote on preview is %s footnote value",
      (footnoteValue) => {
        // and mount the story using @cypress/react library
        mount(<Detail footnote={footnoteValue}> </Detail>);

        // then run our tests
        footnotePreview().should("have.text", footnoteValue);
      }
    );
  });

  describe("check icon in Detail component is chevron_up", () => {
    it("should set Detail icon on preview to chevron_up", () => {
      // and mount the story using @cypress/react library
      mount(<Detail icon="chevron_up"> </Detail>);

      // then run our tests
      icon().should("have.attr", "type", "chevron_up").and("be.visible");
    });
  });
});
