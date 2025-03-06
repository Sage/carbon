import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  accordion,
  accordionIcon,
  accordionTitleContainer,
  accordionTitleContainerByPosition,
  accordionContent,
} from "../../../playwright/components/accordion";
import {
  positionOfElement,
  getRotationAngle,
  assertCssValueIsApproximately,
  getStyle,
  checkAccessibility,
} from "../../../playwright/support/helper";
import { getDataElementByValue } from "../../../playwright/components";
import {
  ACCORDION_ADD_CONTENT,
  ACCORDION_REMOVE_CONTENT,
} from "../../../playwright/components/accordion/locators";
import { SIZE, CHARACTERS } from "../../../playwright/support/constants";

import {
  AccordionComponent,
  AccordionWithIcon,
  AccordionGroupWithError,
  AccordionGroupWithWarning,
  AccordionGroupWithInfo,
  AccordionGroupComponent,
  DynamicContent,
  AccordionDefault,
  AccordionWithBoxAndDifferentPaddings,
  AccordionGroupDefault,
  AccordionGroupValidation,
  AccordionWithDefinitionList,
  AccordionWithSplit,
} from "./components.test-pw";

import { additionalButton as splitAdditionalButtons } from "../../../playwright/components/split-button";
import Typography from "../typography";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

// TODO: Skipped due to flaky focus behaviour. To review in FE-6428
test.skip("should have the expected styling when focused", async ({
  mount,
  page,
}) => {
  await mount(<AccordionComponent />);
  const elementLocator = accordionTitleContainer(page);
  const element = await elementLocator;
  await element.focus();
  await expect(elementLocator).toHaveCSS(
    "box-shadow",
    "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
  );
  await expect(elementLocator).toHaveCSS(
    "outline",
    "rgba(0, 0, 0, 0) solid 3px",
  );
});

