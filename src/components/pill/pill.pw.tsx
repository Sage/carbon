import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { PillComponent, PillOnDarkBackground } from "./components.test-pw";
import Pill, { PillProps } from ".";
import {
  pillPreview,
  pillCloseIcon,
} from "../../../playwright/components/pill";
import {
  checkCSSOutline,
  checkAccessibility,
} from "../../../playwright/support/helper";
import { CHARACTERS } from "../../../playwright/support/constants";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testData = CHARACTERS.STANDARD;
const warning = "rgb(242, 133, 51)";
const neutral = "rgb(51, 91, 112)";
const neutralDark = "rgb(102, 132, 148)";
const negative = "rgb(203, 55, 74)";
const negativeDark = "rgb(208, 75, 92)";
const positive = "rgb(0, 138, 33)";
const positiveDark = "rgb(51, 161, 77)";
const information = "rgb(0, 96, 167)";
const informationDark = "rgb(51, 128, 185)";
const neutralWhite = "rgb(255, 255, 255)";
const tag = "rgb(0, 126, 69)";
const status = "rgb(51, 91, 112)";
const transparent = "rgba(0, 0, 0, 0)";
const colorsSemanticCaution500 = "rgb(239, 103, 0)";
const blackOpacity65 = "rgba(0, 0, 0, 0.65)";
const brilliantGreenShade20 = "rgb(0, 176, 0)";
const red = "rgb(255, 0, 0)";
const hexBlue = "#123456";
const green = "rgb(0, 123, 10)";
const small = "S";
const medium = "M";
const large = "L";
const extraLarge = "XL";

