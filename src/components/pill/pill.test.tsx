import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pill from ".";
import {
  testStyledSystemMargin,
  assertDeprecationWarning,
} from "../../__spec_helper__/__internal__/test-utils";
import { baseTheme } from "../../style/themes";
import { toColor } from "../../style/utils/color";

test("displays a deprecation warning if `colorVariant` is used", () => {
  assertDeprecationWarning({
    component: <Pill colorVariant="neutral">Test</Pill>,
    deprecationMessage:
      "The `colorVariant` prop for the Pill component is deprecated and will soon be replaced with a new `variant` prop.",
  });
});

test("displays a deprecation warning if `neutralWhite` is used", () => {
  assertDeprecationWarning({
    component: (
      <Pill isDarkBackground={false} fill={false} colorVariant="neutralWhite">
        Test
      </Pill>
    ),
    deprecationMessage:
      "[WARNING] The `neutralWhite` variant should only be used on dark backgrounds with fill set to true. Please set the `isDarkBackground` and `fill` props to true or use another color variant.",
    method: "warn",
  });
});

test("displays a deprecation warning if `XL` is used for the 'size' prop", () => {
  assertDeprecationWarning({
    component: <Pill size="XL">Test</Pill>,
    deprecationMessage:
      "The `XL` size for the Pill component is deprecated and will soon be removed.",
  });
});

test("should render with provided children", () => {
  render(<Pill>Test Pill</Pill>);

  expect(screen.getByText("Test Pill")).toBeVisible();
});

