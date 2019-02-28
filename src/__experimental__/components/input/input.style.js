import styled, { css } from 'styled-components';
import queryTheme from '../../../style/utils/query-theme';
import baseTheme from '../../../style/themes/base';

const StyledInput = styled.input`
  ${queryTheme('input')}
`;

StyledInput.defaultProps = {
  theme: baseTheme,
  medium: true
};

export default StyledInput;
