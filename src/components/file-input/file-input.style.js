import styled, { css } from "styled-components";
import { space } from "styled-system";
import propTypes from "@styled-system/prop-types";
import PropTypes from "prop-types";
import StyledButton from "../button/button.style";
import BaseTheme from "../../style/themes/base";

const FileInputForm = styled.form`
  ${space}
  ${StyledButton} {
    border: none;
  }
`;

const FileInput = styled.input`
  &[type="file"] {
    display: none;
  }
`;

const FileDropArea = styled.div`
  ${({ theme, disabled, error, draggable, isSelected, isDragged }) => css`
    display: flex;
    align-items: center;
    padding-left: 12px;
    font-weight: 600;
    overflow: hidden;
    ${draggable &&
    !isSelected &&
    `border: 2px dashed ${theme.colors.primary};
    color: ${theme.text.placeholder};
    font-weight: 600`};
    ${draggable &&
    !isSelected &&
    isDragged &&
    `background-color: ${theme.menu.light.divider};
    border: 2px dashed ${theme.colors.slate};
    color: ${theme.text.color};`};
    ${draggable && !isSelected && `border-right: none;`};
    ${error && `border: none;`};
    ${disabled && `border-color: #CCD6DB;`};
    width: 100%;
  `}
`;

const FileInputTitle = styled.div`
  font-weight: bold;
`;

const FileInputLabel = styled.label`
  margin-top: 8px;
  ${({ theme, disabled, error, draggable, isSelected }) => css`
    border: 1px solid ${theme.colors.border};
    ${disabled && `background-color: #F2F5F6;`};
    ${disabled && `pointer-events: none;`};
    ${disabled && `border-color: #CCD6DB;`};
    ${draggable && `border: 2px solid transparent;`};
    ${draggable && isSelected && `border: 2px dashed ${theme.colors.primary};`};
    ${error &&
    `border: 2px ${draggable ? "dashed" : "solid"} ${theme.colors.error};`};
  `}
  width: 254px;
  display: flex;
  justify-content: space-between;
`;

const ErrorMessage = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.error};
    font-weight: bold;
  `}
`;

const ErrorBorder = styled.div`
  ${({ theme }) =>
    css`
      position: absolute;
      width: 2px;
      height: 100%;
      background-color: ${theme.colors.error};
      left: -12px;
    `}
`;

const StyledFileInput = styled.div`
  position: relative;
  align-items: center;
  width: 256px;
`;

StyledFileInput.propTypes = {
  error: PropTypes.string,
};

FileInputForm.propTypes = {
  /** Styled system spacing props */
  ...propTypes.space,
};

FileInputLabel.propTypes = {
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  draggable: PropTypes.bool,
  isSelected: PropTypes.bool,
};

FileInputLabel.defaultProps = {
  error: false,
  disabled: false,
  draggable: false,
  isSelected: false,
  theme: BaseTheme,
};

FileDropArea.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  draggable: PropTypes.bool,
  isSelected: PropTypes.bool,
  isDragged: PropTypes.bool,
};

ErrorBorder.defaultProps = {
  theme: BaseTheme,
};

ErrorMessage.defaultProps = {
  theme: BaseTheme,
};

FileDropArea.defaultProps = {
  disabled: false,
  error: false,
  draggable: false,
  isSelected: false,
  isDragged: false,
  theme: BaseTheme,
};

export {
  ErrorBorder,
  ErrorMessage,
  FileDropArea,
  FileInput,
  FileInputForm,
  FileInputLabel,
  FileInputTitle,
  StyledFileInput,
};
