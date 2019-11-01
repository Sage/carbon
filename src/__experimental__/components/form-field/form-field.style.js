import styled from 'styled-components';
import BaseTheme from '../../../style/themes/base';
import { isClassic } from '../../../utils/helpers/style-helper';

const FormFieldStyle = styled.div`
  ${({ inline }) => {
    if (inline) {
      return `
        align-items: baseline;
        display: flex;
      `;
    }

    return 'display: block;';
  }}

  & + & {
    margin-top: ${({ theme }) => (isClassic(theme) ? '10px' : '16px')};
  }
`;

FormFieldStyle.defaultProps = {
  theme: BaseTheme
};

export default FormFieldStyle;
