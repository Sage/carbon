import styled from 'styled-components';
import Link from '../link';
import baseTheme from '../../style/themes/base';
import createClassicStyle from './create-classic.style';

const CreateStyle = styled(Link)`
  background-color: ${({ theme }) => theme.disabled.input};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  display: block;
  padding: 12px 12px 10px;
  text-align: center;
  font-weight: 700;
  text-decoration: none;
  width: 100%;

  :hover {
    background-color: ${({ theme }) => theme.colors.white};
  }

  :focus {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.white};
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }

  .carbon-icon::before {
    font-size: 12px;
  }

  ${createClassicStyle}
`;

CreateStyle.defaultProps = {
  theme: baseTheme
};

export default CreateStyle;
