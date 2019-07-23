import styled from 'styled-components';
import PropTypes from 'prop-types';
import StyledButton from '../../../../components/button/button.style';
import baseTheme from '../../../../style/themes/base';

const StyledFormButtonWrapper = styled.div`
  margin-top: 48px;
  ${StyledButton} {
    align-items: center;
    display: flex;
    margin-top: 20px;
    margin-left: 15px;
  }
`;

StyledFormButtonWrapper.propTypes = {
  buttonType: PropTypes.string
};

StyledFormButtonWrapper.defaultProps = {
  theme: baseTheme
};

export default StyledFormButtonWrapper;
