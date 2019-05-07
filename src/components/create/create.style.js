import styled from 'styled-components';
import Link from '../link';
import LinkStyle from '../link/link.style';
import baseTheme from '../../style/themes/base';
import createClassicStyle from './create-classic.style';

const CreateStyle = styled(Link)`
    background-color: ${({ theme }) => theme.disabled.input};
    border: 1px dashed ${({ theme }) => theme.colors.border};
    display: block;
    padding: 12px 12px 10px;
    font-size: 16px;
    text-align: center;
    font-weight: 700;
    text-decoration: none ;

    :hover{
        background-color: ${({ theme }) => theme.colors.white}
    }
   
    :focus{
        background-color: ${({ theme }) => theme.colors.white} ;
        outline: 3px solid ${({ theme }) => theme.colors.focus} ;
    }
    
    ${createClassicStyle}
`;

CreateStyle.defaultProps = {
  theme: baseTheme
};

export default CreateStyle;
