import styled, { css } from 'styled-components';
import propTypes from 'prop-types';
import OptionsHelper from '../../../utils/helpers/options-helper';

const StyledTab = styled.div`
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

StyledTab.defaultProps = {
  position: 'horizontal'
};

StyledTab.propTypes = {
  position: propTypes.oneOf(OptionsHelper.orientation)
};

export default StyledTab;
