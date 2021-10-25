import styled, { css } from "styled-components";
import { margin } from "styled-system";
import PropTypes from "prop-types";
import BaseTheme from "../../style/themes/base";

const FileInputForm = styled.form`
  ${margin}
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
    ${disabled && `border-color: ${theme.disabled.border}`};
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
    ${disabled && `background-color: ${theme.disabled.input}`};
    ${disabled && `pointer-events: none;`};
    ${disabled && `border-color: ${theme.disabled.border}`};
    ${draggable && `border: 2px solid transparent;`};
    ${draggable && isSelected && `border: 2px dashed ${theme.colors.primary};`};
    ${error &&
    `border: 2px ${draggable ? "dashed" : "solid"} ${theme.colors.error};`};
  `}
  width: 256px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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

const FileInputContentWrapper = styled.div`
  display: flex;
  width: 100%;
  z-index: 1;
`;

StyledFileInput.propTypes = {
  error: PropTypes.string,
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
  FileInputContentWrapper,
  FileInputForm,
  FileInputLabel,
  FileInputTitle,
  StyledFileInput,
};
