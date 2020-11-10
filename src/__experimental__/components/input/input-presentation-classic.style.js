import { css } from "styled-components";
import InputIconToggleStyle from "../input-icon-toggle/input-icon-toggle.style";
import StyledInput from "./input.style";
import StyledIcon from "../../../components/icon/icon.style";
import { isClassic } from "../../../utils/helpers/style-helper";

export default ({ disabled, hasFocus, theme }) =>
  isClassic(theme) &&
  css`
    border-color: #ccd6db;
    box-shadow: none;
    min-height: 31px;
    padding-left: 6px;
    padding-right: 6px;

    ${StyledInput} {
      /* this is required for an IE11 fix: */
      height: 27px;
    }

    &:hover {
      border-color: #99adb6;
      z-index: 2;

      ${InputIconToggleStyle} {
        background-color: #255bc7;
        border-color: #255bc7;
        color: #fff;
      }

      ${InputIconToggleStyle}:hover {
        background-color: #1e499f;
        border-color: #1e499f;
      }
    }

    ${hasFocus &&
    css`
      && {
        border: 1px solid #255bc7;
        outline: none;
      }

      ${StyledIcon} {
        color: #ffffff;
      }
      ${InputIconToggleStyle},
      &:hover ${InputIconToggleStyle} {
        background-color: #1e499f;
        border-color: #1e499f !important;
        color: #fff;
      }
    `}

    ${disabled &&
    css`
      background: #d9e0e4;
      border-color: #d9e0e4 !important;
    `}
  `;
