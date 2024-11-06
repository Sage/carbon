import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import enGB from "../../locales/en-gb";
import { StepFlow, StepFlowHandle, StepFlowTitle, Steps } from ".";
import Button from "../button";
import I18nProvider from "../i18n-provider";

function generateLimitedVariations(): [Steps, Steps][] {
  const variations: [Steps, Steps][] = [];

  for (let totalSteps = 1; totalSteps <= 8; totalSteps++) {
    for (let currentStep = 1; currentStep <= totalSteps; currentStep++) {
      variations.push([totalSteps as Steps, currentStep as Steps]);
    }
  }

  return variations;
}

function generateCurrentStepOverTotalStepsVariations(): [Steps, Steps][] {
  const variations: [Steps, Steps][] = [];

  for (let totalSteps = 1; totalSteps <= 8; totalSteps++) {
    for (let currentStep = totalSteps + 1; currentStep <= 8; currentStep++) {
      variations.push([totalSteps as Steps, currentStep as Steps]);
    }
  }

  return variations;
}

function calculateStepStateIndexes(
  totalSteps: number,
  currentStepParam: number,
) {
  let currentStep = currentStepParam;

  if (currentStep > totalSteps) {
    currentStep = totalSteps;
  }

  const stepsBefore = currentStep - 1;
  const stepsAfter = totalSteps - currentStep;

  return [stepsBefore, stepsAfter];
}

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
    <StepFlow
      title="baz"
      currentStep={5}
      totalSteps={6}
      category="bar"
      ref={() => {}}
    />,
  );

  expect(screen.getByText("baz")).toBeVisible();
});

test("when the 'title' prop is passed via the `StepFlowTitle` sub component, the correct element and text renders", () => {
  const stepFlowNode = (
    <>
      <StepFlowTitle titleString="node" />
    </>
  );
  render(
    <StepFlow
      title={stepFlowNode}
      currentStep={5}
      totalSteps={6}
      category="bar"
      ref={() => {}}
    />,
  );

  expect(screen.getByText("node")).toBeVisible();
});

test("renders level one heading when the 'titleVariant' prop is not passed", () => {
  render(
    <StepFlow title="Title" currentStep={5} totalSteps={6} ref={() => {}} />,
  );

  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toBeVisible();
  expect(heading).toHaveTextContent("Title");
});

it.each([
  [1, "h1"],
  [2, "h2"],
] as const)(
  "renders level %s heading when the 'titleVariant' prop is %s",
  (level, titleVariant) => {
    render(
      <StepFlow
        title="foo"
        currentStep={5}
        totalSteps={6}
        titleVariant={titleVariant}
        ref={() => {}}
      />,
    );

    const heading = screen.getByRole("heading", { level });
    expect(heading).toBeVisible();
    expect(heading).toHaveTextContent("foo");
  },
);

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

it.each(generateLimitedVariations())(
  "renders correct step label when 'totalSteps' is %s and 'currentStep' prop is %s",
  (totalSteps, currentStep) => {
    render(
      <StepFlow
        title="baz"
        totalSteps={totalSteps}
        currentStep={currentStep}
        ref={() => {}}
      />,
      {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <I18nProvider locale={enGB}>{children}</I18nProvider>
        ),
      },
    );

    expect(
      screen.getByText(`Step ${currentStep} of ${totalSteps}`),
    ).toBeVisible();
  },
);

it.each(generateCurrentStepOverTotalStepsVariations())(
  "renders correct step label when 'totalSteps' is %s and is lower than the 'currentStep' prop of %s",
  (totalSteps, currentStep) => {
    render(
      <StepFlow
        title="baz"
        totalSteps={totalSteps}
        currentStep={currentStep}
        ref={() => {}}
      />,
      {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <I18nProvider locale={enGB}>{children}</I18nProvider>
        ),
      },
    );

    expect(
      screen.getByText(`Step ${totalSteps} of ${totalSteps}`),
    ).toBeVisible();
  },
);

