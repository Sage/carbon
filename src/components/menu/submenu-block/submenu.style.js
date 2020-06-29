
import styled, { css } from 'styled-components';
import { baseTheme } from '../../../style/themes';

const StyledSubmenuItem = styled.li`
  margin: 0;
  padding: 0;
`;

const StyledSubmenuTitle = styled('div')``;

const StyledSubmenuBlock = styled.div``;

const StyledSubmenu = styled.ul`
    box-shadow: 0 5px 5px 0 rgba(0, 20, 29 ,0.2), 0 10px 10px 0 rgba(0, 20, 29 ,0.1);
    display: none;
    list-style: none;
    margin: 0;
    min-width: 100%;
    padding: 0;
    position: absolute;
    z-index: 10; 

    [data-component='icon'] {
      line-height: 16px;
      margin: 0 10px 0 0;
      top: -1px;

      &:before {
        line-height: unset;
      }

      span {
        vertical-align: middle;

        svg {
          height: 16px;
          width: 16px;
        }
      }
    }

    ${({ menuType }) => menuType === 'secondary' && css`
      background-color: #002333;

      [data-component='icon'] {
        margin: 0 8px 0 0;
      }
    `}

    &:before {
      background-color: transparent;
      border-radius: 0 0 4px 4px;
      content: "";
      height: 5px;
      position: absolute;
      top: -5px;
      width: 100%;
    }

    > *:not(${StyledSubmenuItem}) {
      padding: 8px 15px 10px;

      ${({ menuType, theme }) => menuType === 'primary' && css`
        background-color: ${theme.colors.white};
      `}

      ${({ menuType }) => menuType === 'secondary' && css`
        background-color: #1B1D21 ;
      `}
    }

  ${({ submenuDirection }) => submenuDirection === 'left' && css`
    right: 0;
  `}
`;

StyledSubmenu.defaultProps = {
  theme: baseTheme
};

export {
  StyledSubmenu, StyledSubmenuItem, StyledSubmenuTitle, StyledSubmenuBlock
};