test.describe("should render Accordion component", () => {
  test("should check AccordionRow is expanded using click", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionComponent />);

    await accordionTitleContainer(page).click();

    await expect(accordionTitleContainer(page)).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await expect(accordionTitleContainer(page)).toBeVisible();

    await expect(accordionContent(page)).toHaveAttribute(
      "data-element",
      "accordion-content",
    );
    await expect(accordionContent(page)).toBeVisible();
  });

  test("should check AccordionRow is expanded using Enter key", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionComponent />);

    await accordionTitleContainer(page).press("Enter");

    await expect(accordionTitleContainer(page)).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await expect(accordionTitleContainer(page)).toBeVisible();

    await expect(accordionContent(page)).toHaveAttribute(
      "data-element",
      "accordion-content",
    );
    await expect(accordionContent(page)).toBeVisible();
  });

  (["chevron_down", "dropdown", "chevron_down_thick"] as const).forEach(
    (iconType) => {
      test(`should set iconType to ${iconType} and transform when Accordion row is closed`, async ({
        page,
        mount,
      }) => {
        await mount(<AccordionComponent iconType={iconType} />);

        await expect(accordionIcon(page)).toHaveAttribute("type", iconType);
        await expect(accordionIcon(page)).toBeVisible();
        const transformValue = await getStyle(accordionIcon(page), "transform");
        expect(getRotationAngle(transformValue)).toBe(0);
      });
    },
  );

  (["chevron_down", "dropdown", "chevron_down_thick"] as const).forEach(
    (iconType) => {
      test(`should set iconType to ${iconType} and transform when Accordion row is open`, async ({
        page,
        mount,
      }) => {
        await mount(<AccordionComponent iconType={iconType} expanded />);

        await expect(accordionIcon(page)).toHaveAttribute("type", iconType);
        await expect(accordionIcon(page)).toBeVisible();
        const transformValue = await getStyle(accordionIcon(page), "transform");
        expect(getRotationAngle(transformValue)).toBe(180);
      });
    },
  );

  (["left", "right"] as const).forEach((iconAlign) => {
    test(`should set Accordion iconAlign to ${iconAlign}`, async ({
      mount,
      page,
    }) => {
      await mount(<AccordionComponent iconAlign={iconAlign} />);

      const headingContainerLocator = accordionTitleContainerByPosition(
        page,
        positionOfElement("first"),
      );

      await expect(headingContainerLocator.first()).toHaveAttribute(
        "data-element",
        "accordion-headings-container",
      );
      await expect(headingContainerLocator.first()).toBeVisible();

      if (iconAlign === "right") {
        // set by default
        await expect(accordionTitleContainer(page)).toHaveCSS(
          "justify-content",
          "space-between",
        );
        await expect(accordionTitleContainer(page)).not.toHaveCSS(
          "flex-direction",
          "row-reverse",
        );
        await expect(headingContainerLocator.first()).toHaveCSS(
          "margin-right",
          "0px",
        );
      } else {
        await expect(accordionTitleContainer(page)).toHaveCSS(
          "flex-direction",
          "row-reverse",
        );
        await expect(headingContainerLocator.last()).toHaveCSS(
          "margin-right",
          "16px",
        );
      }
    });
  });

  test("should verify AccordionRow is expanded by clicking on validation icon", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionWithIcon />);

    await accordionIcon(page).nth(0).click();

    await expect(accordionTitleContainer(page)).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await expect(accordionTitleContainer(page)).toBeVisible();

    await expect(accordionContent(page)).toHaveAttribute(
      "data-element",
      "accordion-content",
    );
    await expect(accordionContent(page)).toBeVisible();
  });

  testData.forEach((titleValue) => {
    test(`should render Accordion component with ${titleValue} as a title`, async ({
      mount,
      page,
    }) => {
      await mount(<AccordionComponent title={titleValue} />);

      await expect(accordionTitleContainer(page)).toContainText(titleValue);
    });
  });

  testData.forEach((titleValue) => {
    test(`should render Accordion component with ${titleValue} as a subtitle`, async ({
      mount,
      page,
    }) => {
      await mount(<AccordionComponent subTitle={titleValue} />);

      await expect(accordionTitleContainer(page)).toContainText(titleValue);
    });
  });

  (
    [
      [SIZE.SMALL, 24],
      [SIZE.LARGE, 45],
    ] as const
  ).forEach(([size, height]) => {
    test(`should render Accordion component with ${size} as a size and has height property set to ${height}`, async ({
      mount,
      page,
    }) => {
      await mount(<AccordionComponent size={size} />);

      const cssHeight = await getStyle(accordionTitleContainer(page), "height");
      expect(parseInt(cssHeight)).toBeLessThanOrEqual(height + 1);
      expect(parseInt(cssHeight)).toBeGreaterThanOrEqual(height - 1);
    });
  });

  (
    [
      ["full", "solid", "rgb(204, 214, 219)"],
      ["none", "none", "rgba(0, 0, 0, 0.9)"],
    ] as const
  ).forEach(([borderProp, borderStyle, colour]) => {
    test(`should render Accordion component with border type '${borderProp}'`, async ({
      mount,
      page,
    }) => {
      await mount(<AccordionComponent borders={borderProp} />);

      await expect(accordion(page)).toHaveCSS(
        "border-bottom-style",
        borderStyle,
      );
      await expect(accordion(page)).toHaveCSS("border-bottom-color", colour);
    });
  });

  [true, false].forEach((state) => {
    test(`should render Accordion component with default expanded state '${state}'`, async ({
      mount,
      page,
    }) => {
      await mount(<AccordionComponent defaultExpanded={state} />);

      await expect(accordionTitleContainer(page)).toHaveAttribute(
        "aria-expanded",
        String(state),
      );
      await expect(accordionTitleContainer(page)).toBeVisible();
    });
  });

  [true, false].forEach((state) => {
    test(`should render Accordion component with expanded state '${state}'`, async ({
      mount,
      page,
    }) => {
      await mount(<AccordionComponent expanded={state} />);

      await expect(accordionTitleContainer(page)).toHaveAttribute(
        "aria-expanded",
        String(state),
      );
      await expect(accordionTitleContainer(page)).toBeVisible();
    });
  });

  ["700px", "900px", "1100px", "1300px"].forEach((width) => {
    test(`should check Accordion width is ${width}`, async ({
      mount,
      page,
    }) => {
      await mount(<AccordionComponent width={width} />);

      await assertCssValueIsApproximately(
        accordion(page),
        "width",
        parseInt(width),
      );
    });
  });

  test("should verify Accordion has an error message in the tooltip", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionGroupWithError />);

    await accordionIcon(page).nth(0).click();

    await expect(accordionIcon(page).nth(0)).toHaveAttribute(
      "data-element",
      "error",
    );
    await expect(accordionIcon(page).nth(0)).toHaveAttribute("type", "error");
  });

  test("should verify AccordionRow has a warning message in the tooltip", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionGroupWithWarning />);

    await accordionIcon(page).nth(0).click();

    await expect(accordionIcon(page).nth(0)).toHaveAttribute(
      "data-element",
      "warning",
    );
    await expect(accordionIcon(page).nth(0)).toHaveAttribute("type", "warning");
  });

  test("should verify AccordionRow has an info message in the tooltip", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionGroupWithInfo />);

    await accordionIcon(page).nth(0).click();

    await expect(accordionIcon(page).nth(0)).toHaveAttribute(
      "data-element",
      "info",
    );
    await expect(accordionIcon(page).nth(0)).toHaveAttribute("type", "info");
  });

  test("should verify accordion title changes when accordion is opened", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionComponent title="Closed" openTitle="Open" />);

    await expect(accordionTitleContainer(page)).toContainText("Closed");

    await accordionIcon(page).nth(0).click();

    await expect(accordionTitleContainer(page)).toContainText("Open");
  });

  test("should verify accordion subtitle does not render when variant is subtle", async ({
    mount,
    page,
  }) => {
    await mount(
      <AccordionComponent
        title="subtle"
        variant="subtle"
        subTitle="subtitle"
      />,
    );

    await expect(accordionTitleContainer(page)).toContainText("subtle");
    await expect(accordionTitleContainer(page)).not.toContainText("subtitle");
  });

  test("should not hide the children container of SplitButton when it opens", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionWithSplit />);

    await getDataElementByValue(page, "dropdown").click();

    await expect(splitAdditionalButtons(page, 0)).toBeVisible();
    await expect(splitAdditionalButtons(page, 1)).toBeVisible();
    await expect(splitAdditionalButtons(page, 2)).toBeVisible();
    await expect(splitAdditionalButtons(page, 3)).toBeVisible();
    await expect(splitAdditionalButtons(page, 4)).toBeVisible();
  });
});

