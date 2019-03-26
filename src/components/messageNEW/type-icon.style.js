import styled, { css } from 'styled-components';

const TypeIconContainerStyle = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 30px;
  text-align: center;
  
  ${({ roundedCorners }) => roundedCorners
    && css`
      border-radius: 3px 0 0 3px;
    `}
  background-color: 
    ${({ type, theme }) => (type === 'info' && theme.colors.info)
      || (type === 'warning' && theme.colors.warning)
      || (type === 'error' && theme.colors.error)
      || (type === 'success' && theme.colors.success)};
    ${({ transparent, theme }) => transparent
      && css`
        background-color: ${theme.colors.white};
      `}

    span {
        &:before {
            color: 
                ${({ type, theme }) => (type === 'info' && theme.colors.info)
                  || (type === 'warning' && theme.colors.warning)
                  || (type === 'error' && theme.colors.error)
                  || (type === 'success' && theme.colors.success)};
            
                ${({ transparent, theme }) => !transparent
                  && css`
                    color: ${theme.colors.white};
                  `}
            display: block;
            font-size: 16px;
        }
    }
`;

export default TypeIconContainerStyle;
