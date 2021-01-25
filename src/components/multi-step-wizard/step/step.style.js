import styled, { css } from "styled-components";
import Button from "../../button";
import Icon from "../../icon";

const StyledStepContent = styled.div`
  display: table-cell;
  padding-left: 30px;
  padding-top: 5px;
  padding-bottom: 40px;
  width: 100%;
`;

const StyledStepButton = styled(Button)`
  margin-top: 10px;
  margin-right: 10px;

  :first-child {
    background-color: #255bc7;
    border-color: #255bc7;
    color: #fff;
  }
`;

const StyledStepIndicatorBackground = styled.div`
  height: 100%;
  display: inline-block;
  width: 2px;
`;

const StyledStepIndicatorBar = styled.div`
  display: table-cell;
  vertical-align: top;

  ${({ isStepProcessed }) =>
    !isStepProcessed &&
    css`
      background-color: #ccd6db;

      ${StyledStepIndicatorBackground} {
        background-color: #ccd6db;
      }
    `}

  ${({ isStepProcessed }) =>
    isStepProcessed &&
    css`
      background-color: #38c72a;

      ${StyledStepIndicatorBackground} {
        background-color: #38c72a;
      }
    `}
`;

const StyledStepIndicatorIconContainer = styled.div`
  display: table-cell;
  vertical-align: top;
`;

const StepIndicatorIconPlaceholder = styled.div`
  display: inline-block;
  width: 26px;
  height: 36px;
  margin-left: -14px;
  background-color: #fff;
`;

const StepIndicatorIconContent = styled.div`
  border-radius: 50%;
  display: block;
  width: 26px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  color: #fff;

  ${({ isStepProcessed }) =>
    !isStepProcessed &&
    css`
      background-color: #ff7d00;
    `}

  ${({ isStepProcessed }) =>
    isStepProcessed &&
    css`
      background-color: #38c72a;
    `}
`;

const StyledStepIndicatorIcon = styled(Icon)`
  vertical-align: middle;
  padding: 0px;
`;

const StyledStep = styled.div`
  display: table;
  margin-bottom: 10px;

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;

      ${({ isStepProcessed }) =>
        isStepProcessed &&
        css`
          ${StyledStepButton} {
            background-color: #ccd6db;
            color: #7f98a3;
            border-color: #ccd6db;
          }
        `}

      ${({ isStepProcessed }) =>
        !isStepProcessed &&
        css`
          ${StepIndicatorIconContent} {
            background-color: #b3c2c8;
          }
        `}
    `}

  ${({ isLastStep }) =>
    isLastStep &&
    css`
      ${StyledStepIndicatorBar} {
        background-color: transparent;

        ${StyledStepIndicatorBackground} {
          background-color: transparent;
        }
      }
    `}

  ${({ isStepProcessed }) =>
    isStepProcessed &&
    css`
      input {
        pointer-events: none;
        background-color: #e6ebed;
      }
    `}
`;

export {
  StyledStep,
  StyledStepContent,
  StyledStepButton,
  StyledStepIndicatorBar,
  StyledStepIndicatorBackground,
  StyledStepIndicatorIconContainer,
  StepIndicatorIconPlaceholder,
  StepIndicatorIconContent,
  StyledStepIndicatorIcon,
};
