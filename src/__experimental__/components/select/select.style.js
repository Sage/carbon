import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import baseTheme from "../../../style/themes/base";
import StyledPill from "../../../components/pill/pill.style";
import StyledInput from "../input/input.style";
import StyledIcon from "../../../components/icon/icon.style";
import { isClassic } from "../../../utils/helpers/style-helper";
import InputPresentationStyle from "../input/input-presentation.style";
import InputIconToggleStyle from "../input-icon-toggle/input-icon-toggle.style";

const StyledSelect = styled.div`
  ${({ isAnyValueSelected }) =>
    isAnyValueSelected &&
    css`
      ${StyledInput}::placeholder {
        opacity: 0;
      }
    `}

  ${({ theme }) =>
    isClassic(theme) &&
    css`
      &:hover {
        ${StyledIcon} {
          color: ${theme.colors.white};
        }
      }
    `}

  ${({ transparent }) =>
    transparent &&
    css`
      ${InputPresentationStyle} {
        background: transparent;
        border: none;
      }

      ${StyledInput} {
        font-weight: 900;
        text-align: right;
      }

      ${InputIconToggleStyle} {
        width: auto;
      }
    `}
`;

const StyledSelectPillContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3px 2px 3px 0;

  && ${StyledPill} {
    text-overflow: ellipsis;
  }
`;

StyledSelectPillContainer.propTypes = {
  theme: PropTypes.object,
};

StyledSelectPillContainer.defaultProps = {
  theme: baseTheme,
};

export { StyledSelect, StyledSelectPillContainer };
