import styled from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import { inputStyle } from '../input/input.style';

const StyledTextarea = styled.textarea`
resize: none;
min-height: 40px;
${inputStyle}
`;

StyledTextarea.defaultProps = {
  theme: baseTheme
};

StyledTextarea.propTypes = {
  disabled: PropTypes.bool
};

export default StyledTextarea;
