import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  loaderSpinnerWrapper,
  loaderSpinnerSvg,
  loaderSpinnerOuterArc,
  loaderSpinnerInnerArc,
  loaderSpinnerVisibleLabel,
  loaderSpinnerHiddenLabel,
} from "../../../playwright/components/loader-spinner/index";
import { checkAccessibility } from "../../../playwright/support/helper";
import LoaderSpinnerComponent from "./components.test-pw";
import {
  LOADER_SPINNER_SIZE_PARAMS,
  LOADER_SPINNER_SIZES as sizes,
  LOADER_SPINNER_VARIANTS as variants,
} from "./loader-spinner.config";

test.describe("Prop checks for Loader Spinner component", () => {
  test("when the 'spinnerLabel' prop is passed a custom string value it overrides the default visible label", async ({
    mount,
    page,
  }) => {
    await mount(<LoaderSpinnerComponent spinnerLabel="foo" />);

    await expect(loaderSpinnerVisibleLabel(page)).toHaveText("foo");
  });

  test("when the 'spinnerLabel' prop is passed a custom string value it overrides the visually hidden label", async ({
    mount,
    page,
  }) => {
    await mount(
      <LoaderSpinnerComponent spinnerLabel="bar" showSpinnerLabel={false} />,
    );

    await expect(loaderSpinnerHiddenLabel(page)).toHaveText("bar");
  });

  test("when the 'size' prop is passed as 'extra-small' the component wrapper has a flex-direction of row", async ({
    mount,
    page,
  }) => {
    await mount(<LoaderSpinnerComponent size="extra-small" />);

    await expect(loaderSpinnerWrapper(page)).toHaveCSS("flex-direction", "row");
  });

  (["small", "medium", "large", "extra-large"] as const).forEach(
    (spinnerSizes) => {
      test(`when the 'size' prop is passed as '${spinnerSizes}' the component wrapper has a flex-direction of column`, async ({
        mount,
        page,
      }) => {
        await mount(<LoaderSpinnerComponent size={spinnerSizes} />);

        await expect(loaderSpinnerWrapper(page)).toHaveCSS(
          "flex-direction",
          "column",
        );
      });
    },
  );

  sizes.forEach((spinnerSizes) => {
    test(`when the 'size' prop is passed as '${spinnerSizes}' the svg circle wrapper has the correct height`, async ({
      mount,
      page,
    }) => {
      await mount(<LoaderSpinnerComponent size={spinnerSizes} />);

      await expect(loaderSpinnerSvg(page)).toHaveCSS(
        "height",
        `${LOADER_SPINNER_SIZE_PARAMS[spinnerSizes].wrapperDimensions}px`,
      );
    });
  });

  sizes.forEach((spinnerSizes) => {
    test(`when the 'size' prop is passed as '${spinnerSizes}' the svg circle wrapper has the correct minimum height`, async ({
      mount,
      page,
    }) => {
      await mount(<LoaderSpinnerComponent size={spinnerSizes} />);

      await expect(loaderSpinnerSvg(page)).toHaveCSS(
        "min-height",
        `${LOADER_SPINNER_SIZE_PARAMS[spinnerSizes].wrapperDimensions}px`,
      );
    });
  });

  sizes.forEach((spinnerSizes) => {
    test(`when the 'size' prop is passed as '${spinnerSizes}' the inner arc has the correct stroke width`, async ({
      mount,
      page,
    }) => {
      await mount(<LoaderSpinnerComponent size={spinnerSizes} />);

      await expect(loaderSpinnerInnerArc(page)).toHaveCSS(
        "stroke-width",
        `${LOADER_SPINNER_SIZE_PARAMS[spinnerSizes].strokeWidth}px`,
      );
    });
  });

  sizes.forEach((spinnerSizes) => {
    test(`when the 'size' prop is passed as '${spinnerSizes}' the outer arc has the correct stroke width`, async ({
      mount,
      page,
    }) => {
      await mount(<LoaderSpinnerComponent size={spinnerSizes} />);

      await expect(loaderSpinnerOuterArc(page)).toHaveCSS(
        "stroke-width",
        `${LOADER_SPINNER_SIZE_PARAMS[spinnerSizes].strokeWidth}px`,
      );
    });
  });

  test("when the 'size' prop is passed as 'extra-small' the label has the correct margin-left", async ({
    mount,
    page,
  }) => {
    await mount(<LoaderSpinnerComponent size="extra-small" />);

    await expect(loaderSpinnerVisibleLabel(page)).toHaveCSS(
      "margin-left",
      "8px",
    );
  });

  (["small", "medium", "large", "extra-large"] as const).forEach(
    (spinnerSizes) => {
      test(`when the 'size' prop is passed as '${spinnerSizes}' the label has the correct margin-top`, async ({
        mount,
        page,
      }) => {
        await mount(<LoaderSpinnerComponent size={spinnerSizes} />);

        await expect(loaderSpinnerVisibleLabel(page)).toHaveCSS(
          "margin-top",
          `${LOADER_SPINNER_SIZE_PARAMS[spinnerSizes].labelMarginTop}px`,
        );
      });
    },
  );

  test("when 'showSpinnerLabel' is `true` the label is rendered", async ({
    mount,
    page,
  }) => {
    await mount(<LoaderSpinnerComponent showSpinnerLabel />);

    await expect(loaderSpinnerVisibleLabel(page)).toHaveText("Loading...");
  });

  test("when 'showSpinnerLabel' is `false` the label is not rendered", async ({
    mount,
    page,
  }) => {
    await mount(<LoaderSpinnerComponent showSpinnerLabel={false} />);

    await expect(loaderSpinnerVisibleLabel(page)).not.toBeVisible();
  });

  test("when 'showSpinnerLabel' is `false` a visually hidden alternative label is rendered", async ({
    mount,
    page,
  }) => {
    await mount(<LoaderSpinnerComponent showSpinnerLabel={false} />);

    await expect(loaderSpinnerHiddenLabel(page)).toHaveText("Loading...");
  });

  (
    [
      "rgb(179, 217, 200)",
      "rgb(204, 214, 219)",
      "rgb(255, 255, 255)",
      "rgba(0, 0, 0, 0.1)",
      "rgb(255, 255, 255)",
    ] as string[]
  ).forEach((strokeValues, index) => {
    test(`when the 'variant' prop is passed as '${variants[index]}' the correct outer arc stroke (color) value is rendered`, async ({
      mount,
      page,
    }) => {
      await mount(<LoaderSpinnerComponent variant={variants[index]} />);

      await expect(loaderSpinnerOuterArc(page)).toHaveCSS(
        "stroke",
        strokeValues,
      );
    });
  });

  test("when the 'variant' prop is passed as 'inverse' the outer arc stroke opacity is 0.3", async ({
    mount,
    page,
  }) => {
    await mount(<LoaderSpinnerComponent variant="inverse" />);

    await expect(loaderSpinnerOuterArc(page)).toHaveCSS(
      "stroke-opacity",
      "0.3",
    );
  });

  (
    [
      "rgb(0, 126, 69)",
      "rgb(51, 91, 112)",
      "rgb(255, 255, 255)",
      "rgb(0, 214, 57)",
      "rgb(0, 214, 57)",
    ] as string[]
  ).forEach((strokeValues, index) => {
    test(`when the 'variant' prop is passed as '${variants[index]}' the correct inner arc svg stroke (color) value is rendered`, async ({
      mount,
      page,
    }) => {
      await mount(<LoaderSpinnerComponent variant={variants[index]} />);

      await expect(loaderSpinnerInnerArc(page)).toHaveCSS(
        "stroke",
        strokeValues,
      );
    });
  });

  (
    [
      "rgba(0, 0, 0, 0.9)",
      "rgba(0, 0, 0, 0.9)",
      "rgb(255, 255, 255)",
      "rgba(0, 0, 0, 0.9)",
      "rgb(255, 255, 255)",
    ] as string[]
  ).forEach((labelColorValues, index) => {
    test(`when the 'variant' prop is passed as '${variants[index]}' the correct font color is rendered`, async ({
      mount,
      page,
    }) => {
      await mount(<LoaderSpinnerComponent variant={variants[index]} />);

      await expect(loaderSpinnerVisibleLabel(page)).toHaveCSS(
        "color",
        labelColorValues,
      );
    });
  });

  test.describe("Accessibility tests for Loader Spinner component", () => {
    test("should pass accessibility checks when component is rendered in its default state", async ({
      mount,
      page,
    }) => {
      await mount(<LoaderSpinnerComponent />);

      await checkAccessibility(page);
    });

    sizes.forEach((spinnerSizes) => {
      test(`should pass accessibility checks when component is rendered with the 'size' prop passed as '${spinnerSizes}''`, async ({
        mount,
        page,
      }) => {
        await mount(<LoaderSpinnerComponent size={spinnerSizes} />);

        await checkAccessibility(page);
      });
    });

    test("should pass accessibility checks when component is rendered when 'showSpinnerLabel' is 'true", async ({
      mount,
      page,
    }) => {
      await mount(<LoaderSpinnerComponent showSpinnerLabel />);

      await checkAccessibility(page);
    });

    test("should pass accessibility checks when component is rendered when 'showSpinnerLabel' is 'false", async ({
      mount,
      page,
    }) => {
      await mount(<LoaderSpinnerComponent showSpinnerLabel={false} />);

      await checkAccessibility(page);
    });

    variants.forEach((loaderVariants) => {
      test(`should pass accessibility checks when component is rendered with the 'variant' prop passed as '${loaderVariants}''`, async ({
        mount,
        page,
      }) => {
        await mount(<LoaderSpinnerComponent variant={loaderVariants} />);

        await checkAccessibility(page);
      });
    });
  });
});
