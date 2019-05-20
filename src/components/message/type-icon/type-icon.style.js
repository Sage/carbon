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
  min-width: 30px;
  background-color: ${({ theme, variant }) => theme.colors[variant]};
  span {
    &:before {
      color: ${({ theme }) => theme.colors.white};
    }
  }

  ${({ theme, transparent, variant }) => transparent && css`
    background-color: transparent;
    span {
      &:before {
        color: ${theme.colors[variant]};
      }
    }
  `}

  ${typeIconClassicStyle}
`;

TypeIconStyle.defaultProps = {
  variant: 'info',
  roundedCorners: true,
  theme: BaseTheme,
  transparent: false
};

TypeIconStyle.propTypes = {
  variant: PropTypes.oneOf(OptionsHelper.colors),
  border: PropTypes.bool,
  roundedCorners: PropTypes.bool,
  transparent: PropTypes.bool
};

export default TypeIconStyle;
