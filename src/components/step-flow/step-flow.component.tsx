import React, { useImperativeHandle, useRef, forwardRef } from "react";
import { MarginProps } from "styled-system";
import Icon from "../icon";
import IconButton from "../icon-button";
import {
  StyledStepFlow,
  StyledStepContent,
  StyledStepContentText,
  StyledStepLabelAndProgress,
  StyledProgressIndicatorBar,
  StyledProgressIndicator,
  StyledTitleFocusWrapper,
} from "./step-flow.style";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import Typography from "../typography";
import useLocale from "../../hooks/__internal__/useLocale";

export type Steps = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface StepFlowProps extends MarginProps, TagProps {
  /** A category for the user journey.  */
  category?: string;
  /** The title of the current step.  */
  title: string;
  /** Set the variant of the internal 'Typography' component which contains the title.
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
  /** function runs when user click dismiss button */
  onDismiss?: (
    e:
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>
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
      titleVariant,
      totalSteps,
      currentStep,
      showProgressIndicator = false,
      showCloseIcon = false,
      onDismiss,
      ...rest
    },
    ref
  ) => {
    const totalStepsArray = Array.from(
      { length: totalSteps },
      (_, index) => index + 1
    );

    const validatedCurrentStep =
      currentStep > totalSteps ? totalSteps : currentStep;

    let currentStepWarnTriggered = false;
    let noRefWarnTriggered = false;

    /* eslint-disable no-console */
    if (!currentStepWarnTriggered && currentStep > totalSteps) {
      currentStepWarnTriggered = true;
      console.warn(
        "[WARNING] The `currentStep` prop should not be higher than the `totalSteps`prop in `StepFlow`." +
          " Please ensure `currentStep`s value does not exceed that of `totalSteps`, in the meantime" +
          " we have set `currentStep` value to that of `totalSteps`, and all indicators have been marked as completed."
      );
    }
    if (!noRefWarnTriggered && !ref) {
      noRefWarnTriggered = true;
      console.warn(
        "[WARNING] A `ref` should be provided to ensure focus is programmatically focused back to a title div," +
          " this ensures screen reader users are informed regarding any changes and can navigate back down the page."
      );
    }

    const progressIndicators = totalStepsArray.map((step) => {
      const generateDataState = () => {
        if (step === validatedCurrentStep) {
          return "in-progress";
        }
        if (step < validatedCurrentStep) {
          return "is-completed";
        }
        return "not-completed";
      };

      return (
        <StyledProgressIndicator
          key={step}
          aria-hidden="true"
          data-role="progress-indicator"
          data-element="progress-indicator"
          isCompleted={step < validatedCurrentStep}
          isInProgress={step === validatedCurrentStep}
          data-state={generateDataState()}
        >
          &nbsp;
        </StyledProgressIndicator>
      );
    });

    const locale = useLocale();

    const closeIcon = (
      <IconButton
        data-element="close"
        aria-label={locale.stepFlow.closeIconAriaLabel?.()}
        onClick={onDismiss}
      >
        <Icon type="close" />
      </IconButton>
    );

    const titleRef = useRef<HTMLDivElement>(null);

    useImperativeHandle<StepFlowHandle, StepFlowHandle>(
      ref,
      () => ({
        focus() {
          titleRef.current?.focus();
        },
      }),
      []
    );

    const stepFlowTitle = (
      <StyledTitleFocusWrapper
        data-role="title-text-wrapper"
        data-element="title-text-wrapper"
        tabIndex={-1}
        ref={titleRef}
      >
        <Typography variant={titleVariant || "h1"} data-element="title-text">
          <Typography
            fontWeight="900"
            fontSize="var(--fontSizes600)"
            lineHeight="var(--sizing375)"
            variant="span"
            aria-hidden="true"
            data-element="visible-title-text"
          >
            {title}
          </Typography>
          <Typography
            variant="span"
            data-element="visually-hidden-title-text"
            screenReaderOnly
          >
            {locale.stepFlow.screenReaderOnlyTitle(
              title,
              validatedCurrentStep,
              totalSteps,
              category
            )}
          </Typography>
        </Typography>
      </StyledTitleFocusWrapper>
    );

    const stepFlowLabel = (
      <Typography
        variant="span"
        fontWeight="400"
        fontSize="var(--fontSizes200)"
        lineHeight="var(--sizing300)"
        data-element="step-label"
        aria-hidden="true"
      >
        {locale.stepFlow.stepLabel(validatedCurrentStep, totalSteps)}
      </Typography>
    );

    return (
      <StyledStepFlow {...rest} {...tagComponent("step-flow", rest)}>
        <StyledStepContent>
          {category ? (
            <StyledStepContentText>
              <Typography
                fontWeight="500"
                fontSize="var(--fontSizes100)"
                lineHeight="var(--sizing250)"
                variant="span"
                data-element="category-text"
                aria-hidden="true"
              >
                {category}
              </Typography>
              {stepFlowTitle}
            </StyledStepContentText>
          ) : (
            stepFlowTitle
          )}
          {showCloseIcon ? closeIcon : null}
        </StyledStepContent>
        {showProgressIndicator ? (
          <StyledStepLabelAndProgress>
            {stepFlowLabel}
            <StyledProgressIndicatorBar
              data-element="progress-indicator-bar"
              data-role="progress-indicator-bar"
            >
              {progressIndicators}
            </StyledProgressIndicatorBar>
          </StyledStepLabelAndProgress>
        ) : (
          stepFlowLabel
        )}
      </StyledStepFlow>
    );
  }
);

export default StepFlow;
