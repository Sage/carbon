import { expect, test } from "@playwright/experimental-ct-react17";
import React from "react";
import "../../../playwright/components";
import {
  card,
  columnCard,
  draggableCard,
  draggableContainer,
  footerCard,
} from "../../../playwright/components/card/index";
import { CHARACTERS, SIZE } from "../../../playwright/support/constants";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
} from "../../../playwright/support/helper";
import { Card } from "../../../src/components/card";
import {
  DifferentCardFooterPadding,
  DifferentCardRowPadding,
  Interactive,
  LargeSpacing,
  MoreExamplesOfCardFooter,
  SmallSpacing,
  WithCardWidthProvided,
  WithCustomBoxShadow,
  WithCustomHeight,
  WithDraggable,
  WithStringAsChild,
} from "../../../src/components/card/card.stories";
import {
  CardComponent,
  CardTextAlignment,
  DraggableExample,
} from "../../../src/components/card/components.test-pw";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const textAlignment = ["center", "left", "right"];

test.describe("Check Card component styling", () => {
  [["default", "8px"] as const, ["large", "16px"] as const].forEach(
    ([roundness, borderRadius]) => {
      test(`when roundness is ${roundness}, border radius should be ${borderRadius}`, async ({
        mount,
        page,
      }) => {
        await mount(<CardComponent roundness={roundness} />);

        await expect(card(page)).toHaveCSS("border-radius", borderRadius);

        await expect(footerCard(page)).toHaveCSS(
          "border-radius",
          `0px 0px ${borderRadius} ${borderRadius}`
        );
      });
    }
  );

  test("should check interactive applies the expected styling", async ({
    mount,
    page,
  }) => {
    await mount(<CardComponent interactive />);

    const cardElement = card(page);
    await cardElement.hover();

    await expect(cardElement).toHaveCSS("cursor", "pointer");
    await expect(cardElement).toHaveCSS(
      "box-shadow",
      "rgba(0, 20, 30, 0.2) 0px 5px 5px 0px, rgba(0, 20, 30, 0.1) 0px 10px 10px 0px"
    );
  });

  test("should allow custom boxShadow and hoverBoxShadow prop values and they apply the expected styling", async ({
    mount,
    page,
  }) => {
    await mount(
      <CardComponent
        boxShadow="boxShadow400"
        hoverBoxShadow="boxShadow200"
        interactive
      />
    );

    const cardElement = card(page);
    await expect(cardElement).toHaveCSS(
      "box-shadow",
      "rgba(0, 20, 30, 0.04) 0px 10px 40px 0px, rgba(0, 20, 30, 0.1) 0px 50px 80px 0px"
    );
    await cardElement.hover();
    await cardElement.waitFor();

    await expect(cardElement).toHaveCSS("cursor", "pointer");
    await expect(cardElement).toHaveCSS(
      "box-shadow",
      "rgba(0, 20, 30, 0.2) 0px 10px 20px 0px, rgba(0, 20, 30, 0.1) 0px 20px 40px 0px"
    );
  });

  textAlignment.forEach((align) => {
    test(`should check ${align} alignment applies the expected styling`, async ({
      mount,
      page,
    }) => {
      await mount(<CardTextAlignment align={align} />);

      const columnCardElement = columnCard(page);

      await expect(columnCardElement).toHaveCSS("text-align", align);
    });
  });
});

