import styled from "styled-components";
import { spacingCss } from "../dips-box/utils/spacing";

const StyledStepFlow = styled.div`
  ${(props) => spacingCss(props)}
`;

const StyledStepContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--sizing200);
`;

const StyledStepContentText = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitleFocusWrapper = styled.div``;

const StyledStepLabelAndProgress = styled.div`
  margin-top: var(--sizing125);
`;

const StyledProgressIndicatorBar = styled.div`
  display: flex;
  margin-top: var(--sizing100);
`;

interface StyledProgressIndicatorProps {
  isCompleted: boolean;
  isInProgress: boolean;
}

function calculateProgressIndicatorColor({
  isCompleted,
  isInProgress,
}: StyledProgressIndicatorProps) {
  if (isInProgress) {
    return "var(--colorsUtilityYin090)";
  }
  if (isCompleted) {
    return "var(--colorsSemanticPositive500)";
  }
  return "var(--colorsActionDisabled600)";
}

const StyledProgressIndicator = styled.span<StyledProgressIndicatorProps>`
  background-color: ${calculateProgressIndicatorColor};
  width: 100%;
  height: 8px;
  border-radius: 8px;
  margin-right: 12px;
`;

export {
  StyledStepFlow,
  StyledStepContent,
  StyledStepContentText,
  StyledTitleFocusWrapper,
  StyledStepLabelAndProgress,
  StyledProgressIndicatorBar,
  StyledProgressIndicator,
};
