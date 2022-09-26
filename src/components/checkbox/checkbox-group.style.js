import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import StyledFormField from "../../__internal__/form-field/form-field.style";
import StyledIcon from "../icon/icon.style";
import CheckboxStyle from "./checkbox.style";
import { StyledLabelContainer } from "../../__internal__/label/label.style";
import StyledValidationIcon from "../../__internal__/validations/validation-icon.style";

const StyledCheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;

  ${StyledIcon}::before {
    font-size: 16px;
  }

  && ${StyledFormField} {
    margin: 0;
  }

  & ${CheckboxStyle} {
    margin-bottom: var(--spacing150);

    :last-of-type {
      margin-bottom: 0;
    }
  }

  & > ${StyledFormField} {
    & > ${StyledLabelContainer} {
      margin-bottom: 4px;
      vertical-align: middle;

      ${StyledValidationIcon} {
        display: inline-block;
      }
    }
  }

  ${({ legendInline }) =>
    legendInline &&
    css`
      ${CheckboxStyle}:first-child {
        padding-top: 4px;
      }
    `}
`;

StyledCheckboxGroup.propTypes = {
  legendInline: PropTypes.bool,
};

export default StyledCheckboxGroup;
