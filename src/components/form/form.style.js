import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import { space } from "styled-system";
import StyledFormField from "../../__internal__/form-field/form-field.style";
import { StyledFieldset } from "../../__internal__/fieldset/fieldset.style";

import StyledButton from "../button/button.style";
import baseTheme from "../../style/themes/base";
import { FieldsetStyle } from "../fieldset/fieldset.style";
import StyledInlineInputs from "../inline-inputs/inline-inputs.style";
import { FORM_BUTTON_ALIGNMENTS } from "./form.config";
import StyledSearch from "../search/search.style";

export const StyledFormContent = styled.div`
  ${({ stickyFooter }) => css`
    ${stickyFooter &&
    css`
      overflow-y: auto;
      flex: 1;
    `}
  `}
`;

export const StyledFormFooter = styled.div`
  align-items: center;
  display: flex;

  ${({ buttonAlignment }) =>
    buttonAlignment === "right" &&
    css`
      justify-content: flex-end;
    `}

  ${({ stickyFooter }) => css`
    ${!stickyFooter &&
    css`
      margin-top: 48px;
    `}

    ${stickyFooter &&
    css`
      background-color: var(--colorsUtilityYang100);
      box-shadow: 0 -4px 12px 0 rgba(0, 0, 0, 0.05);
      box-sizing: border-box;
      padding: 16px 32px;
      width: 100%;
      z-index: 1000;
      position: sticky;
      bottom: 0;
    `}
  `}
`;

const formBottomMargins = (fieldSpacing) =>
  ({
    0: "var(--spacing000)",
    1: "var(--spacing100)",
    2: "var(--spacing200)",
    3: "var(--spacing300)",
    4: "var(--spacing400)",
    5: "var(--spacing500)",
    7: "var(--spacing700)",
  }[fieldSpacing]);

export const StyledForm = styled.form`
  ${space}

  ${({ height }) =>
    height &&
    css`
      height: ${height};
    `}

  ${({ fieldSpacing }) =>
    css`
      &
        ${StyledFormField},
        ${StyledFieldset},
        ${FieldsetStyle},
        > ${StyledButton} {
        margin-top: 0;
        margin-bottom: ${formBottomMargins(fieldSpacing)};
      }

      ${StyledInlineInputs} {
        ${StyledFormField} {
          margin-bottom: 0;
        }

        margin-bottom: ${formBottomMargins(fieldSpacing)};
      }
    `}  

  ${StyledSearch} ${StyledFormField} {
    margin-bottom: 0px;
  }

  ${({ stickyFooter, isInSidebar }) =>
    stickyFooter &&
    css`
      display: flex;
      flex-direction: column;
      position: relative;

      ${isInSidebar &&
      css`
        min-height: 100%;
        ${StyledFormContent}.sticky {
          padding-right: var(--spacing400);
          padding-left: var(--spacing400);
          padding-top: 27px;
          margin-right: calc(-1 * var(--spacing400));
          margin-left: calc(-1 * var(--spacing400));
          margin-top: -27px;
        }

        ${StyledFormFooter}.sticky {
          margin-left: calc(-1 * var(--spacing400));
          margin-bottom: calc(-1 * var(--spacing400));
          width: calc(100% + var(--spacing800));
          padding-left: var(--spacing400);
          padding-right: var(--spacing400);
          bottom: -32px;
        }
      `}
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

StyledForm.propTypes = {
  theme: PropTypes.object,
  stickyFooter: PropTypes.bool,
  fieldSpacing: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 7]),
};

StyledForm.defaultProps = {
  theme: baseTheme,
};

StyledLeftButtons.propTypes = {
  buttonAlignment: PropTypes.oneOf(FORM_BUTTON_ALIGNMENTS),
};

StyledRightButtons.propTypes = {
  buttonAlignment: PropTypes.oneOf(FORM_BUTTON_ALIGNMENTS),
};

StyledFormFooter.propTypes = {
  buttonAlignment: PropTypes.oneOf(FORM_BUTTON_ALIGNMENTS),
  stickyFooter: PropTypes.bool,
};
