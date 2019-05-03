import styled from 'styled-components';
import PropTypes from 'prop-types';
import ClassicSwitchSpinnerDotStyles from './switch-spinner-dot-classic.style';

const SwitchSpinnerDot = styled.div`
  animation: carbon-loading-dots__bouncedelay 1s infinite ease-in-out both;
  background-color: ${({ checked }) => (checked ? '#ffffff' : '#003349')};
  display: inline-block;
  height: 5px;
  margin-right: 2px;
  width: 5px;

  &:nth-of-type(1) {
    animation-delay: 0s;
  }

  &:nth-of-type(2) {
    animation-delay: 0.2s;
  }

  &:nth-of-type(3) {
    animation-delay: 0.4s;
    margin-right: 0px;
  }

  @keyframes carbon-loading-dots__bouncedelay {
    0%, 80%, 100% {
      opacity: 0;
      transform: scale(0);
    }

    40% {
      opacity: 1;
      transform: scale(1.0);
    }
  }

  ${ClassicSwitchSpinnerDotStyles}
`;

SwitchSpinnerDot.propTypes = {
  checked: PropTypes.bool
};

export default SwitchSpinnerDot;
