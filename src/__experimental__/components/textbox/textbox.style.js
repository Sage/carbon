import styled from 'styled-components';
import { space } from 'styled-system';
import baseTheme from '../../../style/themes/base';

import StyledFormField from '../form-field/form-field.style';

const TextboxStyle = styled.div`
  & ${StyledFormField} {
      ${space}
    }
`;

TextboxStyle.defaultProps = {
  theme: baseTheme
};

export default TextboxStyle;