test.describe("Check Card component properties", () => {
  [
    [SIZE.SMALL, 24] as const,
    [SIZE.MEDIUM, 32] as const,
    [SIZE.LARGE, 48] as const,
  ].forEach(([spacing, paddings]) => {
    test(`should check ${spacing} spacing and padding`, async ({
      mount,
      page,
    }) => {
      await mount(<CardComponent spacing={spacing} />);

      const cardElement = card(page);

      await assertCssValueIsApproximately(
        cardElement,
        "padding-left",
        paddings
      );

      await assertCssValueIsApproximately(
        cardElement,
        "padding-right",
        paddings
      );
    });
  });

  testData.forEach((stringValue) => {
    test(`should check ${stringValue} as children`, async ({ mount, page }) => {
      await mount(<Card>{stringValue}</Card>);

      const cardElement = card(page);

      await expect(cardElement).toHaveText(stringValue);
    });
  });

  ([250, 500, 650, 300] as const).forEach((width) => {
    test(`should check ${width} width is set on component`, async ({
      mount,
      page,
    }) => {
      await mount(<CardComponent cardWidth={`${width}px`} />);

      const cardElement = card(page);

      await assertCssValueIsApproximately(cardElement, "width", width);
    });
  });

  ([
    [1, 2, 2, 2],
    [3, 1, 4, 0],
    [4, 2, 2, 2],
  ] as const).forEach(
    ([
      draggableCardItem,
      columnName,
      countOfFirstColumn,
      countOfSecondColumn,
    ]) => {
      test(`drag card item ${draggableCardItem} to column ${columnName}`, async ({
        mount,
        page,
      }) => {
        await mount(<DraggableExample />);

        await draggableCard(page, draggableCardItem - 1).dragTo(
          draggableContainer(page, columnName)
        );

        await expect(
          draggableContainer(page, columnName).locator(
            `[data-element="draggable-card-${draggableCardItem - 1}"]`
          )
        ).toBeVisible();

        const resultForColumnOne = await draggableContainer(page, 1)
          .locator('[data-component="card"]')
          .count();
        const resultForColumnTwo = await draggableContainer(page, 2)
          .locator('[data-component="card"]')
          .count();

        await expect(resultForColumnOne).toEqual(countOfFirstColumn);

        await expect(resultForColumnTwo).toEqual(countOfSecondColumn);
      });
    }
  );

  test("should check that the expected dataRole is set on the component", async ({
    mount,
    page,
  }) => {
    await mount(<CardComponent data-role="cypress" />);

    const cardElement = card(page);

    await expect(cardElement).toHaveAttribute("data-role", "cypress");
  });

  ([375, 535, 777] as const).forEach((height) => {
    test(`should check ${height} height is applied`, async ({
      mount,
      page,
    }) => {
      await mount(<CardComponent height={`${height}px`} />);

      const cardElement = card(page);

      await assertCssValueIsApproximately(cardElement, "height", height);
    });
  });

  test("should call onClick callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let setClickCounter = 0;
    await mount(
      <CardComponent
        interactive
        action={() => {
          setClickCounter += 1;
        }}
      />
    );

    const cardElement = card(page);
    await cardElement.click();
    expect(setClickCounter).toEqual(1);
  });
});

test.describe("Accessibility tests for Card component", () => {
  test("should pass accessibility tests for default example", async ({
    mount,
    page,
  }) => {
    await mount(<CardComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for small spacing example", async ({
    mount,
    page,
  }) => {
    await mount(<SmallSpacing />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for large spacing example", async ({
    mount,
    page,
  }) => {
    await mount(<LargeSpacing />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with width prop provided", async ({
    mount,
    page,
  }) => {
    await mount(<WithCardWidthProvided />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with custom height provided", async ({
    mount,
    page,
  }) => {
    await mount(<WithCustomHeight />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for interactive example", async ({
    mount,
    page,
  }) => {
    await mount(<Interactive />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with custom box shadow applied", async ({
    mount,
    page,
  }) => {
    await mount(<WithCustomBoxShadow />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with different card row padding applied", async ({
    mount,
    page,
  }) => {
    await mount(<DifferentCardRowPadding />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with different card footer padding applied", async ({
    mount,
    page,
  }) => {
    await mount(<DifferentCardFooterPadding />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for moreExamplesOfFooter example", async ({
    mount,
    page,
  }) => {
    await mount(<MoreExamplesOfCardFooter />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with a string as a child", async ({
    mount,
    page,
  }) => {
    await mount(<WithStringAsChild />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for draggable example", async ({
    mount,
    page,
  }) => {
    await mount(<WithDraggable />);

    await checkAccessibility(page);
  });
});