it.each(generateLimitedVariations())(
  "renders correct visually hidden text when 'totalSteps' prop is %s and 'currentStep' prop is %s",
  (totalSteps, currentStep) => {
    render(
      <StepFlow
        category="foo"
        title="bar"
        totalSteps={totalSteps}
        currentStep={currentStep}
        ref={() => {}}
      />,
      {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <I18nProvider locale={enGB}>{children}</I18nProvider>
        ),
      },
    );

    const title = screen.getByRole("heading", { level: 1 });
    expect(
      within(title).getByText(
        `foo. bar. Step ${currentStep} of ${totalSteps}.`,
      ),
    ).toHaveStyle({
      border: "0",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0",
      position: "absolute",
      width: "1px",
      "white-space": "nowrap",
    });
  },
);

it.each(generateCurrentStepOverTotalStepsVariations())(
  "renders correct visually hidden text when 'totalSteps' prop is %s and is lower than 'currentStep' prop of %s",
  (totalSteps, currentStep) => {
    render(
      <StepFlow
        category="foo"
        title="bar"
        totalSteps={totalSteps}
        currentStep={currentStep}
        ref={() => {}}
      />,
      {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <I18nProvider locale={enGB}>{children}</I18nProvider>
        ),
      },
    );

    const title = screen.getByRole("heading", { level: 1 });
    expect(
      within(title).getByText(`foo. bar. Step ${totalSteps} of ${totalSteps}.`),
    ).toHaveStyle({
      border: "0",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0",
      position: "absolute",
      width: "1px",
      "white-space": "nowrap",
    });
  },
);

test("when the 'showCloseIcon' prop is true, the correct element renders", () => {
  render(
    <StepFlow
      title="baz"
      totalSteps={6}
      currentStep={1}
      showCloseIcon
      ref={() => {}}
    />,
  );

  expect(screen.getByLabelText("Close")).toBeVisible();
});

describe.each(generateLimitedVariations())(
  "indicator state checks - component used as intended (currentStep is always lower than totalSteps) - totalSteps is %s, currentStep is %s",
  (totalSteps, currentStep) => {
    it("only one in progress indicators are rendered", () => {
      render(
        <StepFlow
          title="baz"
          totalSteps={totalSteps}
          currentStep={currentStep}
          showProgressIndicator
          ref={() => {}}
        />,
      );

      const inProgressIndicators = screen
        .getAllByTestId("progress-indicator")
        .filter(
          (indicator) => indicator.getAttribute("data-state") === "in-progress",
        );
      expect(inProgressIndicators).toHaveLength(1);
    });

    it("correct number of completed indicators are rendered", () => {
      render(
        <StepFlow
          title="baz"
          totalSteps={totalSteps}
          currentStep={currentStep}
          showProgressIndicator
          ref={() => {}}
        />,
      );

      const completedIndicators = screen
        .getAllByTestId("progress-indicator")
        .filter(
          (indicator) =>
            indicator.getAttribute("data-state") === "is-completed",
        );

      const currentCount = calculateStepStateIndexes(
        totalSteps,
        currentStep,
      )[0];

      expect(completedIndicators).toHaveLength(currentCount);
    });

    it("correct number of not completed progress indicators are rendered", () => {
      render(
        <StepFlow
          title="baz"
          totalSteps={totalSteps}
          currentStep={currentStep}
          showProgressIndicator
          ref={() => {}}
        />,
      );

      const incompleteIndicators = screen
        .getAllByTestId("progress-indicator")
        .filter(
          (indicator) =>
            indicator.getAttribute("data-state") === "not-completed",
        );

      const currentCount = calculateStepStateIndexes(
        totalSteps,
        currentStep,
      )[1];

      expect(incompleteIndicators).toHaveLength(currentCount);
    });
  },
);

