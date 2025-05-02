import React from "react";
import Typography from "../../typography";
import useLocale from "../../../hooks/__internal__/useLocale";
import { useStepFlowContext } from "../__internal__/step-flow.context";
import { StyledTitleFocusWrapper } from "../step-flow.style";

export interface StepFlowTitleProps {
  /** The title of the current step.  */
  titleString: string;
  /** Set the variant of the internal 'Typography' component which contains the title.
   * However, despite the chosen variant the styling will always be overridden.
   */
  titleVariant?: "h1" | "h2";
  /** Override the screen reader only title with any additional context or information.
   * If not provided, only the `titleString` prop will be used.
   */
  screenReaderOnlyTitle?: string;
}

export const StepFlowTitle = ({
  titleString,
  titleVariant,
  screenReaderOnlyTitle,
}: StepFlowTitleProps) => {
  const locale = useLocale();

  const {
    titleRef,
    validatedCurrentStep,
    totalSteps,
    category,
    titleVariant: titleVariantContext,
  } = useStepFlowContext();

  return (
    <StyledTitleFocusWrapper
      data-role="title-text-wrapper"
      data-element="title-text-wrapper"
      tabIndex={-1}
      ref={titleRef}
    >
      <Typography
        variant={titleVariant || titleVariantContext || "h1"}
        data-element="title-text"
      >
        <Typography
          fontWeight="700"
          fontSize="var(--fontSizes600)"
          lineHeight="var(--sizing375)"
          variant="span"
          aria-hidden="true"
          data-element="visible-title-text"
          data-role="visible-title-text"
        >
          {titleString}
        </Typography>
        {validatedCurrentStep && totalSteps && (
          <Typography
            variant="span"
            data-element="visually-hidden-title-text"
            data-role="visually-hidden-title-text"
            screenReaderOnly
          >
            {locale.stepFlow.screenReaderOnlyTitle(
              screenReaderOnlyTitle || titleString,
              validatedCurrentStep,
              totalSteps,
              category,
            )}
          </Typography>
        )}
      </Typography>
    </StyledTitleFocusWrapper>
  );
};

export default StepFlowTitle;
