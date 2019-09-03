import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import OptionsHelper from '../../../utils/helpers/options-helper/options-helper';
import BaseTheme from '../../../style/themes/base';

const { cardSection, sizesRestricted } = OptionsHelper;

const marginSizes = {
  small: '0 -24px -16px',
  medium: '0 -32px -24px',
  large: '0 -48px -32px'
};

const StyledCardRow = styled.div`
  ${({
    footerFilled, positionType, inlineRow, marginSize, theme
  }) => css`
    ${positionType === 'header' && css`
      padding: 32px 32px;
      min-height: 48px;
      ${inlineRow && css`display: flex;`}
    `}
    ${positionType === 'middle' && css`
      padding: 0 32px;
      margin-bottom: 32px;
      ${inlineRow && css`display: flex;`}
    `}
    ${positionType === 'footer' && css`
      background-color: ${footerFilled ? theme.card.footerBackground : 'transparent'};
      border-top: ${theme.card.footerBorder};
      height: 56px;
      line-height: 56px;
      padding: 0 32px;
      margin: ${marginSizes[marginSize]};
      display: flex;
    `}
  `}
`;

StyledCardRow.propTypes = {
  footerFilled: PropTypes.bool,
  positionType: PropTypes.oneOf(cardSection),
  inlineRow: PropTypes.bool,
  marginSize: PropTypes.oneOf(sizesRestricted)
};

StyledCardRow.defaultProps = {
  theme: BaseTheme
};

export default StyledCardRow;
