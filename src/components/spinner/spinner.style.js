import styled, { keyframes } from 'styled-components';
import { classicSpinnerColors, classicSpinnerSizes } from './classicSpinnerValues';

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

export default StyledSpinner;
