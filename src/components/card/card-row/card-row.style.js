import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import OptionsHelper from '../../../utils/helpers/options-helper/options-helper';
import BaseTheme from '../../../style/themes/base';

const { cardSection } = OptionsHelper;

const StyledCardRow = styled.div`
  ${({
    positionType, inline
  }) => css`
    ${positionType === 'header' && css`
      padding: 32px 32px;
      min-height: 48px;
    `}
    ${positionType === 'middle' && css`
      padding: 0 32px;
      margin-bottom: 32px;
    `}

    ${inline && css`display: flex;`}
  `}
`;

StyledCardRow.propTypes = {
  positionType: PropTypes.oneOf(cardSection),
  inline: PropTypes.bool
};

StyledCardRow.defaultProps = {
  theme: BaseTheme
};

export default StyledCardRow;
