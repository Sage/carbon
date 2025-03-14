import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../../__spec_helper__/__internal__/test-utils";

import SwitchSlider from "./switch-slider.component";

test('renders the text "OFF" in the panel by default', () => {
  render(<SwitchSlider />);

  const panelText = screen.getAllByText("OFF");

  expect(panelText[1]).toBeVisible();
});

test("by default it renders only one panel", () => {
  render(<SwitchSlider />);

  const panels = screen.getAllByTestId("slider-panel");

  expect(panels.length).toBe(1);
});

test('when `checked` is true, the text "ON" renders in the panel by default', () => {
  render(<SwitchSlider checked />);

  const panelText = screen.getByText("ON");

  expect(panelText).toBeVisible();
});

test("when `checked` is true, only one panel renders", () => {
  render(<SwitchSlider checked />);

  const panels = screen.getAllByTestId("slider-panel");

  expect(panels.length).toBe(1);
});

test("when `loading` is true, Loader component renders in the first panel", () => {
  render(<SwitchSlider loading />);

  const loader = screen.getByTestId("switch-slider-loader");

  expect(loader).toBeVisible();
});

test("when `loading` is true, only one panel renders", () => {
  render(<SwitchSlider loading />);

  const panels = screen.getAllByTestId("slider-panel");

  expect(panels.length).toBe(1);
});

test("when `disabled` is true, only one panel renders", () => {
  render(<SwitchSlider disabled />);

  const panels = screen.getAllByTestId("slider-panel");

  expect(panels.length).toBe(1);
});

// test required for styling coverage
test("when `disabled` is true, the correct ::before styles are applied", () => {
  render(<SwitchSlider disabled />);

  const switchPanel = screen.getByTestId("slider");

  expect(switchPanel).toHaveStyleRule(
    "background-color",
    "var(--colorsActionDisabled600)",
    {
      modifier: "::before",
    },
  );
});

// test required for styling coverage
test("when `checked` is true and `size` is large, the correct ::before styles are applied", () => {
  render(<SwitchSlider size="large" checked />);

  const switchPanel = screen.getByTestId("slider");

  expect(switchPanel).toHaveStyleRule(
    "margin-left",
    "calc( 100% - var(--spacing500) )",
    {
      modifier: "::before",
    },
  );
});

// test required for styling coverage
test("applies the correct styles", () => {
  render(<SwitchSlider disabled />);

  const switchPanel = screen.getByTestId("slider");

  expect(switchPanel).toHaveStyleRule("color: var(--colorsUtilityYin030)");
});

// test required for styling coverage
test("when `checked` true and `disabled` true, the correct styles are applied", () => {
  render(<SwitchSlider checked disabled />);
  const wrapper = screen.getByTestId("slider");

  expect(wrapper).toHaveStyleRule(
    "background-color",
    "var(--colorsActionDisabled500)",
  );
});

// coverage
test("renders with normal styles when `isDarkBackground` is false", () => {
  render(<SwitchSlider isDarkBackground={false} />);

  const switchPanel = screen.getByTestId("slider");

  expect(switchPanel).toHaveStyleRule("color: var(--colorsActionMinorYang100)");
});

// coverage
test("renders with dark background styles when `isDarkBackground` is true", () => {
  render(<SwitchSlider isDarkBackground />);

  const switchPanel = screen.getByTestId("slider");

  expect(switchPanel).toHaveStyleRule("color: var(--colorsUtilityYin100)");
});

// coverage
test("renders with dark background styles when `isDarkBackground` is true and checked is true", () => {
  render(<SwitchSlider isDarkBackground checked />);

  const switchPanel = screen.getByTestId("slider");

  expect(switchPanel).toHaveStyleRule("color: var(--colorsUtilityYang100)");
});
