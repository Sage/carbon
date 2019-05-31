import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../style/themes/base';

const StyledLoader = styled.div`
  padding: 0 3px 3px 0;
  text-align: center;
`;

const loaderAnimation = keyframes`
  0%, 80%, 100% {
    opacity: 0;
    transform: scale(0);
  }
  40% {
    opacity: 1;
    transform: scale(1);
  }
`;

const LoaderSquare = styled.div`
  ${({ theme, size, isInsideButton }) => css`
    animation: ${loaderAnimation} 1s infinite ease-in-out both;
    background-color: ${isInsideButton ? theme.colors.white : theme.colors.primary};
    display: inline-block;
    height: ${size === 'large' ? '16px' : '8px'};
    width: ${size === 'large' ? '16px' : '8px'};
    margin-right: ${size === 'large' ? '10px' : '6px'};

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
  `}
`;

StyledLoader.defaultProps = {
  theme: baseTheme
};

StyledLoader.propTypes = {
  theme: PropTypes.object
};

export { StyledLoader, LoaderSquare };
