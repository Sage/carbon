import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import OptionsHelper from '../../utils/helpers/options-helper';

const StyledTabs = styled.div`
  ${({ position }) => position === 'horizontal'
    && css`
      margin-top: 15px;
    `}

  ${({ position }) => position === 'vertical'
    && css`
      display: flex;
      width: 100%;
    `}
`;

StyledTabs.defaultProps = {
  position: 'horizontal'
};

StyledTabs.propTypes = {
  position: PropTypes.oneOf(OptionsHelper.orientation)
};

export default StyledTabs;