describe.each(generateCurrentStepOverTotalStepsVariations())(
  "indicator state checks - component not used as intended (currentStep is higher than totalSteps)- totalSteps is %s, currentStep is %s",
  (totalSteps, currentStep) => {
    it("only one in progress indicator is rendered", () => {
      render(
        <StepFlow
          title="baz"
          totalSteps={totalSteps}
          currentStep={currentStep}
          showProgressIndicator
          ref={() => {}}
        />,
      );

      const inProgressIndicators = screen
        .getAllByTestId("progress-indicator")
        .filter(
          (indicator) => indicator.getAttribute("data-state") === "in-progress",
        );

      expect(inProgressIndicators).toHaveLength(1);
    });

    it("correct number of completed indicators are rendered", () => {
      render(
        <StepFlow
          title="baz"
          totalSteps={totalSteps}
          currentStep={currentStep}
          showProgressIndicator
          ref={() => {}}
        />,
      );

      const completedIndicators = screen
        .getAllByTestId("progress-indicator")
        .filter(
          (indicator) =>
            indicator.getAttribute("data-state") === "is-completed",
        );

      const currentCount = calculateStepStateIndexes(
        totalSteps,
        currentStep,
      )[0];

      expect(completedIndicators).toHaveLength(currentCount);
    });

    it("no not completed indicators are rendered", () => {
      render(
        <StepFlow
          title="baz"
          totalSteps={totalSteps}
          currentStep={currentStep}
          showProgressIndicator
          ref={() => {}}
        />,
      );

      const incompleteIndicators = screen
        .getAllByTestId("progress-indicator")
        .filter(
          (indicator) =>
            indicator.getAttribute("data-state") === "not-completed",
        );

      expect(incompleteIndicators).toHaveLength(0);
    });
  },
);

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
            Press me to refocus on Dialog
          </Button>
        </div>
      );
    };

    const user = userEvent.setup();
    render(<MockComponent />);
    const button = screen.getByRole("button", {
      name: "Press me to refocus on Dialog",
    });

    await user.click(button);

    expect(screen.getByTestId("title-text-wrapper")).toHaveFocus();
  });

  it("calling exposed focus method when the `title` prop is a node with the `StepFlowTitle` as a descendant, refocuses on StepFlow's root container", async () => {
    const MockComponent = () => {
      const stepFlowHandle = React.useRef<StepFlowHandle>(null);

      const titleNode = (
        <>
          <>
            <StepFlowTitle titleString="title" />
          </>
        </>
      );

      return (
        <div>
          <StepFlow
            totalSteps={5}
            currentStep={1}
            ref={stepFlowHandle}
            title={titleNode}
          />
          <Button onClick={() => stepFlowHandle.current?.focus()}>
            Press me to refocus on Dialog
          </Button>
        </div>
      );
    };

    const user = userEvent.setup();
    render(<MockComponent />);
    const button = screen.getByRole("button", {
      name: "Press me to refocus on Dialog",
    });

    await user.click(button);

    expect(screen.getByTestId("title-text-wrapper")).toHaveFocus();
  });
});

describe("console warning checks", () => {
  let consoleSpy: jest.SpyInstance;

  const currentStepWarnMessage =
    "[WARNING] The `currentStep` prop should not be higher than the `totalSteps`prop in `StepFlow`." +
    " Please ensure `currentStep`s value does not exceed that of `totalSteps`, in the meantime" +
    " we have set `currentStep` value to that of `totalSteps`, and all indicators have been marked as completed.";

  const noRefWarnMessage =
    "[WARNING] A `ref` should be provided to ensure focus is programmatically focused back to a title div," +
    " this ensures screen reader users are informed regarding any changes and can navigate back down the page.";

  const mockRef = { current: null };

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "warn");
    consoleSpy.mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("logs warning in the console once when currentStep is higher than totalSteps", () => {
    render(
      <StepFlow currentStep={4} totalSteps={1} title="foo" ref={mockRef} />,
    );

    expect(consoleSpy).toHaveBeenCalledWith(currentStepWarnMessage);
  });

  it("logs warning in the console once when a ref is not passed", () => {
    render(<StepFlow currentStep={4} totalSteps={1} title="foo" />);

    expect(consoleSpy).toHaveBeenCalledWith(noRefWarnMessage);
  });
});
