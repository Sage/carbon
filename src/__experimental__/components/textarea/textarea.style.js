import styled from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import StyledInput from '../input/input.style';

const StyledTextarea = styled(StyledInput)`
  resize: none;
  min-height: 40px;
`;

StyledTextarea.defaultProps = {
  theme: baseTheme
};

StyledTextarea.propTypes = {
  disabled: PropTypes.bool
};

export default StyledTextarea;
