import styled, { css } from 'styled-components';
import propTypes from 'prop-types';
import OptionsHelper from '../../../utils/helpers/options-helper';

const StyledTab = styled.div``;

StyledTab.defaultProps = {
  position: 'horizontal'
};

StyledTab.propTypes = {
  position: propTypes.oneOf(OptionsHelper.orientation)
};

export default StyledTab;
