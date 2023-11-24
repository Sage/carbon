import React from "react";
import { render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StepFlow } from "./index";
import { StepFlowHandle, Steps } from "./step-flow.component";
import Button from "../button";

describe("Step Flow component", () => {
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
    currentStepParam: number
  ) {
    let currentStep = currentStepParam;

    if (currentStep > totalSteps) {
      currentStep = totalSteps;
    }

    const stepsBefore = currentStep - 1;
    const stepsAfter = totalSteps - currentStep;

    return [stepsBefore, stepsAfter];
  }

  describe("prop checks", () => {
    it("when the 'category' prop is passed, the correct element and text renders", () => {
      render(
        <StepFlow title="foo" currentStep={5} totalSteps={6} category="bar" />
      );

      expect(screen.getByText("bar")).toBeInTheDocument();
    });

    it("when the 'title' prop is passed, the correct element and text renders", () => {
      render(
        <StepFlow title="baz" currentStep={5} totalSteps={6} category="bar" />
      );

      expect(screen.getByText("baz")).toBeInTheDocument();
    });

    it("when the 'titleVariant' prop is not passed, the variant is h1 by default", () => {
      const { container } = render(
        <StepFlow title="this title is a h1" currentStep={5} totalSteps={6} />
      );

      expect(container.querySelector("h1")).toHaveTextContent(
        "this title is a h1"
      );
    });

    it.each(["h1", "h2"] as const)(
      "when the 'titleVariant' prop is passed as %s, the correct element renders",
      (headingLevel) => {
        const { container } = render(
          <StepFlow
            title="foo"
            category="bar"
            currentStep={5}
            totalSteps={6}
            titleVariant={headingLevel}
          />
        );

        expect(container.querySelector(headingLevel)).toBeInTheDocument();
      }
    );

    it("when the 'showProgressIndicator' prop is true, the correct element renders", () => {
      const { container } = render(
        <StepFlow
          title="baz"
          currentStep={5}
          totalSteps={6}
          showProgressIndicator
        />
      );
      expect(
        container.querySelector('[data-element="progress-indicator"]')
      ).toBeInTheDocument();
    });

    it.each(generateLimitedVariations())(
      "when 'totalSteps' is passed as %s and 'currentStep' prop is %s, the step label contains the correct text",
      (totalSteps, currentStep) => {
        const { container } = render(
          <StepFlow
            {...{
              title: "baz",
              totalSteps,
              currentStep,
              titleTabIndex: 0,
            }}
          />
        );

        expect(
          container.querySelector('[data-element="step-label"]')
        ).toHaveTextContent(`${currentStep} of ${totalSteps}`);
      }
    );

    it.each(generateCurrentStepOverTotalStepsVariations())(
      "when 'totalSteps' is passed as %s and is lower than the 'currentStep' prop of %s, the step label contains the correct text",
      (totalSteps, currentStep) => {
        const { container } = render(
          <StepFlow
            {...{
              title: "baz",
              totalSteps,
              currentStep,
              titleTabIndex: 0,
            }}
          />
        );

        expect(
          container.querySelector('[data-element="step-label"]')
        ).toHaveTextContent(`${totalSteps} of ${totalSteps}`);
      }
    );

    it.each(generateLimitedVariations())(
      "when 'totalSteps' is passed as %s and 'currentStep' prop is %s, the visually hidden title text contains the correct text",
      (totalSteps, currentStep) => {
        const category = "foo";
        const title = "bar";

        const { container } = render(
          <StepFlow
            {...{
              category,
              title,
              totalSteps,
              currentStep,
              titleTabIndex: 0,
            }}
          />
        );

        expect(
          container.querySelector('[data-element="visually-hidden-title-text"]')
        ).toHaveTextContent(
          `${category}. ${title}. Step ${currentStep} of ${totalSteps}.`
        );
      }
    );

    it.each(generateCurrentStepOverTotalStepsVariations())(
      "when 'totalSteps' is passed as %s and is lower than the 'currentStep' prop of %s, the visually hidden title text contains the correct text",
      (totalSteps, currentStep) => {
        const category = "foo";
        const title = "bar";

        const { container } = render(
          <StepFlow
            {...{
              category,
              title,
              totalSteps,
              currentStep,
              titleTabIndex: 0,
            }}
          />
        );

        expect(
          container.querySelector('[data-element="visually-hidden-title-text"]')
        ).toHaveTextContent(
          `${category}. ${title}. Step ${totalSteps} of ${totalSteps}.`
        );
      }
    );

    it("when the 'showCloseIcon' prop is true, the correct element renders", () => {
      render(
        <StepFlow
          {...{
            title: "baz",
            totalSteps: 6,
            currentStep: 1,
            showCloseIcon: true,
          }}
        />
      );

      expect(screen.getByLabelText("Close")).toBeInTheDocument();
    });
  });

  describe.each(generateLimitedVariations())(
    "indicator state checks - component used as intended (currentStep is always lower than totalSteps) - totalSteps is %s, currentStep is %s",
    (totalSteps, currentStep) => {
      it("only one in progress indicators are rendered", () => {
        const { container } = render(
          <StepFlow
            {...{
              title: "baz",
              totalSteps,
              currentStep,
              showProgressIndicator: true,
            }}
          />
        );

        const count = container.querySelectorAll('[data-state="in-progress"]')
          .length;
        expect(count).toBe(1);
      });

      it("correct number of completed indicators are rendered", () => {
        const { container } = render(
          <StepFlow
            {...{
              title: "baz",
              totalSteps,
              currentStep,
              showProgressIndicator: true,
            }}
          />
        );

        const count = container.querySelectorAll('[data-state="is-completed"]')
          .length;
        const currentCount = calculateStepStateIndexes(
          totalSteps,
          currentStep
        )[0];

        expect(count).toBe(currentCount);
      });

      it("correct number of not completed progress indicators are rendered", () => {
        const { container } = render(
          <StepFlow
            {...{
              title: "baz",
              totalSteps,
              currentStep,
              showProgressIndicator: true,
            }}
          />
        );

        const count = container.querySelectorAll('[data-state="not-completed"]')
          .length;
        const currentCount = calculateStepStateIndexes(
          totalSteps,
          currentStep
        )[1];

        expect(count).toBe(currentCount);
      });
    }
  );

  describe.each(generateCurrentStepOverTotalStepsVariations())(
    "indicator state checks - component not used as intended (currentStep is higher than totalSteps)- totalSteps is %s, currentStep is %s",
    (totalSteps, currentStep) => {
      it("only one in progress indicator is rendered", () => {
        const { container } = render(
          <StepFlow
            {...{
              title: "baz",
              totalSteps,
              currentStep,
              showProgressIndicator: true,
            }}
          />
        );

        const count = container.querySelectorAll('[data-state="in-progress"]')
          .length;
        expect(count).toBe(1);
      });

      it("correct number of completed indicators are rendered", () => {
        const { container } = render(
          <StepFlow
            {...{
              title: "baz",
              totalSteps,
              currentStep,
              showProgressIndicator: true,
            }}
          />
        );

        const count = container.querySelectorAll('[data-state="is-completed"]')
          .length;
        const currentCount = calculateStepStateIndexes(
          totalSteps,
          currentStep
        )[0];

        expect(count).toBe(currentCount);
      });

      it("no not completed indicators are rendered", () => {
        const { container } = render(
          <StepFlow
            {...{
              title: "baz",
              totalSteps,
              currentStep,
              showProgressIndicator: true,
            }}
          />
        );

        const count = container.querySelectorAll('[data-state="not-completed"]')
          .length;

        expect(count).toBe(0);
      });
    }
  );

  describe("when ref handle is passed to StepFlow", () => {
    it("calling exposed focus method refocuses on StepFlow's root container", async () => {
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
      const { container } = render(<MockComponent />);
      const button = screen.getByRole("button");

      await user.click(button);

      expect(
        container.querySelector('[data-element="title-text-wrapper"]')
      ).toHaveFocus();
    });
  });

  describe("console warning checks", () => {
    let instance: RenderResult;
    let loggerSpy: jest.SpyInstance | jest.Mock;

    const currentStepWarnMessage =
      "[WARNING] The `currentStep` prop should not be higher than the `totalSteps`prop in `StepFlow`." +
      " Please ensure `currentStep`s value does not exceed that of `totalSteps`, in the meantime" +
      " we have set `currentStep` value to that of `totalSteps`, and all indicators have been marked as completed.";

    const noRefWarnMessage =
      "[WARNING] A `ref` should be provided to ensure focus is programmatically focused back to a title div," +
      " this ensures screen reader users are informed regarding any changes and can navigate back down the page.";
    const mockRef = { current: null };

    beforeEach(() => {
      loggerSpy = jest.spyOn(console, "warn");
      instance = render(
        <StepFlow currentStep={4} totalSteps={1} title="foo" ref={mockRef} />
      );
    });

    afterEach(() => {
      loggerSpy.mockRestore();
      instance.unmount();
    });

    afterAll(() => {
      loggerSpy.mockClear();
      jest.clearAllMocks();
    });

    it("validates a warning is logged in the console once when currentStep is higher than totalSteps", () => {
      render(
        <StepFlow currentStep={4} totalSteps={1} title="foo" ref={mockRef} />
      );

      expect(loggerSpy).toHaveBeenCalledWith(currentStepWarnMessage);

      loggerSpy.mockRestore();
    });

    it("validates a warning is logged in the console once when a ref is not passed", () => {
      render(<StepFlow currentStep={4} totalSteps={1} title="foo" />);

      expect(loggerSpy).toHaveBeenCalledWith(noRefWarnMessage);

      loggerSpy.mockRestore();
    });
  });
});