test.describe("should render Pill component with props", () => {
  specialCharacters.forEach((label) => {
    test(`should render label prop as ${label}`, async ({ mount, page }) => {
      await mount(<PillComponent>{label}</PillComponent>);

      await expect(pillPreview(page)).toHaveText(label);
    });
  });

  test(`should render data-element tag prop`, async ({ mount, page }) => {
    await mount(<PillComponent data-element={testData} />);

    await expect(pillPreview(page)).toHaveAttribute("data-element", testData);
  });

  test(`should render data-role tag prop`, async ({ mount, page }) => {
    await mount(<PillComponent data-role={testData} />);

    await expect(pillPreview(page)).toHaveAttribute("data-role", testData);
  });

  (
    [
      ["warning", warning],
      ["neutral", neutral],
      ["negative", negative],
      ["positive", positive],
      ["information", information],
    ] as const
  ).forEach(([color, output]) => {
    test(`should render colorVariant prop as ${color}`, async ({
      mount,
      page,
    }) => {
      await mount(<PillComponent pillRole="status" colorVariant={color} />);

      await checkCSSOutline(
        pillPreview(page),
        "2px",
        "border",
        "solid",
        output,
      );
      await expect(pillPreview(page)).toHaveCSS(
        "background-color",
        transparent,
      );
    });
  });

  (
    [
      ["warning", warning],
      ["neutral", neutralDark],
      ["negative", negativeDark],
      ["positive", positiveDark],
      ["information", informationDark],
    ] as const
  ).forEach(([color, output]) => {
    test(`renders with dark background colour when colorVariant is ${color} and isDarkBackground is true`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PillComponent
          pillRole="status"
          colorVariant={color}
          isDarkBackground
        />,
      );

      await checkCSSOutline(
        pillPreview(page),
        "2px",
        "border",
        "solid",
        output,
      );
      await expect(pillPreview(page)).toHaveCSS(
        "background-color",
        transparent,
      );
    });
  });

  (
    [
      ["warning", warning],
      ["neutral", neutral],
      ["negative", negative],
      ["positive", positive],
      ["information", information],
    ] as const
  ).forEach(([color, output]) => {
    test(`should render colorVariant with color fill set as ${color}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PillComponent pillRole="status" colorVariant={color} fill />,
      );

      await checkCSSOutline(
        pillPreview(page),
        "2px",
        "border",
        "solid",
        output,
      );
      await expect(pillPreview(page)).toHaveCSS("background-color", output);
    });
  });

  (
    [
      ["warning", warning],
      ["neutral", neutralDark],
      ["negative", negativeDark],
      ["positive", positiveDark],
      ["information", informationDark],
      ["neutralWhite", neutralWhite],
    ] as const
  ).forEach(([color, output]) => {
    test(`renders with dark background colour when colorVariant is ${color}, fill is true and isDarkBackground is true`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PillComponent
          pillRole="status"
          colorVariant={color}
          fill
          isDarkBackground
        />,
      );

      await checkCSSOutline(
        pillPreview(page),
        "2px",
        "border",
        "solid",
        output,
      );
      await expect(pillPreview(page)).toHaveCSS("background-color", output);
    });
  });

  (
    [
      ["tag", tag],
      ["status", status],
    ] as [PillProps["pillRole"], string][]
  ).forEach(([role, output]) => {
    test(`should render pillRole prop set as ${role}`, async ({
      mount,
      page,
    }) => {
      await mount(<PillComponent pillRole={role}>{role}</PillComponent>);

      await checkCSSOutline(
        pillPreview(page),
        "2px",
        "border",
        "solid",
        output,
      );
    });
  });

  (
    [
      [colorsSemanticCaution500, "rgb(239, 103, 0)"],
      [blackOpacity65, "rgba(0, 0, 0, 0.65)"],
      [brilliantGreenShade20, "rgb(0, 176, 0)"],
      [red, "rgb(255, 0, 0)"],
      [green, "rgb(0, 123, 10)"],
      [hexBlue, "rgb(18, 52, 86)"],
    ] as const
  ).forEach(([color, output]) => {
    test(`should render borderColor prop set as ${output}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PillComponent pillRole="status" borderColor={color}>
          Pill
        </PillComponent>,
      );

      await checkCSSOutline(
        pillPreview(page),
        "2px",
        "border",
        "solid",
        output,
      );
    });
  });

  ["20px", "100px"].forEach((maxWidth) => {
    test(`should render maxWidth prop set to ${maxWidth}`, async ({
      mount,
      page,
    }) => {
      await mount(<Pill maxWidth={maxWidth}>Pill with a long label</Pill>);

      const elementLocator = pillPreview(page);
      await expect(elementLocator).toHaveCSS("max-width", maxWidth);
    });
  });

  (
    [
      [small, "16px", "12px", "0px 8px"],
      [medium, "20px", "14px", "0px 8px"],
      [large, "24px", "14px", "0px 8px"],
      [extraLarge, "28px", "16px", "0px 12px"],
    ] as const
  ).forEach(([size, height, fontSize, padding]) => {
    test(`should render size prop set as ${size}`, async ({ mount, page }) => {
      await mount(<Pill size={size}>Pill</Pill>);

      const elementLocator = pillPreview(page);
      await expect(elementLocator).toHaveCSS("min-height", height);
      await expect(elementLocator).toHaveCSS("line-height", height);
      await expect(elementLocator).toHaveCSS("font-size", fontSize);
      await expect(elementLocator).toHaveCSS("padding", padding);
    });
  });

  (
    [
      [true, "break-spaces"],
      [false, "nowrap"],
    ] as const
  ).forEach(([booleanState, cssValue]) => {
    test(`should render wrapText prop set as ${booleanState}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Pill maxWidth="44px" wrapText={booleanState}>
          Wrapped pill
        </Pill>,
      );

      const elementLocator = pillPreview(page);
      await expect(elementLocator).toHaveText("Wrapped pill");
      await expect(elementLocator).toHaveCSS("white-space", cssValue);
    });
  });
});

test.describe("should check focus outlines and border radius", () => {
  ([small, medium, large, extraLarge] as PillProps["size"][]).forEach(
    (size) => {
      test(`should have the expected focus styling when size is ${size}`, async ({
        mount,
        page,
      }) => {
        await mount(
          <PillComponent size={size} onDelete={() => {}}>
            Pill
          </PillComponent>,
        );

        const elementLocator = pillCloseIcon(page);
        await elementLocator.focus();
        await expect(elementLocator).toHaveCSS(
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
        );
        await expect(elementLocator).toHaveCSS(
          "outline",
          "rgba(0, 0, 0, 0) solid 3px",
        );
      });
    },
  );

  ([small, medium, large, extraLarge] as PillProps["size"][]).forEach(
    (size) => {
      test(`should have the expected border radius styling when size is ${size}`, async ({
        mount,
        page,
      }) => {
        await mount(
          <PillComponent size={size} onDelete={() => {}}>
            Pill
          </PillComponent>,
        );

        const pillPreviewLocator = pillPreview(page);
        await expect(pillPreviewLocator).toHaveCSS("border-radius", "2px");

        const elementLocator = pillCloseIcon(page);
        await expect(elementLocator).toHaveCSS("border-radius", "0px");
        await elementLocator.focus();
        await expect(elementLocator).toHaveCSS(
          "border-radius",
          "0px 2px 2px 0px",
        );
      });
    },
  );
});

test.describe("should check for action events", () => {
  test(`should call the delete action after the CloseIcon is clicked`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <PillComponent
        onDelete={() => {
          callbackCount += 1;
        }}
      />,
    );

    const cross = pillCloseIcon(page);
    await cross.click();
    expect(callbackCount).toBe(1);
  });

  test(`should call the click action after the Pill is clicked`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <PillComponent
        onClick={() => {
          callbackCount += 1;
        }}
      />,
    );

    const cross = pillPreview(page);
    await cross.click();
    expect(callbackCount).toBe(1);
  });
});

test.describe("should check for Accessibility tests", () => {
  specialCharacters.forEach((label) => {
    test(`should render label as ${label} for accessibility`, async ({
      mount,
      page,
    }) => {
      await mount(<PillComponent>{label}</PillComponent>);

      await checkAccessibility(page);
    });
  });

  (
    ["warning", "neutral", "negative", "positive", "information"] as const
  ).forEach((color) => {
    test(`should render colorVariant as ${color} for accessibility`, async ({
      mount,
      page,
    }) => {
      await mount(<PillComponent pillRole="status" colorVariant={color} />);

      await checkAccessibility(page);
    });
  });

  (
    ["warning", "neutral", "negative", "positive", "information"] as const
  ).forEach((color) => {
    test(`renders with darker background colour when colorVariant is ${color} and isDarkBackground is true for accessibility`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PillOnDarkBackground
          pillRole="status"
          colorVariant={color}
          isDarkBackground
        />,
      );

      await checkAccessibility(page);
    });
  });

  (["tag", "status"] as const).forEach((role) => {
    test(`should render pillRole prop set as ${role} for accessibility`, async ({
      mount,
      page,
    }) => {
      await mount(<PillComponent pillRole={role}>{role}</PillComponent>);

      await checkAccessibility(page);
    });
  });

  (
    ["warning", "neutral", "negative", "positive", "information"] as const
  ).forEach((color) => {
    test(`should render colorVariant with fill color as ${color} for accessibility`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PillComponent pillRole="status" colorVariant={color} fill />,
      );

      await checkAccessibility(page);
    });
  });

  (
    [
      "warning",
      "neutral",
      "negative",
      "positive",
      "information",
      "neutralWhite",
    ] as const
  ).forEach((color) => {
    test(`should render colorVariant with fill as ${color} when isDarkBackground is set to true for accessibility `, async ({
      mount,
      page,
    }) => {
      await mount(
        <PillOnDarkBackground
          pillRole="status"
          colorVariant={color}
          fill
          isDarkBackground
        />,
      );

      await checkAccessibility(page);
    });
  });

  ["20px", "100px"].forEach((maxWidth) => {
    test(`should render maxWidth prop set as ${maxWidth} for accessibility`, async ({
      mount,
      page,
    }) => {
      await mount(<Pill maxWidth={maxWidth}>Pill with a long label</Pill>);

      await checkAccessibility(page);
    });
  });

  ([small, medium, large, extraLarge] as const).forEach((size) => {
    test(`should render size prop set as ${size} for accessibility`, async ({
      mount,
      page,
    }) => {
      await mount(<Pill size={size}>Pill</Pill>);

      await checkAccessibility(page);
    });
  });

  (
    [
      colorsSemanticCaution500,
      blackOpacity65,
      brilliantGreenShade20,
      red,
      hexBlue,
      green,
    ] as const
  ).forEach((color) => {
    test(`should render borderColor set as ${color} for accessibility`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PillComponent pillRole="status" borderColor={color}>
          Pill
        </PillComponent>,
      );

      await checkAccessibility(page);
    });
  });
});