test("should call onClick when onClick is set and the pill is clicked", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(<Pill onClick={onClick}>Test Pill</Pill>);

  await user.click(screen.getByText("Test Pill"));

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("should render remove button when onDelete is set and call onDelete when the button is clicked", async () => {
  const user = userEvent.setup();
  const onDelete = jest.fn();
  render(<Pill onDelete={onDelete}>Test Pill</Pill>);

  const removeButton = screen.getByRole("button", {
    name: "Remove Test Pill pill",
  });
  expect(removeButton).toBeVisible();

  await user.click(removeButton);
  expect(onDelete).toHaveBeenCalledTimes(1);
});

test("should render remove button with custom aria-label when ariaLabelOfRemoveButton is set", () => {
  render(
    <Pill onDelete={() => {}} ariaLabelOfRemoveButton="custom aria label">
      Test Pill
    </Pill>,
  );

  expect(
    screen.getByRole("button", { name: "custom aria label" }),
  ).toBeVisible();
});

test("should render with provided data tags", () => {
  render(
    <Pill data-element="bar" data-role="foo">
      Test Pill
    </Pill>,
  );

  const pill = screen.getByText("Test Pill");
  expect(pill).toHaveAttribute("data-element", "bar");
  expect(pill).toHaveAttribute("data-role", "foo");
});

test("should render with expected max-width when maxWidth is set", () => {
  render(<Pill maxWidth="20px">Test Pill</Pill>);

  expect(screen.getByText("Test Pill")).toHaveStyle({ maxWidth: "20px" });
});

test("should render with expected styles when wrapText is true", () => {
  render(<Pill wrapText>Test Pill</Pill>);

  expect(screen.getByText("Test Pill")).toHaveStyle({
    overflowWrap: "anywhere",
    hyphens: "auto",
  });
});

test("should render with expected styles when isDarkBackground is true", () => {
  render(
    <Pill isDarkBackground onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyle({
    color: "var(--colorsUtilityYang100)",
  });
  expect(screen.getByRole("button")).toHaveStyle({
    backgroundColor: "var(--colorsUtilityYang100)",
  });
});

test("should render with white text colour when borderColor set to 'red' to achieve colour contrast", () => {
  render(
    <Pill borderColor="red" fill onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyle({
    borderColor: `${toColor(baseTheme, "red")}`,
    color: "var(--colorsUtilityYang100)",
  });
});

test("should render with black text colour when borderColor set to 'lightblue' to achieve colour contrast", () => {
  render(
    <Pill borderColor="lightblue" fill onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyle({
    borderColor: `${toColor(baseTheme, "lightblue")}`,
    color: "var(--colorsUtilityYin090)",
  });
});

test("should throw an error when an invalid value is passed to borderColor", () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  render(<Pill borderColor="invalidColour">Test Pill</Pill>);

  expect(consoleSpy).toHaveBeenCalledWith(
    'Could not parse "invalidColour", please provide a valid hex, rgb, rgba, hsl, hsla or named color.',
  );
  expect(consoleSpy).toHaveBeenCalledTimes(1);

  consoleSpy.mockRestore();
});

test("should render with expected styles when size is S and onDelete is set", () => {
  render(
    <Pill size="S" onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyle({
    padding: "0 22px 0 8px",
  });
  expect(screen.getByRole("button")).toHaveStyle({
    padding: "0",
    lineHeight: "16px",
  });
});

test("should render with expected styles when size is M and onDelete is set", () => {
  render(
    <Pill size="M" onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyle({
    padding: "0 28px 0 8px",
  });
  expect(screen.getByRole("button")).toHaveStyle({
    width: "24px",
    padding: "0",
    lineHeight: "15px",
  });
});

test("should render with expected styles when size is L and onDelete is set", () => {
  render(
    <Pill size="L" onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyle({
    padding: "0 32px 0 8px",
  });
  expect(screen.getByRole("button")).toHaveStyle({
    width: "28px",
    padding: "0",
    lineHeight: "16px",
  });
});

test("should render with expected styles when size is XL and onDelete is set", () => {
  render(
    <Pill size="XL" onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyle({
    padding: "0 36px 0 12px",
  });
  expect(screen.getByRole("button")).toHaveStyle({
    width: "32px",
    padding: "0",
    lineHeight: "18px",
  });
});

test("should render with expected styles when colorVariant is neutral", async () => {
  const user = userEvent.setup();
  render(
    <Pill pillRole="status" colorVariant="neutral" fill onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyle({
    borderColor: "var(--colorsSemanticNeutral500)",
    backgroundColor: "var(--colorsSemanticNeutral500)",
    color: "var(--colorsSemanticNeutralYang100)",
  });

  await user.click(screen.getByRole("button"));

  expect(screen.getByRole("button")).toHaveStyle({
    backgroundColor: "var(--colorsSemanticNeutral600)",
  });
});

test("should render with expected styles when colorVariant is negative", async () => {
  const user = userEvent.setup();
  render(
    <Pill pillRole="status" colorVariant="negative" fill onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyle({
    borderColor: "var(--colorsSemanticNegative500)",
    backgroundColor: "var(--colorsSemanticNegative500)",
    color: "var(--colorsSemanticNegativeYang100)",
  });

  await user.click(screen.getByRole("button"));

  expect(screen.getByRole("button")).toHaveStyle({
    backgroundColor: "var(--colorsSemanticNegative600)",
  });
});

test("should render with expected styles when colorVariant is warning", async () => {
  const user = userEvent.setup();
  render(
    <Pill pillRole="status" colorVariant="warning" fill onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyle({
    borderColor: "var(--colorsSemanticCaution400)",
    backgroundColor: "var(--colorsSemanticCaution400)",
    color: "var(--colorsSemanticCautionYin090)",
  });

  await user.click(screen.getByRole("button"));

  expect(screen.getByRole("button")).toHaveStyle({
    backgroundColor: "var(--tempColorsSemanticCaution600)",
  });
});

test("should render with expected styles when colorVariant is positive", async () => {
  const user = userEvent.setup();
  render(
    <Pill pillRole="status" colorVariant="warning" fill onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyle({
    borderColor: "var(--colorsSemanticPositive500)",
    background: "var(--colorsSemanticPositive500)",
    color: "var(--colorsSemanticPositiveYang100)",
  });

  await user.click(screen.getByRole("button"));

  expect(screen.getByRole("button")).toHaveStyle({
    backgroundColor: "var(--colorsSemanticPositive600)",
  });
});

test("should render with expected styles when colorVariant is information", async () => {
  const user = userEvent.setup();
  render(
    <Pill pillRole="status" colorVariant="information" fill onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyle({
    borderColor: "var(--colorsSemanticInfo500)",
    backgroundColor: "var(--colorsSemanticInfo500)",
    color: "var(--colorsSemanticInfoYang100)",
  });

  await user.click(screen.getByRole("button"));

  expect(screen.getByRole("button")).toHaveStyle({
    backgroundColor: "var(--colorsSemanticInfo600)",
  });
});

test("should render with expected styles when colorVariant is neutral and isDarkBackground is true", async () => {
  const user = userEvent.setup();
  render(
    <Pill
      pillRole="status"
      colorVariant="neutral"
      fill
      isDarkBackground
      onDelete={() => {}}
    >
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyle({
    borderColor: "var(--colorsSemanticNeutral400)",
    backgroundColor: "var(--colorsSemanticNeutral400)",
    color: "var(--colorsSemanticNeutralYin090)",
  });

  await user.click(screen.getByRole("button"));

  expect(screen.getByRole("button")).toHaveStyle({
    backgroundColor: "var(--colorsSemanticNeutral500)",
  });
});

test("should render with expected styles when colorVariant is negative and isDarkBackground is true", async () => {
  const user = userEvent.setup();
  render(
    <Pill
      pillRole="status"
      colorVariant="negative"
      fill
      isDarkBackground
      onDelete={() => {}}
    >
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyle({
    borderColor: "var(--colorsSemanticNegative400)",
    backgroundColor: "var(--colorsSemanticNegative400)",
    color: "var(--colorsSemanticNegativeYin090)",
  });

  await user.hover(screen.getByRole("button"));

  expect(screen.getByRole("button")).toHaveStyle({
    backgroundColor: "var(--colorsSemanticNegative500)",
  });
});

test("should render with expected styles when colorVariant is positive and isDarkBackground is true", async () => {
  const user = userEvent.setup();
  render(
    <Pill
      pillRole="status"
      colorVariant="positive"
      fill
      isDarkBackground
      onDelete={() => {}}
    >
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyle({
    borderColor: "var(--colorsSemanticPositive400)",
    color: "var(--colorsSemanticPositiveYin090)",
  });

  await user.click(screen.getByRole("button"));

  expect(screen.getByRole("button")).toHaveStyle({
    backgroundColor: "var(--colorsSemanticPositive500)",
  });
});

test("should render with expected styles when colorVariant is information and isDarkBackground is true", async () => {
  const user = userEvent.setup();
  render(
    <Pill
      pillRole="status"
      colorVariant="information"
      fill
      isDarkBackground
      onDelete={() => {}}
    >
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyle({
    borderColor: "var(--colorsSemanticInfo400)",
    backgroundColor: "var(--colorsSemanticInfo400)",
    color: "var(--colorsSemanticInfoYin090)",
  });

  await user.click(screen.getByRole("button"));

  expect(screen.getByRole("button")).toHaveStyle({
    backgroundColor: "var(--colorsSemanticInfo500)",
  });
});

test("should render with expected styles when colorVariant is neutralWhite and isDarkBackground is true", async () => {
  const user = userEvent.setup();
  render(
    <Pill
      pillRole="status"
      colorVariant="neutralWhite"
      fill
      isDarkBackground
      onDelete={() => {}}
    >
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyle({
    borderColor: "var(--colorsSemanticNeutralYang100)",
    backgroundColor: "var(--colorsSemanticNeutralYang100)",
    color: "var(--colorsSemanticNeutral500)",
  });

  await user.click(screen.getByRole("button"));

  expect(screen.getByRole("button")).toHaveStyle({
    backgroundColor: "var(--colorsSemanticNeutralYin030)",
  });
});

testStyledSystemMargin(
  (props) => <Pill {...props}>test content</Pill>,
  () => screen.getByText("test content"),
);
