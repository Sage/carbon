import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import { ProfileComponent } from "./component.test-pw";
import { checkAccessibility } from "../../../playwright/support/helper";

test.describe("Accessibility tests for Profile component", () => {
  test("should pass accessibility tests with default props", async ({
    mount,
    page,
  }) => {
    await mount(<ProfileComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with dark background variant", async ({
    mount,
    page,
  }) => {
    await mount(<ProfileComponent darkBackground />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with custom image", async ({
    mount,
    page,
  }) => {
    await mount(
      <ProfileComponent src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light" />,
    );

    await checkAccessibility(page);
  });

  [
    ["Dan Jin", "DJ"],
    ["Sid Ford", "SF"],
  ].forEach(([name, initials]) => {
    test(`should pass accessibility tests with initials ${initials}`, async ({
      mount,
      page,
    }) => {
      await mount(<ProfileComponent initials={initials} name={name} />);

      await checkAccessibility(page);
    });
  });

  (["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).forEach((size) => {
    test(`should pass accessibility tests with size variant ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<ProfileComponent size={size} />);

      await checkAccessibility(page);
    });
  });
});
