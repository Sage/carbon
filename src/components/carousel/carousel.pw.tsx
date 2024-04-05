import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import type { Page } from "@playwright/test";
import CarouselComponent from "./components.test-pw";
import {
  slide,
  nextArrowButton,
  previousArrowButton,
  slideSelector,
  carousel,
} from "../../../playwright/components/carousel";
import {
  checkAccessibility,
  containsClass,
} from "../../../playwright/support/helper";
import { HooksConfig } from "../../../playwright";

async function clickCarouselButton(page: Page, direction: "left" | "right") {
  switch (direction) {
    case "left":
      await previousArrowButton(page).click();
      break;
    case "right":
      await nextArrowButton(page).click();
      break;
    default:
      throw new Error("Direction can be only left or right");
  }
}

const renderVals: [boolean, string][] = [
  [true, "exist"],
  [false, "not.exist"],
];

test.describe("should render Carousel component and check props", () => {
  renderVals.forEach(([isEnabled, state]) => {
    test(`should verify when 'enablePreviousButton' is set to ${isEnabled} that slide Selector does ${state}`, async ({
      mount,
      page,
    }) => {
      await mount(<CarouselComponent enablePreviousButton={isEnabled} />);

      if (isEnabled) {
        await expect(previousArrowButton(page)).toBeVisible();
      } else {
        await expect(previousArrowButton(page)).toBeHidden();
      }
    });
  });

  ([
    ["1", 0, "Slide 1"],
    ["2", 1, "Full clickable slide"],
    ["3", 2, "Slide 3"],
    ["4", 3, "Slide 4"],
  ] as [string, number, string][]).forEach(([index, indexSlide, title]) => {
    test(`when left arrow is clicked to slide ${index} from slide ${indexSlide} title should be ${title}`, async ({
      mount,
      page,
    }) => {
      await mount(<CarouselComponent slideIndex={index} />);

      await clickCarouselButton(page, "left");
      await expect(slide(page, indexSlide)).toHaveText(title);
    });
  });

  ([
    ["0", 1, "Full clickable slide"],
    ["1", 2, "Slide 3"],
    ["2", 3, "Slide 4"],
    ["3", 4, "Slide 5"],
  ] as [string, number, string][]).forEach(([index, indexSlide, title]) => {
    test(`when right arrow is clicked from slide ${index} to slide ${indexSlide} title should be ${title}`, async ({
      mount,
      page,
    }) => {
      await mount(<CarouselComponent />);

      await clickCarouselButton(page, "right");
      await expect(slide(page, indexSlide)).toHaveText(title);
    });
  });

  renderVals.forEach(([isEnabled, state]) => {
    test(`should verify when 'enableSlideSelector' is set to ${isEnabled} that slide Selector does ${state}`, async ({
      mount,
      page,
    }) => {
      await mount(<CarouselComponent enableSlideSelector={isEnabled} />);

      if (isEnabled) {
        const selector = slideSelector(page);
        await expect(selector).toBeVisible();
      } else {
        const selector = slideSelector(page);
        await expect(selector).toBeHidden();
      }
    });
  });

  renderVals.forEach(([isEnabled, state]) => {
    test(`should verify when 'enableNextButton' is set to ${isEnabled} that slide Selector does ${state}`, async ({
      mount,
      page,
    }) => {
      await mount(<CarouselComponent enableNextButton={isEnabled} />);

      if (isEnabled) {
        await expect(nextArrowButton(page)).toBeVisible();
      } else {
        await expect(nextArrowButton(page)).toBeHidden();
      }
    });
  });

  ([
    [0, "Slide 1"],
    [1, "Full clickable slide"],
    [2, "Slide 3"],
    [3, "Slide 4"],
    [4, "Slide 5"],
  ] as [number, string][]).forEach(([index, title]) => {
    test(`should set initial slide to ${index}`, async ({ mount, page }) => {
      await mount(<CarouselComponent initialSlideIndex={index} />);

      await expect(slide(page, index)).toHaveText(title);
    });
  });

  ([
    [0, "Slide 1"],
    [1, "Full clickable slide"],
    [2, "Slide 3"],
    [3, "Slide 4"],
    [4, "Slide 5"],
  ] as [number, string][]).forEach(([index, title]) => {
    test(`should verify slide ${index} title is ${title}`, async ({
      mount,
      page,
    }) => {
      await mount(<CarouselComponent slideIndex={index} />);

      await expect(slide(page, index)).toHaveText(title);
    });
  });

  test(`should render Carousel component with className`, async ({
    mount,
    page,
  }) => {
    await mount(<CarouselComponent className="carousel-classname" />);

    await containsClass(carousel(page), "carousel-classname");
  });

  test(`should verify left arrow button is disabled on first slide`, async ({
    mount,
    page,
  }) => {
    await mount(<CarouselComponent slideIndex={0} />);

    const prevButton = previousArrowButton(page);
    await expect(prevButton).toBeDisabled();
  });

  test(`should verify right arrow button is disabled on last slide`, async ({
    mount,
    page,
  }) => {
    await mount(<CarouselComponent slideIndex={4} />);

    const nextButton = nextArrowButton(page);
    await expect(nextButton).toBeDisabled();
  });
});

