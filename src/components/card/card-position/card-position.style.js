import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import OptionsHelper from '../../../utils/helpers/options-helper';
import BaseTheme from '../../../style/themes/base';

const { cardSection } = OptionsHelper;

const marginSizes = {
  small: '0 -24px -16px',
  medium: '0 -32px -24px',
  large: '0 -48px -32px'
};

const positionConfig = (size, { card }) => {
  return {
    header: `
      padding: 32px 32px;
      min-height: 48px;
    `,
    middle: `
      padding: 0 32px;
      margin-bottom: 32px;
    `,
    footer: `
      background-color: ${card.footerBackground};
      border-top: ${card.footerBorder};
      height: 56px;
      line-height: 56px;
      padding: 0 32px;
      margin: ${marginSizes[size]};
    `
  };
};

const StyledCardPosition = styled.div`
  ${({ positionType, size, theme }) => {
    console.log(size);
    return css`
      ${positionConfig(size, theme)[positionType]}
    `;
  }
}`;

StyledCardPosition.propTypes = {
  positionType: PropTypes.oneOf(Object.keys(cardSection))
};

StyledCardPosition.defaultProps = {
  theme: BaseTheme
};

export default StyledCardPosition;
