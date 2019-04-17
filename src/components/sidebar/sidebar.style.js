import styled, { css } from 'styled-components';

const sidebarSizes = {
  'extra-small': '150px',
  small: '250px',
  'medium-small': '350px',
  medium: '450px',
  'medium-large': '550px',
  large: '650px',
  'extra-large': '750px'
};

const SidebarStyle = styled.div`
  ${props => console.log(props)}
  background-color: #e6ebed;
  border-radius: 1px;
  bottom: 0;
  overflow: auto;
  padding: 20px;
  position: fixed;
  top: 0;
  z-index: 1002;
  
    ${({ size }) => size && css`
        width: ${sidebarSizes[size]}
    `}

    ${({ position }) => position === 'right' && css`
        box-shadow: -10px 0 15px rgba(0, 0, 0, 0.05);
        border-left: 1px solid #ccd6db;
        right: 0;
    `}

    ${({ position }) => position === 'left' && css`
        box-shadow: 10px 0 15px rgba(0, 0, 0, 0.05);
        border-right: 1px solid #ccd6db;
        left: 0;
    `}

    .carbon-sidebar__close {
        cursor: pointer;
        position: absolute;
        right: 20px;
        top: 15px;
        z-index: 1;

        &:hover {
            color: #255BC7;
        }
    }

`;

export default SidebarStyle;
