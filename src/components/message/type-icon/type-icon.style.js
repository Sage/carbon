import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';
import OptionsHelper from '../../../utils/helpers/options-helper';
import typeIconClassicStyle from './type-icon-classic.style';

const TypeIconStyle = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 0 7px;
  background-color: ${({ theme, messageType }) => theme.colors[messageType]};
  span {
    &:before {
      color: ${({ theme }) => theme.colors.white};
    }
  }

  ${({ theme, transparent, messageType }) => transparent && css`
    background-color: ${theme.colors.white};
    span {
      &:before {
        color: ${theme.colors[messageType]};
      }
    }
  `}

  ${typeIconClassicStyle}
`;

TypeIconStyle.defaultProps = {
  messageType: 'info',
  roundedCorners: true,
  theme: BaseTheme,
  transparent: false
};

TypeIconStyle.propTypes = {
  messageType: PropTypes.oneOf(OptionsHelper.messages),
  border: PropTypes.bool,
  roundedCorners: PropTypes.bool,
  transparent: PropTypes.bool
};

export default TypeIconStyle;
