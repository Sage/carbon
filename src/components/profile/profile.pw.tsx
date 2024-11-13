import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import { EmptyProfileComponent, ProfileComponent } from "./component.test-pw";
import { CHARACTERS } from "../../../playwright/support/constants";

import {
  emailPreview,
  namePreview,
  profilePreview,
  detailsPreview,
  initialPreview,
  textPreview,
} from "../../../playwright/components/profile";

import { portraitImage } from "../../../playwright/components/portrait";

import {
  checkAccessibility,
  containsClass,
  getDesignTokensByCssProperty,
} from "../../../playwright/support/helper";

import profileConfigSizes, { PROFILE_SIZES } from "./profile.config";

const testImage =
  "https://www.gravatar.com/avatar/05c1c705ee45d7ae88b80b3a8866ddaa?s=24&d=404";

const imageURLs = [
  "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
  "https://www.gravatar.com/avatar/05c1c705ee45d7ae88b80b3a8866ddaa?s=24&d=404",
];

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

test.describe("Prop checks for Profile component", () => {
  test(`should render with className`, async ({ mount, page }) => {
    await mount(<ProfileComponent className="profile-playwright-classname" />);

    await containsClass(profilePreview(page), "profile-playwright-classname");
  });

  testData.forEach((email) => {
    test(`should render with email prop passed as ${email}`, async ({
      mount,
      page,
    }) => {
      await mount(<ProfileComponent email={email} src={testImage} />);

      await expect(emailPreview(page)).toHaveText(email);
    });
  });

  testData.forEach((name) => {
    test(`should render with name prop passed as ${name}`, async ({
      mount,
      page,
    }) => {
      await mount(<ProfileComponent name={name} src={testImage} />);

      await expect(namePreview(page)).toHaveText(name);
    });
  });

  [
    ["World Wide Web Web", "WWW"],
    ["World Wide Web", "WWW"],
    ["John Doe", "JD"],
    ["Foo", "F"],
  ].forEach(([name, initials]) => {
    test(`should render with correct initials when name prop is passed as ${name} and no other icon, src or gravatar is passed`, async ({
      mount,
      page,
    }) => {
      await mount(<EmptyProfileComponent name={name} />);

      await expect(initialPreview(page)).toHaveText(initials);
    });
  });

  testData.forEach((text) => {
    test(`should render with text prop passed as ${text}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <EmptyProfileComponent name="John Doe" text={text} src={testImage} />,
      );

      await expect(textPreview(page)).toHaveText(text);
    });
  });

  PROFILE_SIZES.forEach((size) => {
    test(`should render with correct margin-left tokens when size is ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<EmptyProfileComponent name="John Doe" size={size} />);

      const configMarginLeftValues = profileConfigSizes[size].marginLeft;

      await expect(detailsPreview(page)).toHaveCSS(
        "margin-left",
        configMarginLeftValues,
      );
    });
  });

  PROFILE_SIZES.forEach((size) => {
    test(`should render with correct line-height tokens when size is ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<EmptyProfileComponent name="John Doe" size={size} />);

      const configLineHeightValues = profileConfigSizes[size].lineHeight;

      await expect(detailsPreview(page)).toHaveCSS(
        "line-height",
        configLineHeightValues,
      );
    });
  });

  PROFILE_SIZES.forEach((size) => {
    test(`should render with correct name font-size tokens when size is ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<EmptyProfileComponent name="John Doe" size={size} />);

      const fontSizeTokens = await getDesignTokensByCssProperty(
        page,
        namePreview(page),
        "font-size",
      );
      const configFontSizeTokens = profileConfigSizes[size].nameSize;

      expect(configFontSizeTokens).toContain(fontSizeTokens.toString());
    });
  });

  PROFILE_SIZES.forEach((size) => {
    test(`should render with correct email font-size tokens when size is ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <EmptyProfileComponent
          name="John Doe"
          email="john@doe.com"
          size={size}
        />,
      );

      const fontSizeTokens = await getDesignTokensByCssProperty(
        page,
        emailPreview(page),
        "font-size",
      );
      const configSizeTokens = profileConfigSizes[size].emailSize;

      expect(configSizeTokens).toContain(fontSizeTokens.toString());
    });
  });

  PROFILE_SIZES.forEach((size) => {
    test(`should render with correct text font-size tokens when size is ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <EmptyProfileComponent
          name="John Doe"
          text="Some text about John here"
          size={size}
        />,
      );

      const fontSizeTokens = await getDesignTokensByCssProperty(
        page,
        textPreview(page),
        "font-size",
      );
      const configSizeTokens = profileConfigSizes[size].emailSize;

      expect(configSizeTokens).toContain(fontSizeTokens.toString());
    });
  });

  (
    [
      ["without", false, "rgba(0, 0, 0, 0)", ""],
      ["with", true, "rgba(0, 0, 0, 0.9)", "--colorsUtilityYin090"],
    ] as [string, boolean, string, string][]
  ).forEach(([renderState, boolVal, color, tokenVal]) => {
    test(`should render ${renderState} dark background variant and correct background colour, when darkBackground prop is ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<ProfileComponent darkBackground={boolVal} />);

      const backgroundColorTokens = await getDesignTokensByCssProperty(
        page,
        profilePreview(page),
        "background-color",
      );

      expect(backgroundColorTokens.toString()).toBe(tokenVal);
      await expect(profilePreview(page)).toHaveCSS("background-color", color);
    });
  });

  (
    [
      ["without", false, "rgba(0, 0, 0, 0.9)", "--colorsUtilityYin090"],
      ["with", true, "rgb(204, 214, 219)", "--colorsUtilityReadOnly600"],
    ] as [string, boolean, string, string][]
  ).forEach(([renderState, boolVal, color, tokenVal]) => {
    test(`should render ${renderState} dark background variant and correct colour, when darkBackground prop is ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<ProfileComponent darkBackground={boolVal} />);

      const colorTokens = await getDesignTokensByCssProperty(
        page,
        profilePreview(page),
        "color",
      );

      expect(colorTokens.toString()).toBe(tokenVal);
      await expect(profilePreview(page)).toHaveCSS("color", color);
    });
  });

  imageURLs.forEach((url) => {
    test(`should render with src prop passed as ${url}`, async ({
      mount,
      page,
    }) => {
      await mount(<ProfileComponent src={url} />);

      await expect(portraitImage(page)).toHaveCSS("height", "40px");
      await expect(portraitImage(page)).toHaveCSS("width", "40px");
      await expect(portraitImage(page)).toHaveAttribute("src", url);
    });
  });
});

