import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import OptionsHelper from '../../utils/helpers/options-helper';
import { classicSpinnerColors, classicSpinnerSizes } from './classicSpinnerConfig';

const spinnerAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const StyledSpinner = styled.div`
  animation: ${spinnerAnimation} 0.7s linear forwards infinite;
  border-radius: 50%;
  box-sizing: content-box;
  display: inline-block;
  border-style: solid;
  border-top-color: ${({ type }) => classicSpinnerColors[type].borderTop};
  border-bottom-color: ${({ type }) => classicSpinnerColors[type].borderBottom};
  border-right-color: ${({ type }) => classicSpinnerColors[type].borderRight};
  border-left-color: ${({ type }) => classicSpinnerColors[type].borderLeft};
  width: ${({ size }) => classicSpinnerSizes[size].width};
  height: ${({ size }) => classicSpinnerSizes[size].height};
  border-width: ${({ size }) => classicSpinnerSizes[size].borderWidth};
`;

StyledSpinner.defaultProps = {
  type: 'info',
  size: 'medium'
};

StyledSpinner.propTypes = {
  type: PropTypes.oneOf(OptionsHelper.colors),
  size: PropTypes.oneOf(OptionsHelper.sizesFull)
};

export default StyledSpinner;
