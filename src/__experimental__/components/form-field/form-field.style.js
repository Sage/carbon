import styled from 'styled-components';
import BaseTheme from '../../../style/themes/base';

const FormFieldStyle = styled.div`
  display: flex;
  flex-wrap: wrap;

  & + & {
    margin-top: ${({ theme }) => theme.input.gutter};
  }
`;

FormFieldStyle.defaultProps = {
  theme: BaseTheme
};

export default FormFieldStyle;
