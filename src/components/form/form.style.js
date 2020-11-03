import styled, { css, keyframes } from "styled-components";
import PropTypes from "prop-types";

import StyledFormField from "../../__experimental__/components/form-field/form-field.style";
import { StyledFieldset } from "../../__internal__/fieldset/fieldset.style";

import StyledButton from "../button/button.style";
import baseTheme from "../../style/themes/base";
import OptionsHelper from "../../utils/helpers/options-helper";

export const StyledForm = styled.form`
  & ${StyledFormField}, ${StyledFieldset}, > ${StyledButton} {
    margin-top: 0;
    margin-bottom: ${({ fieldSpacing, theme }) =>
      theme.spacing * fieldSpacing}px;
  }

  ${({ stickyFooter }) =>
    stickyFooter &&
    css`
      padding-bottom: 72px;
    `}
`;

export const StyledRightButtons = styled.div`
  display: flex;
  margin-left: 16px;
  ${({ buttonAlignment }) => buttonAlignment === "left" && "flex-grow: 1"};

  ${StyledButton}:last-child {
    margin-right: 0;
  }
`;

export const StyledLeftButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 16px;
  ${({ buttonAlignment }) => buttonAlignment === "right" && "flex-grow: 1"};

  ${StyledButton}:last-child {
    margin-right: 0;
  }
`;

const FormButtonAnimation = keyframes`
  0%   { bottom: -50px; }
  100% { bottom: 0; }
`;

export const StyledFormFooter = styled.div`
  margin-top: 48px;
  align-items: center;
  display: flex;

  ${({ buttonAlignment }) =>
    buttonAlignment === "right" &&
    css`
      justify-content: flex-end;
    `}

  ${({ stickyFooter, theme }) =>
    stickyFooter &&
    css`
      animation: ${FormButtonAnimation} 0.25s ease-out;
      background-color: ${theme.colors.white};
      box-shadow: 0 -4px 12px 0 rgba(0, 0, 0, 0.05);
      box-sizing: border-box;
      padding: 16px 32px;
      bottom: 0;
      left: 0;
      position: fixed;
      width: 100%;
      z-index: 1000;
    `}
`;

StyledForm.propTypes = {
  theme: PropTypes.object,
  stickyFooter: PropTypes.bool,
  fieldSpacing: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 7]),
};

StyledForm.defaultProps = {
  theme: baseTheme,
};

StyledLeftButtons.propTypes = {
  buttonAlignment: PropTypes.oneOf(OptionsHelper.alignBinary),
};

StyledRightButtons.propTypes = {
  buttonAlignment: PropTypes.oneOf(OptionsHelper.alignBinary),
};

StyledFormFooter.propTypes = {
  theme: PropTypes.object,
  buttonAlignment: PropTypes.oneOf(OptionsHelper.alignBinary),
  stickyFooter: PropTypes.bool,
};

StyledFormFooter.defaultProps = {
  theme: baseTheme,
};
