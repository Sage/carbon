import React, { useImperativeHandle, useRef, forwardRef } from "react";
import { MarginProps } from "styled-system";
import {
  StyledStepFlow,
  StyledStepContent,
  StyledStepLabel,
  StyledProgressIndicatorWrapper,
  StyledProgressIndicator,
} from "./step-flow.style";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import Logger from "../../__internal__/utils/logger";
import useLocale from "../../hooks/__internal__/useLocale";
import { StepFlowProvider } from "./__internal__/step-flow.context";
import StepFlowTitle from "./step-flow-title/step-flow-title.component";

import Icon from "../icon";
import Button from "../button/__next__";

export type Steps = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface StepFlowAriaProps {
  /** Prop to specify the aria-label of the component */
  "aria-label"?: string;
  /** Prop to specify the aria-labelledby of the component */
  "aria-labelledby"?: string;
  /** Prop to specify the aria-describedby of the component */
  "aria-describedby"?: string;
}

export interface StepFlowProps
  extends StepFlowAriaProps,
    MarginProps,
    TagProps {
  /**
   * A category for the user journey.
   * @deprecated This prop is deprecated and will be removed in a future release.
   */
  category?: string;
  /**
   * The title of the current step, this can be a string or a valid React node
   * which contains the `<StepFlowTitle />` component as a descendant.
   */
  title: React.ReactNode;
  /**
   * Set the variant of the internal 'Typography' component which contains the title.
   * However, despite the chosen variant the styling will always be overridden.
   */
  titleVariant?: "h1" | "h2";
  /** The total steps in the user journey.  */
  totalSteps: Steps;
  /**
   * The current step of the user journey. If the set `currentStep` is higher than
   * `totalSteps`the value of `currentStep` will be that of `totalSteps` instead.
   */
  currentStep: Steps;
  /** Determines if the progress indicator is shown. */
  showProgressIndicator?: boolean;
  /** Determines if the close icon button is shown */
  showCloseIcon?: boolean;
  /** Callback function invoked when the close icon button is clicked */
  onDismiss?: (
    e:
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

export type StepFlowHandle = {
  /** Programmatically focus on root container of Dialog. */
  focus: () => void;
} | null;

export const StepFlow = forwardRef<StepFlowHandle, StepFlowProps>(
  (
    {
      category,
      title,
      titleVariant = "h1",
      totalSteps,
      currentStep,
      showProgressIndicator = false,
      showCloseIcon = false,
      onDismiss,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const locale = useLocale();
    const titleRef = useRef<HTMLDivElement>(null);

    const totalStepsArray = Array.from(
      { length: totalSteps },
      (_, index) => index + 1,
    );

    const validatedCurrentStep =
      currentStep > totalSteps ? totalSteps : currentStep;

    let currentStepWarnTriggered = false;
    let noRefWarnTriggered = false;

    if (!currentStepWarnTriggered && currentStep > totalSteps) {
      currentStepWarnTriggered = true;
      Logger.warn(
        "[WARNING] The `currentStep` prop should not be higher than the `totalSteps`prop in `StepFlow`." +
          " Please ensure `currentStep`s value does not exceed that of `totalSteps`, in the meantime" +
          " we have set `currentStep` value to that of `totalSteps`, and all indicators have been marked as completed.",
      );
    }
    if (!noRefWarnTriggered && !ref) {
      noRefWarnTriggered = true;
      Logger.warn(
        "[WARNING] A `ref` should be provided to ensure focus is programmatically focused back to a title div," +
          " this ensures screen reader users are informed regarding any changes and can navigate back down the page.",
      );
    }

    useImperativeHandle<StepFlowHandle, StepFlowHandle>(
      ref,
      () => ({
        focus() {
          titleRef.current?.focus();
        },
      }),
      [],
    );

    const stepFlowTitle = (
      <StepFlowProvider
        value={{
          validatedCurrentStep,
          totalSteps,
          titleVariant,
          category,
          titleRef,
        }}
      >
        {typeof title === "string" ? (
          <StepFlowTitle titleString={title} />
        ) : (
          title
        )}
      </StepFlowProvider>
    );

    const closeIcon = (
      <Button
        data-element="close"
        aria-label={locale.stepFlow.closeIconAriaLabel?.()}
        onClick={(ev) => onDismiss?.(ev as React.MouseEvent<HTMLButtonElement>)}
        variantType="subtle"
        size="small"
      >
        <Icon type="close" />
      </Button>
    );

    const progressIndicators = totalStepsArray.map((step) => {
      return (
        <StyledProgressIndicator
          key={step}
          data-role="progress-indicator"
          data-element="progress-indicator"
          $isCompleted={step < validatedCurrentStep}
          $isInProgress={step === validatedCurrentStep}
        />
      );
    });

    return (
      <StyledStepFlow
        role="group"
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-labelledby={ariaLabelledBy}
        {...rest}
        {...tagComponent("step-flow", rest)}
      >
        <StyledStepContent>
          {category}
          {stepFlowTitle}

          <StyledStepLabel aria-hidden="true">
            {locale.stepFlow.stepLabel(validatedCurrentStep, totalSteps)}
          </StyledStepLabel>

          {showProgressIndicator && (
            <StyledProgressIndicatorWrapper
              data-element="progress-indicator-bar"
              data-role="progress-indicator-bar"
              aria-hidden="true"
            >
              {progressIndicators}
            </StyledProgressIndicatorWrapper>
          )}
        </StyledStepContent>
        {showCloseIcon ? closeIcon : null}
      </StyledStepFlow>
    );
  },
);

export default StepFlow;
