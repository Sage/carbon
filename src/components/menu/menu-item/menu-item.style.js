import styled, { css } from 'styled-components';
import { StyledSubmenu, StyledSubmenuTitle, StyledSubmenuBlock } from '../submenu-block/submenu.style';
import { baseTheme } from '../../../style/themes';

const StyledMenuItemWrapper = styled.div`
  ${({
    menuType, theme, selected, hasSubmenu, divide
  }) => css`
    display: inline-block;
    font-size: 13px;
    font-weight: 700;
    height: 40px;
    padding: 0px 16px;
    position: relative;
    cursor: pointer;

    .carbon-portrait {
      top: -1px;
    }

    &:focus {
      z-index: 1;
    }

    ${menuType === 'primary' && css`
      background-color: ${theme.colors.white};
      color: ${theme.colors.slate}; 

      a, a:hover, a:focus, button, button:hover, button:focus{
        font-weight: 700;
        color: ${theme.colors.slate};
        text-decoration: none;
        background-color: transparent;
      }

      [data-component='icon'] {
        color: ${theme.colors.slate};
      }

      &:after {
        transition: all 200ms;
        content: "";
        position: absolute;
        height: 0;
        background-color: transparent;
        bottom: 0;
        left: 0;
        right: 0;
      }

      &:hover:after {
        background-color: ${theme.colors.primary}; 
        height: 3px;
        left: 0;
        right: 0;
      }

      ${selected && css`
        &:after{
          left: 10px;
          right: 10px;
          background-color: #00DC00; 
          height: 3px;
        }
      `}
    `}

    ${menuType === 'secondary' && css`
      background-color: ${theme.colors.slate};
      color: ${theme.colors.white};

      a, a:hover, a:focus, button, button:hover, button:focus {
        text-decoration: none;
        color: ${theme.colors.white};
        background-color: transparent;
      }

      [data-component='icon'] {
        color: ${theme.colors.white};
      }

      :hover &, :hover {
        background-color: ${theme.colors.primary}; 
      }
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
        border-top: 5px solid ${menuType === 'secondary' ? theme.colors.white : theme.colors.slate};
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
      ${StyledMenuItemWrapper}:after, ${StyledMenuItemWrapper}:hover:after{
        display: none;
      }

      ${menuType === 'primary' && css`
        background-color: ${theme.colors.white};

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
      `}

      ${menuType === 'secondary' && css`
        .carbon-menu-item--has-link:hover{
          background-color: ${theme.colors.primary};
          text-decoration: none;

          [data-component='icon'] {
            color: ${theme.colors.white};
          }
        }
      `}

      ${StyledMenuItemWrapper}{
        display: block;
        height: 40px;
        line-height: 40px;
        white-space: nowrap;
        cursor: pointer;

        ${menuType === 'secondary' && css`
          background-color: #00283A; 
          padding: 0 16px;
          height: 40px;
          line-height: 40px;
        `}
      }
    }

    ${StyledSubmenuBlock}{
      padding:  0 !important;

      ${menuType === 'secondary' && css`
          background-color: #002333; 
      `}

      ${StyledMenuItemWrapper}.carbon-link__anchor,
      ${StyledMenuItemWrapper} {

        ${menuType === 'secondary' && css`
          background-color: #002333; 
        `}

        &:last-child {
          border-radius: 0;
        }
      }
    }

    ${divide && !hasSubmenu && css`
      &:before {
        content: "";
        height: 1px;
        left: 15px;
        right: 15px;
        top: 0;
        position: absolute;

        ${menuType === 'primary' && css`
          background-color: #CCD6DB; /** $slate-tint-80 */
        `}

        ${menuType === 'secondary' && css`
          background-color: #335C6D; /** $slate-tint-20 */
        `}
      }
    `}
  `}
`;

StyledMenuItemWrapper.defaultProps = {
  theme: baseTheme
};

export default StyledMenuItemWrapper;
