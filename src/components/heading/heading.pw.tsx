import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import {
  HeadingComponent,
  HeadingComponentWithPills,
} from "./components.test-pw";
import {
  headingPreview,
  headingTitle,
  headingHelp,
  headingHelpTooltip,
  subheaderPreview,
  dividerPreview,
  separatorPreview,
} from "../../../playwright/components/heading/index";
import { link, pillPreview } from "../../../playwright/components/index";
import { CHARACTERS } from "../../../playwright/support/constants";
import { HeadingType } from "../../../src/components/heading";
import {
  checkAccessibility,
  getStyle,
} from "../../../playwright/support/helper";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testData = ["https://carbon.sage.com/"];
const dividerAndSeparatorValue: [boolean, string][] = [
  [true, "with"],
  [false, "without"],
];
const headingType: HeadingType[] = ["h1", "h2", "h3", "h4", "h5"];

test.describe("Heading component", () => {
  specialCharacters.forEach((characterVals) => {
    test(`should render with ${characterVals} passed as children`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent> {characterVals} </HeadingComponent>);

      await expect(headingPreview(page)).toContainText(characterVals);
    });
  });

  specialCharacters.forEach((characterVals) => {
    test(`should render with ${characterVals} passed as title`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent title={characterVals} />);

      await expect(headingTitle(page)).toHaveText(characterVals);
    });
  });

  specialCharacters.forEach((characterVals) => {
    test(`should render with ${characterVals} passed as titleId`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent titleId={characterVals} />);

      await expect(headingTitle(page)).toHaveId(characterVals);
    });
  });

  specialCharacters.forEach((characterVals) => {
    test(`should render with ${characterVals} passed as subtitle`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent subheader={characterVals} />);

      await expect(subheaderPreview(page)).toHaveText(characterVals);
    });
  });

  specialCharacters.forEach((characterVals) => {
    test(`should render with ${characterVals} passed as subtitleId`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent subtitleId={characterVals} />);

      await expect(subheaderPreview(page)).toHaveId(characterVals);
    });
  });

  specialCharacters.forEach((characterVals) => {
    test(`should render with ${characterVals} passed as help text`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent help={characterVals} />);

      await headingHelp(page).hover();

      await expect(headingHelpTooltip(page)).toBeVisible();
      await expect(headingHelpTooltip(page)).toContainText(characterVals);
    });
  });

  testData.forEach((helpLink) => {
    test(`should render with ${testData} passed as help link`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent helpLink={helpLink} />);

      await expect(headingHelp(page)).toHaveAttribute("href", helpLink);
    });
  });

  testData.forEach((backLink) => {
    test(`should render with ${backLink} passed as back link`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent backLink={backLink} />);

      await expect(link(page).locator("a")).toHaveAttribute("href", backLink);
    });
  });

  test(`should render with the correct focus styling when a string is passed to the back link`, async ({
    mount,
    page,
  }) => {
    await mount(<HeadingComponent backLink="https://carbon.sage.com/" />);

    const linkWrapper = await link(page);
    const backLinkAnchor = await linkWrapper.locator("a");
    await backLinkAnchor.focus();
    await expect(backLinkAnchor).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(backLinkAnchor).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px",
    );
    await expect(linkWrapper).toHaveCSS("box-shadow", "none");
  });

  specialCharacters.forEach((characterVals) => {
    test(`should render with ${characterVals} passed as helpAriaLabel`, async ({
      mount,
      page,
    }) => {
      await mount(
        <HeadingComponent
          help="this is a title"
          helpAriaLabel={characterVals}
        />,
      );

      await expect(headingHelp(page)).toHaveAttribute(
        "aria-label",
        characterVals,
      );
    });
  });

  specialCharacters.forEach((characterVals) => {
    test(`should render with pill and ${characterVals} passed as pill text`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponentWithPills pills={characterVals} />);

      await expect(pillPreview(page)).toHaveText(characterVals);
    });
  });

  dividerAndSeparatorValue.forEach(([dividerVals, renderState]) => {
    test(`should render ${renderState} a divider when divider prop is ${dividerVals} `, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent divider={dividerVals} />);

      if (dividerVals) {
        await expect(dividerPreview(page)).toHaveCSS(
          "background",
          "rgb(204, 214, 219) none repeat scroll 0% 0% / auto padding-box border-box",
        );
      } else {
        expect(await dividerPreview(page).count()).toEqual(0);
      }
    });
  });

  dividerAndSeparatorValue.forEach(([separatorVals, renderState]) => {
    test(`should render ${renderState} a separator when separator prop is ${separatorVals}`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent separator={separatorVals} />);

      if (separatorVals) {
        const cssBorderWidth = await getStyle(
          separatorPreview(page),
          "border-width",
        );
        const [first, second, third] = cssBorderWidth.split(" ");

        expect(parseInt(first)).toBeCloseTo(2);
        expect(parseInt(second)).toBeCloseTo(1);
        expect(parseInt(third)).toBeCloseTo(1);
      } else {
        expect(await separatorPreview(page).count()).toEqual(0);
      }
    });
  });

  headingType.forEach((heading) => {
    test(`should render with ${heading} as the heading level`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent headingType={heading} title={heading} />);

      await expect(headingPreview(page).locator(heading)).toHaveText(heading);
    });
  });
});

