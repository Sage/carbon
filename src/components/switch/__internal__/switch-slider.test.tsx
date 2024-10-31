import React from "react";
import { render, screen } from "@testing-library/react";
import CarbonProvider from "components/carbon-provider";
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

  const loader = screen.getByRole("progressbar");

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

// test required for styling coverage
test("when the consumer has opted out of rounded corners styling, the correct border-radius styles are applied", async () => {
  render(
    <CarbonProvider roundedCornersOptOut>
      <SwitchSlider />
    </CarbonProvider>,
  );

  const switchPanel = screen.getByTestId("slider");

  expect(switchPanel).toHaveStyle("border-radius: 90px");
});

// test required for styling coverage
test("when `size` is large and the consumer has opted out of rounded corners styling, the correct border-radius styles are applied", async () => {
  render(
    <CarbonProvider roundedCornersOptOut>
      <SwitchSlider size="large" />
    </CarbonProvider>,
  );

  const switchPanel = screen.getByTestId("slider");

  expect(switchPanel).toHaveStyle("border-radius: 30px");
});
