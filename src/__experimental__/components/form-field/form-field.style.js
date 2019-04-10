import styled from 'styled-components';
import BaseTheme from '../../../style/themes/base';
import { THEMES } from '../../../style/themes';

const FormFieldStyle = styled.div`
  display: flex;
  flex-wrap: wrap;

  & + & {
    margin-top: ${({ theme }) => (theme.name === THEMES.classic ? '10px' : '16px')};
  }
`;

FormFieldStyle.defaultProps = {
  theme: BaseTheme
};

export default FormFieldStyle;
