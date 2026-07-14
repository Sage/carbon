import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StepFlow, StepFlowHandle, StepFlowTitle } from ".";
import Button from "../button/__next__";
import Logger from "../../__internal__/utils/logger";

test("when aria-label is specified, the attribute is applied to the expected element", () => {
  render(
    <StepFlow
      data-role="step-flow"
      aria-label="foo"
      title="foo"
      currentStep={5}
      totalSteps={6}
      ref={() => {}}
    />,
  );

  const stepFlowComponent = screen.getByTestId("step-flow");

  expect(stepFlowComponent).toHaveAccessibleName("foo");
});

test("when aria-labelledby is specified, the attribute is applied to the expected element", () => {
  render(
    <>
      <StepFlow
        data-role="step-flow"
        aria-labelledby="foo"
        title="foo"
        currentStep={5}
        totalSteps={6}
        ref={() => {}}
      />
      <span id="foo" role="presentation">
        This is step flow
      </span>
    </>,
  );

  const stepFlowComponent = screen.getByTestId("step-flow");

  expect(stepFlowComponent).toHaveAccessibleName("This is step flow");
});

test("when aria-describedby is specified, the attribute is applied to the expected element", () => {
  render(
    <>
      <StepFlow
        data-role="step-flow"
        aria-describedby="foo"
        title="foo"
        currentStep={5}
        totalSteps={6}
        ref={() => {}}
      />
      <span id="foo" role="presentation">
        Description of step flow
      </span>
    </>,
  );

  const stepFlowComponent = screen.getByTestId("step-flow");

  expect(stepFlowComponent).toHaveAccessibleDescription(
    "Description of step flow",
  );
});

test("should render the correct element and text when the category prop is passed", () => {
  render(
    <StepFlow
      title="foo"
      currentStep={5}
      totalSteps={6}
      category="bar"
      ref={() => {}}
    />,
  );

  expect(screen.getByText("bar")).toBeVisible();
});

test("when the 'title' prop is passed as a string, the correct element and text renders", () => {
  render(
    <StepFlow title="foo" currentStep={5} totalSteps={6} ref={() => {}} />,
  );

  expect(screen.getByText("foo")).toBeVisible();
});

test("when the 'title' prop is passed via the `StepFlowTitle`, the correct element and text renders", () => {
  render(
    <StepFlow
      title={<StepFlowTitle titleString="node" />}
      currentStep={5}
      totalSteps={6}
      ref={() => {}}
    />,
  );

  expect(screen.getByText("node")).toBeVisible();
});

test("renders level 2 heading when the 'titleVariant' prop is passed", () => {
  render(
    <StepFlow
      title="Title"
      currentStep={5}
      totalSteps={6}
      titleVariant="h2"
      ref={() => {}}
    />,
  );

  const heading = screen.getByRole("heading", { level: 2, name: /Title/ });
  expect(heading).toBeVisible();
});

test("renders progress indicator bar when 'showProgressIndicator' prop is true", () => {
  render(
    <StepFlow
      title="baz"
      currentStep={5}
      totalSteps={6}
      showProgressIndicator
      ref={() => {}}
    />,
  );
  expect(screen.getByTestId("progress-indicator-bar")).toBeVisible();
});

test("renders correct step number when `currentStep` is provided", () => {
  render(
    <StepFlow title="baz" currentStep={5} totalSteps={6} ref={() => {}} />,
  );

  expect(screen.getByText("Step 5 of 6")).toBeVisible();
});

test("renders close button when the 'showCloseIcon' prop is true", () => {
  render(
    <StepFlow
      title="baz"
      totalSteps={6}
      currentStep={1}
      showCloseIcon
      ref={() => {}}
    />,
  );

  expect(screen.getByRole("button", { name: "Close" })).toBeVisible();
});

