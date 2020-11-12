import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import BaseTheme from "../../style/themes/base";
import OptionsHelper from "../../utils/helpers/options-helper";
import CloseIconClassicStyling from "./dismiss-button-classic.style";
import Link from "../link";
import StyledIcon from "../icon/icon.style";
import { isClassic } from "../../utils/helpers/style-helper";

const DismissButtonStyle = styled.div`
  border: none;
  position: absolute;
  right: 16px;
  ${({ theme }) =>
    !isClassic(theme) &&
    css`
      margin-top: -10px;
      top: 50%;
    `}
  ${StyledIcon} {
    &:before {
      color: ${({ theme }) => theme.colors.border};
    }

    &:hover:before {
      color: ${({ theme }) => theme.colors.focusedIcon};
    }
  }

  ${CloseIconClassicStyling}
`;

const LinkStyle = styled(Link)`
  ${({ theme }) =>
    !isClassic(theme) &&
    css`
      a:focus {
        outline: none;
        background-color: transparent;
        span {
          &:before {
            outline: 2px solid ${theme.colors.focus};
            outline-offset: 3px;
          }
        }
      }
    `}

  .carbon-link__content {
    display: none;
  }

  ${StyledIcon} {
    margin-right: 0;
    top: -2px;
  }
`;

DismissButtonStyle.defaultProps = {
  variant: "info",
  roundedCorners: true,
  theme: BaseTheme,
  transparent: false,
};

DismissButtonStyle.propTypes = {
  variant: PropTypes.oneOf(OptionsHelper.colors),
  border: PropTypes.bool,
  roundedCorners: PropTypes.bool,
  transparent: PropTypes.bool,
};

LinkStyle.defaultProps = {
  theme: BaseTheme,
};

export { DismissButtonStyle, LinkStyle };
