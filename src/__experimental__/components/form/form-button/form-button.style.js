import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import StyledButton from '../../../../components/button/button.style';
import baseTheme from '../../../../style/themes/base';
import { isClassic } from '../../../../utils/helpers/style-helper';

const StyledFormButtonWrapper = styled.div`
  ${StyledButton} {
    align-items: center;
    display: flex;
    margin-left: 16px;
    ${({ theme }) => isClassic(theme) && css`margin-left: 15px;`}
  }
`;

StyledFormButtonWrapper.propTypes = {
  buttonType: PropTypes.string
};

StyledFormButtonWrapper.defaultProps = {
  theme: baseTheme
};

export default StyledFormButtonWrapper;
