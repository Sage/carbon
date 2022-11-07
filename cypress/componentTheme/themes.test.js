import React from "react";
import Button from "../../src/components/button/button.component";
import Link from "../../src/components/link/link.component";
import Loader from "../../src/components/loader/loader.component";
import LoaderBar from "../../src/components/loader-bar/loader-bar.component";
import MultiActionButton from "../../src/components/multi-action-button/multi-action-button.component";
import Pill from "../../src/components/pill/pill.component";
import SplitButton from "../../src/components/split-button/split-button.component";
import StepSequenceItem from "../../src/components/step-sequence/step-sequence-item/step-sequence-item.component";
import { Tabs, Tab } from "../../src/components/tabs";

import {
  sageTheme,
  mintTheme,
  noTheme,
  aegeanTheme,
} from "../../src/style/themes/index";
import { buttonDataComponent } from "../locators/button";
import CypressMountWithProviders from "../support/component-helper/cypress-mount";
import {
  linkComponent,
  loaderBarComponent,
  loaderComponent,
} from "../locators/themes";
import { pillPreview } from "../locators/pill";
import { stepSequenceDataComponentItem } from "../locators/step-sequence";
import { getDataElementByValue } from "../locators";
import { multiActionButtonComponent } from "../locators/multi-action-button";
import { splitMainButton } from "../locators/split-button";

const commonColors = [
  ["mint", "rgb(0, 125, 90)"],
  ["aegean", "rgb(0, 115, 194)"],
  ["none", "rgb(0, 130, 0)"],
  ["sage", "rgb(0, 126, 69)"],
];

const commonColorsOnHover = [
  ["mint", "rgb(0, 96, 70)"],
  ["aegean", "rgb(0, 92, 154)"],
  ["none", "rgb(0, 99, 0)"],
  ["sage", "rgb(0, 103, 56)"],
];

const multiButtonOnHover = [
  ["mint", "rgb(0, 64, 46)"],
  ["aegean", "rgb(0, 68, 114)"],
  ["none", "rgb(0, 77, 42)"],
  ["sage", "rgb(0, 77, 42)"],
];

const stepSequnceColors = [
  ["mint", "rgb(0, 125, 90)"],
  ["aegean", "rgb(0, 115, 194)"],
  ["none", "rgb(0, 138, 33)"],
  ["sage", "rgb(0, 138, 33)"],
];

const loaderBarColors = [
  ["mint", "rgb(179, 227, 214)"],
  ["aegean", "rgb(179, 214, 239)"],
  ["none", "rgb(179, 224, 179)"],
  ["sage", "rgb(179, 217, 200)"],
];

context("Testing Themes", () => {
  describe.each([
    [commonColors[0][0], mintTheme, commonColors[0][1]],
    [commonColors[1][0], aegeanTheme, commonColors[1][1]],
    [commonColors[2][0], noTheme, commonColors[2][1]],
    [commonColors[3][0], sageTheme, commonColors[3][1]],
  ])("should render components with %s theme", (theme, themeName, color) => {
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
  });

  describe.each([
    [commonColorsOnHover[0][0], mintTheme, commonColorsOnHover[0][1]],
    [commonColorsOnHover[1][0], aegeanTheme, commonColorsOnHover[1][1]],
    [commonColorsOnHover[2][0], noTheme, commonColorsOnHover[2][1]],
    [commonColorsOnHover[3][0], sageTheme, commonColorsOnHover[3][1]],
  ])(
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

  describe.each([
    [multiButtonOnHover[0][0], mintTheme, multiButtonOnHover[0][1]],
    [multiButtonOnHover[1][0], aegeanTheme, multiButtonOnHover[1][1]],
    [multiButtonOnHover[2][0], noTheme, multiButtonOnHover[2][1]],
    [multiButtonOnHover[3][0], sageTheme, multiButtonOnHover[3][1]],
  ])(
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

  describe.each([
    [
      loaderBarColors[0][0],
      mintTheme,
      loaderBarColors[0][1],
      commonColors[0][1],
    ],
    [
      loaderBarColors[1][0],
      aegeanTheme,
      loaderBarColors[1][1],
      commonColors[1][1],
    ],
    [loaderBarColors[2][0], noTheme, loaderBarColors[2][1], commonColors[2][1]],
    [
      loaderBarColors[3][0],
      sageTheme,
      loaderBarColors[3][1],
      commonColors[3][1],
    ],
  ])(
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

  describe.each([
    [
      stepSequnceColors[0][0],
      mintTheme,
      stepSequnceColors[0][1],
      stepSequnceColors[0][1],
    ],
    [
      stepSequnceColors[1][0],
      aegeanTheme,
      stepSequnceColors[1][1],
      stepSequnceColors[1][1],
    ],
    [
      stepSequnceColors[2][0],
      noTheme,
      stepSequnceColors[2][1],
      stepSequnceColors[2][1],
    ],
    [
      stepSequnceColors[3][0],
      sageTheme,
      stepSequnceColors[3][1],
      stepSequnceColors[3][1],
    ],
  ])(
    "should render components with %s theme",
    (theme, themeName, loaderBarcolor, color) => {
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
});
