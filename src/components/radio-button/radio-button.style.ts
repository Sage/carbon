import styled, { css } from "styled-components";
import { margin } from "styled-system";
import FieldHelpStyle from "../../__internal__/field-help/field-help.style";
import CheckboxStyle from "../checkbox/checkbox.style";
import HiddenCheckableInputStyle from "../../__internal__/checkable-input/hidden-checkable-input.style";
import { StyledCheckableInput } from "../../__internal__/checkable-input/checkable-input.style";
import StyledCheckableInputSvgWrapper from "../../__internal__/checkable-input/checkable-input-svg-wrapper.style";
import { StyledLabelContainer } from "../../__internal__/label/label.style";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import FormFieldStyle, {
  FieldLineStyle,
} from "../../__internal__/form-field/form-field.style";

const svgSize = {
  small: {
    size: 16,
    radius: 5,
  },
  medium: {
    size: 24,
    radius: 4.5,
  },
  large: {
    size: 32,
    radius: 4.285,
  },
};

interface RadioButtonStyleProps {
  disabled?: boolean;
  fieldHelpInline?: boolean;
  reverse?: boolean;
  size: "small" | "medium" | "large";
}

const RadioButtonStyle = styled(CheckboxStyle).attrs(
  applyBaseTheme,
)<RadioButtonStyleProps>`
  ${({ disabled, fieldHelpInline, reverse, size }) => css`
    margin-bottom: var(--spacing150);

    :last-of-type {
      margin-bottom: 0;
    }

    && ${FormFieldStyle} {
      margin: 0;
    }

    && ${FieldLineStyle} {
      gap: 8px;
    }

    ${StyledLabelContainer} {
      padding: 0;
    }

    ${StyledCheckableInputSvgWrapper} {
      padding: 0;
    }

    ${StyledCheckableInputSvgWrapper}, svg {
      border-radius: var(--borderRadiusCircle);
    }

    ${StyledCheckableInput},
    ${HiddenCheckableInputStyle},
    ${StyledCheckableInputSvgWrapper},
    svg {
      height: ${svgSize[size].size}px;
      width: ${svgSize[size].size}px;
    }

    svg {
      padding: 1px;
    }

    circle {
      r: ${svgSize[size].radius};
    }

    ${HiddenCheckableInputStyle}:checked + ${StyledCheckableInputSvgWrapper} circle {
      fill: var(--colorsUtilityYin090);
    }

    ${disabled &&
    css`
      circle {
        fill: var(--colorsUtilityDisabled400);
      }

      ${HiddenCheckableInputStyle}:checked + ${StyledCheckableInputSvgWrapper} circle {
        fill: var(--colorsUtilityDisabled600);
      }
    `}

    ${(fieldHelpInline || reverse) &&
    `
      ${FieldHelpStyle} {
        margin-left: 0;
        margin-right: 6px;
      }

      ${StyledLabelContainer} {
        flex: 0 1 auto;
      }
    `}
  `}

  ${margin};
`;

interface StyledAccordionProps {
  expanded?: boolean;
  contentHeight?: string | number;
}

export const StyledAccordion = styled.div<StyledAccordionProps>`
  transition: all 0.4s;
  overflow: hidden;
  visibility: hidden;
  max-height: 0;

  ${({ expanded, contentHeight }) => css`
    ${expanded &&
    css`
      visibility: visible;
      max-height: ${contentHeight}px;
    `}
  `}
`;

interface StyledAccordionContainerProps {
  size: "small" | "medium" | "large";
}

const getSpacing = {
  small: {
    padding: 8,
    margin: 24,
    top: 6,
    left: 7,
  },
  medium: {
    padding: 12,
    margin: 32,
    top: 8,
    left: 11,
  },
  large: {
    padding: 16,
    margin: 42,
    top: 10,
    left: 15,
  },
};

export const StyledAccordionContainer = styled.div`
  position: relative;
`;

export const StyledAccordionContent = styled.div<StyledAccordionContainerProps>`
  ${({ size }) =>
    size &&
    css`
      margin-left: ${getSpacing[size].margin}px;
      padding: ${getSpacing[size].padding}px 0;
    `}
`;

export const AccordionVerticalLine = styled.div<StyledAccordionContainerProps>`
  position: absolute;
  height: calc(100% - (6px + 8px));
  width: 2px;
  background-color: #a6a6a6;
  border-radius: 2px;

  ${({ size }) =>
    size &&
    css`
      top: ${getSpacing[size].top}px;
      left: ${getSpacing[size].left}px;
      height: calc(
        100% - (${getSpacing[size].top}px + ${getSpacing[size].padding}px)
      );
    `}
`;

export default RadioButtonStyle;
