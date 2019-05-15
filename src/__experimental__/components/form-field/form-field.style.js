import styled from 'styled-components';
import BaseTheme from '../../../style/themes/base';
import { THEMES } from '../../../style/themes';

const FormFieldStyle = styled.div`
  ${({ inline }) => {
    if (inline) {
      return `
        align-items: baseline;
        display: flex;
        flex-wrap: wrap;
      `;
    }

    return 'display: block;';
  }}

  & + & {
    margin-top: ${({ theme }) => (theme.name === THEMES.classic ? '10px' : '16px')};
  }
`;

FormFieldStyle.defaultProps = {
  theme: BaseTheme
};

export default FormFieldStyle;
