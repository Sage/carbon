import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pill from ".";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import { baseTheme } from "../../style/themes";
import { toColor } from "../../style/utils/color";
import StyledIcon from "../icon/icon.style";
import StyledIconButton from "../icon-button/icon-button.style";

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

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--colorsUtilityYang100)",
  );

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--colorsUtilityYang100)",
    { modifier: `${StyledIconButton} ${StyledIcon}` },
  );
});

test("should render with white text colour when borderColor set to 'red' to achieve colour contrast", () => {
  render(
    <Pill borderColor="red" fill onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--colorsUtilityYin090)",
  );

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    `${toColor(baseTheme, "red")}`,
  );

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "border",
    `2px solid ${toColor(baseTheme, "red")}`,
  );
});

test("should render with black text colour when borderColor set to 'lightblue' to achieve colour contrast", () => {
  render(
    <Pill borderColor="lightblue" fill onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "border",
    `2px solid ${toColor(baseTheme, "lightblue")}`,
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--colorsUtilityYin090)",
  );
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

test("should render with expected styles when colorVariant is neutral", () => {
  render(
    <Pill pillRole="status" colorVariant="neutral" fill onDelete={() => {}}>
      Test Pill
    </Pill>,
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "border",
    "2px solid var(--colorsSemanticNeutral500)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--colorsSemanticNeutral500)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--colorsSemanticNeutralYang100)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--colorsSemanticNeutral600)",
    { modifier: `${StyledIconButton}:hover` },
  );
});

test("should render with expected styles when colorVariant is negative", () => {
  render(
    <Pill pillRole="status" colorVariant="negative" fill onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "border",
    "2px solid var(--colorsSemanticNegative500)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--colorsSemanticNegative500)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--colorsSemanticNegativeYang100)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--colorsSemanticNegative600)",
    { modifier: `${StyledIconButton}:hover` },
  );
});

test("should render with expected styles when colorVariant is warning", () => {
  render(
    <Pill pillRole="status" colorVariant="warning" fill onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "border",
    "2px solid var(--colorsSemanticCaution400)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--colorsSemanticCaution400)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--colorsSemanticCautionYin090)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--colorsSemanticCaution600)",
    { modifier: `${StyledIconButton}:hover` },
  );
});

test("should render with expected styles when colorVariant is positive", () => {
  render(
    <Pill pillRole="status" colorVariant="positive" fill onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "border",
    "2px solid var(--colorsSemanticPositive500)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--colorsSemanticPositive500)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--colorsSemanticPositiveYang100)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--colorsSemanticPositive600)",
    { modifier: `${StyledIconButton}:hover` },
  );
});

test("should render with expected styles when colorVariant is information", () => {
  render(
    <Pill pillRole="status" colorVariant="information" fill onDelete={() => {}}>
      Test Pill
    </Pill>,
  );

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "border",
    "2px solid var(--colorsSemanticInfo500)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--colorsSemanticInfo500)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--colorsSemanticInfoYang100)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--colorsSemanticInfo600)",
    { modifier: `${StyledIconButton}:hover` },
  );
});

test("should render with expected styles when colorVariant is neutral and isDarkBackground is true", () => {
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

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "border",
    "2px solid var(--colorsSemanticNeutral400)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--colorsSemanticNeutral400)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--colorsSemanticNeutralYin090)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--colorsSemanticNeutral500)",
    { modifier: `${StyledIconButton}:hover` },
  );
});

test("should render with expected styles when colorVariant is negative and isDarkBackground is true", () => {
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

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "border",
    "2px solid var(--colorsSemanticNegative450)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--colorsSemanticNegative450)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--colorsSemanticNegativeYin090)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--colorsSemanticNegative500)",
    { modifier: `${StyledIconButton}:hover` },
  );
});

test("should render with expected styles when colorVariant is positive and isDarkBackground is true", () => {
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

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "border",
    "2px solid var(--colorsSemanticPositive400)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--colorsSemanticPositiveYin090)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--colorsSemanticPositive500)",
    { modifier: `${StyledIconButton}:hover` },
  );
});

test("should render with expected styles when colorVariant is information and isDarkBackground is true", () => {
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

  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "border",
    "2px solid var(--colorsSemanticInfo400)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--colorsSemanticInfo400)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--colorsSemanticInfoYin090)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--colorsSemanticInfo500)",
    { modifier: `${StyledIconButton}:hover` },
  );
});

test("should render with expected styles when colorVariant is neutralWhite and isDarkBackground is true", () => {
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
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "border",
    "2px solid var(--colorsSemanticNeutralYang100)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--colorsSemanticNeutralYang100)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "color",
    "var(--colorsSemanticNeutral500)",
  );
  expect(screen.getByText("Test Pill")).toHaveStyleRule(
    "background-color",
    "var(--colorsSemanticNeutralYin030)",
    { modifier: `${StyledIconButton}:hover` },
  );
});

test("should output a console warning when the neutralWhite colorVariant is used without isDarkBackground and fill props", () => {
  const consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
  render(<Pill colorVariant="neutralWhite">Test Pill</Pill>);

  expect(consoleSpy).toHaveBeenCalledWith(
    "[WARNING] The `neutralWhite` variant should only be used on dark backgrounds with fill set to true. " +
      "Please set the `isDarkBackground` and `fill` props to true or use another color variant.",
  );
  expect(consoleSpy).toHaveBeenCalledTimes(1);

  consoleSpy.mockRestore();
});

testStyledSystemMargin(
  (props) => <Pill {...props}>test content</Pill>,
  () => screen.getByText("test content"),
);