test.describe("should render Heading component and check accessibility issues", () => {
  test("default component should pass accessibility checks", async ({
    mount,
    page,
  }) => {
    await mount(<HeadingComponent />);

    await checkAccessibility(page);
  });

  specialCharacters.forEach((characterVals) => {
    test(`should pass accessibility checks with ${characterVals} passed as children`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent>{characterVals}</HeadingComponent>);

      await checkAccessibility(page);
    });
  });

  specialCharacters.forEach((characterVals) => {
    test(`should pass accessibility checks when title is ${characterVals}`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent title={characterVals} />);

      await checkAccessibility(page);
    });
  });

  specialCharacters.forEach((characterVals) => {
    test(`should pass accessibility checks when titleId is ${characterVals}`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent titleId={characterVals} />);

      await checkAccessibility(page);
    });
  });

  specialCharacters.forEach((characterVals) => {
    test(`should pass accessibility checks when subheader is ${characterVals}`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent subheader={characterVals} />);

      await checkAccessibility(page);
    });
  });

  specialCharacters.forEach((characterVals) => {
    test(`should pass accessibility checks when subtitleId is ${characterVals}`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent subtitleId={characterVals} />);

      await checkAccessibility(page);
    });
  });

  specialCharacters.forEach((characterVals) => {
    test(`should pass accessibility checks when help text is ${characterVals}`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent help={characterVals} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((helpLink) => {
    test(`should pass accessibility checks when help link is ${helpLink}`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent helpLink={helpLink} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((backLink) => {
    test(`should pass accessibility checks when back link is ${backLink}`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent backLink={backLink} />);

      await checkAccessibility(page);
    });
  });

  specialCharacters.forEach((characterVals) => {
    test(`should pass accessibility checks when helpAriaLabel is ${characterVals}`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent helpAriaLabel={characterVals} />);

      await checkAccessibility(page);
    });
  });

  specialCharacters.forEach((characterVals) => {
    test(`should pass accessibility checks when pill is rendered with ${characterVals} passed as pill text`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponentWithPills pills={characterVals} />);

      await checkAccessibility(page);
    });
  });

  dividerAndSeparatorValue.forEach(([dividerVals, renderState]) => {
    test(`should pass accessibility checks when rendered ${renderState} a divider when the divider prop is ${dividerVals}`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent divider={dividerVals} />);

      await checkAccessibility(page);
    });
  });

  dividerAndSeparatorValue.forEach(([separatorVals, renderState]) => {
    test(`should pass accessibility checks when rendered ${renderState} a separator when the separator prop is ${separatorVals}`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent separator={separatorVals} />);

      await checkAccessibility(page);
    });
  });

  headingType.forEach((heading) => {
    test(`should pass accessibility checks when heading level is ${heading}`, async ({
      mount,
      page,
    }) => {
      await mount(<HeadingComponent headingType={heading} />);

      await checkAccessibility(page);
    });
  });
});
