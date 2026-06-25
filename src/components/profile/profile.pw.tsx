import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import { EmptyProfileComponent, ProfileComponent } from "./component.test-pw";
import { checkAccessibility } from "../../../playwright/support/helper";

test.describe("Accessibility tests for Profile component", () => {
  test("should pass accessibility tests with minimal props", async ({
    mount,
    page,
  }) => {
    await mount(<EmptyProfileComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with email link", async ({
    mount,
    page,
  }) => {
    await mount(<ProfileComponent />);

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

  test("should pass accessibility tests with children", async ({
    mount,
    page,
  }) => {
    await mount(
      <ProfileComponent>
        <div>Custom content</div>
      </ProfileComponent>,
    );

    await checkAccessibility(page);
  });
});