test.describe("should render Accordion Grouped component", () => {
  test("should move through all grouped accordions using ArrowDown key and check focus", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionGroupComponent />);

    await accordionTitleContainer(page).nth(0).focus();
    await expect(accordionTitleContainer(page).nth(0)).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(accordionTitleContainer(page).nth(0)).toBeVisible();

    await accordionTitleContainer(page).nth(0).press("ArrowDown");
    await expect(accordionTitleContainer(page).nth(1)).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(accordionTitleContainer(page).nth(1)).toBeVisible();

    await accordionTitleContainer(page).nth(1).press("ArrowDown");
    await expect(accordionTitleContainer(page).nth(2)).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(accordionTitleContainer(page).nth(2)).toBeVisible();
  });

  test("should move to the last grouped accordion using End key and check it is focused", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionGroupComponent />);

    await accordionTitleContainer(page).nth(0).focus();

    await accordionTitleContainer(page).nth(0).press("End");

    await expect(accordionTitleContainer(page).nth(2)).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(accordionTitleContainer(page).nth(2)).toBeVisible();
  });

  test("should move to the first grouped accordion using Home key and check it is focused", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionGroupComponent />);

    await accordionTitleContainer(page).nth(2).focus();

    await accordionTitleContainer(page).nth(2).press("Home");

    await expect(accordionTitleContainer(page).nth(0)).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(accordionTitleContainer(page).nth(0)).toBeVisible();
  });
});

test.describe("should change content height when children change", () => {
  test("should have proper height", async ({ mount, page }) => {
    await mount(<DynamicContent />);
    await assertCssValueIsApproximately(accordionContent(page), "height", 49);
    await getDataElementByValue(page, ACCORDION_ADD_CONTENT).click();
    await assertCssValueIsApproximately(accordionContent(page), "height", 66);
    await getDataElementByValue(page, ACCORDION_ADD_CONTENT).click();
    await assertCssValueIsApproximately(accordionContent(page), "height", 83);
    await getDataElementByValue(page, ACCORDION_REMOVE_CONTENT).click();
    await assertCssValueIsApproximately(accordionContent(page), "height", 66);
    await getDataElementByValue(page, ACCORDION_REMOVE_CONTENT).click();
    await assertCssValueIsApproximately(accordionContent(page), "height", 49);
  });
});

test.describe("Accessibility tests for Accordion", () => {
  test("should pass accessibility tests for AccordionDefault", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionDefault />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for AccordionDefault expanded", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionDefault expanded />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Accordion with disableContentPadding", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionDefault disableContentPadding />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Accordion size small", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionDefault size="small" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Accordion with subTitle", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionDefault subTitle="Sub title" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Accordion with full borders", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionDefault borders="full" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Accordion with full borders expanded", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionDefault borders="full" expanded />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Accordion with left aligned icon", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionDefault iconAlign="left" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Accordion with 500px width", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionDefault width="500px" />);

    await checkAccessibility(page);
  });

  [
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
  ].forEach(([margin, padding]) => {
    test(`should pass accessibility tests for Accordion with margin set to ${margin} and padding set to ${padding}`, async ({
      mount,
      page,
    }) => {
      await mount(<AccordionDefault m={margin} p={padding} />);

      await checkAccessibility(page);
    });
  });

  [0, 1, 2, 3, 4, 5, 6].forEach((padding) => {
    test(`should pass accessibility tests for Accordion with title padding set to ${padding}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <AccordionDefault
          headerSpacing={{
            p: padding,
          }}
        />,
      );

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests for Accordion with Box and different paddings", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionWithBoxAndDifferentPaddings />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for AccordionGroup", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionGroupDefault />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for AccordionGroupValidation", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionGroupValidation />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for AccordionWithDefinitionList", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionWithDefinitionList />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Accordion when variant is subtle", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionDefault variant="subtle" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Accordion when title is a string", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionDefault title="title" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Accordion when title is a React node", async ({
    mount,
    page,
  }) => {
    await mount(
      <AccordionDefault
        title={
          <Typography variant="h4" backgroundColor="blue" color="yellow">
            Title
          </Typography>
        }
      />,
    );

    await checkAccessibility(page);
  });
});