test.describe("should check Accessibility tests for Profile component", () => {
  test(`should pass accessibility tests when className prop is passed`, async ({
    mount,
    page,
  }) => {
    await mount(<ProfileComponent className="profile-classnames" />);

    await checkAccessibility(page);
  });

  testData.forEach((email) => {
    test(`should pass accessibility tests when email prop is passed as ${email}`, async ({
      mount,
      page,
    }) => {
      await mount(<ProfileComponent email={email} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((name) => {
    test(`should pass accessibility tests when name prop is passed as ${name}`, async ({
      mount,
      page,
    }) => {
      await mount(<ProfileComponent name={name} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((text) => {
    test(`should pass accessibility tests when text prop is passed as ${text}`, async ({
      mount,
      page,
    }) => {
      await mount(<ProfileComponent text={text} />);

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests when no email prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<ProfileComponent email="" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with dark background variant", async ({
    mount,
    page,
  }) => {
    await mount(<ProfileComponent darkBackground />);

    await checkAccessibility(page);
  });

  (["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).forEach((size) => {
    test(`should pass accessibility tests when size prop is passed as ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<ProfileComponent size={size} />);

      await checkAccessibility(page);
    });
  });

  [
    ["Dan Jin", "DJ"],
    ["Sid Ford", "SF"],
  ].forEach(([name, passInitials]) => {
    test(`should pass accessibility tests when initials prop is passed as ${passInitials}`, async ({
      mount,
      page,
    }) => {
      await mount(<ProfileComponent initials={passInitials} name={name} />);

      await checkAccessibility(page);
    });
  });

  imageURLs.forEach((url) => {
    test(`should pass accessibility tests when src prop is passed as ${url}`, async ({
      mount,
      page,
    }) => {
      await mount(<ProfileComponent src={url} />);

      await checkAccessibility(page);
    });
  });
});
