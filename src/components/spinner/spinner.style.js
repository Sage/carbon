import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import spinnerClassicStyle from './spinner-classic.style';

const StyledSpinner = styled.div`
  ${spinnerClassicStyle};
`;

StyledSpinner.defaultProps = {};

StyledSpinner.propTypes = {};

export default StyledSpinner;
