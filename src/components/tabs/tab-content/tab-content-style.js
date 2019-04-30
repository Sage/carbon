import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';
import OptionsHelper from '../../../utils/helpers/options-helper';

const StyledTabContent = styled.div`
  display: none;

  ${({ isTabSelected }) => isTabSelected
    && css`
      display: block;
    `}
  ${({ isTabSelected, position }) => isTabSelected
    && position === 'vertical'
    && css`
      width: 80%;
    `}
`;

StyledTabContent.propTypes = {};

StyledTabContent.defaultProps = {};

export default StyledTabContent;
