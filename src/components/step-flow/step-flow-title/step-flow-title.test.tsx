import React from "react";
import { render, screen } from "@testing-library/react";
import { StepFlow, StepFlowTitle } from "..";

import Logger from "../../../__internal__/utils/logger";

test("logs error when not used within StepFlow", () => {
  const loggerSpy = jest.spyOn(Logger, "error").mockImplementation(() => {});

  render(<StepFlowTitle titleString="title" />);

  expect(loggerSpy).toHaveBeenCalledWith(
    expect.stringContaining(
      "Carbon StepFlow: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    ),
  );

  loggerSpy.mockRestore();
});

test("when the 'titleString' prop is passed, the correct visible element and text renders", () => {
  render(
    <StepFlow
      ref={() => {}}
      title={<StepFlowTitle titleString="title" />}
      currentStep={1}
      totalSteps={2}
    />,
  );

  const visibleTitle = screen.getByText("title");
  expect(visibleTitle).toBeVisible();
});

test("when the `StepFlowTitle` is passed via the `title` prop in `StepFlow`, the screen reader only text should be properly populated via context", () => {
  render(
    <StepFlow
      ref={() => {}}
      currentStep={2}
      totalSteps={4}
      category="category"
      title={<StepFlowTitle titleString="title" />}
    />,
  );

  const hiddenText = screen.getByText("category. title. Step 2 of 4.");
  expect(hiddenText).toHaveStyle({
    border: "0",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    width: "1px",
    "white-space": "nowrap",
  });
});

test("when the 'screenReaderOnlyTitle' prop is passed, it overrides the value passed to 'titleString', and the correct screen reader only text renders", () => {
  render(
    <StepFlow
      ref={() => {}}
      currentStep={1}
      totalSteps={8}
      title={
        <StepFlowTitle
          titleString="title"
          screenReaderOnlyTitle="this title overrides the other title"
        />
      }
    />,
  );

  const hiddenText = screen.getByText(
    "this title overrides the other title. Step 1 of 8.",
  );

  expect(hiddenText).toHaveStyle({
    border: "0",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    width: "1px",
    "white-space": "nowrap",
  });
});

test("renders level one heading when the `titleVariant` prop is not passed", () => {
  render(
    <StepFlow
      ref={() => {}}
      title={<StepFlowTitle titleString="title" />}
      currentStep={1}
      totalSteps={2}
    />,
  );

  const visibleTitle = screen.getByText("title");
  expect(visibleTitle).toBeVisible();
  expect(visibleTitle).toHaveTextContent("title");
});

test.each([
  [1, "h1"],
  [2, "h2"],
] as const)(
  "renders visible title text when the `titleVariant` prop is %s",
  (_level, titleVariant) => {
    render(
      <StepFlow
        ref={() => {}}
        title={
          <StepFlowTitle titleString="title" titleVariant={titleVariant} />
        }
        currentStep={1}
        totalSteps={2}
      />,
    );

    const titleNode = screen.getByText("title");
    expect(titleNode).toBeVisible();
    expect(titleNode).toHaveTextContent("title");
  },
);

test("renders level two heading when the `titleVariant` prop is `h2` passed directly to `StepFlowTitle`, and the `titleVariant` prop is also passed as `h1` to `StepFlow`. As the `titleVariant` on `StepFlowTitle` takes priority", () => {
  render(
    <StepFlow
      ref={() => {}}
      currentStep={2}
      totalSteps={4}
      category="category"
      titleVariant="h1"
      title={<StepFlowTitle titleString="title" titleVariant="h2" />}
    />,
  );

  const titleNode = screen.getByText("title");
  expect(titleNode).toBeVisible();
  expect(titleNode).toHaveTextContent("title");
});
