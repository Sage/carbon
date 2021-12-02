import styled, { css } from "styled-components";
import { margin } from "styled-system";
import PropTypes from "prop-types";

import BaseTheme from "../../style/themes/base";
import Button from "../button";
import Link from "../link";
import { BUTTON_VARIANTS } from "../button/button.config";
import ProgressTracker from "../progress-tracker/progress-tracker.component";
import { InnerBar as InnerProgressBar } from "../progress-tracker/progress-tracker.style";
import LoaderBar from "../loader-bar";
import StyledLoaderBar, {
  InnerBar as InnerLoaderBar,
} from "../loader-bar/loader-bar.style";

const HintText = styled.span`
  color: ${({ theme }) => theme.fileInput.hintText};
`;

const FileDropArea = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-weight: 400;
  overflow: hidden;
  width: 100%;

  ${({
    theme,
    disabled,
    isSelected,
    draggable,
    isDragged,
    error,
    warning,
  }) => css`
    border: 1px solid ${theme.fileInput.border};
    border-right: none;

    ${draggable &&
    css`
      border: 1px dashed ${theme.fileInput.border};
      border-right: none;
      ${(error || warning || isSelected) && "border: none;"};

      ${disabled &&
      !isSelected &&
      `border-color:${theme.disabled.border}; background: ${theme.disabled.input};`};

      ${isDragged &&
      `border-width: 2px; border-color:${theme.fileInput.border};`}
    `}

    ${!draggable &&
    css`
      border: 1px solid ${theme.fileInput.border};
      border-right: none;

      ${disabled &&
      `border-color: ${theme.disabled.border};  background: ${theme.disabled.input};`}

      ${(isSelected || warning || error) && "border: none;"}
    `}
  `}
`;

const FileInput = styled.input`
  &[type="file"] {
    display: none;
  }
`;

const FileInputContent = styled.div`
  display: flex;
  width: 100%;
  z-index: 1;

  ${({
    theme,
    disabled,
    error,
    draggable,
    isDragged,
    isSelected,
    isUploadingAndDisabled,
    readOnly,
    warning,
  }) => css`
    ${draggable &&
    css`
      border: 1px dashed ${theme.fileInput.border};

      ${!isSelected && !warning && "border: none;"};

      ${(disabled || isUploadingAndDisabled) &&
      `border-color: ${theme.disabled.border}; background: ${theme.disabled.input};`};

      ${isDragged &&
      css`
        border-width: 2px;
        background-color: ${theme.colors.dashedHoverBackground};
      `}
    `}

    ${!draggable &&
    css`
      ${(isSelected || warning) &&
      `border: 1px solid ${theme.fileInput.border};`};

      ${(isUploadingAndDisabled || disabled) &&
      `border-color: ${theme.disabled.border}; background: ${theme.disabled.input};`};
    `}

    ${error &&
    css`
      border: 2px solid ${theme.colors.error};
      :focus {
        outline: 3px solid ${theme.colors.focus};
      }
      ${draggable && `border-style: dashed;`}
    `}

    ${readOnly &&
    `height: 40px; background: ${theme.disabled.input}; border: 1px solid ${theme.disabled.border};`};
  `}
`;

const FileInputContentWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const FileInputContainer = styled.div`
  position: relative;
  align-items: center;
  margin-top: 4px;
`;

const FileInputForm = styled.form`
  ${margin}
`;

const FirstSegment = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
`;

const FormattedText = styled.span`
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
`;

const Placeholder = styled.span`
  display: block;
  overflow: hidden;
  ${({ theme, dragPlaceholder, isSelected, isDragged }) => css`
    color: ${theme.text.color};
    ${!isDragged &&
    dragPlaceholder &&
    !isSelected &&
    `color: ${theme.text.placeholder};`};
  `}
`;

// TODO: remove after adding "minor" prop for Button component
function stylingForType({ theme, buttonType, disabled, destructive }) {
  return css`
    ${buttonType === "primary" &&
    css`
      background: ${theme.fileInput.minorButton.primary};
      &:hover {
        background: ${theme.fileInput.minorButton.hover};
        border-color: ${theme.fileInput.minorButton.hover};
      }
      ${disabled
        ? `
        background: ${theme.disabled.background};
        color: ${theme.disabled.text};
        &:hover {
          background: ${theme.disabled.background};
          color: ${theme.disabled.text};
          border-color: ${theme.disabled.background};
        }
      `
        : ""}
    `}

    ${buttonType === "secondary" &&
    css`
      border: 2px solid ${theme.fileInput.minorButton.primary};
      color: ${theme.fileInput.minorButton.primary};
      &:hover {
        background: ${theme.fileInput.minorButton.hover};
        border-color: ${theme.fileInput.minorButton.hover};
      }
      ${disabled
        ? `
        background: ${theme.disabled.background};
        border: 2px solid ${theme.disabled.background};
        color: ${theme.disabled.text};
        &:hover {
          background: ${theme.disabled.background};
          color: ${theme.disabled.text};
          border-color: ${theme.disabled.background};
        }
      `
        : ""}
    `}

    ${buttonType === "tertiary" &&
    css`
      color: ${theme.fileInput.minorButton.primary};
      &:hover {
        background: ${theme.fileInput.minorButton.hover};
        color: ${theme.colors.white};
        border-color: ${theme.fileInput.minorButton.hover};
      }

      ${disabled
        ? `
        color: ${theme.disabled.text};
        &:hover {
          background: ${theme.disabled.background};
          color: ${theme.disabled.text};
          border-color: ${theme.disabled.background};
        }
      `
        : ""}

      ${destructive
        ? `
          color: ${theme.fileInput.minorButton.destructive};
          &:hover {
            background: ${theme.fileInput.minorButton.destructiveHover};
            color: ${theme.colors.white};
            border-color: ${theme.fileInput.minorButton.destructiveHover};
          }
        `
        : ""}
    `}
  `;
}

