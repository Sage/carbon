import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import OptionsHelper from '../../../utils/helpers/options-helper';
import BaseTheme from '../../../style/themes/base';

const { cardSection } = OptionsHelper;

const positionConfig = (theme) => {
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
      background-color: ${theme.card.footerBackground};
      border-top: ${theme.card.footerBorder};
      height: 56px;
      line-height: 56px;
      padding: 0 32px;
    `
  };
};

const StyledCardPosition = styled.div`
  ${({ positionType, theme }) => {
    return css`
      ${positionConfig(theme)[positionType]}
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
