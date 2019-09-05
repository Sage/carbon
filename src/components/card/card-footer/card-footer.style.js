import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import OptionsHelper from '../../../utils/helpers/options-helper/options-helper';
import BaseTheme from '../../../style/themes/base';
import StyledCardColumn from '../card-column/card-column.style';

const { sizesRestricted } = OptionsHelper;

const marginSizes = {
  small: '0 -24px -16px',
  medium: '0 -32px -24px',
  large: '0 -48px -32px'
};

const StyledCardFooter = styled.div`
  ${({
    footerFilled, marginSize, theme
  }) => css`
      background-color: ${footerFilled ? theme.card.footerBackground : 'transparent'};
      border-top: ${theme.card.footerBorder};
      height: 56px;
      line-height: 56px;
      padding: 0 32px;
      margin: ${marginSizes[marginSize]};
      display: flex;

      ${StyledCardColumn} {
        line-height: 30px;
        margin: 0;
        color: ${theme.card.footerText};
        font-weight: 600;
        padding: 12px 0;
      }
  `}
`;

StyledCardFooter.propTypes = {
  footerFilled: PropTypes.bool,
  marginSize: PropTypes.oneOf(sizesRestricted)
};

StyledCardFooter.defaultProps = {
  theme: BaseTheme
};

export default StyledCardFooter;
