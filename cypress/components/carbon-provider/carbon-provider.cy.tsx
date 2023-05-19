import React from "react";
import type { ThemeObject } from "../../../src/style/themes/base";
import * as stories from "../../../src/components/carbon-provider/carbon-provider.stories";
import Button from "../../../src/components/button";
import Link from "../../../src/components/link";
import Loader from "../../../src/components/loader";
import LoaderBar from "../../../src/components/loader-bar";
import MultiActionButton from "../../../src/components/multi-action-button";
import Pill from "../../../src/components/pill";
import SplitButton from "../../../src/components/split-button";
import StepSequenceItem from "../../../src/components/step-sequence/step-sequence-item";
import { Tabs, Tab } from "../../../src/components/tabs";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";

import {
  sageTheme,
  mintTheme,
  noTheme,
  aegeanTheme,
} from "../../../src/style/themes/index";
import { buttonDataComponent } from "../../locators/button";
import {
  linkComponent,
  loaderBarComponent,
  loaderComponent,
} from "../../locators/themes";
import { pillPreview } from "../../locators/pill";
import { stepSequenceDataComponentItem } from "../../locators/step-sequence";
import { getDataElementByValue } from "../../locators";
import { multiActionButtonComponent } from "../../locators/multi-action-button";
import { splitMainButton } from "../../locators/split-button";

const themes = [mintTheme, aegeanTheme, noTheme, sageTheme];

const buildTestArray = (array: string[]) =>
  themes.map((theme, i) => [theme.name, theme, array[i]]);
const buildTestDataWithTwoArrays = (
  firstArray: string[],
  secondArray: string[]
): [string, Partial<ThemeObject>, string, string][] =>
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
        CypressMountWithProviders(<Pill>Whatever</Pill>, themeName);

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

        return getDataElementByValue("tab-selected-indicator").then(($el) => {
          const colorVal = $el.css("box-shadow").split(")");

          // eslint-disable-next-line jest/valid-expect
          expect(`${colorVal[0]})`).to.be.equals(color);
        });
      });
    }
  );

  describe.each(buildTestArray(commonColorsOnHover))(
    "should render components with %s theme commonColorsOnHover",
    (theme, themeName, color) => {
      it("Button component and verify theme color", () => {
        CypressMountWithProviders(<Button>Small</Button>, themeName);

        return buttonDataComponent()
          .realHover()
          .then(($el) => {
            const colorVal = $el.css("background").split(")");

            // eslint-disable-next-line jest/valid-expect
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

        return splitMainButton()
          .children()
          .eq(0)
          .realHover()
          .then(($el) => {
            const colorVal = $el.css("background").split(")");

            // eslint-disable-next-line jest/valid-expect
            expect(`${colorVal[0]})`).to.be.equals(color);
          });
      });
    }
  );

  describe.each(buildTestArray(multiButtonOnHover))(
    "should render components with %s theme multiButtononHover",
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

        return multiActionButtonComponent()
          .find("button")
          .trigger("mouseover")
          .then(($el) => {
            const colorVal = $el.css("background").split(")");

            // eslint-disable-next-line jest/valid-expect
            expect(`${colorVal[0]})`).to.be.equals(color);
          });
      });
    }
  );

  describe.each(buildTestDataWithTwoArrays(loaderBarColors, commonColors))(
    "should render components with %s theme with two arrays",
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
    "should render components with %s theme stepSequenceColors",
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
