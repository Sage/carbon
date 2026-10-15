import React from "react";
import { render, screen, within } from "@testing-library/react";
import { StepFlow, StepFlowTitle } from "..";
import { StepFlowProvider } from "../__internal__/step-flow.context";

test("throws an error when not used within StepFlow", () => {
  const consoleErrorSpy = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

  expect(() => render(<StepFlowTitle titleString="title" />)).toThrow(
    "Carbon StepFlow: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
  );

  consoleErrorSpy.mockRestore();
});

test("does not render screen reader step text when total steps is zero", () => {
  render(
    <StepFlowProvider
      value={{ validatedCurrentStep: 1, totalSteps: 0, titleVariant: "h1" }}
    >
      <StepFlowTitle titleString="title" />
    </StepFlowProvider>,
  );

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("title");
  expect(screen.queryByText(/Step 1 of 0/)).not.toBeInTheDocument();
});

test("renders a level one heading when no 'titleVariant' is provided via props or context", () => {
  render(
    <StepFlowProvider value={{}}>
      <StepFlowTitle titleString="title" />
    </StepFlowProvider>,
  );

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("title");
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
