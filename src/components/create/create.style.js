import styled from 'styled-components';
import Link from '../link';
import baseTheme from '../../style/themes/base';
import createClassicStyle from './create-classic.style';
import StyledIcon from '../icon/icon.style';

const CreateStyle = styled(Link)`
  display: block;
  
  a {
      background-color: ${({ theme }) => theme.disabled.input};
      border: 1px dashed ${({ theme }) => theme.create.border};
      display: block;
      padding: 12px 12px 10px;
      text-align: center;
      font-weight: 700;
      text-decoration: none;
      width: 100%;

      :hover {
        background-color: ${({ theme }) => theme.colors.white};

        ${StyledIcon} {
          color: ${({ theme }) => theme.colors.secondary};
        }
      }

      :focus {
        background-color: ${({ theme }) => theme.colors.white};
        color: ${({ theme }) => theme.colors.secondary};
        outline: 3px solid ${({ theme }) => theme.colors.focus};
      }

      ${StyledIcon}::before {
        font-weight: 400;
        line-height: 16px;
        vertical-align: middle;
      }

      ${StyledIcon} {
        padding-left: 3px;
        top: -2px;
      }

      ${createClassicStyle}
    }
`;

CreateStyle.defaultProps = {
  theme: baseTheme
};

export default CreateStyle;
