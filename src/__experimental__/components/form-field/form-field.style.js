import styled, { css } from 'styled-components';
import BaseTheme from '../../../style/themes/base';

const FormFieldStyle = styled.div`
  display: flex;
  flex-wrap: wrap;

  & + & {
    margin-top: ${({ theme }) => (theme.name === 'classic' ? '10px' : '16px')};
  }
`;

FormFieldStyle.defaultProps = {
  theme: BaseTheme
};

export default FormFieldStyle;