test.describe("check events for Carousel component", () => {
  test("should call onSlideChange when next arrow clicked", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <CarouselComponent
        onSlideChange={() => {
          callbackCount += 1;
        }}
      />
    );

    const nextButton = nextArrowButton(page);
    await nextButton.click();
    expect(callbackCount).toBe(1);
  });

  test("should call onSlideChange when previous arrow clicked", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <CarouselComponent
        slideIndex={1}
        onSlideChange={() => {
          callbackCount += 1;
        }}
      />
    );

    const prevButton = previousArrowButton(page);
    await prevButton.click();
    expect(callbackCount).toBe(1);
  });
});

test.describe("should check accessibility for Carousel component", () => {
  test(`should check accessibility for default Carousel component`, async ({
    mount,
    page,
  }) => {
    await mount(<CarouselComponent />);

    await checkAccessibility(page);
  });
});

test.describe(
  "verify focus outline and rounded corners on Carousel component",
  () => {
    test("the arrow buttons should have expected styling when opt out flag is true", async ({
      mount,
      page,
    }) => {
      await mount<HooksConfig>(<CarouselComponent open />, {
        hooksConfig: {
          focusRedesignOptOut: true,
        },
      });

      const nextButton = nextArrowButton(page);
      await nextButton.focus();
      await expect(nextArrowButton(page)).toHaveCSS(
        "outline",
        "rgb(255, 188, 25) solid 2px"
      );

      await nextArrowButton(page).click();

      const prevButton = previousArrowButton(page);
      await prevButton.focus();
      await expect(previousArrowButton(page)).toHaveCSS(
        "outline",
        "rgb(255, 188, 25) solid 2px"
      );
    });

    test("the arrow buttons should have expected styling when opt out flag is false", async ({
      mount,
      page,
    }) => {
      await mount(<CarouselComponent />);

      const nextButton = nextArrowButton(page);
      await nextButton.focus();
      await expect(nextArrowButton(page)).toHaveCSS(
        "box-shadow",
        "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
      );
      await expect(nextArrowButton(page)).toHaveCSS(
        "outline",
        "rgba(0, 0, 0, 0) solid 3px"
      );

      await nextArrowButton(page).click();

      const prevButton = previousArrowButton(page);
      await prevButton.focus();
      await expect(previousArrowButton(page)).toHaveCSS(
        "box-shadow",
        "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
      );
      await expect(previousArrowButton(page)).toHaveCSS(
        "outline",
        "rgba(0, 0, 0, 0) solid 3px"
      );
    });

    test("should have the expected border radius styling", async ({
      mount,
      page,
    }) => {
      await mount(<CarouselComponent />);

      await expect(nextArrowButton(page)).toHaveCSS("border-radius", "32px");
      await expect(previousArrowButton(page)).toHaveCSS(
        "border-radius",
        "32px"
      );
      await expect(slide(page, 0)).toHaveCSS("border-radius", "16px");
      await expect(slide(page, 1)).toHaveCSS("border-radius", "16px");
      await expect(slide(page, 2)).toHaveCSS("border-radius", "16px");
      await expect(slide(page, 3)).toHaveCSS("border-radius", "16px");
      await expect(slide(page, 4)).toHaveCSS("border-radius", "16px");
    });
  }
);