test("calls onDismiss callback when the close button is clicked", async () => {
  const onDismissMock = jest.fn();
  const user = userEvent.setup();

  render(
    <StepFlow
      title="baz"
      totalSteps={6}
      currentStep={1}
      showCloseIcon
      onDismiss={onDismissMock}
      ref={() => {}}
    />,
  );

  const closeButton = screen.getByRole("button", { name: "Close" });
  await user.click(closeButton);

  expect(onDismissMock).toHaveBeenCalledTimes(1);
});

describe("when ref handle is passed", () => {
  it("calling exposed focus method when the `title` prop is a string, refocuses on StepFlow's root container", async () => {
    const MockComponent = () => {
      const stepFlowHandle = React.useRef<StepFlowHandle>(null);

      return (
        <div>
          <StepFlow
            totalSteps={5}
            currentStep={1}
            ref={stepFlowHandle}
            title="foo"
          />
          <Button onClick={() => stepFlowHandle.current?.focus()}>
            Press me to refocus StepFlow
          </Button>
        </div>
      );
    };

    const user = userEvent.setup();
    render(<MockComponent />);
    const button = screen.getByRole("button", {
      name: "Press me to refocus StepFlow",
    });

    await user.click(button);

    expect(screen.getByTestId("title-text-wrapper")).toHaveFocus();
  });

  it("calling exposed focus method when the `title` prop is a node with the `StepFlowTitle` as a descendant, refocuses on StepFlow's root container", async () => {
    const MockComponent = () => {
      const stepFlowHandle = React.useRef<StepFlowHandle>(null);

      return (
        <div>
          <StepFlow
            totalSteps={5}
            currentStep={1}
            ref={stepFlowHandle}
            title={<StepFlowTitle titleString="title" />}
          />
          <Button onClick={() => stepFlowHandle.current?.focus()}>
            Press me to refocus StepFlow
          </Button>
        </div>
      );
    };

    const user = userEvent.setup();
    render(<MockComponent />);
    const button = screen.getByRole("button", {
      name: "Press me to refocus StepFlow",
    });

    await user.click(button);

    expect(screen.getByTestId("title-text-wrapper")).toHaveFocus();
  });
});

describe("console warning checks", () => {
  let loggerSpy: jest.SpyInstance;

  const currentStepWarnMessage =
    "[WARNING] The `currentStep` prop should not be higher than the `totalSteps`prop in `StepFlow`." +
    " Please ensure `currentStep`s value does not exceed that of `totalSteps`, in the meantime" +
    " we have set `currentStep` value to that of `totalSteps`, and all indicators have been marked as completed.";

  const noRefWarnMessage =
    "[WARNING] A `ref` should be provided to ensure focus is programmatically focused back to a title div," +
    " this ensures screen reader users are informed regarding any changes and can navigate back down the page.";

  beforeEach(() => {
    loggerSpy = jest.spyOn(Logger, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    loggerSpy.mockRestore();
  });

  it("renders correct step number when `currentStep` is higher than `totalSteps` and logs warning", () => {
    render(
      <StepFlow title="baz" currentStep={8} totalSteps={6} ref={() => {}} />,
    );

    expect(screen.getByText("Step 6 of 6")).toBeVisible();
    expect(loggerSpy).toHaveBeenCalledWith(currentStepWarnMessage);
  });

  it("logs warning in the console once when a ref is not passed", () => {
    render(<StepFlow currentStep={4} totalSteps={1} title="foo" />);

    expect(loggerSpy).toHaveBeenCalledWith(noRefWarnMessage);
  });
});

test("renders with provided data- attributes", () => {
  render(
    <StepFlow
      title="baz"
      totalSteps={6}
      currentStep={1}
      ref={() => {}}
      data-role="foo"
      data-element="bar"
    />,
  );

  const stepFlowComponent = screen.getByRole("group");

  expect(stepFlowComponent).toHaveAttribute("data-role", "foo");
  expect(stepFlowComponent).toHaveAttribute("data-element", "bar");
});
