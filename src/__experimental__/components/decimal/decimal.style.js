import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import OptionsHelper from '../../../utils/helpers/options-helper';
// import { THEMES } from '../../../style/themes';

const DecimalStyle = styled.div`
  /* text-align: ${props => props.align}; */
`;

DecimalStyle.defaultProps = {
  align: 'left',
};

DecimalStyle.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignBinary),
};

export default DecimalStyle;
