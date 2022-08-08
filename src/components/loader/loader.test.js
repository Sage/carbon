import * as React from "react";
import Loader from "./loader.component";
import Button from "../button/button.component";
import { LOADER_SIZES } from "./loader.config";

import { loader, loaderInsideButton } from "../../../cypress/locators/loader";

import { positionOfElement } from "../../../cypress/support/helper";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

const LoaderInsideButton = ({ ...props }) => {
  return (
    <Button buttonType="primary" aria-label="Loading">
      <Loader isInsideButton {...props} />
    </Button>
  );
};

context("Test for Loader component", () => {
  describe("check props for Loader component", () => {
    it.each([
      [LOADER_SIZES[0], 12, 6],
      [LOADER_SIZES[1], 16, 8],
      [LOADER_SIZES[2], 20, 8],
    ])("should render Loader using %s as size", (size, height, margin) => {
      CypressMountWithProviders(<Loader size={size} />);

      loader(positionOfElement("first"))
        .should("have.css", "height", `${height}px`)
        .and("have.css", "width", `${height}px`)
        .and("have.css", "margin-right", `${margin}px`)
        .and("have.css", "animation-delay", "0s");
      loader(positionOfElement("second"))
        .should("have.css", "height", `${height}px`)
        .and("have.css", "width", `${height}px`)
        .and("have.css", "margin-right", `${margin}px`)
        .and("have.css", "animation-delay", "0.2s");
      loader(positionOfElement("third"))
        .should("have.css", "height", `${height}px`)
        .and("have.css", "width", `${height}px`)
        .and("have.css", "margin-right", "0px")
        .and("have.css", "animation-delay", "0.4s");
    });

    it.each([
      [LOADER_SIZES[0], 100],
      [LOADER_SIZES[1], 116],
      [LOADER_SIZES[2], 128],
    ])("should render Loader using %s as size in Button", (size, width) => {
      CypressMountWithProviders(<LoaderInsideButton size={size} />);

      loaderInsideButton()
        .should("have.css", "height", "40px")
        .and("have.css", "width", `${width}px`);
    });

    it("should render Loader inside the Button component with correct color", () => {
      CypressMountWithProviders(<LoaderInsideButton />);

      const color = "rgb(255, 255, 255)";

      loader(positionOfElement("first"))
        .should("be.visible")
        .and("have.css", "color", color);
      loader(positionOfElement("second"))
        .should("be.visible")
        .and("have.css", "color", color);
      loader(positionOfElement("third"))
        .should("be.visible")
        .and("have.css", "color", color);
    });

    it("should render Loader with aria-label prop", () => {
      CypressMountWithProviders(<Loader aria-label="cypress-aria" />);

      loader(positionOfElement("first"))
        .parent()
        .should("have.attr", "aria-label", "cypress-aria");
    });

    it("should render Loader with isActive prop set to false", () => {
      CypressMountWithProviders(<LoaderInsideButton isActive={false} />);

      const color = "rgb(255, 255, 255)";

      loader(positionOfElement("first")).should(
        "have.css",
        "background-color",
        color
      );
      loader(positionOfElement("second")).should(
        "have.css",
        "background-color",
        color
      );
      loader(positionOfElement("third")).should(
        "have.css",
        "background-color",
        color
      );
    });

    it("should render Loader inside the Button component and be able to focus it", () => {
      CypressMountWithProviders(<LoaderInsideButton />);

      loaderInsideButton()
        .focus()
        .should("have.css", "outline-color", "rgb(255, 181, 0)");
    });
  });
});
