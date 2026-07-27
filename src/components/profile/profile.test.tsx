import React from "react";
import { render, screen } from "@testing-library/react";

import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import Profile from "./profile.component";
import profileConfigSizes from "./profile.config";

testStyledSystemMargin(
  (props) => <Profile data-role="profile" name="John Doe" {...props} />,
  () => screen.getByTestId("profile"),
);

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
  expect(profile).toHaveStyleRule("color", "var(--profile-label-default)");
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

test("renders with email link when `email` prop is passed", () => {
  const emailAddress = "john.doe@sage.com";
  render(<Profile name="John Doe" email={emailAddress} />);

  const emailLink = screen.getByRole("link", { name: emailAddress });
  const emailLinkWrapper = screen.getByTestId("email-link");

  expect(emailLink).toBeVisible();
  expect(emailLink).toHaveAttribute("href", `mailto:${emailAddress}`);
  expect(emailLinkWrapper).toHaveAttribute("data-element", "email");
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
  const isCustomContentAfterText = Boolean(
    text.compareDocumentPosition(customContent) &
      Node.DOCUMENT_POSITION_FOLLOWING,
  );
  expect(isCustomContentAfterText).toBe(true);
});

test("renders custom content without requiring the `name` prop", () => {
  render(<Profile>Custom text</Profile>);

  expect(screen.getByText("Custom text")).toBeVisible();
});

test("renders custom content with inherited color on dark background", () => {
  render(
    <Profile data-role="profile" darkBackground>
      Custom text
    </Profile>,
  );

  expect(screen.getByTestId("profile")).toHaveStyleRule(
    "color",
    "var(--container-standard-inverse-txt-default)",
  );
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

  expect(profile).toHaveStyleRule(
    "background-color",
    "var(--container-standard-inverse-bg-default)",
  );
  expect(emailLink).toHaveStyleRule(
    "color",
    "var(--link-typical-inverse-label-default)",
    {
      modifier: "> a",
    },
  );
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

test.each([
  ["XS", "var(--profile-font-heading-xs)"],
  ["S", "var(--profile-font-heading-s)"],
  ["M", "var(--profile-font-heading-m)"],
  ["ML", "var(--profile-font-heading-ml)"],
  ["L", "var(--profile-font-heading-l)"],
  ["XL", "var(--profile-font-heading-xl)"],
  ["XXL", "var(--profile-font-heading-xxl)"],
] as const)(
  "maps %s profile size to expected name font token",
  (size, fontToken) => {
    expect(profileConfigSizes[size].nameTypography.font).toBe(fontToken);
  },
);

test.each([
  ["XS", "var(--profile-font-heading-xs)"],
  ["S", "var(--profile-font-heading-s)"],
  ["M", "var(--profile-font-heading-m)"],
  ["ML", "var(--profile-font-heading-ml)"],
  ["L", "var(--profile-font-heading-l)"],
  ["XL", "var(--profile-font-heading-xl)"],
  ["XXL", "var(--profile-font-heading-xxl)"],
] as const)("uses profile name font token at %s size", (size, fontToken) => {
  render(<Profile name="John Doe" size={size} />);

  expect(screen.getByText("John Doe")).toHaveStyleRule("font", fontToken);
});

test.each([
  ["ML", { variant: "p", size: "M" }],
  ["L", { variant: "p", size: "L" }],
] as const)(
  "maps %s profile size to expected text Typography props",
  (size, typographyProps) => {
    expect(profileConfigSizes[size].textTypography).toEqual(typographyProps);
  },
);

test("renders name and text with profile label color", () => {
  render(<Profile name="John Doe" text="Software Engineer" />);

  const name = screen.getByText("John Doe");
  const text = screen.getByText("Software Engineer");

  expect(name).toHaveStyleRule("color", "var(--profile-label-default)");
  expect(text).toHaveStyleRule("color", "var(--profile-label-default)");
});

test("renders name and text with inverse color on dark background", () => {
  render(<Profile darkBackground name="John Doe" text="Software Engineer" />);

  const name = screen.getByText("John Doe");
  const text = screen.getByText("Software Engineer");

  expect(name).toHaveStyleRule(
    "color",
    "var(--container-standard-inverse-txt-default)",
  );
  expect(text).toHaveStyleRule(
    "color",
    "var(--container-standard-inverse-txt-default)",
  );
});

test("renders additional text", () => {
  render(<Profile name="John Doe" text="Software Engineer" />);

  expect(screen.getByText("Software Engineer")).toBeInTheDocument();
});

test.each([
  ["ML", "var(--global-font-static-comp-regular-m)"],
  ["L", "var(--global-font-static-comp-regular-l)"],
] as const)("uses Link font tokens for the email at %s size", (size, font) => {
  render(<Profile name="John Doe" email="john.doe@sage.com" size={size} />);

  expect(screen.getByTestId("email-link")).toHaveStyleRule("font", font, {
    modifier: "> a",
  });
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
