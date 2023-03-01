import React from "react";
import * as stories from "./carbon-provider.stories";
import Button from "../button/button.component";
import Link from "../link/link.component";
import Loader from "../loader/loader.component";
import LoaderBar from "../loader-bar/loader-bar.component";
import MultiActionButton from "../multi-action-button/multi-action-button.component";
import Pill from "../pill/pill.component";
import SplitButton from "../split-button/split-button.component";
import StepSequenceItem from "../step-sequence/step-sequence-item/step-sequence-item.component";
import { Tabs, Tab } from "../tabs";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

import {
  sageTheme,
  mintTheme,
  noTheme,
  aegeanTheme,
} from "../../style/themes/index";
import { buttonDataComponent } from "../../../cypress/locators/button";
import {
  linkComponent,
  loaderBarComponent,
  loaderComponent,
} from "../../../cypress/locators/themes";
import { pillPreview } from "../../../cypress/locators/pill";
import { stepSequenceDataComponentItem } from "../../../cypress/locators/step-sequence";
import { getDataElementByValue } from "../../../cypress/locators";
import { multiActionButtonComponent } from "../../../cypress/locators/multi-action-button";
import { splitMainButton } from "../../../cypress/locators/split-button";

const themes = [mintTheme, aegeanTheme, noTheme, sageTheme];

const buildTestArray = (array) =>
  themes.map((theme, i) => [theme.name, theme, array[i]]);
const buildTestDataWithTwoArrays = (firstArray, secondArray) =>
  themes.map((theme, i) => [theme.name, theme, firstArray[i], secondArray[i]]);

const commonColors = [
  "rgb(0, 125, 90)",
  "rgb(0, 115, 194)",
  "rgb(0, 130, 0)",
  "rgb(0, 126, 69)",
];

const commonColorsOnHover = [
  "rgb(0, 96, 70)",
  "rgb(0, 92, 154)",
  "rgb(0, 99, 0)",
  "rgb(0, 103, 56)",
];

const multiButtonOnHover = [
  "rgb(0, 64, 46)",
  "rgb(0, 68, 114)",
  "rgb(0, 77, 42)",
  "rgb(0, 77, 42)",
];

const stepSequnceColors = [
  "rgb(0, 125, 90)",
  "rgb(0, 115, 194)",
  "rgb(0, 138, 33)",
  "rgb(0, 138, 33)",
];

const loaderBarColors = [
  "rgb(179, 227, 214)",
  "rgb(179, 214, 239)",
  "rgb(179, 224, 179)",
  "rgb(179, 217, 200)",
];

context("Testing Carbon Provider component", () => {
  describe.each(buildTestArray(commonColors))(
    "should render components with %s theme",
    (theme, themeName, color) => {
      it("Button component and verify theme color", () => {
        CypressMountWithProviders(<Button>Small</Button>, themeName);

        buttonDataComponent().should("have.css", "color", color);
      });

      it("Link component and verify theme color", () => {
        CypressMountWithProviders(
          <Link
            href="https://carbon.sage.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            This is a link
          </Link>,
          themeName
        );

        linkComponent().children().should("have.css", "color", color);
      });

      it("Loader component and verify theme color", () => {
        CypressMountWithProviders(<Loader />, themeName);

        loaderComponent().should("have.css", "background-color", color);
      });

      it("MultiActionButton component and verify theme color", () => {
        CypressMountWithProviders(
          <MultiActionButton text="Multi Action Button">
            <Button href="#">Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
          </MultiActionButton>,
          themeName
        );

        buttonDataComponent()
          .should("have.css", "color", color)
          .and("have.css", "border-color", color);
      });

      it("Pill component and verify theme color", () => {
        CypressMountWithProviders(<Pill />, themeName);

        pillPreview().should("have.css", "border-color", color);
      });

      it("SplitButton component and verify theme color", () => {
        CypressMountWithProviders(
          <SplitButton text="Split button">
            <Button>Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
          </SplitButton>,
          themeName
        );

        buttonDataComponent()
          .should("have.css", "color", color)
          .and("have.css", "border-color", color);
      });

      it("Tabs component and verify theme color", () => {
        CypressMountWithProviders(
          <Tabs align="left" position="top">
            <Tab tabId="tab-1" title="Tab 1" key="tab-1">
              Content for tab 1
            </Tab>
          </Tabs>,
          themeName
        );

        getDataElementByValue("tab-selected-indicator").then(($el) => {
          const colorVal = $el.css("box-shadow").split(")");

          expect(`${colorVal[0]})`).to.be.equals(color);
        });
      });
    }
  );

  describe.each(buildTestArray(commonColorsOnHover))(
    "should render components with %s theme onHover",
    (theme, themeName, color) => {
      it("Button component and verify theme color", () => {
        CypressMountWithProviders(<Button>Small</Button>, themeName);

        buttonDataComponent()
          .realHover()
          .then(($el) => {
            const colorVal = $el.css("background").split(")");

            expect(`${colorVal[0]})`).to.be.equals(color);
          });
      });

      it("Link component and verify theme color", () => {
        CypressMountWithProviders(
          <Link
            href="https://carbon.sage.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            This is a link
          </Link>,
          themeName
        );

        linkComponent()
          .realHover()
          .children()
          .should("have.css", "color", color);
      });

      it("SplitButton component and verify theme color", () => {
        CypressMountWithProviders(
          <SplitButton text="Split button">
            <Button>Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
          </SplitButton>,
          themeName
        );

        splitMainButton()
          .children()
          .eq(0)
          .realHover()
          .then(($el) => {
            const colorVal = $el.css("background").split(")");

            expect(`${colorVal[0]})`).to.be.equals(color);
          });
      });
    }
  );

  describe.each(buildTestArray(multiButtonOnHover))(
    "should render components with %s theme onHover",
    (theme, themeName, color) => {
      it("MultiActionButton component and verify theme color", () => {
        CypressMountWithProviders(
          <MultiActionButton text="Multi Action Button">
            <Button href="#">Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
          </MultiActionButton>,
          themeName
        );

        multiActionButtonComponent()
          .find("button")
          .trigger("mouseover")
          .then(($el) => {
            const colorVal = $el.css("background").split(")");

            expect(`${colorVal[0]})`).to.be.equals(color);
          });
      });
    }
  );

  describe.each(buildTestDataWithTwoArrays(loaderBarColors, commonColors))(
    "should render components with %s theme",
    (theme, themeName, loaderBarcolor, color) => {
      it("LoaderBar component and verify theme color", () => {
        CypressMountWithProviders(<LoaderBar />, themeName);

        loaderBarComponent()
          .children()
          .should("have.css", "background-color", loaderBarcolor);
        loaderBarComponent()
          .children()
          .children()
          .should("have.css", "background-color", color);
      });
    }
  );

  describe.each(buildTestArray(stepSequnceColors))(
    "should render components with %s theme",
    (theme, themeName, color) => {
      it("StepSequence component and verify theme color", () => {
        CypressMountWithProviders(
          <StepSequenceItem indicator="1" status="complete">
            Name
          </StepSequenceItem>,
          themeName
        );

        stepSequenceDataComponentItem().should("have.css", "color", color);
      });
    }
  );

  describe("Accessibility tests for Carbon Provider", () => {
    it("should pass accessibility tests for Carbon Provider", () => {
      CypressMountWithProviders(<stories.Default />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Carbon Provider mixing story", () => {
      CypressMountWithProviders(<stories.Mixing />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Carbon Provider theming story", () => {
      CypressMountWithProviders(<stories.Theming />);

      cy.checkAccessibility();
    });
  });
});
