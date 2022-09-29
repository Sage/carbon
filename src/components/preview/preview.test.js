import * as React from "react";
import Preview from ".";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { cyRoot } from "../../../cypress/locators/index";
import {
  previewComponent,
  lineComponent,
} from "../../../cypress/locators/preview/index";

const testData = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];
const pixelsData = [256, 275, 300];

const PreviewComponent = ({ ...props }) => {
  return <Preview loading {...props} />;
};

context("Tests for Preview component", () => {
  describe("should check Preview component properties", () => {
    it.each(pixelsData)(
      "should check height as %spx for Preview component",
      (height) => {
        CypressMountWithProviders(<PreviewComponent height={`${height}px`} />);
        previewComponent().should("have.css", "height", `${height}px`);
      }
    );

    it.each(pixelsData)(
      "should check width as %spx for Preview component",
      (width) => {
        CypressMountWithProviders(<PreviewComponent width={`${width}px`} />);
        previewComponent().should("have.css", "width", `${width}px`);
      }
    );

    it.each(testData)(
      "should check children as %s for Preview component",
      (children) => {
        CypressMountWithProviders(<Preview>{children}</Preview>);
        cyRoot().should("have.text", children);
      }
    );

    it.each([
      [true, "be.visible"],
      [false, "not.exist"],
    ])(
      "should check when loading is %s for Preview component",
      (bool, state) => {
        CypressMountWithProviders(<PreviewComponent loading={bool} />);
        previewComponent().should(state);
      }
    );

    it.each([5, 6, 8, 10])(
      "should check %s loading lines for Preview component",
      (line) => {
        CypressMountWithProviders(<PreviewComponent lines={line} />);
        lineComponent().should("have.length", line);
      }
    );
  });
});
