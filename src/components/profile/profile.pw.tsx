import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import ProfileComponent from "./component.test-pw";
import { CHARACTERS } from "../../../playwright/support/constants";

import {
  emailPreview,
  namePreview,
  profilePreview,
  initialPreview,
} from "../../../playwright/components/profile";

import { portraitImage } from "../../../playwright/components/portrait";

import { PROFILE_SIZES } from "../../../src/components/profile/profile.config";

import {
  checkAccessibility,
  containsClass,
} from "../../../playwright/support/helper";
import { ProfileProps } from "./profile.component";

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
    test(`should render with email prop is passed as ${email}`, async ({
      mount,
      page,
    }) => {
      await mount(<ProfileComponent email={email} src={testImage} />);

      await expect(emailPreview(page)).toHaveText(email);
    });
  });

  testData.forEach((name) => {
    test(`should render with name prop is passed as ${name}`, async ({
      mount,
      page,
    }) => {
      await mount(<ProfileComponent name={name} src={testImage} />);

      await expect(namePreview(page)).toHaveText(name);
    });
  });

  ([
    [PROFILE_SIZES[0], 22],
    [PROFILE_SIZES[1], 30],
    [PROFILE_SIZES[2], 38],
    [PROFILE_SIZES[3], 54],
    [PROFILE_SIZES[4], 70],
    [PROFILE_SIZES[5], 102],
    [PROFILE_SIZES[6], 126],
  ] as [ProfileProps["size"], number][]).forEach(([size, heightAndWidth]) => {
    test(`should render with size prop is passed as ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<ProfileComponent size={size} />);

      await expect(initialPreview(page)).toHaveCSS(
        "height",
        `${heightAndWidth}px`
      );
      await expect(initialPreview(page)).toHaveCSS(
        "width",
        `${heightAndWidth}px`
      );
    });
  });

  ([
    [PROFILE_SIZES[0], 22],
    [PROFILE_SIZES[1], 30],
    [PROFILE_SIZES[2], 38],
    [PROFILE_SIZES[3], 54],
    [PROFILE_SIZES[4], 70],
    [PROFILE_SIZES[5], 102],
    [PROFILE_SIZES[6], 126],
  ] as [ProfileProps["size"], number][]).forEach(([size, heightAndWidth]) => {
    test(`should render with size prop is passed as ${size} and initials prop is passed`, async ({
      mount,
      page,
    }) => {
      await mount(<ProfileComponent initials="DK" size={size} />);

      await expect(initialPreview(page)).toHaveCSS(
        "height",
        `${heightAndWidth}px`
      );
      await expect(initialPreview(page)).toHaveCSS(
        "width",
        `${heightAndWidth}px`
      );
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
