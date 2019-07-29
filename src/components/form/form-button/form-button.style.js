import styled from 'styled-components';
import PropTypes from 'prop-types';
import StyledButton from '../../button/button.style';
import baseTheme from '../../../style/themes/base';

const StyledFormButtonWrapper = styled.div`
  ${StyledButton} {
    align-items: center;
    display: flex;
  }
`;

StyledFormButtonWrapper.propTypes = {
  buttonType: PropTypes.string
};

StyledFormButtonWrapper.defaultProps = {
  theme: baseTheme
};

export default StyledFormButtonWrapper;