const StyledButton = styled(Button)`
  ${stylingForType}
`;

const StyledLink = styled(Link)`
  display: block;
  overflow: hidden;

  a {
    display: block;
    ${({ theme, readOnly, isUploading }) => css`
      ${(readOnly || isUploading) && `color: ${theme.text.color};`}
    `}
  }
`;

const ValidationBorder = styled.div`
  position: absolute;
  width: 2px;
  height: 100%;
  left: -10px;

  ${({ theme, error, warning }) => css`
    ${warning && `background-color: ${theme.colors.warning};`}
    ${error && `background-color: ${theme.colors.error};`}
  `}
`;

const ValidationMessage = styled.span`
  ${({ theme, error, warning }) => css`
    ${warning && `color: ${theme.colors.warningMessage};`}
    ${error && `color: ${theme.colors.error}; font-weight: bold;`}
  `}
`;

// TODO: remove after adding neutral variant for Loader Bar
const NeutralLoaderBar = styled(LoaderBar)`
  ${StyledLoaderBar} {
    background-color: ${({ theme }) => theme.fileInput.loaderBar.background};
  }
  ${InnerLoaderBar} {
    background-color: ${({ theme }) =>
      theme.fileInput.loaderBar.innerBackground};
  }
`;

const StyledProgressTracker = styled(ProgressTracker)`
  width: 100%;
  ${InnerProgressBar} {
    width: ${({ progress }) => `calc(100% * ${progress / 100})`};
    ${({ theme, error }) => css`
      ${error && `background-color: ${theme.colors.error};`}
    `}
  }
`;

HintText.defaultProps = {
  theme: BaseTheme,
};

FileDropArea.defaultProps = {
  theme: BaseTheme,
};

FileDropArea.propTypes = {
  disabled: PropTypes.bool,
  isSelected: PropTypes.bool,
  draggable: PropTypes.bool,
  isDragged: PropTypes.bool,
  error: PropTypes.bool,
  warning: PropTypes.bool,
};

FileInputContent.defaultProps = {
  theme: BaseTheme,
};

FileInputContent.propTypes = {
  disabled: PropTypes.bool,
  isSelected: PropTypes.bool,
  draggable: PropTypes.bool,
  isDragged: PropTypes.bool,
  isUploadingAndDisabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  error: PropTypes.bool,
  warning: PropTypes.bool,
};

FileInputForm.defaultProps = {
  theme: BaseTheme,
};

Placeholder.defaultProps = {
  theme: BaseTheme,
};

Placeholder.propTypes = {
  dragPlaceholder: PropTypes.string,
  isSelected: PropTypes.bool,
};

StyledLink.defaultProps = {
  theme: BaseTheme,
};

StyledLink.propTypes = {
  readOnly: PropTypes.bool,
  isUploading: PropTypes.bool,
};

StyledButton.defaultProps = {
  theme: BaseTheme,
};

StyledButton.propTypes = {
  destructive: PropTypes.bool,
  disabled: PropTypes.bool,
  buttonType: PropTypes.oneOf(BUTTON_VARIANTS),
};

NeutralLoaderBar.defaultProps = {
  theme: BaseTheme,
};

StyledProgressTracker.defaultProps = {
  theme: BaseTheme,
  progress: 0,
};

StyledProgressTracker.propTypes = {
  progress: PropTypes.number,
  error: PropTypes.bool,
};

ValidationBorder.defaultProps = {
  theme: BaseTheme,
};

ValidationMessage.defaultProps = {
  theme: BaseTheme,
};

ValidationBorder.propTypes = {
  error: PropTypes.bool,
  warning: PropTypes.bool,
};

ValidationMessage.propTypes = {
  error: PropTypes.bool,
  warning: PropTypes.bool,
};

export {
  HintText,
  FileDropArea,
  FileInput,
  FileInputContent,
  FileInputContentWrapper,
  FileInputContainer,
  FileInputForm,
  FirstSegment,
  FormattedText,
  NeutralLoaderBar,
  Placeholder,
  StyledButton,
  StyledLink,
  StyledProgressTracker,
  ValidationBorder,
  ValidationMessage,
};
