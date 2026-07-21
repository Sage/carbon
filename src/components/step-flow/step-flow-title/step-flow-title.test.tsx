import React from "react";
import { render, screen, within } from "@testing-library/react";
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

  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toBeVisible();

  expect(within(heading).getByText("title")).toBeVisible();
});

test("when the `StepFlowTitle` is passed via the `title` prop in `StepFlow`, the screen reader only text should be properly populated via context", () => {
  render(
    <StepFlow
      ref={() => {}}
      currentStep={2}
      totalSteps={4}
      title={<StepFlowTitle titleString="title" />}
    />,
  );

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "title. Step 2 of 4.",
  );
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

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "this title overrides the other title. Step 1 of 8.",
  );
});

test("renders level two heading when the 'titleVariant' prop is h2 passed directly to `StepFlowTitle` and takes precedence over `StepFlow`'s `titleVariant` prop", () => {
  render(
    <StepFlow
      ref={() => {}}
      currentStep={2}
      totalSteps={4}
      titleVariant="h1"
      title={<StepFlowTitle titleString="title" titleVariant="h2" />}
    />,
  );

  const heading = screen.getByRole("heading", {
    level: 2,
    name: "title. Step 2 of 4.",
  });
  expect(heading).toBeVisible();
});
