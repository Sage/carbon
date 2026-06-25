import React from "react";
import { render, screen } from "@testing-library/react";

import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import Profile from "./profile.component";

testStyledSystemMargin(
  (props) => <Profile data-role="profile" name="John Doe" {...props} />,
  () => screen.getByTestId("profile"),
);

/* Deprecation warning tests - must run first before flags are set */
test("warns when both `backgroundColor` and `variant` are provided", () => {
  const consoleWarnSpy = jest
    .spyOn(console, "warn")
    .mockImplementation(() => {});

  render(
    <Profile data-role="profile" backgroundColor="#FF0000" variant="lime" />,
  );

  expect(consoleWarnSpy).toHaveBeenCalledWith(
    "[Deprecation] The `backgroundColor` prop in `Profile` is deprecated and will soon be removed. Please use `variant` instead.",
  );
  expect(consoleWarnSpy).toHaveBeenCalledWith(
    "Both `backgroundColor` and `variant` props are set. The `variant` prop will be used.",
  );

  consoleWarnSpy.mockRestore();
});

test("warns when both `foregroundColor` and `variant` are provided", () => {
  const consoleWarnSpy = jest
    .spyOn(console, "warn")
    .mockImplementation(() => {});

  render(
    <Profile data-role="profile" foregroundColor="#FF0000" variant="lime" />,
  );

  expect(consoleWarnSpy).toHaveBeenCalledWith(
    "[Deprecation] The `foregroundColor` prop in `Profile` is deprecated and will soon be removed. Please use `variant` instead.",
  );
  expect(consoleWarnSpy).toHaveBeenCalledWith(
    "Both `foregroundColor` and `variant` props are set. The `variant` prop will be used.",
  );

  consoleWarnSpy.mockRestore();
});

test("logs deprecation warning when `darkBackground` prop is used", () => {
  const consoleWarnSpy = jest
    .spyOn(console, "warn")
    .mockImplementation(() => {});

  render(<Profile data-role="profile" darkBackground />);

  expect(consoleWarnSpy).toHaveBeenCalledWith(
    "[Deprecation] The `darkBackground` prop in `Profile` is deprecated and will soon be removed.",
  );

  consoleWarnSpy.mockRestore();
});

test("renders with set data tags", () => {
  render(<Profile data-role="foo" data-element="bar" />);

  const profile = screen.getByTestId("foo");
  expect(profile).toHaveAttribute("data-component", "profile");
  expect(profile).toHaveAttribute("data-element", "bar");
});

test("renders default avatar if no text-based props are passed", () => {
  render(<Profile data-role="profile" />);

  const profile = screen.getByTestId("profile");
  const avatar = screen.getByTestId("icon");

  expect(profile).toContainElement(avatar);
  expect(avatar).toBeVisible();
  expect(avatar).toHaveAttribute("type", "individual");
});

test("renders with name text when `name` prop is passed", () => {
  render(<Profile name="John Doe" />);

  const nameText = screen.getByText("John Doe");
  expect(nameText).toBeVisible();
  expect(nameText).toHaveAttribute("data-element", "name");
});

test.each([
  ["John", "J"],
  ["John Doe", "JD"],
  ["John Dan Doe", "JDD"],
])(
  "renders avatar with initials generated from `name` prop",
  (names, initials) => {
    render(<Profile name={names} />);

    const avatar = screen.getByText(initials);
    expect(avatar).toBeVisible();
  },
);

test("renders avatar with a maximum of three initials when `name` prop has more than three words", () => {
  render(<Profile name="John David Daniel Doe" />);

  const avatar = screen.getByText("JDD");
  expect(avatar).toBeVisible();
});

test("renders default avatar if `name` prop is an empty string", () => {
  render(<Profile name="" />);

  const avatar = screen.getByTestId("icon");
  expect(avatar).toBeVisible();
  expect(avatar).toHaveAttribute("type", "individual");
});

