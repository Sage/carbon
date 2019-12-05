import styled from 'styled-components';
import BaseTheme from '../../../style/themes/base';
import { isClassic } from '../../../utils/helpers/style-helper';

const FormFieldStyle = styled.div`
  & + & {
    margin-top: ${({ theme }) => (isClassic(theme) ? '10px' : '16px')};
  }
`;

FormFieldStyle.defaultProps = {
  theme: BaseTheme
};

const FieldLineStyle = styled.div`
  ${({ inline }) => {
    if (inline) {
      return `
        display: flex;
      `;
    }

    return 'display: block;';
  }}
`;

export { FieldLineStyle };
export default FormFieldStyle;
