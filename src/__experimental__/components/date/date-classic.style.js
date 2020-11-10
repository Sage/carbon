import { css } from "styled-components";
import { isClassic } from "../../../utils/helpers/style-helper";
import InputPresentationStyle from "../input/input-presentation.style";
import InputIconToggleStyle from "../input-icon-toggle/input-icon-toggle.style";
import StyledIcon from "../../../components/icon/icon.style";

const dateClassicStyle = ({ theme }) =>
  isClassic(theme) &&
  css`
    & ${InputPresentationStyle} {
      width: 125px;

      &:focus {
        & ${InputIconToggleStyle} {
          background-color: #1e499f;
          border-color: #1e499f;
        }
        ${StyledIcon} {
          color: #ffffff;
        }
      }
      &:hover {
        & ${InputIconToggleStyle} {
          background-color: #255bc7;
          border-color: #255bc7;
        }
        ${StyledIcon} {
          color: #ffffff;
        }
      }
    }

    &&& ${InputIconToggleStyle} {
      border-left: 1px solid #bfccd2;
      box-sizing: border-box;
      width: 32px;
      &:hover {
        background-color: #1e499f;
        border-color: #1e499f;
        ${StyledIcon} {
          color: #ffffff;
        }
      }
    }
  `;

export default dateClassicStyle;