test("renders default avatar if `name` prop has no identifiable words", () => {
  render(<Profile name="!@£$%" />);

  const avatar = screen.getByTestId("icon");
  expect(avatar).toBeVisible();
  expect(avatar).toHaveAttribute("type", "individual");
});

test("sets alt attribute on avatar to `name` prop value if `alt` prop is not passed", () => {
  render(
    <Profile
      name="John Doe"
      src="https://upload.wikimedia.org/wikipedia/en/6/6c/Heatposter.jpg"
    />,
  );

  const avatar = screen.getByAltText("John Doe");
  expect(avatar).toBeVisible();
});

test("renders with email text when `email` prop is passed", () => {
  const emailAddress = "john.doe@sage.com";
  render(<Profile name="John Doe" email={emailAddress} />);

  const emailText = screen.getByRole("link", { name: emailAddress });
  const emailLink = screen.getByTestId("email-link");

  expect(emailText).toBeVisible();
  expect(emailText).toHaveAttribute("href", `mailto: ${emailAddress}`);
  expect(emailLink).toHaveAttribute("data-element", "email");
});

test("renders with additional text when `text` prop is passed", () => {
  render(<Profile name="John Doe" text="Software Engineer" />);

  const text = screen.getByText("Software Engineer");
  expect(text).toBeVisible();
  expect(text).toHaveAttribute("data-element", "text");
});

test("renders custom content below the profile details", () => {
  render(
    <Profile name="John Doe" text="Software Engineer">
      <button type="button">View profile</button>
    </Profile>,
  );

  const text = screen.getByText("Software Engineer");
  const customContent = screen.getByTestId("custom-content");

  expect(customContent).toBeVisible();
  expect(customContent).toHaveAttribute("data-element", "custom-content");
  expect(customContent).toContainElement(
    screen.getByRole("button", { name: "View profile" }),
  );
  expect(
    text.compareDocumentPosition(customContent) &
      Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
});

test("renders custom content without requiring the `name` prop", () => {
  render(<Profile>Custom text</Profile>);

  expect(screen.getByText("Custom text")).toBeVisible();
});

test("warns if the `email` or `text` props are passed without the `name` prop", () => {
  const consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <>
      <Profile email="chris.barber@sage.com" />
      <Profile text="Software Engineer" />
    </>,
  );

  expect(consoleSpy).toHaveBeenCalledWith(
    "[WARNING] The `email` or `text` prop should not be used without the `name` prop in `Profile`." +
      " Please use the `name` prop as well as `email` or `text`.",
  );
  expect(consoleSpy).toHaveBeenCalledTimes(1);
  consoleSpy.mockRestore();
});

test("renders avatar with custom initials when `initials` prop is passed", () => {
  render(<Profile initials="CB" />);

  const avatar = screen.getByText("CB");
  expect(avatar).toBeVisible();
});

test("renders avatar with custom image when `src` prop is passed", () => {
  const src = "https://upload.wikimedia.org/wikipedia/en/6/6c/Heatposter.jpg";
  render(<Profile src={src} alt="foo" />);

  const avatar = screen.getByRole("img");
  expect(avatar).toBeVisible();
  expect(avatar).toHaveAttribute("src", src);
});

test("sets alt attribute on avatar to `alt` prop value", () => {
  const src = "https://upload.wikimedia.org/wikipedia/en/6/6c/Heatposter.jpg";
  render(<Profile src={src} alt="custom-alt" />);

  const avatar = screen.getByAltText("custom-alt");
  expect(avatar).toBeVisible();
});

/* Styling test for coverage */
test("renders with dark background styling when `darkBackground` prop is passed", () => {
  const emailAddress = "chris.barber@sage.com";
  render(
    <Profile
      data-role="profile"
      darkBackground
      name="John Doe"
      email={emailAddress}
      text="Software Engineer"
    />,
  );

  const profile = screen.getByTestId("profile");
  const emailLink = screen.getByTestId("email-link");

  expect(profile).toHaveStyleRule("color", "var(--colorsUtilityReadOnly600)");
  expect(profile).toHaveStyleRule(
    "background-color",
    "var(--colorsUtilityYin090)",
  );
  expect(emailLink).toHaveStyleRule("color", "var(--colorsActionMajor350)", {
    modifier: "a",
  });
});

