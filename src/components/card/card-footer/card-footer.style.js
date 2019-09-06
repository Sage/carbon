import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import OptionsHelper from '../../../utils/helpers/options-helper/options-helper';
import BaseTheme from '../../../style/themes/base';
import StyledCardColumn from '../card-column/card-column.style';

const { sizesRestricted } = OptionsHelper;

const marginSizes = {
  small: '0 -24px',
  medium: '0 -32px',
  large: '0 -48px'
};

const paddingSizes = {
  small: '16px 24px',
  medium: '18px 32px',
  large: '20px 48px'
};

const StyledCardFooter = styled.div`
  ${({ spacing, theme }) => css`
      background-color: ${theme.card.footerBackground};
      border-top: ${theme.card.footerBorder};
      font-size: 14px;
      font-weight: 600;
      margin: ${marginSizes[spacing]};
      display: flex;

      ${StyledCardColumn} {
        margin: 0;
        color: ${theme.card.footerText};
        padding: ${paddingSizes[spacing]};
      }
  `}
`;

StyledCardFooter.propTypes = {
  spacing: PropTypes.oneOf(sizesRestricted)
};

StyledCardFooter.defaultProps = {
  theme: BaseTheme
};

export default StyledCardFooter;
