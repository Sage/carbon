import styled, { css } from 'styled-components';
import { StyledSubmenu, StyledSubmenuTitle, StyledSubmenuBlock } from '../submenu-block/submenu.style';
import { baseTheme } from '../../../style/themes';
import StyledIcon from '../../icon/icon.style';
import LinkStyle from '../../link/link.style';

const StyledMenuItemWrapper = styled.a`
  ${({
    menuType, theme, selected, hasSubmenu
  }) => css`
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    height: 40px;
    position: relative;
    cursor: pointer;
    background-color: ${theme.menu.light.background};

    a,
    button,
    ${LinkStyle} a, 
    ${LinkStyle} button{
      padding: 0 16px;
    }

    a, 
    button, 
    [data-component="icon"], 
    ${LinkStyle} a, 
    ${LinkStyle} button, 
    ${LinkStyle} [data-component="icon"] {
      font-weight: 700;
      text-decoration: none;
      color: ${theme.colors.black};
    }

    a:hover, 
    a:focus, 
    button:hover, 
    button:focus{
      color: ${theme.colors.white};
      background: transparent;
    }

    a:focus,
    button:focus,
    ${LinkStyle} a:focus, 
    ${LinkStyle} button:focus{
      color: ${theme.colors.black};
    }

    &:focus {
      z-index: 1;
    }

    :hover{
      background: ${theme.colors.primary};

      a, button, [data-component="icon"]{
        color: ${theme.colors.white};
      }
    }

    ${hasSubmenu && css`
      :hover &, :hover{
        background-color: ${theme.colors.white};
        color: ${theme.colors.black};

          a, button, [data-component="icon"] {
            color: ${theme.colors.black};
          }    
        }
    `}

    ${selected && css`
      background-color: ${theme.menu.light.selected};
    `}

    ${menuType === 'dark' && css`
      background-color: ${theme.colors.slate};
      color: ${theme.colors.white};

      a,
      a:hover,
      a:focus,
      button,
      button:hover,
      button:focus,
      [data-component="icon"] {
        font-weight: 700;
        text-decoration: none;
        color: ${theme.colors.white};
        background-color: transparent;
      }

      ${selected && css`
        background-color: ${theme.menu.dark.selected};
      `}

      [data-component='icon'] {
        color: ${theme.colors.white};
      }

      ${hasSubmenu && css`
        :hover &, :hover {
          background-color: ${theme.menu.dark.submenuBackground};
          color: ${theme.colors.white};

          a, button, [data-component="icon"] {
            color: ${theme.colors.white};
          } 
        }
      `}
    `}

    ${hasSubmenu && css`
      padding: 0;

      ${StyledSubmenuTitle}{
        ${StyledMenuItemWrapper}{
          padding-right: 32px;
        }
      }

      :before {
        margin-top: -2px;
        pointer-events: none;
        position: absolute;
        right: 16px;
        top: 50%;
        z-index: 2;
        content: "";
        width: 0;
        height: 0;
        border-top: 5px solid ${menuType !== 'dark' ? theme.colors.slate : theme.colors.white};
        border-right: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-left: 4px solid transparent;
      }

      &:hover {
        ${StyledSubmenu}{
          display: block;
        }
      }
    `}

    ${StyledSubmenu}{
      background-color: ${theme.colors.white};
      
      ${StyledMenuItemWrapper}:after, ${StyledMenuItemWrapper}:hover:after{
        display: none;
      }

      .carbon-menu-item--has-link:hover{
        background: ${theme.colors.primary};
        cursor: pointer;
        color: white;
        text-decoration: none;

        [data-component='icon'] {
          color: white;
        }
      }

      ${StyledMenuItemWrapper} {
        &:hover,
        &:hover a,
        a &:hover {
          color: ${theme.colors.white};
        }
        
        a {
          text-decoration: none;
        }
      }

      ${selected && css`
        color: #38C72A;
      `}

      ${menuType === 'dark' && css`
        background: ${theme.menu.dark.submenuBackground};

        .carbon-menu-item--has-link:hover{
          background-color: ${theme.colors.primary};
          text-decoration: none;

          [data-component='icon'] {
            color: ${theme.colors.white};
          }
        }
      `}

      ${StyledMenuItemWrapper}{
        display: flex;
        align-items: center;
        height: 40px;
        line-height: 40px;
        white-space: nowrap;
        cursor: pointer;

        ${StyledIcon}{
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
      }
    }

    ${menuType === 'dark' && css`
      ${StyledSubmenuBlock}{
        background-color: ${theme.menu.dark.submenuBackground}; 
        
        ${StyledMenuItemWrapper}{
          background-color: transparent; 
        }
      }
    `}
  `}
`;

StyledMenuItemWrapper.defaultProps = {
  theme: baseTheme
};

export default StyledMenuItemWrapper;