test("renders with custom avatar colouring when `backgroundColor` is set", () => {
  render(<Profile data-role="profile" backgroundColor="#00FF00" />);

  const profile = screen.getByTestId("profile");
  const portrait = screen.getByTestId("profile-portrait");
  const avatar = screen.getByTestId("icon");

  expect(profile).toContainElement(avatar);
  expect(avatar).toBeVisible();
  expect(avatar).toHaveAttribute("type", "individual");
  expect(portrait).toHaveStyleRule("background-color", "#00FF00");
});

test("renders with custom avatar foreground and background colouring when both `foregroundColor` and `backgroundColor` are set", () => {
  render(
    <Profile
      data-role="profile"
      backgroundColor="#00FF00"
      foregroundColor="#FF00FF"
    />,
  );

  const profile = screen.getByTestId("profile");
  const portrait = screen.getByTestId("profile-portrait");
  const avatar = screen.getByTestId("icon");

  expect(profile).toContainElement(avatar);
  expect(avatar).toBeVisible();
  expect(avatar).toHaveAttribute("type", "individual");
  expect(portrait).toHaveStyleRule("background-color", "#00FF00");
  expect(portrait).toHaveStyleRule("color", "#FF00FF");
});

test("passes the `variant` prop through to the portrait", () => {
  render(<Profile data-role="profile" variant="lime" />);

  const portrait = screen.getByTestId("profile-portrait");

  expect(portrait).toHaveStyleRule(
    "background-color",
    "var(--profile-swatches-lime-bg-default)",
  );
  expect(portrait).toHaveStyleRule(
    "color",
    "var(--profile-swatches-lime-label-default)",
  );
});

test("uses profile heading tokens for the name", () => {
  render(<Profile name="John Doe" size="XL" />);

  const name = screen.getByText("John Doe");

  expect(name).toHaveStyleRule("font", "var(--profile-font-heading-xl)");
  expect(name).toHaveStyleRule("color", "var(--profile-label-default)");
});

test("uses profile label tokens for additional text", () => {
  render(<Profile name="John Doe" text="Software Engineer" />);

  const text = screen.getByText("Software Engineer");

  expect(text).toHaveStyleRule(
    "font",
    "var(--global-font-static-body-regular-m)",
  );
  expect(text).toHaveStyleRule("color", "var(--profile-label-default)");
});

test("gives priority to `variant` prop over deprecated `backgroundColor` when both are provided", () => {
  render(
    <Profile data-role="profile" backgroundColor="#FF0000" variant="lime" />,
  );

  const portrait = screen.getByTestId("profile-portrait");

  expect(portrait).toHaveStyleRule(
    "background-color",
    "var(--profile-swatches-lime-bg-default)",
  );
  expect(portrait).not.toHaveStyleRule("background-color", "#FF0000");
});

test("gives priority to `variant` prop over deprecated `foregroundColor` when both are provided", () => {
  render(
    <Profile data-role="profile" foregroundColor="#FF0000" variant="lime" />,
  );

  const portrait = screen.getByTestId("profile-portrait");

  expect(portrait).toHaveStyleRule(
    "color",
    "var(--profile-swatches-lime-label-default)",
  );
  expect(portrait).not.toHaveStyleRule("color", "#FF0000");
});

test.each(["orange", "blue", "purple"] as const)(
  "renders with %s variant styling",
  (variantValue) => {
    render(<Profile data-role="profile" variant={variantValue} />);

    const portrait = screen.getByTestId("profile-portrait");

    expect(portrait).toHaveStyleRule(
      "background-color",
      `var(--profile-swatches-${variantValue}-bg-default)`,
    );
    expect(portrait).toHaveStyleRule(
      "color",
      `var(--profile-swatches-${variantValue}-label-default)`,
    );
  },
);
